"use server"

import { OnBoardingTasksType } from "@/lib/types/onBoarding";
import db from "@/prisma/db"




export async function createUser(onBoardingData : OnBoardingTasksType){
    console.log(onBoardingData);
    // check if the user exists




    const user = await db.account.create({
        data : {
            password : onBoardingData.password,
            mneumonic : onBoardingData.mneumonic
        
        },
    })

    return user
}

