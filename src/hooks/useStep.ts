import { useState } from "react";

export function useStep(){
    const [step, setStep] = useState(0);
    const nextStep = () => setStep(step + 1);

    const prevStep = () => setStep((s) => {
        if(s > 0){
         return s--;
        }
        return s;
    });

    return {
        step, 
        setStep,
        nextStep,
        prevStep
    }
}