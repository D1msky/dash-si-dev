// D:\github\dash-si-dev\src\component\HeaderNav.js
'use client';

import React, { useState} from 'react';
import { Layout, Button, Dropdown } from 'antd';
import { Icon } from '@iconify/react';

const { Header } = Layout;

// Sample dummy data
const users = [
  { id: 1, name: 'Riani BM', avatar: null },
  { id: 2, name: 'John Doe', avatar: null },
  { id: 3, name: 'Jane Smith', avatar: null }
];

export default function HeaderNav({ collapsed, onCollapse }) {
    // State to track current user (for demo purposes)
    const [currentUser, setCurrentUser] = useState(users[0]);

    // Dropdown menu items for user selection
    const userMenuItems = {
      items: [
        ...users.map(user => ({
          key: user.id,
          label: user.name,
          onClick: () => setCurrentUser(user)
        })),
        {
          type: 'divider'
        },
        {
          key: 'logout',
          label: 'Logout',
          icon: <Icon icon="mdi:logout" width="16" />
        }
      ]
    };
  return (
    <Header style={{ padding: 0, background: '#fff' }} className="shadow-sm">
      <div className="flex items-center px-4">
        <Button 
          type="text"
          icon={<Icon icon={collapsed ? "mdi:menu-right" : "mdi:menu-left"} width="24" />}
          onClick={onCollapse}
          className="mr-2"
        />
        <div className="ml-auto flex">
          <Icon icon="mdi:account-circle" width="24" color="#fff" className="mr-2" />
          <div className="p-3 bg-[#0C74BC] text-white rounded-lg inline-flex justify-start items-center gap-1">
            <span className="font-semibold text-lg">Seedsunset</span>
            <span className="mx-2 text-sm opacity-75">oleh</span>
            <span className="text-sm">{currentUser.name}</span>
          </div>
          <Icon icon="mdi:chevron-down" width="16" color="#fff" className="ml-1" />
        </div>
      </div>
    </Header>
  );
}