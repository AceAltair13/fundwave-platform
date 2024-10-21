'use client'

import { ethers } from 'ethers'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

import { CountBox } from '@/components/count-box'
import { calculateBarPercentage, daysLeft } from '@/lib/utils'
import { useReadContract } from 'thirdweb/react'

import { Skeleton } from '@/components/ui/skeleton'
import { contract } from '@/lib/smartcontract'

// Mocking the data that would normally come from context or props
const mockCampaignData = {
  pId: '1',
  owner: '0x1234...5678',
  title: 'Example Campaign',
  description: 'This is an example campaign description.',
  target: 1.5,
  deadline: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days from now
  amountCollected: 0.5,
  image: 'https://picsum.photos/seed/picsum/536/354',
}

const mockDonators = [
  { donator: '0xabcd...efgh', donation: ethers.utils.parseEther('10') },
  { donator: '0x9876...5432', donation: ethers.utils.parseEther('5') },
]

export default function CampaignDetails({ params }: { params: { campaignId: number } }) {

  if (isNaN(params.campaignId)) {
    redirect('/'); // Redirect if campaignId is not a number
  }

  const { data, isPending } = useReadContract({
    contract,
    method: "function getCampaigns() view returns ((address owner, string title, string description, uint256 targetAmount, uint256 deadline, uint256 amountCollected, string imageUrl, address[] donators, uint256[] donations)[])",
    params: []
  });


  const currentCampaign = data ? data[params.campaignId] : null;

  if (data && params.campaignId >= data.length) {
    redirect('/'); // Redirect if campaignId is out of bounds
  }

  const [isLoading, setIsLoading] = useState(false)
  const [amount, setAmount] = useState('')

  const remainingDays = daysLeft(Number(currentCampaign?.deadline ?? 0))

  const handleDonate = async () => {
    setIsLoading(true)
    // Simulate a donation process
    setIsLoading(false)
  }

  const getCountOfUserCampaigns = (owner: string | undefined) => {
    var i = 0;
    if (!data) return 0;
    for (const campaign of data) {
      if (campaign.owner === owner) {
        i++;
      }
    }
    return i;
  }

  if (isPending) {
    return (
      <div className="container mx-auto px-4 py-8">
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

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="w-full flex md:flex-row flex-col mt-10 gap-8">
        <div className="flex-1 flex-col">
          <Image loader={() => currentCampaign?.imageUrl || mockCampaignData.image} src={currentCampaign?.imageUrl || mockCampaignData.image} alt="campaign" width={800} height={400} className="rounded-lg object-cover w-full h-[410px]" />
          <Progress value={calculateBarPercentage(Number(currentCampaign?.targetAmount), Number(currentCampaign?.amountCollected))} className="mt-2" />
        </div>

        <div className="flex flex-col gap-4">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox title={`Raised of ${currentCampaign?.targetAmount ? ethers.utils.formatEther(currentCampaign.targetAmount) : '0'} ETH`} value={ethers.utils.formatEther(currentCampaign?.amountCollected ?? 0)} />
          <CountBox title="Total Backers" value={currentCampaign ? currentCampaign.donators.length : 0} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-12">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Creator</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <Image loader={() => "https://api.dicebear.com/9.x/identicon/svg?seed=" + currentCampaign?.owner} src={"https://api.dicebear.com/9.x/identicon/svg?seed=" + currentCampaign?.owner} alt="user" width={30} height={30} />
              </div>
              <div>
                <p className="font-semibold">{currentCampaign?.owner}</p>
                <p className="text-sm text-muted-foreground">{`${getCountOfUserCampaigns(currentCampaign?.owner)} Campaigns`}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Story</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{currentCampaign?.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Donators</CardTitle>
            </CardHeader>
            <CardContent>
              {currentCampaign && currentCampaign.donators.length > 0 ? (
                <ul className="space-y-2">
                  {currentCampaign.donators.map((_donator, index) => (
                    <li key={`${_donator}-${index}`} className="flex justify-between items-center">
                      <span>{index + 1}. {_donator}</span>
                      <span>{ethers.utils.formatEther(currentCampaign.donations[index])} ETH</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No donators yet. Be the first one!</p>
              )}
            </CardContent>
          </Card>
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
  )
}