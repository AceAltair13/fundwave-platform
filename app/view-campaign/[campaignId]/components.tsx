import { CountBox } from "@/components/count-box";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { contract } from "@/lib/smartcontract";
import { ethers } from "ethers";
import Image from "next/image";
import { useReadContract } from "thirdweb/react";

export function Backers({ _id }: { _id: number }) {
    // Fetch the donators for the selected campaign
    const { data } = useReadContract({
        contract,
        method: "function getDonators(uint256 _id) view returns (address[], uint256[])",
        params: [BigInt(_id)],
    });

    const backerCount = data ? data[0].length : 0;

    return (
        data && <CountBox title="Total Backers" value={backerCount} />
    );
}

export function Donators({ _id }: { _id: number }) {
    // Fetch the donators for the selected campaign
    const { data } = useReadContract({
        contract,
        method: "function getDonators(uint256 _id) view returns (address[], uint256[])",
        params: [BigInt(_id)],
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Donators</CardTitle>
            </CardHeader>
            <CardContent>
                {data && data[0].length > 0 ? (
                    <ul className="space-y-2">
                        {data[0].map((donator: string, index: number) => (
                            <li key={`${donator}-${index}`} className="flex justify-between items-center">
                                <span>{index + 1}. {donator}</span>
                                <span>{ethers.utils.formatEther(data[1][index])} ETH</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No donators yet. Be the first one!</p>
                )}
            </CardContent>
        </Card>
    );
}

export function OwnerCard({ owner }: { owner: string }) {
    // Fetch campaigns for the current owner
    const { data } = useReadContract({
        contract,
        method: "function getCampaigns() view returns ((address owner, string title, string description, uint256 targetAmount, uint256 deadline, uint256 amountCollected, string imageUrl, address[] donators, uint256[] donations)[])",
        params: [],
    });

    const ownerCampaignCount = data ? data.filter((campaign: any) => campaign.owner === owner).length : 0;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Creator</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                    <Image
                        loader={() => `https://api.dicebear.com/9.x/identicon/svg?seed=${owner}`}
                        src={`https://api.dicebear.com/9.x/identicon/svg?seed=${owner}`}
                        alt="user"
                        width={30}
                        height={30}
                    />
                </div>
                <div>
                    <p className="font-semibold">{owner}</p>
                    <p className="text-sm text-muted-foreground">{`${ownerCampaignCount} Campaigns`}</p>
                </div>
            </CardContent>
        </Card>
    );
}
