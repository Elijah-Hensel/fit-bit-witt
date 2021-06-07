import React, { useState, useEffect } from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from '@material-ui/icons/Menu';
import CreateRoutineModal from "./CreateRoutineModal";

const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const isLoggedIn = () => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  };

  const onLogOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.setItem("loggedIn", false)
    setLoggedIn(false)
    
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  useEffect(() => {
    isLoggedIn()
  },[])

  return (
    <div
      className="nav"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        color: "white",
      }}
    >
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ color: "white" }}
      >
       <MenuIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link style={{ color: "white", marginLeft: 15 }} to="/">
            Home
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link style={{ color: "white", marginLeft: 15 }} to="/routines">
            Routines
          </Link>
        </MenuItem>
        {loggedIn ? <MenuItem onClick={handleClose}>
          <Link style={{ color: "white", marginLeft: 15 }} to="/my-routines">
            My Routines
          </Link>
        </MenuItem> : null}
        <MenuItem onClick={handleClose}>
          <Link style={{ color: "white", marginLeft: 15 }} to="/activities">
            Activities
          </Link>
        </MenuItem>
      </Menu>
      <div>
        <p>Getting in shape has never been <b>easier</b></p>
      </div>
      <div
        style={{
          marginTop: 14,
          fontSize: "0.875rem",
          textTransform: "uppercase",
        }}
      >
        {loggedIn ? (
          <div style={{display:"flex", flexDirection:"row", alignItems:"center", marginTop:"-10px"}}>
          <Link className="log" style={{ color: "white", marginRight: 15 }} to="/login" onClick={onLogOut}>
            Log Out
          </Link>
          <CreateRoutineModal />
          </div>
        ) : (
          <>
            <Link className="log" style={{ color: "white", marginRight: 15 }} to="/login">
              Log In
            </Link>
            <Link className="log" style={{ color: "white", marginRight: 15 }} to="/signup">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

// const Navigation = () => {
//   return (
//     <AppBar>
//       <Toolbar
//         style={{
//           backgroundColor: "black",
//           color: "white",
//           display: "flex",
//           justifyContent: "space-between",
//         }}
//       >
//         <div>
//           <Link style={{ color: "white", marginLeft: 15 }} to="/home">
//             Home
//           </Link>
// <Link style={{ color: "white", marginLeft: 15 }} to="/routines">
//   Routines
// </Link>
// <Link style={{ color: "white", marginLeft: 15 }} to="/my-routines">
//   My Routines
// </Link>
// <Link style={{ color: "white", marginLeft: 15 }} to="/activities">
//   Activities
// </Link>
//         </div>
//         <div>
//           <Link style={{ color: "white", marginRight: 15 }} to="/login">
//             Log In
//           </Link>
//           <Link style={{ color: "white", marginRight: 15 }} to="/signup">
//             Sign Up
//           </Link>
//         </div>
//       </Toolbar>
//     </AppBar>
//   );
// };

export default Navigation;
