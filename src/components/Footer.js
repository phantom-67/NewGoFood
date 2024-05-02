// 1) Search bootstrap 5 (https://getbootstrap.com/docs/5.1/examples/footers/) and right click inspect element--> use cursor option to select the footer --> on inpect window go to footer --> right click copy element and paste here 
// 2) Remove the unneccessary things and replace <a></a> --> <Link></Link> and also import Link
// 3) Change class --> classname and href --> to

import React from 'react'
import {Link} from 'react-router-dom'
export default function Footer() {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
          </Link>
          <span className="text-muted">© 2024 GoFood, Inc</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        </ul>
      </footer>
    </div>
  )
}
