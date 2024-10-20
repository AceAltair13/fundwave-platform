'use client';

import _campaigns from '@/constants/example-campaigns';
import DisplayCampaigns from '@/components/display-campaigns';
import { useReadContract } from 'thirdweb/react';
import { contract } from '@/lib/smartcontract';
import { getParsedCampaigns } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {

  const { data, isPending } = useReadContract({
    contract,
    method: "function getCampaigns() view returns ((address owner, string title, string description, uint256 targetAmount, uint256 deadline, uint256 amountCollected, string imageUrl, address[] donators, uint256[] donations)[])",
    params: []
  });

  const DisplayCampaignSkeleton = () => {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <>
      {!data && isPending && <DisplayCampaignSkeleton />}
      {data && <DisplayCampaigns title='All Available Campaigns' campaigns={getParsedCampaigns([...data])} />}
    </>
  );
};

