'use client';

import DisplayCampaigns from '@/components/display-campaigns';
import FetchCampaignSkeleton from '@/components/fetch-campaigns-skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { contract } from '@/lib/smartcontract';
import { getParsedCampaigns } from '@/lib/utils';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useActiveAccount, useReadContract } from 'thirdweb/react';

export default function Profile() {
  const account = useActiveAccount();

  const { data, isPending } = useReadContract({
    contract,
    method: "function getCampaigns() view returns ((address owner, string title, string description, uint256 targetAmount, uint256 deadline, uint256 amountCollected, string imageUrl, address[] donators, uint256[] donations)[])",
    params: []
  });

  const DisplayCampaignSkeleton = () => (
    <>
      <h1 className="text-xl font-semibold">Fetching Your Campaigns...</h1>
      <FetchCampaignSkeleton />
    </>
  );

  if (!account && !isPending) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired or you have not logged into a wallet. Please log in again.
        </AlertDescription>
      </Alert>
    );
  }

  const filteredCampaigns = data?.filter((campaign: any) => campaign.owner === account?.address) || [];

  return (
    <>
      {isPending && !data && <DisplayCampaignSkeleton />}
      {data && (
        <DisplayCampaigns
          title="Your Campaigns"
          campaigns={getParsedCampaigns(filteredCampaigns)}
        />
      )}
    </>
  );
}
