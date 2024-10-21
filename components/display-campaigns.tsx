'use client';

import { useRouter } from 'next/navigation';
import CampaignCard from '@/components/campaign-card';
import _campaigns, { Campaign } from '@/constants/example-campaigns';
import { Skeleton } from './ui/skeleton';

interface DisplayCampaignsProps {
    title: string;
    campaigns: Campaign[];
}

const DisplayCampaigns: React.FC<DisplayCampaignsProps> = ({ title, campaigns }) => {
    const router = useRouter();

    const handleNavigate = () => {
        router.push(`/`);
    };

    return (
        <div>
            <h1 className="text-xl font-semibold">{title} ({campaigns.length})</h1>

            <div className="mt-5 flex flex-wrap gap-5">

                {campaigns.map((campaign, index) => (
                    <CampaignCard
                        key={index}
                        owner={campaign.owner}
                        title={campaign.title}
                        description={campaign.description}
                        target={campaign.target}
                        deadline={campaign.deadline}
                        amountCollected={campaign.amountCollected}
                        image={campaign.image}
                        handleClick={campaign.handleClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default DisplayCampaigns;
