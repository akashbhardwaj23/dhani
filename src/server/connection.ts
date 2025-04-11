import { clusterApiUrl, Connection } from "@solana/web3.js";
import { ethers } from "ethers";


export const connection = new Connection(clusterApiUrl("devnet"), "confirmed");


export const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/UFGgLKBW2zCyPSxSjG5oRf9jRdWsyWB4");