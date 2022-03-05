import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import {  useSelector } from "react-redux";

const Header = () => {
  const application = useSelector((state) => state.application);

  return (
    <AppBar position="static" >
      <Container maxWidth="xl" style={{backgroundColor:deepOrange}}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            Chat App
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            Chat App
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <div style={{ marginRight: "10px" }}>{application.userName}</div>
          <Box sx={{ flexGrow: 0 }}>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>{application.userName[0]}</Avatar>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
