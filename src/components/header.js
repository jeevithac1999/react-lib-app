import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import routes from "../Routes/routes";
import useUserProvider from "../store/UserProvider/useUserProvider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
const Header = () => {
  const { isUserLoggedIn } = useUserProvider();

  const logout = () => {
    window.localStorage.removeItem("jwtToken");
    window.localStorage.removeItem("email");
    window.location.reload();
  };
  
  const StyledBadge = withStyles(theme => ({
    badge: {
      top: "50%",
      right: -3,
      border: `2px solid ${
        theme.palette.type === "dark"
          ? theme.palette.grey[200]
          : theme.palette.grey[900]
      }`
    }
  }))(Badge);
  return (
    <div>
      <Navbar bg="light" variant="light" expand="lg">
        <Navbar.Brand>Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink
              className={"nav-link"}
              activeClassName={"active"}
              to={routes.home}
            >
              Home
            </NavLink>
            {isUserLoggedIn ? (
              <NavLink
                className={"nav-link"}
                activeClassName={"active"}
                to={routes.cart}
              >
              Cart
              <IconButton aria-label="Cart" >
            <StyledBadge color="light">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
                <i class="fas fa-shopping-cart"></i>
              </NavLink>
            ) : null}
            {isUserLoggedIn ? (
              <NavLink
                className={"nav-link"}
                activeClassName={"active"}
                to={routes.checkout}
              >
                Checkout
              </NavLink>
            ) : null}
          </Nav>
          <Nav>
            {isUserLoggedIn ? (
              <NavLink
                to={routes.userProfile}
                className={"nav-link"}
                activeClassName={"active"}
                size="sm"
                variant="light"
              >
                Profile
              </NavLink>
            ) : (
              <NavLink
                to={routes.signUp}
                className={"nav-link"}
                activeClassName={"active"}
                size="sm"
                variant="light"
              >
                SignUp
              </NavLink>
            )}
            {isUserLoggedIn ? (
              <Button
                onClick={logout}
                variant="dark"
                activeClassName={"active"}
              >
                Logout
              </Button>
            ) : (
              <NavLink
                to={routes.login}
                className={"nav-link"}
                activeClassName={"active"}
                size="sm"
                variant="light"
              >
                Login
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
