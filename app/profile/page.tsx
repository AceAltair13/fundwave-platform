'use client';

import DisplayCampaigns from '@/components/display-campaigns';
import campaigns from '@/constants/example-campaigns';
import { useRouter } from 'next/navigation';


export default function Profile() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/`);
  };

  return (
    <DisplayCampaigns title="Your Available Campaigns" campaigns={campaigns} />
  )
}
