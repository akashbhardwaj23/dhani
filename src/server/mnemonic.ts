"use server"
import { generateMnemonic, validateMnemonic } from "bip39"

export async function getMneumonics(){
    const mneumonicWords = generateMnemonic(128);
    return mneumonicWords.split(" ");
}

export async function validate(mneumonic : any){
    const isValid = validateMnemonic(mneumonic);
    return isValid;
}