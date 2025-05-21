// src/providers/AntDesignThemeProvider.js
import React from 'react';
import { ConfigProvider } from 'antd';

// This component will override Ant Design's theme with your Tailwind colors
const AntDesignThemeProvider = ({ children }) => {
  // Define colors directly from your Tailwind config values
  // This avoids the need to import and resolve the Tailwind config
  const colors = {
    primary: {
      DEFAULT: '#0c74bc',
      foreground: '#eef8ff',
      shade: '#006398',
      dark: '#004b74'
    },
    secondary: {
      DEFAULT: '#009ec8',
      foreground: '#e8f6ff',
      dark: '#006686'
    },
    tertiary: {
      DEFAULT: '#d1303a',
      foreground: '#ffdad8',
      dark: '#b81c2b'
    },
    success: {
      light: '#96e28c',
      DEFAULT: '#3FA244'
    },
    info: {
      light: '#6de1f0',
      DEFAULT: '#299FD1'
    },
    warning: {
      light: '#fac664',
      DEFAULT: '#ef8801'
    },
    error: {
      light: '#ec8574',
      DEFAULT: '#c81a23'
    }
  };

  // Define Ant Design theme with Tailwind colors
  const theme = {
    token: {
      // Map your Tailwind primary colors to Ant Design token system
      colorPrimary: colors.primary.DEFAULT,
      colorPrimaryHover: colors.primary.shade,
      colorPrimaryActive: colors.primary.dark,
      colorPrimaryText: colors.primary.DEFAULT,
      colorPrimaryTextHover: colors.primary.shade,
      colorPrimaryTextActive: colors.primary.dark,
      colorPrimaryBg: colors.primary.foreground,
      colorPrimaryBgHover: colors.primary.foreground,
      colorPrimaryBorder: colors.primary.DEFAULT,
      colorPrimaryBorderHover: colors.primary.shade,
      
      // Info color variants
      colorInfo: colors.info.DEFAULT,
      colorInfoHover: colors.info.light,
      
      // Success color variants
      colorSuccess: colors.success.DEFAULT,
      colorSuccessHover: colors.success.light,
      
      // Warning color variants
      colorWarning: colors.warning.DEFAULT,
      colorWarningHover: colors.warning.light,
      
      // Error color variants
      colorError: colors.error.DEFAULT,
      colorErrorHover: colors.error.light,
      
      // Link colors
      colorLink: colors.primary.DEFAULT,
      colorLinkHover: colors.primary.shade,
      colorLinkActive: colors.primary.dark,
      
      // Font family
      fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
  };

  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
};

export default AntDesignThemeProvider;
