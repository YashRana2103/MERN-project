import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import ChatPage from "./pages/ChatPage/ChatPage";
import AuthContextProvider from "./context/AuthContext";
import SocketContextProvider from "./context/SocketContext";

const App = () => {
  return (
    <AuthContextProvider>
      <SocketContextProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/chat/:userId" component={ChatPage} />
          </Switch>
        </Router>
      </SocketContextProvider>
    </AuthContextProvider>
  );
};

export default App;
