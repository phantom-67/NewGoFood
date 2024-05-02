// 1) In place of <div>Card</div>, body we are adding card by searching bootstrap v5 card {https://getbootstrap.com/docs/5.0/components/card/} and copied on card
// 2) Then we change the class -> className and style here is done by key value pair wise we set margin, height.
// 3) Then we made a className container and inside that we have made a select and customized it.
// 4) Inside select we'll use javascript (what ever written inside {} willbe considered as js)
// 5) Inside this we created a dropdown button using select with number 1-6 for quantity one dropdown using option for size(half, full) and then final price
// 6) Then to add photos of product we searched a photo in internet and coped the url and pasted it in <img src>
// 7) then we access props Card(props) and inplace of card title, card text we used props 
// 8) to acccess data {props.foodName} we used like this foodName is defined in home.js
// 9) Now for options we use mapping because options is a an array of result, so we removed half and full and code there to access data using map we return key(half,full) and value(price)
// 10) then we go to home.js
// 11) then we added props for image also and in image we added style so all images of the foods are equal in size then we go to navbar
// 12) then we create a file ContextReducer.js
// 13) then we import import { useDispatchCart, useCart } from './ContextReducer'; and we used the variable foodItem and earlier we are displaying image like src={props.imgSrc} and now src={props.foodItem.img}
// 16) similarlly changed <h5 className="card-title">{props.foodName}</h5> --> <h5 className="card-title">{props.foodItem.name}</h5>
// 17) then we used useState Hooks and set the default value for items i.e. value as 1 and size as empty.
// 18) then inside handleaddtocart we dispatch it,item name,qty, size and changed this function to async-await and then we added onChange to change the value
// 19) then we go to ContextReducer.js
// 20) then we made a variable data and called useCart() and console.log that data inside handleaddtocart
// 21) Then in place of total price we made called finalprice and made a final price before return 
// 22) then we used useRef() hook to create refrence and used that refrence in onChange={(e)=>setSize(e.target.value) like this ref={priceRef} onChange={(e)=>setSize(e.target.value)
// 23) then we created a useEffect for first load we passed empty array [] then from second rendor we set the size then we go to navbar
// 24) now we go to navbar.js to display the count of items in cart
// 25) now we'll write code for update cart so, in handleaddtocart function we'll create a array of and store the elemnt whose id matched with id of food in our server stored
// 26) then we check if food array length is not zero then we update size accordig to their id's and in else if is size is different we nned to add it to cart not update it
// 27) then we go to contextreducer.js and create code for update

import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {

    let options = props.options;
    let priceOptions = Object.keys(options);
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("")

    const handleaddtocart = async () => {
        let food = []
        for(const item of data){
            if(item.id === props.foodItem._id){
                food=item;
                break;
            } 
        }

        if(food.length !== 0){
            if(food.size===size){
                await dispatch({type:"UPDATE", id:props.foodItem._id, price:finalPrice, qty:qty})
                return;
            }
            else if(food.size !== size){
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
                return;
            }
            return;
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
    }

    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value);
    }, [])

    return (
        <div>
            <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className='container w-100'>
                        <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                            {
                                Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}> {i + 1} </option>
                                    )
                                })
                            }
                        </select>
                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                        <div className='d-inline h-100 fs-5'>
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    <div className='btn bg-success text-white justify-center m-2' onClick={handleaddtocart}>Add to cart</div>
                </div>
            </div>
        </div>
    )
}

