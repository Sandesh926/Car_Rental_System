import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";
// @mui
import { Box, List, ListItemText } from "@mui/material";
//
import { StyledNavItem, StyledNavItemIcon } from "./styles";

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  // staffloggedIn
  // adminloggedIn
  // customerloggedIn

  const admin = window.localStorage.getItem("adminloggedIn");
  const staff = window.localStorage.getItem("staffloggedIn");
  const customer = window.localStorage.getItem("customerloggedIn");

  const isAdmin = JSON.parse(admin);
  const isStaff = JSON.parse(staff);
  const isCustomer = JSON.parse(customer);

  let filteredData = data;

  if (isAdmin) {
    filteredData = data.filter
    ((item) => 
    item.title !== "damage request form" && 
    item.title !== "rent cars" &&
    item.title !== "my rents"

    );
  } else if (isStaff) {
    filteredData = data.filter(
      (item) =>
        item.title !== "damage request form" &&
        item.title !== "Add staff" &&
        item.title !== "Add admin" &&
        item.title !== "my rents"
    );
  } else if (isCustomer) {
    filteredData = data.filter(
      (item) =>
        item.title !== "Add staff" &&
        item.title !== "Add admin" &&
        item.title !== "Customer details" &&
        item.title !== "car inventory" &&
        item.title !== "rented cars" &&
        item.title !== "return cars" &&
        item.title !== "sales" &&
        item.title !== "track customer" &&
        item.title !== "car damage" &&
        item.title !== "manage rents" &&
        item.title !== "dashboard"
    );
  }

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {filteredData.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        "&.active": {
          color: "text.primary",
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold",
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
