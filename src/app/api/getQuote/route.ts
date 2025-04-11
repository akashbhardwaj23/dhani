import axios from "axios";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req : NextRequest, res : NextResponse){
    const {fromTokenAddress, toTokenAddress, amount, chainId} = await req.json();

    console.log(fromTokenAddress, toTokenAddress)

    const response = await axios.get(`https://api.1inch.io/v5.0/${chainId}/quote?fromTokenAddress=${fromTokenAddress}&toTokenAddress=${toTokenAddress}&amount=${amount}`)

    console.log(response.data)
    if (response.data && response.data.toTokenAmount) {
        const amountOut = response.data.toTokenAmount;
        console.log(`Estimated Output Amount: ${amountOut}`);

        return NextResponse.json({
            amountOut
        })
      } else {
        console.log("No quote found.");
        return null;
      }
}