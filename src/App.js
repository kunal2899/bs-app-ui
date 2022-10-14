import React from "react";
import { BrowserRouter as Router ,Route, Switch } from "react-router-dom";
import NotFound from './components/NotFound/NotFound';
import Main from "./components/main/Main";
import { ToastContainer } from "react-toastify";

function App() {
  return (<>
    {/* Container element for toasts, used to inform about errors  */}
    <ToastContainer limit={1}/>
    {/* Routes */}
    <Router>
      <Switch>
        <Route path="/books/:bookId" component={Main}/>
        <Route path="/books" component={Main}/>
        <Route path="/not-found" component={NotFound}/>
        <Route path="/" component={Main}/>
        <Route path="*" component={NotFound}/>
      </Switch>
    </Router>
    </>
  );
}

export default App;
