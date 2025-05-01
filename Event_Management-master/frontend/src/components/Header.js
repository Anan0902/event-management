import React, { useState } from "react";
import { AppBar, Tab, Tabs, Toolbar, Typography, Button } from "@mui/material";
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [value, setValue] = useState();
  const navigate = useNavigate();

  return (
    <div>
      <AppBar sx={{ backgroundColor: "#232F3D" }} position="sticky">
        <Toolbar>
          {/* Logo or Home Icon */}
          <NavLink to="/" style={{ color: "white" }}>
            <Typography>
              <EventNoteOutlinedIcon />
            </Typography>
          </NavLink>

          {/* Tabs */}
          <Tabs
            sx={{ ml: "auto" }}
            textColor="inherit"
            indicatorColor="primary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={NavLink} to="/add" label="Add Event" />
            <Tab LinkComponent={NavLink} to="/Events" label="Events" />
            <Tab LinkComponent={NavLink} to="/About" label="About Us" />
            <Tab LinkComponent={NavLink} to="/signin"label="Sign in"/>
          </Tabs>

 
          
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
