import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp({ setToggle }) {
  // variable to check if component is rendered for the first time
  const didComponentMount = useRef(false);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirm-password"),
    });

    if (!data.get("name") || !data.get("email") || !data.get("password")) {
      setError(true);
      setErrorMessage("Please Enter a Fullname, an Email and a Password");
      return;
    }
    if (data.get("password") !== data.get("confirm-password")) {
      setError(true);
      setErrorMessage("Password do not match");
      return;
    }

    setName(data.get("name"));
    setEmail(data.get("email"));
    setPassword(data.get("password"));
  };

  const getUserToken = () => {
    const url = "/api/v1/auth/register";
    const data = {
      name: name,
      email: email,
      password: password,
    };

    axios
      .post(url, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response);
        setToken(response.data.token);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setErrorMessage(error.response.data.msg);
      });
  };

  useEffect(() => {
    // if component renders for the first time,
    // we do not make the axios call
    if (didComponentMount.current) {
      getUserToken();
    }
    didComponentMount.current = true;
  }, [name, email, password]);

  useEffect(() => {
    localStorage.setItem("token", token);
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

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
          Welcome!
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            autoComplete="confirm-password"
          />
          {error && <p className="error-msg">{errorMessage}</p>}
          <Button
            type="submit"
            variant="outlined"
            sx={{
              mt: 3,
              mb: 2,
              mr: 1,
              display: "inline",
              width: "100%",
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
          <Typography component="p">
            Already have an account?{" "}
            <span className="underline" onClick={() => setToggle(true)}>
              Sign in
            </span>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
