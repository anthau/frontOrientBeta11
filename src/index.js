



import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Welcome from  './Welcome'
import AddRoute from  './AddRoute'
import About from  './About'
import AddCheckpoint from  './AddCheckpoint'
import DeleteRoute from  './DeleteRoute'
import ShowRoutes from  './ShowCheckpoints'
import AddRouteToCheckpoints from  './AddRouteToCheckpoints'


import {
  BrowserRouter as Router,  
  Route,  
} from "react-router-dom";

import * as serviceWorker from './serviceWorker';

function Ex() {
return (
  <Router>

    <div>
      <Route path="/test" component={Welcome} />
    </div>
    <div>
      <Route path="/showRoutes" component={ShowRoutes} />
    </div>
    <div>
      <Route path="/AddRouteToCheckpoints" component={AddRouteToCheckpoints} />
    </div>

     <div>
      <Route path="/DeleteRoute" component={DeleteRoute} />
    </div>
    <div>
      <Route path="/about" component={About} />
    </div>
   <div>
      <Route path="/AddCheckpoint" component={AddCheckpoint} />
    </div>

    <div>
      <Route path="/AddRoute" component={AddRoute} />
    </div>
  </Router>

)

}




ReactDOM.render(<Ex />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
