import React, { Fragment, useState } from "react";
import { Form, Button } from "react-bootstrap";
import {useHistory} from "react-router-dom";
import routes from "../Routes/routes";
import useUserProvider from "../store/UserProvider/useUserProvider";

const signUp = () => {

  const history = useHistory();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUserLoggedIn } = useUserProvider();


  const onfirstNameChange = event => setFirstName(event.target.value);
  const onLastNameChange = event => setLastName(event.target.value);
  const onEmailChange = event => setEmail(event.target.value);
  const onPasswordChange = event => setPassword(event.target.value);

 
  const singUpForm = async event => {
    event.preventDefault();

    try {
      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      };

      const config = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/JSON"
        },
        body: JSON.stringify(userData)
      };

      const response = await fetch(
        "https://uwwxb.sse.codesandbox.io/user/signup",
        config
      );
      const data = await response.json();

      if (data.status === "SUCCESS") {
        alert("User created");
        setUserLoggedIn();
        window.localStorage.setItem("jwtToken", data.jwtToken);
        window.localStorage.setItem("email", email);
        history.push(routes.home);
      } 
      else {
        console.error(data);
        alert("Unable to Signup");
      }
    } catch (e) {
      console.error(e);
      alert("Unable to Signup");
    }
  };

  return (
    <Fragment>
      <br />
      <div className="container" align="center">
        <Form>
          <Form.Group align="left" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              value={firstName}
              onChange={onfirstNameChange}
              type="text"
              placeholder="First Name"
            />
          </Form.Group>

          <Form.Group align="left" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              value={lastName}
              onChange={onLastNameChange}
              type="text"
              placeholder="Last Name"
            />
          </Form.Group>

          <Form.Group align="left" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              onChange={onEmailChange}
              type="email"
              placeholder="Email"
            />
          </Form.Group>

          <Form.Group align="left" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={onPasswordChange}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Button onClick={singUpForm} variant="dark" type="submit">
            SignUp
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};

export default signUp;
