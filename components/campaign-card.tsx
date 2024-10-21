import Image from 'next/image'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tag } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'

interface CampaignCardProps {
    owner: string
    title: string
    description: string
    target: string
    deadline: number
    amountCollected: string
    image: string
    handleClick: () => void
}

export default function CampaignCard({
    owner,
    title,
    description,
    target,
    deadline,
    amountCollected,
    image,
    handleClick
}: CampaignCardProps) {
    const remainingDays = Math.ceil((deadline - Date.now()) / (1000 * 60 * 60 * 24))

    return (
        <Card className="w-full sm:w-[288px] cursor-pointer" onClick={handleClick}>
            <CardHeader className="p-0">
                <Image
                    loader={() => image}
                    src={image}
                    alt="fund"
                    width={288}
                    height={158}
                    className="w-full h-[158px] object-cover rounded-t-lg"
                />
            </CardHeader>
            <CardContent className="p-4">
                <div className="flex items-center mb-4">
                    <Tag className="w-4 h-4 mr-2" />
                    <Badge variant="secondary">Education</Badge>
                </div>

                <h3 className="text-lg font-semibold leading-tight mb-2 truncate">{title}</h3>
                <p className="text-sm text-muted-foreground mb-4 truncate">{description}</p>

                <div className="flex justify-between mb-4">
                    <div>
                        <p className="text-sm font-semibold">{amountCollected}</p>
                        <p className="text-xs text-muted-foreground">Raised of {target}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">{remainingDays}</p>
                        <p className="text-xs text-muted-foreground">Days Left</p>
                    </div>
                </div>

                <Progress value={parseFloat(amountCollected) / parseFloat(target) * 100} className="mb-4" />

                <div className="flex items-center">
                    <Avatar className='w-6 h-6 mr-2'>
                        <AvatarImage src={`https://api.dicebear.com/9.x/identicon/svg?seed=${owner}`} alt="User Avatar" />
                        <AvatarFallback>0x</AvatarFallback>
                    </Avatar>
                    <p className="text-xs text-muted-foreground truncate">
                        by <span className="font-semibold">{owner}</span>
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}