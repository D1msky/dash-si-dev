// src/lib/formatters.js

/**
 * Formats a number as currency
 * @param {number|string} amount - The amount to format
 * @param {string} currency - Currency code (e.g., 'IDR', 'USD')
 * @param {string} locale - Locale for formatting (defaults to 'id-ID')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'IDR', locale = 'id-ID') => {
    // Parse string to number if needed
    const numericAmount = typeof amount === 'string' 
      ? parseFloat(amount.replace(/[^\d.-]/g, '')) 
      : amount;
  
    // Handle special cases
    if (isNaN(numericAmount)) return `${currency} 0`;
    
    // Default format
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(numericAmount);
    } catch (error) {
      // Fallback for browsers with limited Intl support
      return `${currency} ${numericAmount.toLocaleString(locale)}`;
    }
  };
  
  /**
   * Formats a date string
   * @param {string|Date} dateString - Date to format
   * @param {Object} options - Intl.DateTimeFormat options
   * @returns {string} Formatted date string
   */
  export const formatDate = (dateString, options = {}) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) return '';
    
    // Default options
    const defaultOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      ...options
    };
    
    return date.toLocaleDateString('id-ID', defaultOptions);
  };
  
  /**
   * Formats a number with thousand separators
   * @param {number|string} number - Number to format
   * @param {number} decimals - Number of decimal places
   * @returns {string} Formatted number
   */
  export const formatNumber = (number, decimals = 0) => {
    const numericValue = typeof number === 'string' 
      ? parseFloat(number.replace(/[^\d.-]/g, ''))
      : number;
      
    if (isNaN(numericValue)) return '0';
    
    return numericValue.toLocaleString('id-ID', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };
  
  /**
   * Parses a formatted currency string back to a number
   * @param {string} formattedValue - Formatted currency string
   * @returns {number} Numeric value
   */
  export const parseCurrencyToNumber = (formattedValue) => {
    if (!formattedValue) return 0;
    
    // Remove currency symbol, thousand separators, and other non-numeric characters
    const numericString = formattedValue.replace(/[^\d.-]/g, '');
    return parseFloat(numericString) || 0;
  };