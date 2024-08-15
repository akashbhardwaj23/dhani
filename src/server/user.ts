"use server"

import { OnBoardingTasksType } from "@/lib/types/onBoarding";
import db from "@/prisma/db"




export async function createUser(onBoardingData : OnBoardingTasksType){
    console.log(onBoardingData);
    try {
        const user = await db.account.create({
            data : {
                password : onBoardingData.password,
                mneumonic : onBoardingData.mneumonic
            
            },
        })
    
        return user
    } catch (error) {
        console.log(error)
        return error
    }
}

