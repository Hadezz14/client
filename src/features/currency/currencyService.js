
import axios from 'axios';
import React from 'react'

const API_KEY = "4203ccb753363c94e8063641";

export const getRsToPoundConversionrate = async () => {
  try {
   const response = await  axios.get(
   `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/NPR`
   );
   const rate = response.data.conversion_rates.GBP;
   return rate;
  } catch (error) {
    console.error("Error fetching converison rate:", error)
    throw error
  }
}

