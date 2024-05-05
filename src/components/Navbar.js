// 1) We have done rfc
// 2) Then we searched bootstrap 5 navbar {https://getbootstrap.com/docs/5.0/components/navbar/} on google and copied the navbar code which is required inside <div></div>.
// 3) changed class to className
// 4) Then we import Link --> import { Link } from 'react-router-dom'; (The Link component is used to create links between different routes in your application.md without reloading the page)
// 5) changed every <a></a> tag --> Link, href tag --> to, # tag to --> /
// 6) Then we removed unwanted thing and added login to display
// 7) Then we changed the styling of GoFood text using bootstrap fs-1 fst-italic.
// 8) Then created a new list item signup and changed to="/createuser"
// 9) we want to put the login and signup button on right of the navbar for which we took out login and signup code from ul and kept it outside
// 10) then we removed the li tag and put it in div and added className='d-flex' to keep both in same line  then we changed nav-link to button
// 11) we want login and and signup on right so we added margin end  as auto for ul and under ul we copied li code and made it for my orders
// 12) if user is logged in then my order and logged out should be visible if not then login and signup to fulfill this we used auth token and ternary operation
// 13) then we added code for logout and cart then on logout we added onclick event which will navigate to home page for this we imported navigate and made a arrow function to handle the event
// 14) then we go to card
// 15) here we import Badge and use badge to display total number of items in cart and used badge in mycart and given margin of 2 for badge
// 16) then in screens we made a cart screen
// 17) now we create a new state {const [cartViw,useCartView] = useState(false)} the purpose of this state with initial value as false is to display the cart as popup
// 18) Below mycart we used ternary operator to check and display so whenever cartview is is true it will be displayed on screen and it will be true when someone clicks mycart
// 19) then we have exported onclose from modal.js so we'll use that handler here to close the popup of cart so here we just made as false so ternary operator will remove popup
// 20) and here we also imported cart then called cart in modals so we donot need to route it on app.js so we remove it from there 
// 21) to diplsy the count of items in card we will import useCart same as we done in cart.js then we use useCart and in cart we'll display data.length
// 22) then we go to contextReducer to add state for remove funcitonality
// 23) in myorder link we provided redirection path to=/myOrder then we go to MyOrder.js

import React, { useState } from 'react'
import { useCart} from '../components/ContextReducer'
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge'
import Modal from '../Modal';
import Cart from '../screens/Cart';

export default function Navbar() {

  const [cartView,setCartView] = useState(false)
  let data = useCart();

  const navigate = useNavigate();
  const handleLogout = () => {

    localStorage.removeItem('authToken');
    navigate('/login');
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Order</Link>
                </li>
                : " "}
            </ul>
            {!(localStorage.getItem("authToken")) ?
              <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
              </div>
              : <div>
                <div className="btn bg-white text-success mx-2" onClick={()=>{setCartView(true)}}> My Cart
                  <Badge pill bg='danger' className='m-1'> {data.length} </Badge>
                </div>

                {cartView?<Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
                <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>Log out</div>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}
