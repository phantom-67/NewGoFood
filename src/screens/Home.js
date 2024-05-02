// 1) Here we are importing navbar, card, footer and made a <div>body</div>
// 2) Then in place of body we added card
// 3) We added margin className='m-3' for card so that they look good then we go to card.js and added code
// 4) Then we called card 3-4 times so 3-4 cards displayed on screen
// 5) Then we called the footer
// 6) Now in home screen i need to show food itmes so i will fetch the food items and food category information here
// 7) for fetching data from backend we use useState hook then inside loadData function we made the end point and imported it
// 8) we fetch the response and its type to json and since the result returned is an array so we did console.log(response[0],response[1])
// 9) then we used useEffect hook (In your React functional component Home, you're using the useEffect hook to load data from an API when the component mounts.)
// 10) After we fetching data we set the data. (Study about hooks)
// 11) Earlier we are calling card 3-4 times now we'll put it inside container and use mapping to fetch data and diplay on home screen
// 12) For the card inside container we made a ternary operation if foodCat is not empty then return food category and to make every category get identified uniquely we provided a key which'll have id of the data
// 13) Then we customised hwo data should look using bootstrap library className and used <hr /> tag to differentiate and used ternary operator for food items
// 14) So what we are doing is first we made a ternary operation for food category is empty or not if not then we return (display) the category name then we did ternary for food items if not empty then since both food_items and foodCategory have categoryName as common
//     so we compared both and if they are same we returned that much card.
// 15) Now we changed the view according to platform for mobile, tablet and pc for whcih we usee bootstrap Grif system {https://getbootstrap.com/docs/4.1/layout/grid/}
// 16) for making in grid we added className="row mb-3" in first return and in second return we added classname='col-12 col-md-6 col-lg-3' so it will get distributed into 12,6,3
// 17) then inside card we added react props to change name, option, img then we go to card.js
// 18) we have made Carousal a compoent (code which is to be used again and again) but carousal is related to search bar so we go to carousal and copy the code and paste here in place of <div><Carousal /x></div>
// 19) then remove importeded carousal statement then use useState for search and changed initial value to empty string
// 20) then in search bar code we changed form to div and add justify-content-center
// 21) then in classname form-control we added value={search} onChange={(e)=>setSearch{e.target.value}}
// 22) then in filter we added one more condition item.name.toLowerCase().includes(search.toLowerCase())
// 23) then we go to card.js and added props for image
// 24) ealier we were sending card details as <Card foodName={filterItems.name} options={filterItems.options[0]} imgSrc={filterItems.img}></Card> now here we will only leave options and rest we remove
// 25) then we send all data in foodItem then we go to Card.js


import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {

  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search,setSearch] = useState('');

  const loadData = async () => {
    let response = await fetch("http://localhost:4000/api/foodData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json()
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    // console.log(response[0], response[1])
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <div><Navbar /></div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain" }}>
          <div className="carousel-inner" id="carousal">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)} />
                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://source.unsplash.com/random/300×300/?Burger" className="d-block w-100" style={{ objectFit: "cover",filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/300×300/?Pasta" className="d-block w-100" style={{ objectFit: "cover",filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/300×300/?Pastry" className="d-block w-100" style={{ objectFit: "cover",filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {
          foodCat.length !== 0
            ? foodCat.map((data) => {
              return (
                <div className='row mb-3'>
                  <div key={data._id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr />
                  {
                    foodItem.length !== 0
                    ? foodItem.filter(item => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                        .map(filterItems => {
                          return (
                            <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                              <Card foodItem={filterItems}
                                options={filterItems.options[0]}
                              ></Card>
                            </div>
                          )
                        }) : " "
                  }
                </div>
              )
            }) : " "
        }
      </div>
      <div><Footer /></div>
    </div >
  )
}

