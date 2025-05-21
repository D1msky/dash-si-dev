#!/bin/bash
# Script to fix Tailwind CSS v4 with Ant Design in Next.js project

# Color codes for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting the fix for Tailwind CSS v4 with Ant Design...${NC}"

# Step 1: Fix postcss.config.mjs
echo -e "${YELLOW}Updating postcss.config.mjs...${NC}"
cat > ./postcss.config.mjs << 'EOL'
export default {
  plugins: {
    "@tailwindcss/postcss": {}, // Changed from 'tailwindcss' to '@tailwindcss/postcss'
    autoprefixer: {},
  },
}
EOL
echo -e "${GREEN}✓ postcss.config.mjs updated${NC}"

# Step 2: Fix globals.css
echo -e "${YELLOW}Updating globals.css...${NC}"
cat > ./app/globals.css << 'EOL'
/* Import font */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
@import 'antd/dist/reset.css';

/* Tailwind CSS v4 imports */
@import "tailwindcss";

/* Custom styles */
@layer base {
  body {
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  .ant-menu-item.ant-menu-item-selected {
    @apply bg-[#eef8ff] text-[#0c74bc];
  }
}

/* Ant Design compatibility fixes */
.ant-btn {
  line-height: 1.5715;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
}

.ant-layout {
  background: #f5f5f5;
}

/* Fix button styles that Tailwind v4 might override */
button, [type='button'], [type='reset'], [type='submit'] {
  background-color: initial;
}

/* Fix layout styles */
.ant-layout-sider {
  background: #fff !important;
}

/* override ant theme */
.ant-menu-light.ant-menu-inline {
  border-inline-end: none !important;
}

/* Card styles for dashboard */
.dashboard-card {
  @apply bg-[#f0f9ff] rounded-lg shadow-sm p-4;
}
EOL
echo -e "${GREEN}✓ globals.css updated${NC}"

# Step 3: Fix layout.js
echo -e "${YELLOW}Updating app/layout.js...${NC}"
cat > ./app/layout.js << 'EOL'
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <main>{children}</main>
        </AntdRegistry>
      </body>
    </html>
  );
}
EOL
echo -e "${GREEN}✓ app/layout.js updated${NC}"

# Step 4: Fix tailwind.config.js
echo -e "${YELLOW}Updating tailwind.config.js...${NC}"
cat > ./tailwind.config.js << 'EOL'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  important: true, // Critical for Ant Design compatibility
  theme: {
    extend: {
      colors: {
        border: '#d6d6d6',
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
        },
        neutral: {
          light: '#d0d5dd',
          DEFAULT: '#677084'
        },
        disabled: {
          DEFAULT: 'rgba(208, 213, 221, 1)'
        },
        base: {
          white: '#fff',
          black: '#111'
        }
      },
      fontSize: {
        h1: ['2.5rem', { lineHeight: '3rem', fontWeight: '700' }],
        h2: ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }],
        h3: ['1.75rem', { lineHeight: '2.25rem', fontWeight: '600' }],
        h4: ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
        h5: ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        h6: ['1.125rem', { lineHeight: '1.5rem', fontWeight: '600' }],
        small: ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500' }],
        body: ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }], // 16px
        large: ['1.125rem', { lineHeight: '1.75rem', fontWeight: '400' }],
        caption: ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }],
        button: ['0.875rem', { lineHeight: '1rem', fontWeight: '500' }],
        label: ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500' }]
      }
    }
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-animate'),
    require('@tailwindcss/typography')
  ]
}
EOL
echo -e "${GREEN}✓ tailwind.config.js updated${NC}"

# Clean up build cache
echo -e "${YELLOW}Cleaning up .next cache folder...${NC}"
if [ -d "./.next" ]; then
  rm -rf ./.next
  echo -e "${GREEN}✓ .next folder removed${NC}"
else 
  echo -e "${YELLOW}No .next folder found, skipping...${NC}"
fi

echo -e "${GREEN}All fixes have been applied!${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Run 'npm install' to ensure all dependencies are correctly installed"
echo "2. Start your dev server with 'npm run dev'"
echo -e "${YELLOW}If you encounter issues, check the comprehensive fix guide for troubleshooting tips.${NC}"