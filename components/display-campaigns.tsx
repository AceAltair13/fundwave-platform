'use client';

import CampaignCard from '@/components/campaign-card';
import { Campaign } from '@/constants/example-campaigns';

interface DisplayCampaignsProps {
    title: string;
    campaigns: Campaign[];
}

const DisplayCampaigns: React.FC<DisplayCampaignsProps> = ({ title, campaigns }) => {
    return (
        <>
            <h1 className="text-xl font-semibold">{title} ({campaigns.length})</h1>
            <div className="mt-5 flex flex-wrap gap-5">
                {campaigns.map((campaign, index) => (
                    <CampaignCard
                        key={index}
                        index={index}
                        owner={campaign.owner}
                        title={campaign.title}
                        description={campaign.description}
                        target={campaign.target}
                        deadline={campaign.deadline}
                        amountCollected={campaign.amountCollected}
                        image={campaign.image}
                    />
                ))}
            </div>
        </>
    );
};

export default DisplayCampaigns;
