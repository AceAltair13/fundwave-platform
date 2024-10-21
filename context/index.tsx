'use client';
import React, {useContext, createContext, ReactNode, useEffect, useState} from 'react';
import { createThirdwebClient, getContract, resolveMethod, defineChain, prepareTransaction, prepareContractCall } from 'thirdweb';
import { ThirdwebProvider, useActiveAccount, useActiveWallet, useReadContract, useSendTransaction } from 'thirdweb/react';
import {ethers} from 'ethers';
// import { CLIENT_ID, CONTRACT_ADDRESS } from '@/config'
// import { sepolia } from 'thirdweb/chains'
import { Chain } from 'thirdweb';
import { sepolia } from 'thirdweb/chains'
import { contract, client } from '@/lib/smartcontract'
import { redirect } from 'next/navigation'

interface FormData {
    title: string;
    description: string;
    target: string;
    deadline: string;
    image: string;
}

interface Campaign {
    owner: string;
    title: string;
    description: string;
    target: string;
    deadline: number;
    amountCollected: string;
    image: string;
    pId: number;
}

interface Donation {
    donator: string;
    donation: string;
}

interface StateContextType {
    address: string | undefined;
    contract: any;
    
    createCampaign: (form: FormData) => Promise<void>;
    // getCampaigns: () => Promise<Campaign[]>;
    // getUserCampaigns: () => Promise<Campaign[]>;
    // donate: (pId: number, amount: string) => Promise<any>;
    // getDonations: (pId: number) => Promise<Donation[]>;
}



// creating the context
const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateContextProvider = ({children}: {children: ReactNode}) => {
    
    const {mutate: sendTransaction, data: transactionResult} = useSendTransaction();

    const account = useActiveAccount();
    console.log(account);
    if (!account) {
        console.error("No account connected.");
    }

    const publishCampaign = async (form: FormData) => {

        try {
            if (!account) {
                throw new Error("No account connected");
            }

            const transaction = await prepareContractCall({
                contract,
                method: "function createCampaign(address _owner, string _title, string _description, uint256 _targetAmount, uint256 _deadline, string _imageUrl) returns (uint256)",
                params: [
                    String(account.address), // _owner
                    form.title, // _title
                    form.description, // _description
                    BigInt(form.target), // _targetAmount
                    BigInt(new Date(form.deadline).getTime()), // _deadline (converted to timestamp)
                    form.image // _imageUrl
                  ],
            });
            sendTransaction(transaction);
            console.log("Contract Call Success");
        } catch (error) {
            console.error("Contract Call Failure", error);
        }
    };

    const getCampaigns = () => {
        const { data, isPending, error } = useReadContract({
            contract, // Your contract object
            method: "function getCampaigns() view returns ((address owner, string title, string description, uint256 targetAmount, uint256 deadline, uint256 amountCollected, string imageUrl, address[] donators, uint256[] donations)[])",
            params: [],
        });

        // Handle loading state
        if (isPending) {
            console.log("Loading campaigns...");
            return [];
        }

        // Handle errors
        if (error) {
            console.error("Failed to fetch campaigns:", error);
            return [];
        }

        // Parse and format campaigns if data is available
        const parsedCampaigns: Campaign[] = (data || []).map((campaign: any, i: number) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.targetAmount.toString()), // Convert targetAmount to Ether
            deadline: campaign.deadline.toNumber(), // Convert deadline to a number
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()), // Convert collected amount to Ether
            image: campaign.imageUrl,
            pId: i, // Index as ID
        }));

        return parsedCampaigns;
    };

    // const getUserCampaigns = async (address: string | undefined): Promise<Campaign[]> => {
    //     if (!address) {
    //       console.error("No address connected.");
    //       return []; // Return an empty array if the wallet address is not available
    //     }
      
    //     try {
    //       const allCampaigns = await getCampaigns(); // Fetch all campaigns
      
    //       // Filter campaigns by the owner address
    //       const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);
      
    //       return filteredCampaigns; // Return the filtered campaigns
    //     } catch (error) {
    //       console.error("Error fetching user campaigns:", error);
    //       return []; // Return an empty array in case of error
    //     }
    // };

    return (
        <StateContext.Provider
            value={{
                address: account?.address,
                contract,
                createCampaign: publishCampaign,
                // getCampaigns,
                // getUserCampaigns
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);