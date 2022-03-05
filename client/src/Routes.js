import React from "react";
import { Route, Routes as Switch, Navigate } from "react-router-dom";

import Login from "./Components/Login";
import Chat from "./Components/Chat";

const Routes = () => {
  let name = localStorage.getItem("name");
  return (
    <Switch>
      {!name ? (
        <Route path="/" element={<Navigate replace to="/login" />} />
      ) : (
        <Route exact path="/" element={<Navigate replace to="/chat" />} />
      )}
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/chat" element={<Chat />} />
    </Switch>
  );
};

export default Routes;
