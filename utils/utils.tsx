/**
 * Calculates the percentage of the target amount that has been collected.
 * @param target The target amount to be collected.
 * @param amountCollected The amount that has been collected so far.
 * @returns A number between 0 and 100 representing the percentage of the target that has been collected.
 */
export function calculateBarPercentage(target: number, amountCollected: number): number {
    const percentage = (amountCollected / target) * 100;
    return Math.min(percentage, 100); // Ensure the percentage doesn't exceed 100
  }
  
  /**
   * Calculates the number of days left until the deadline.
   * @param deadline The deadline date as a string in ISO format (YYYY-MM-DD).
   * @returns The number of days left until the deadline. Returns 0 if the deadline has passed.
   */
  export function daysLeft(deadline: string): number {
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);
  
    return remainingDays > 0 ? Math.ceil(remainingDays) : 0;
  }
  
  /**
   * Formats a date string to a more readable format.
   * @param date The date string in ISO format (YYYY-MM-DD).
   * @returns A formatted date string (e.g., "Jan 1, 2023").
   */
  export function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  
  /**
   * Truncates an Ethereum address to a shorter format.
   * @param address The full Ethereum address.
   * @returns A truncated version of the address (e.g., "0x1234...5678").
   */
  export function truncateEthAddress(address: string): string {
    if (address.length <= 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }