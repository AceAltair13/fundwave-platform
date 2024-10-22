'use client';

import DisplayCampaigns from '@/components/display-campaigns';
import FetchCampaignSkeleton from '@/components/fetch-campaigns-skeleton';
import { contract } from '@/lib/smartcontract';
import { getParsedCampaigns } from '@/lib/utils';
import { useReadContract } from 'thirdweb/react';

export default function Home() {
  const { data, isPending } = useReadContract({
    contract,
    method: "function getCampaigns() view returns ((address owner, string title, string description, uint256 targetAmount, uint256 deadline, uint256 amountCollected, string imageUrl, address[] donators, uint256[] donations)[])",
    params: []
  });

  const DisplayCampaignSkeleton = () => (
    <>
      <h1 className="text-xl font-semibold">Fetching All Campaigns...</h1>
      <FetchCampaignSkeleton />
    </>
  );

  const campaignData = data ? getParsedCampaigns([...data]) : [];

  return (
    <>
      {isPending && !data && <DisplayCampaignSkeleton />}
      {data && <DisplayCampaigns title="All Available Campaigns" campaigns={campaignData} />}
    </>
  );
}
