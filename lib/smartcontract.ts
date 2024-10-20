import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

// Create a client with your Client ID
export const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID || ""
});

// Connect to your contract
export const contract = getContract({
    client,
    chain: defineChain(11155111),
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ""
});