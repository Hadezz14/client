import React from 'react'
import { getRsToPoundConversionrate } from '../features/currency/currencyService'

export const ConvertToPound = async (nepaliRupeesAmount) => {
    try {
        const conversionRate = await getRsToPoundConversionrate();
        // const conversionRate = 0.006031;
        
        if(typeof nepaliRupeesAmount !== "number" || isNaN(nepaliRupeesAmount)){
            new Error("Invalid input");
        }

        const poundsAmount = nepaliRupeesAmount * conversionRate;
        const roundedPounds = Math.round(poundsAmount *100)/100;
        console.log(roundedPounds);
        return roundedPounds;
        
    } catch (error) {
        throw error;
    }

}
