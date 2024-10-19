'use client';

import { useRouter } from 'next/navigation';
import _campaigns from '@/constants/example-campaigns';
import DisplayCampaigns from '@/components/display-campaigns';


export default function Home() {

  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/`);
  };

  return (
    <DisplayCampaigns title='All Available Campaigns' campaigns={_campaigns} isLoading={false} />
  );
};

