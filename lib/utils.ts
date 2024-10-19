import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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