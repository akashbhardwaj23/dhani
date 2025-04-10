"use client"

import { useState } from "react";
import { SignIn } from "../account/auth/Signin";
import { OnBoardingTasks } from "../onboarding/OnBoardingTasks";
import { useStoreContext } from "@/lib/utils/store/context";
import { LoadWalletsData } from "../account/LoadWallets";


export type PageType = "signin" | "onBoarding"

export function WelcomePage(){
    const [page, setPage] = useState<PageType>("signin");
    const { email, userId } = useStoreContext()
    console.log(email, userId)

    return (
        <>
        {
            userId && email ? <LoadWalletsData email={email} /> : (
                <>
                    {
                        page === "signin"  ? <SignIn setPage={setPage} /> : <OnBoardingTasks />
                    }
                </>
            )
        }
        </>
    )
}