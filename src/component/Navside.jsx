'use client';
import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Icon } from '@iconify/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/src/component/Logo';

const { Sider } = Layout;

const Navside = ({ collapsed = false, onCollapse }) => {
  const pathname = usePathname();
  const [openKeys, setOpenKeys] = useState([]);

  const items = [
    {
      key: '/',
      icon: <Icon icon="mdi:view-dashboard" width="20" />,
      label: <Link href="/">DASHBOARD</Link>,
    },
    {
      key: '/profile',
      icon: <Icon icon="mdi:account" width="20" />,
      label: <Link href="/profile">PROFIL</Link>,
    },
    {
      key: '/transaction',
      icon: <Icon icon="icon-park-solid:transaction-order" width="20" />,
      label: <Link href="/transaction">LAPORAN TRANSAKSI</Link>,
    },
    {
      key: 'tiering-menu',
      label: 'TIERING',
      icon: <Icon icon="mdi:trophy" width="20" />,
      children: [
        {
          key: '/tiering/status',
          label: <Link href="/tiering/status">STATUS TIER</Link>,
          icon: <Icon icon="material-symbols:format-list-bulleted" width="20" />,
        },
        {
          key: '/tiering/history',
          label: <Link href="/tiering/history">RIWAYAT TIERING</Link>,
          icon: <Icon icon="material-symbols:history" width="20" />,
        },
      ],
    },
    {
      key: 'referral-menu',
      label: 'REFERRAL',
      icon: <Icon icon="clarity:users-solid" width="20" />,
      children: [
        {
          key: '/referral/info',
          label: <Link href="/referral/info">KODE REFERRAL</Link>,
          icon: <Icon icon="material-symbols:format-list-bulleted" width="20" />,
        },
        {
          key: '/referral/history',
          label: <Link href="/referral/history">RIWAYAT REFERRAL</Link>,
          icon: <Icon icon="material-symbols:history" width="20" />,
        },
      ],
    },
  ];

  return (
    <Sider
      theme="light"
      collapsed={collapsed}
      onCollapse={onCollapse}
      collapsible
      width={250}
      className="border-r border-gray-200"
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'white',
        boxShadow: '1px 0 0 0 rgb(0 0 0 / 0.05)',
      }}
      trigger={null}
    >
      <div className="flex justify-center items-center py-4">
        <Logo />
      </div>
      <div className="h-px bg-gray-200 mx-4 my-2"></div>

      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        openKeys={openKeys}
        onOpenChange={setOpenKeys}
        items={items}
        style={{ border: 'none' }}
      />
    </Sider>
  );
};

export default Navside;
