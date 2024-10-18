'use client';

import { useRouter } from 'next/navigation';
import CampaignCard from '@/components/campaign-card';
import _campaigns, { Campaign } from '@/constants/example-campaigns';

interface DisplayCampaignsProps {
  title: string;
  isLoading: boolean;
  campaigns: Campaign[];
}

const Profile: React.FC<DisplayCampaignsProps> = ({ title, isLoading, campaigns }) => {
  const router = useRouter();
  campaigns = _campaigns;

  const handleNavigate = () => {
    router.push(`/`);
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">{title} ({campaigns.length})</h1>

      <div className="mt-5 flex flex-wrap gap-5">
        {isLoading && (
          <p className="text-md font-semibold text-gray-500">Loading...</p>
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="text-md font-semibold text-gray-500">
            You have not created any campaigns yet.
          </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign, index) => (
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

export default Profile;
