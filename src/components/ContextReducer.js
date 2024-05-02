// 1) Here we made this file because there are multiple add to cart button so it is now possible to create a seperate function for each cart so insted of using useState here we will use useReducer
// 2) Call from one function to another is easy but calling from one function to another function child then child is complicated this is called props drilling to overcome this we will use context
// 3) we wrap whole applicaiton with context provider 
// 4) then we did rfc removed every thing and written our code then we created a global variable so that it can be accessed any where in code and assigned this vribale to createContext() {contextAPI}
// 5) conetxtAPI - allows you to share data between components without having to pass props manually through every level of the component tree.
// 6) Then we made a global varibale CartDispatchContext and made this createContext then we made const [state,dispatch] and assigned this hook useReducer();
// 7) here we are not using state {like we create state and do onClick and it executes}
// 8) then we created a reducer function it will perform all the action which ever is happening in frontend (adding to cart, deleting)
// 9) inside cartprovider function we used hook usereducer which will send two thing 1) reducer fucntion 2) empty array 
// 10) then we go to app.js 
// 11) here we export the two variables and we go to home.js
// 12) in reducer we use switch-case so we did that i.e. switch-case to get the data and add those data in cart
// 13) so to get data in this way and assign to the variable
// 14) then we go to card.js
// 16) then we go to cart.js to update this remove functinality in delete button
// 17) here we create case for update. In update we check id of food entred now and id food akready present if same we add price and qty of new item get update
// 18) now we create a file Orders.js in model backend
// 19) then we created a case for DROP in which we returned an empty array so no data will display in cart and go to cart.js

import React, { createContext, useContext, useReducer } from 'react'


const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {

    switch(action.type){
        case "ADD":
            return[...state,{id:action.id, name:action.name, qty:action.qty, size:action.size, price:action.price, img:action.img}]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index,1)
            return newArr;    
        case "UPDATE":
            let arr = [...state];
            arr.find((food, index)=>{
                if(food.id === action.id){
                    console.log(food.qyt, parseInt(action.id), action.price, food.price)
                    arr[index] = {...food, qty:parseInt(action.qty)+food.qty, price:action.price+food.price}
                }
                return arr;
            })
            return arr;
        case "DROP":
            let empArray = []
            return empArray    
        default:
            console.log("Error in reducer")
    }
}

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, []);
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext (CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);