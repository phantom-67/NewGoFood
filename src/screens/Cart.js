// 1) first we did rfc and copied code from and do to app.js
// 2) then we made a simple code of table and provided header for the table
// 3) then we changed class-->className and styling how it is done in bootstrap
// 4) then we imported useCart and UseDispatchCart to detch data that we have added in an array in ContextReducer
// 5) then we create a new file modals in src folder
// 6) { dispatch({ type: "REMOVE", index: index })  through this code when delete button will be clicked dispatch will run
// 7) then we go to card.js
// 8) then we created handleCheckOut function which will fetch data from backend and send this data to OrderData file data contains emial, data and data of body
// 9) and we created a dispatch for drop (status 200 means status true) and then we go to contextreducer.js file to create a case for drop so cart gets empty after checkout 
// 10) then on checkout button we added onclick event
// 11) then we do to OrderData.js to create function to fetch data from backend for that user


import React from 'react'
import trash from '../screens/trash.jpeg';
import { useCart, useDispatchCart } from '../components/ContextReducer'

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>This Card is Empty!</div>
            </div>
        )
    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        let response = await fetch("http://localhost:4000/api/orderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        }
        );
        if(response.status===200){
            dispatch({type:"DROP"})
        }
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <div >
            {console.log(data)}
            < div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
                <table className='table table-hover '>
                    <thead className=' text-success fs-4'>
                        <tr>
                            <th scope='col' >#</th>
                            <th scope='col' >Name</th>
                            <th scope='col' >Quantity</th>
                            <th scope='col' >Option</th>
                            <th scope='col' >Amount</th>
                            <th scope='col' ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr>
                                <th scope='row' >{index + 1}</th>
                                <td >{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td ><button type="button" className="btn p-0"><img src={trash} alt='delete' style={{ width: '25px', height: '25px' }} onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-success mt-5 '  onClick={handleCheckOut}> Check Out </button>
                </div>
            </ div>
        </div>
    )
}

