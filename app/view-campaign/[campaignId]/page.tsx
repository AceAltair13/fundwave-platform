'use client'

import { ethers } from 'ethers'
import Image from 'next/image'
import { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

import { CountBox } from '@/components/count-box'
import { calculateBarPercentage, daysLeft } from '@/lib/utils'
import { useActiveAccount, useReadContract } from 'thirdweb/react'

import { Skeleton } from '@/components/ui/skeleton'
import { contract } from '@/lib/smartcontract'

import { Loader } from '@/components/loader'
import { redirect, useRouter } from 'next/navigation'
import { prepareContractCall, sendTransaction } from "thirdweb"
import { Backers, Donators, OwnerCard } from './components'

const nullCampaignData = [
  "0x0000000000000000000000000000000000000000", // Address [0]
  "", // Title [1]
  "", // Description [2]
  BigInt(0), // Target Amount [3]
  BigInt(0), // Deadline [4]
  BigInt(0), // Amount Collected [5]
  "" // Image URL [6]
]

export default function CampaignDetails({ params }: { params: { campaignId: number } }) {

  if (isNaN(params.campaignId) || params.campaignId < 0) {
    redirect('/'); // Redirect to home if campaignId is invalid
  }

  const { data, isPending } = useReadContract({
    contract,
    method: "function campaigns(uint256) view returns (address owner, string title, string description, uint256 targetAmount, uint256 deadline, uint256 amountCollected, string imageUrl)",
    params: [BigInt(params.campaignId)],
  });

  if (data && data[0] === nullCampaignData[0]) {
    redirect('/'); // Redirect to home if campaign does not exist
  }

  const [amount, setAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const account = useActiveAccount();
  const router = useRouter();

  const remainingDays = data ? daysLeft(Number(data[4])) : 0;

  const handleDonate = async () => {
    setIsLoading(true)

    if (amount === '' || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      setIsLoading(false)
      return;
    }

    if (!account) {
      alert("Please connect your wallet");
      setIsLoading(false)
      return;
    }

    try {
      const transaction = prepareContractCall({
        contract,
        method: "function donateCampaign(uint256 _id) payable",
        params: [BigInt(params.campaignId)],
        value: ethers.utils.parseEther(amount).toBigInt()
      });

      const { transactionHash } = await sendTransaction({
        transaction,
        account
      });

      if (!transactionHash) {
        throw new Error("Transaction failed");
      }

      setTimeout(() => {
        console.log("Transaction Hash:", transactionHash);
        setIsLoading(false)
        router.push("/"); // Redirect to home after donation
      }, 6000)
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed. Please try again.");
      setIsLoading(false)
    }
  }

  if (isPending) {
    return (
      <div className="container mx-auto px-4 pb-8">
        <div className="w-full flex md:flex-row flex-col mt-10 gap-8">
          <Skeleton className="w-full h-[410px] rounded-lg" />
          <div className="flex flex-col gap-4">
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-6 mt-12">
          <div className="lg:col-span-2 space-y-8">
            <Skeleton className="w-full h-24" />
            <Skeleton className="w-full h-24" />
            <Skeleton className="w-full h-24" />
          </div>
          <div>
            <Skeleton className="w-full h-96" />
          </div>
        </div>
      </div>
    )
  }

  return (data && (
    <div className="container mx-auto px-4 pb-8">
      {isLoading && <Loader />}
      <div className="w-full flex md:flex-row flex-col mt-10 gap-8">
        <div className="flex-1 flex-col">
          <Image loader={() => data[6]} src={data[6]} alt="campaign" width={800} height={400} className="rounded-lg object-cover w-full h-[410px]" />
          <Progress value={calculateBarPercentage(Number(data[3]), Number(data[5]))} className="mt-2" />
        </div>

        <div className="flex flex-col gap-4">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox title={`Raised of ${ethers.utils.formatEther(data[3])} ETH`} value={ethers.utils.formatEther(data[5])} />
          <Backers _id={params.campaignId} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-12">
        <div className="lg:col-span-2 space-y-8">
          <OwnerCard owner={data[0]} />

          <Card>
            <CardHeader>
              <CardTitle>Story</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{data[2]}</p>
            </CardContent>
          </Card>

          <Donators _id={params.campaignId} />
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Fund</CardTitle>
              <CardDescription>Fund the campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mb-4"
              />
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>Back it because you believe in it.</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Support the project for no reward, just because it speaks to you.</p>
                </CardContent>
              </Card>
              <Button onClick={handleDonate} className="w-full">
                Fund Campaign
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  ))
}