'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ethers } from 'ethers'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

import { calculateBarPercentage, daysLeft } from '@/lib/utils'
import { Loader } from '@/components/loader'
import { CountBox } from '@/components/count-box'

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

export default function CampaignDetails() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [amount, setAmount] = useState('')
  const [donators, setDonators] = useState(mockDonators)

  const remainingDays = daysLeft(mockCampaignData.deadline.toString())

  useEffect(() => {
    // Simulating data fetching
    setDonators(mockDonators)
  }, [])

  const handleDonate = async () => {
    setIsLoading(true)
    // Simulating donation process
    await new Promise(resolve => setTimeout(resolve, 2000))
    router.push('/')
    setIsLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading && <Loader />}

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <div className="md:col-span-2">
          <Image loader={() => mockCampaignData.image} src={mockCampaignData.image} alt="campaign" width={800} height={400} className="rounded-lg object-cover w-full h-[410px]" />
          <Progress value={calculateBarPercentage(mockCampaignData.target, mockCampaignData.amountCollected)} className="mt-2" />
        </div>

        <div className="flex flex-col gap-4">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox title={`Raised of ${mockCampaignData.target} ETH`} value={mockCampaignData.amountCollected} />
          <CountBox title="Total Backers" value={donators.length} />
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
                <Image loader={() => "https://api.dicebear.com/9.x/identicon/svg?seed=" + mockCampaignData.owner} src={"https://api.dicebear.com/9.x/identicon/svg?seed=" + mockCampaignData.owner} alt="user" width={30} height={30} />
              </div>
              <div>
                <p className="font-semibold">{mockCampaignData.owner}</p>
                <p className="text-sm text-muted-foreground">10 Campaigns</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Story</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{mockCampaignData.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Donators</CardTitle>
            </CardHeader>
            <CardContent>
              {donators.length > 0 ? (
                <ul className="space-y-2">
                  {donators.map((item, index) => (
                    <li key={`${item.donator}-${index}`} className="flex justify-between items-center">
                      <span>{index + 1}. {item.donator}</span>
                      <span>{ethers.utils.formatEther(item.donation)} ETH</span>
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