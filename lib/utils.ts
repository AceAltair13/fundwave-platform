import { Campaign } from "@/constants/example-campaigns";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ethers } from "ethers"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateBarPercentage(target: number, amountCollected: number): number {
  const percentage = (amountCollected / target) * 100;
  return Math.min(percentage, 100); // Ensure the percentage doesn't exceed 100
}

export function daysLeft(deadline: string): number {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  return remainingDays > 0 ? Math.ceil(remainingDays) : 0;
}

export function getParsedCampaigns(data: any[],): Campaign[] {
  return (data || []).map((campaign: any, i: number) => ({
    owner: campaign.owner,
    title: campaign.title,
    description: campaign.description,
    target: ethers.utils.formatEther(campaign.targetAmount.toString()), // Convert targetAmount to Ether
    deadline: Number(campaign.deadline), // Convert deadline to a number
    amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()), // Convert collected amount to Ether
    image: campaign.imageUrl,
    handleClick: () => { },
    pId: i, // Index as ID
  }));
}