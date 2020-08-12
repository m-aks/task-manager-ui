import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Home} from "./pages/Home";
import {About} from "./pages/About";
import {TopNavbar} from "./components/TopNavbar";

function App() {
  return (
      <BrowserRouter>
          <TopNavbar/>
          <div className="App">
              <Switch>
                  <Route path={'/'} exact component={Home}/>
                  <Route path={'/about'} component={About}/>
                  <Route path={'/search'} component={About}/>
              </Switch>
          </div>
      </BrowserRouter>
  );
}

export default App;
