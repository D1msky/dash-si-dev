// D:\github\dash-si-dev\app\layout.js
'use client';
import { useState } from 'react';
import { Layout } from 'antd';
import Navside from '@/src/component/Navside';
import HeaderNav from '@/src/component/HeaderNav';
import './globals.css';
import AntDesignThemeProvider from '@/src/providers/AntDesignThemeProvider';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'Dashboard Seller Indopaket',
//   description: 'Dashboard Seller Idaman Indopaket',
// };
const { Content } = Layout;

export default function RootLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <html lang="en">
      <body>
        <AntDesignThemeProvider>
          <Layout className="min-h-screen">
            <Navside collapsed={collapsed} />
            <Layout>
              <HeaderNav collapsed={collapsed} onCollapse={toggleCollapsed} />
              <Content
                className="m-6 p-6 min-h-[280px] overflow-visible bg-gray-100"
              >
                {children}
              </Content>
            </Layout>
          </Layout>
        </AntDesignThemeProvider>
      </body>
    </html>
  );
}