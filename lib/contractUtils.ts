import { contract } from "@/lib/smartcontract";
import { ethers } from "ethers";
import { prepareContractCall, sendTransaction } from "thirdweb";

// Define the CreateCampaignForm interface
interface CreateCampaignForm {
    name: string;
    title: string;
    description: string;
    target: string;
    deadline: string;
    image: string;
}

// Create a new campaign
export async function createCampaign({ form, account, _contract }: {
    form: CreateCampaignForm;
    account: any;
    _contract: typeof contract;
}) {
    // Sending transaction to the contract
    const transaction = prepareContractCall({
        contract: _contract,
        method: "function createCampaign(address _owner, string _title, string _description, uint256 _targetAmount, uint256 _deadline, string _imageUrl) returns (uint256)",
        params: [
            String(account.address), // _owner
            form.title, // _title
            form.description, // _description
            BigInt(ethers.utils.parseUnits(form.target, 18).toString()), // _targetAmount
            BigInt(new Date(form.deadline).getTime()), // _deadline (converted to timestamp)
            form.image // _imageUrl
        ],
    });
    const { transactionHash } = await sendTransaction({
        transaction,
        account
    });
    console.log("Campaign Creation Success! Transaction Hash:", transactionHash);
}