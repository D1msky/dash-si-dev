// src/lib/assetUtils.js

/**
 * Formats asset URLs to properly handle cloud storage paths
 * @param {string} assetPath - Relative path to the asset
 * @returns {string} Formatted URL with proper base and path
 */
export const getAssetUrl = (assetPath) => {
  // Base URL for assets stored in S3
  const baseUrl = process.env.NEXT_PUBLIC_STORAGE_URL || 'https://storage-indopaket.s3.ap-southeast-1.amazonaws.com';
  const assetsPath = process.env.NEXT_PUBLIC_ASSETS_PATH || '/uploads/assets-dev/';
  
  // If assetPath already includes the base URL, return as is
  if (assetPath && assetPath.startsWith('http')) {
    return assetPath;
  }

  // If assetPath is empty or undefined, return a default icon
  if (!assetPath) {
    return `${baseUrl}${assetsPath}tiering/PKT%20BRONZE.avif`;
  }
  
  // If assetPath already includes the assets path, don't add it again
  if (assetPath.includes(assetsPath)) {
    return `${baseUrl}${assetPath}`;
  }
  
  // Otherwise, join the base URL, assets path, and the asset path
  return `${baseUrl}${assetsPath}${assetPath}`;
};

/**
 * Generates a gradient style string based on tier colors
 * @param {string} startColor - Starting color for the gradient
 * @param {string} endColor - Ending color for the gradient
 * @returns {string} CSS gradient string
 */
export const getTierGradient = (startColor, endColor) => {
  return `linear-gradient(to right, ${startColor || '#744526'}, ${endColor || '#EEA571'})`;
};

/**
 * Ensures proper fallback handling for tier icons
 * @param {Object} tier - Tier object with icon property
 * @returns {string} URL for the tier icon with proper fallback
 */
export const getTierIcon = (tier) => {
  // Default icons based on tier name
  const defaultIcons = {
    'Bronze': 'tiering/PKT%20BRONZE.avif',
    'Silver': 'tiering/PKT%20SILVER.avif',
    'Gold': 'tiering/PKT%20GOLD.avif',
    'Platinum': 'tiering/PKT%20PLATINUM.avif',
    'Diamond': 'tiering/PKT%20DIAMOND.avif',
  };
  
  // If tier has an icon, use it
  if (tier && tier.icon) {
    return getAssetUrl(tier.icon);
  }
  
  // If tier has a name, try to find a matching default icon
  if (tier && tier.tier_name && defaultIcons[tier.tier_name]) {
    return getAssetUrl(defaultIcons[tier.tier_name]);
  }
  
  // Otherwise use Bronze as default
  return getAssetUrl(defaultIcons.Bronze);
};