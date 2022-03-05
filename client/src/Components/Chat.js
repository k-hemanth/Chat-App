import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import { SET_DATA } from "../redux/actions/actions";
import { initiateSocket, sendMessage } from "../config/socket-io";
import {
  ChatWrapper,
  UsersWrapper,
  ChatBodyWrapper,
  LeftMessage,
  RightMessage,
  UserHeader,
  UserHeaderPaper,
  MessageCardWrapper,
  FormWrapper,
  SendButton,
} from "./Common";

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState("");
  const [messageByUser, setMessageByUser] = useState("");
  const [chatHistory, setChatHistory] = useState({});

  const application = useSelector((state) => state.application);

  let name = localStorage.getItem("name");

  useEffect(() => {
    if (name) {
      axios.get(`http://localhost:4050/login/?name=${name}`).then((res) => {
        dispatch({ type: SET_DATA, payload: res.data });
        let socket = initiateSocket(name);
        socket.on("message", (message) => {
          if (message.from === name) {
            let to = message.to;
            setChatHistory((prev) => {
              let objUser = {};
              if (prev[to]) {
                console.log(prev[to]);
                objUser[to] = [
                  ...prev[to],
                  { message: message.message.text, position: "left" },
                ];
              } else {
                objUser[to] = [
                  { message: message.message.text, position: "left" },
                ];
              }
              return { ...prev, ...objUser };
            });
          } else {
            let to = message.from;
            setChatHistory((prev) => {
              let objUser = {};
              if (prev[to]) {
                console.log(prev[to]);
                objUser[to] = [
                  ...prev[to],
                  { message: message.message.text, position: "right" },
                ];
              } else {
                objUser[to] = [
                  { message: message.message.text, position: "right" },
                ];
              }
              return { ...prev, ...objUser };
            });
          }
        });
      });
    } else {
      navigate("/login");
    }
  }, []);

  const onSelectUser = (e, name) => {
    setSelectedUser(name);
  };

  const onMessageChange = (e) => {
    setMessageByUser(e.target.value);
  };

  const onSendMessage = () => {
    let message = {
      to: selectedUser,
      message: {
        type: "text",
        text: messageByUser,
        date: +new Date(),
        className: "message",
      },
      from: application.userName,
    };
    setMessageByUser("");
    sendMessage(message);
  };

  return (
    <ChatWrapper>
      <UsersWrapper>
        <List>
          {application.listOfUsers.map((user, key) => {
            return (
              <ListItem key={key}>
                <ListItemAvatar>
                  <Avatar>{user.name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  style={{ cursor: "pointer" }}
                  onClick={(e) => onSelectUser(e, user.name)}
                  primary={user.name}
                />
              </ListItem>
            );
          })}
        </List>
      </UsersWrapper>
      <ChatBodyWrapper>
        {selectedUser.length ? (
          <>
            <UserHeader>
              <UserHeaderPaper elevation={3}>{selectedUser}</UserHeaderPaper>
            </UserHeader>
            <MessageCardWrapper>
              {chatHistory[selectedUser]?.map(({ position, message }, key) => {
                if (position === "right") {
                  return <RightMessage key={key}>{message}</RightMessage>;
                } else if (position === "left") {
                  return <LeftMessage key={key}>{message}</LeftMessage>;
                }
                return "";
              })}
            </MessageCardWrapper>
            <div>
              <FormWrapper noValidate autoComplete="off">
                <TextField
                  id="standard-text"
                  variant="standard"
                  label="Enter Message"
                  style={{ width: "100%" }}
                  onChange={onMessageChange}
                  value={messageByUser}
                />
                <SendButton
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={onSendMessage}
                />
              </FormWrapper>
            </div>
          </>
        ) : (
          ""
        )}
      </ChatBodyWrapper>
    </ChatWrapper>
  );
};

export default Chat;
