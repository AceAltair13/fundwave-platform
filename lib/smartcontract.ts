import { CLIENT_ID, CONTRACT_ADDRESS } from "@/config";
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

// Create a client with your Client ID
export const client = createThirdwebClient({
    clientId: CLIENT_ID
});

// Connect to your contract
export const contract = getContract({
    client,
    chain: defineChain(11155111),
    address: CONTRACT_ADDRESS
});