import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [myKitchenAppToken, setMyKitchenAppToken] = useState(
    localStorage.getItem("myKitchenAppToken") || ""
  );

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isPasswordInvalid, setIsPasswordInvalid] = useState(true);
  const [invalidPasswordMessage, setInvalidPasswordMessage] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(true);
  const [invalidEmailMessage, setInvalidEmailMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    getMyKitchenAppToken();
  };

  const getMyKitchenAppToken = () => {
    const url = "/api/v1/auth/login";
    const data = {
      email: email,
      password: password,
    };

    axios
      .post(url, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response);
        setMyKitchenAppToken(response.data.token);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setErrorMessage(error.response.data.msg);
      });
  };

  useEffect(() => {
    localStorage.setItem("myKitchenAppToken", myKitchenAppToken);
    if (myKitchenAppToken) {
      navigate("/dashboard");
    }
  }, [myKitchenAppToken]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!event.target.value.match(regex)) {
      setIsEmailInvalid(true);
      setInvalidEmailMessage("Please provide a valid email");
    } else {
      setIsEmailInvalid(false);
      setInvalidEmailMessage("");
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length < 8) {
      setIsPasswordInvalid(true);
      setInvalidPasswordMessage("Password must be at least 8 characters.");
    } else {
      setIsPasswordInvalid(false);
      setInvalidPasswordMessage("");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography component="h1" variant="h3">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            helperText={invalidEmailMessage}
            onChange={handleEmailChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            helperText={invalidPasswordMessage}
            onChange={handlePasswordChange}
          />
          {error && <p className="error-msg">{errorMessage}</p>}
          <Button
            type="submit"
            variant="outlined"
            disabled={isEmailInvalid || isPasswordInvalid}
            sx={{
              mt: 3,
              mb: 2,
              mr: 1,
              display: "inline",
              width: "32%",
              height: "50px",
            }}
          >
            Sign In
          </Button>
          <Link to="/signup" style={{ textDecoration: "none", color: "white" }}>
            <Button
              variant="outlined"
              sx={{
                mt: 3,
                mb: 2,
                ml: 1,
                display: "inline",
                width: "63%",
                height: "50px",
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                  backgroundColor: "#5a5a5a",
                },
              }}
            >
              Create Account
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
