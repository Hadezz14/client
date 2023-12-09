import axios from "axios";
import React from "react";

const API_KEY = "d5c15adc492ec0b57507fe4a";
let conversionRate = null;

export const getRsToPoundConversionrate = async () => {
  try {
    if (conversionRate === null) {
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/GBP`
      );
      conversionRate = response.data.conversion_rates.NPR;
    }
    return conversionRate;
  } catch (error) {
    console.error("Error fetching converison rate:", error);
    throw error;
  }
};
