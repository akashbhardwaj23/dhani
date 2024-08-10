import React from "react";


export function PrimaryButton({
    children,
    onClick,
    className1
}: {
    children : React.ReactNode,
    onClick : () => void,
    className1? : string
}){

    return (
        <button className={`${className1} p-4 rounded-md mb-2`} onClick={onClick}>
            {children}
        </button>
    )
}