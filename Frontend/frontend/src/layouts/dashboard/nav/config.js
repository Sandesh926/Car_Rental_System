// component
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People';
import ToysIcon from '@mui/icons-material/Toys';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import TableViewIcon from '@mui/icons-material/TableView';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CarRentalIcon from '@mui/icons-material/CarRental';

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <DashboardIcon />,
  },
  {
    title: 'Add staff',
    path: '/dashboard/staff',
    icon: <AccountBoxIcon />,
  },
  {
    title: 'Add admin',
    path: '/dashboard/admin',
    icon: <AccountCircleIcon />,
  },
  {
    title: 'Customer details',
    path: '/dashboard/customerdetails',
    icon: <TableViewIcon />,
  },
  {
    title: 'car inventory',
    path: '/dashboard/car',
    icon: <TimeToLeaveIcon />,
  },
  {
    title: 'rented cars',
    path: '/dashboard/rentedcars',
    icon: <DriveEtaIcon />,
  },
  // {
  //   title: 'return cars',
  //   path: '/dashboard/returncars',
  //   icon: <ToysIcon />,
  // },
  // {
  //   title: 'sales',
  //   path: '/dashboard/sales',
  //   icon: <DescriptionIcon />,
  // },
  // {
  //   title: 'track customer',
  //   path: '/dashboard/trackcustomer',
  //   icon: <PeopleIcon />,
  // },
  {
    title: 'car damage',
    path: '/dashboard/cardamage',
    icon: <CarCrashIcon />,
  },
  {
    title: 'rent cars',
    path: '/dashboard/rentcars',
    icon: <CarRentalIcon />,
  },
  {
    title: 'manage rents',
    path: '/dashboard/managerents',
    icon: <CarRentalIcon />,
  },
  {
    title: 'my rents',
    path: '/dashboard/myrents',
    icon: <CarRentalIcon />,
  },
  {
    title: 'manage damage',
    path: '/dashboard/managedamage',
    icon: <InsertDriveFileIcon />,
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: <DoNotDisturbIcon />,
  // },
];

export default navConfig;
