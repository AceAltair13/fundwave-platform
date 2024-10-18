import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Assuming these utility functions are still needed and have been converted to TypeScript
import { calculateBarPercentage, daysLeft } from '@/utils/utils'

// Mock data to replace fetched data
const mockCampaignData = {
  id: '1',
  owner: '0x1234...5678',
  title: 'Example Campaign',
  description: 'This is an example campaign description.',
  target: 100,
  deadline: '2023-12-31',
  amountCollected: 50,
  image: '/placeholder.svg',
}

const mockDonators = [
  { donator: '0xabcd...efgh', donation: '5 ETH' },
  { donator: '0x9876...5432', donation: '3 ETH' },
]

interface CountBoxProps {
  title: string
  value: string | number
}

const CountBox: React.FC<CountBoxProps> = ({ title, value }) => {
  return (
    <Card className="w-[150px]">
      <CardHeader className="p-3">
        <CardTitle className="text-2xl text-center truncate">{value}</CardTitle>
      </CardHeader>
      <CardContent className="p-2 bg-muted">
        <p className="text-sm text-center">{title}</p>
      </CardContent>
    </Card>
  )
}

export default function CampaignDetails() {
  const [amount, setAmount] = useState('')

  const remainingDays = daysLeft(mockCampaignData.deadline)

  const handleDonate = async () => {
    // Implement donation logic here
    console.log(`Donating ${amount} ETH`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <Image 
            src={mockCampaignData.image} 
            alt="campaign" 
            width={800} 
            height={400} 
            className="rounded-lg object-cover w-full h-[410px]"
          />
          <Progress 
            value={calculateBarPercentage(mockCampaignData.target, mockCampaignData.amountCollected)} 
            className="mt-2"
          />
        </div>
        <div className="flex flex-col justify-between gap-4">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox title={`Raised of ${mockCampaignData.target}`} value={mockCampaignData.amountCollected} />
          <CountBox title="Total Backers" value={mockDonators.length} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Creator</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <Image src="/thirdweb.png" alt="user" width={30} height={30} />
              </div>
              <div>
                <h4 className="font-semibold">{mockCampaignData.owner}</h4>
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
              {mockDonators.length > 0 ? (
                mockDonators.map((item, index) => (
                  <div key={index} className="flex justify-between items-center gap-4 mb-2">
                    <p className="text-sm">{index + 1}. {item.donator}</p>
                    <p className="text-sm text-muted-foreground">{item.donation}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No donators yet. Be the first one!</p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Fund</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-4">Fund the campaign</p>
            <Input 
              type="number"
              placeholder="ETH 0.1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mb-4"
            />
            <Card className="mb-4">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">Back it because you believe in it.</h4>
                <p className="text-sm text-muted-foreground">Support the project for no reward, just because it speaks to you.</p>
              </CardContent>
            </Card>
            <Button onClick={handleDonate} className="w-full">
              Fund Campaign
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}