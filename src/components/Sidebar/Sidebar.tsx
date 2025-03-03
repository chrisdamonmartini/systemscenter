import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import { motion } from 'framer-motion';
import { 
  HomeOutlined,
  RocketOutlined,
  UserOutlined,
  ToolOutlined,
  CalendarOutlined,
  BarsOutlined,
  SettingOutlined,
  FileSearchOutlined
} from '@ant-design/icons';

// Update the navigation items array
export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <BiIcons.BiHome />,
    subNav: []
  },
  {
    title: 'Fleet Management',
    path: '/fleet',
    icon: <FaIcons.FaPlane />,
    subNav: []
  },
  {
    title: 'Mission Schedule',
    path: '/missions',
    icon: <FaIcons.FaCalendar />,
    subNav: []
  },
  {
    title: 'Personnel',
    path: '/personnel',
    icon: <FaIcons.FaUsers />,
    subNav: []
  },
  {
    title: 'Parts Inventory',
    path: '/inventory',
    icon: <FaIcons.FaBoxes />,
    subNav: []
  },
  {
    title: 'Flight Test',
    path: '/flight-test',
    icon: <FaIcons.FaClipboardCheck />,
    subNav: []
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: <FaIcons.FaChartBar />,
    subNav: []
  },
  {
    title: 'Maintenance Schedule',
    path: '/maintenance',
    icon: <FaIcons.FaCalendarCheck />,
    subNav: []
  },
  {
    title: 'Repair Tracker',
    path: '/repairs',
    icon: <FaIcons.FaTools />,
    subNav: []
  },
  {
    title: 'Maintenance Builder',
    path: '/maintenance-builder',
    icon: <FaIcons.FaWrench />,
    subNav: []
  },
  {
    title: '107 Process',
    path: '/process107',
    icon: <FileSearchOutlined />,
    subNav: []
  }
];

interface SidebarProps {
  currentView: string;
  onNavigate: (route: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div 
      className={`bg-[#1e3a8a] text-white min-h-screen transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      } p-4`}
    >
      {/* Collapse Toggle Button */}
      <div className="flex justify-end mb-6">
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="text-white/70 hover:text-white"
        >
          {collapsed ? (
            <FaIcons.FaAngleRight className="text-xl" />
          ) : (
            <FaIcons.FaAngleLeft className="text-xl" />
          )}
        </button>
      </div>

      <nav>
        {SidebarData.map((item, index) => {
          const itemPath = item.path === '/' ? 'dashboard' : item.path.replace('/', '');
          
          return (
            <div
              key={index}
              className={`flex items-center p-3 mb-2 rounded cursor-pointer
                ${currentView === itemPath ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
              onClick={() => onNavigate(item.path)}
              title={collapsed ? item.title : undefined}
            >
              <span className={`text-xl ${collapsed ? 'mx-auto' : 'mr-4'}`}>{item.icon}</span>
              {!collapsed && <span>{item.title}</span>}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar; 