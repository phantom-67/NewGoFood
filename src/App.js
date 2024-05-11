// 1) Inside App.js we have cleaned all the thing previously present only import './App.css'; remains.
// 2) We imported our Home.js from screens folder
// 3) We installed react router dom using command - npm i react-router-dom [Done to make single page website i.e. will not reload when any button is clicked].
// 4) Then searched react router dom and opened website {https://v5.reactrouter.com/web/guides/quick-start} 
// 5) From the website we copied the import command and pasted here and changed the switch to Routes
// 6.a) Inside return <Router> <Routes> <Router /> </Routes> </Router> and calling will take place from route like shown below.
// 6.b) We used router, routes, route because router - helps in connection of my (single web page application) react webpages to url, routes - it wraps the route, route - link between url and my components of react
// 7) After importing node_module do npm start
// 8) Then we added Route for Signup and path as createuser
// 9) put whole code insdie cartprovider in return function so whole code is global now and we go to ContextReducer
// 10) here we made a route for cart.js and imported cart.js then again go to cart.js
// 11) then we go to navbar.js

import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup.js';
import MyOrder from './screens/MyOrder.js'
import { CartProvider } from './components/ContextReducer.js';
// import Cart from './screens/Cart.js'
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {

  return (
    <CartProvider>
      <Router>
        <div>

          <Routes >

            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
            <Route exact path="/myOrder" element={<MyOrder />} />
            {/* <Route exact path='/cart' element={<Cart />} /> */}
          </Routes>
        </div>
      </Router>

    </CartProvider>

  );
}

export default App;

