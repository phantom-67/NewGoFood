// 1) Here we create a modal dialog box :- Modal dialog boxes, which require the user to respond before continuing the program. Modeless dialog boxes
/* 
2.a) It defines the Modal component, which takes two props: children: This prop is used to render the content inside the modal. onClose: This prop is a function that is called when the user clicks on the close button of the modal.
2.b) ReactDom.createPortal() - this will helps in creating popup on screen
*/ 
// 3) Till now we are doing evry thing on single page and the whole code was wrapped inside <div id="root"></div> but now as this cart will come on screen as popup so its a now page so we used modals and inside did createPortal
// 4) then we go index.html file and there we added another div for this pop to diplay 
// 5) when this function will be called it will send this popup code as children and will be displayed inside div
// 6) now we have written the code for modal.js but to execute it we go to navbar

import React from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'rgb(34,34,34)',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '90%',
  width: '90%'
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

export default function Modal({ children, onClose }) {

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button className='btn bg-danger fs-4' style={{ marginLeft: "90%", marginTop: "-35px" }} onClick={onClose}> X </button>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  )
}