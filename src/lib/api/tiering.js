// src/lib/api/tiering.js

/**
 * Fetches tiering data from the backend API
 * @param {string} token - Authentication token for the request
 * @returns {Promise} Promise that resolves to tiering data
 */
export const getTieringData = async (token) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.indopaket.co.id';
      
      const response = await fetch(`${apiUrl}/api/tiering/infoTransactionSI`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Signature': token || '', // this endpoint requires a signature token
        },
      });
  
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
  
      const data = await response.json();
      
      // Check if the API returned an error
      if (data.resultcode !== 0) {
        throw new Error(data.message || 'Failed to load tiering data');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching tiering data:', error);
      throw error;
    }
  };
  
  /**
   * Fetches tiering incentive history from the backend API
   * @param {string} token - Authentication token for the request
   * @returns {Promise} Promise that resolves to tiering incentive history
   */
  export const getTieringHistory = async (token) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.indopaket.co.id';
      
      const response = await fetch(`${apiUrl}/api/tiering/riwayatInsentifSI`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Signature': token || '', // Based on your Laravel code, this endpoint requires a signature token
        },
      });
  
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
  
      const data = await response.json();
      
      // Check if the API returned an error
      if (data.resultcode !== 0) {
        throw new Error(data.message || 'Failed to load tiering history');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching tiering history:', error);
      throw error;
    }
  };
  
  /**
   * Helper function to transform the tiering data into a more usable format if needed
   * @param {Object} apiData - Raw API response data
   * @returns {Object} Transformed data
   */
  export const transformTieringData = (apiData) => {
    if (!apiData || !apiData.data) return null;
    
    const { current_tier, list_tiering } = apiData.data;
    
    // Format the data as needed
    return {
      current_tier: {
        ...current_tier,
        // Add any additional transformations if needed
      },
      list_tiering: list_tiering.map(tier => ({
        ...tier,
        // Add any additional transformations if needed
      })),
    };
  };