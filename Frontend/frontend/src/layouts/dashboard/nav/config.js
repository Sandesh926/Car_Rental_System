// component
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SummarizeIcon from '@mui/icons-material/Summarize';
import LoginIcon from '@mui/icons-material/Login';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import ChatIcon from '@mui/icons-material/Chat';

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <DashboardIcon />,
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: <AccountBoxIcon />,
  },
  {
    title: 'attendance',
    path: '/dashboard/products',
    icon: <SummarizeIcon />,
  },
  {
    title: 'chat',
    path: '/dashboard/chat',
    icon: <ChatIcon />,
  },
  {
    title: 'login',
    path: '/login',
    icon: <LoginIcon />,
  },
  {
    title: 'Not found',
    path: '/404',
    icon: <DoNotDisturbIcon />,
  },
];

export default navConfig;
