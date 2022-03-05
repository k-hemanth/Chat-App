import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import { styled } from "@mui/system";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { LOGIN } from "../redux/actions/actions";

const CardWrapper = styled(Card)({
  backgroundColor: "#bfd1df",
  position: "absolute",
  top: "0px",
  left: "0px",
  right: "0px",
  bottom: "0px",
  margin: "auto",
});

const Login = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onLogin = () => {
    dispatch({ type: LOGIN, payload: { name } });
    navigate("/chat");
    localStorage.setItem("name", name);
    // axios.get(`http://localhost:4050/login/?name=${name}`).then((res) => {
    //   dispatch({ type: LOGIN, payload: res.data });
    //   navigate("/");
    // });
  };

  return (
    <CardWrapper sx={{ maxWidth: 345, maxHeight: 200 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Login
        </Typography>
        <div style={{ marginTop: "25px" }}>
          <TextField
            id="input-with-icon-textfield"
            placeholder="Enter Name"
            onChange={onNameChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </div>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          style={{ backgroundColor: "#f1c5ae", color: "black" }}
          endIcon={<SendIcon />}
          onClick={onLogin}
          disabled={name.length >= 1 ? false : true}
        >
          Login Now
        </Button>
      </CardActions>
    </CardWrapper>
  );
};
export default Login;
