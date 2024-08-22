import { useState } from "react";
import { SignIn } from "../account/auth/Signin";
import { OnBoardingTasks } from "../onboarding/OnBoardingTasks";


export type PageType = "signin" | "onBoarding"

export function WelcomePage(){
    const [page, setPage] = useState<PageType>("signin");
    return (
        <>
        {
            page === "signin" ? <SignIn setPage={setPage} /> : <OnBoardingTasks />
        }
        </>
    )
}