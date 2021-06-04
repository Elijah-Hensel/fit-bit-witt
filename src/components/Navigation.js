import { AppBar, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <AppBar>
      <Toolbar
        style={{
          backgroundColor: "black",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Link style={{ color: "white", marginLeft: 15 }} to="/home">
            Home
          </Link>
          <Link style={{ color: "white", marginLeft: 15 }} to="/routines">
            Routines
          </Link>
          <Link style={{ color: "white", marginLeft: 15 }} to="/my-routines">
            My Routines
          </Link>
          <Link style={{ color: "white", marginLeft: 15 }} to="/activities">
            Activities
          </Link>
        </div>
        <div>
          <Link style={{ color: "white", marginRight: 15 }} to="/login">
            Log In
          </Link>
          <Link style={{ color: "white", marginRight: 15 }} to="/signup">
            Sign Up
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
