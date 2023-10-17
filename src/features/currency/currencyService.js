
import axios from 'axios';
import React from 'react'

const API_KEY = "4203ccb753363c94e8063641";
let conversionRate = null;

export const getRsToPoundConversionrate = async () => {
  try {
    if(conversionRate!== null) {
      return conversionRate;
    }
      const response = await  axios.get(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/GBP`
      );
      
    conversionRate = response.data.conversion_rates.NPR;
   return conversionRate;
  } catch (error) {
    console.error("Error fetching converison rate:", error)
    throw error
  }
}

