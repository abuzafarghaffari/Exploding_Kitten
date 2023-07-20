import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const Login = (props) => {
  const [error, setError] = useState(false);
  const [enterdName, setEnteredName] = useState("");

  const changeHandler = (event) => {
    setEnteredName(event.target.value);
    setError(false);
  };

  const ClickHandler = () => {
    //const enteredName = enterednameRef.current.value;

    if (enterdName === "" && enterdName.trim() === "") {
      setError(true);
    } else {
      props.onClick(enterdName);
    }
  };

  return (
    <>
      <Paper>
        <TextField
          id="filled-basic"
          label="Entered Name"
          variant="filled"
          onChange={changeHandler}
          required
        />
        <Button variant="containted" onClick={ClickHandler}>
          Start Game
        </Button>
        {error && (
          <Box sx={{ marginTop: "1rem" }}>
            <Typography variant="h6" align="left" sx={{ color: "red" }}>
              Please inter Name
            </Typography>
          </Box>
        )}
      </Paper>
    </>
  );
};

export default Login;
