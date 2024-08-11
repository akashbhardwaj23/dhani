"use client"
import {atom, RecoilRoot} from "recoil"



export const Wallet = atom

export function RecoilLayout({
    children
}: {
    children : React.ReactNode
}){
    return (
        <RecoilRoot>
            {children}
        </RecoilRoot>
    )
}