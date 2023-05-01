import { useState, useEffect } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
import account from '../../../_mock/account';

import AvatarImg from './images/avatar.webp'

import { useNavigate } from "react-router-dom";





// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);

  // const [adminRole, setAdminRole] = useState("");
  // const [staffRole, setStaffRole] = useState("");

  // useEffect(() => {
  //   const role = window.localStorage.getItem("role");
  //   if (role === "admin") {
  //     setAdminRole(role);
  //   } else if (role === "staff") {
  //     setStaffRole(role);
  //   }
  // }, []);

  const data = window.localStorage.getItem("token");
  const obj = JSON.parse(data);

  const role = window.localStorage.getItem("role");
  const objRole = role;

  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    navigate("/");
  }

  const handleHome = () => {

  }
  
  // const handleProfile = () => {
  
  // }
  
  const handleDocuments = () => {
  
  }
  
  const handlePassword = () => {
    setOpen(null);
      navigate("/dashboard/changepassword");
  }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={AvatarImg} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {/* {adminRole ? obj.admin_name : obj.name} */}{obj.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {/* {adminRole ? obj.admin_email : obj.email} */}{obj.email}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {`Role: ${objRole}`}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
        <MenuItem icon="eva:home-fill" onClick={handleHome}>
            Home
          </MenuItem>
          {/* <MenuItem icon="eva:person-fill" onClick={handleProfile}>
            Profile
          </MenuItem> */}
          <MenuItem icon="eva:person-fill" onClick={handleDocuments}>
            Add Documents
          </MenuItem>
          <MenuItem icon="eva:person-fill" onClick={handlePassword}>
            Change Password
          </MenuItem>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
