// 1) Search carousal bootstrap 5 {https://getbootstrap.com/docs/5.0/components/carousel/} and copy the code and paste of crossFade
// 2) Make changes --> close image tag, class --> className
// 3) Goto {https://awik.io/generate-random-images-unsplash-without-using-api/} and copy link of 'Specific sizes' and paste in img src, then at last of url we added '?Item name(like burger,pasta,etc)'
// 4) Run command npm i - bootstrap-dark-5 bootstarp react-bootstrap in terminal and then go to App.js and import bootstrap
// 5) Now we made a <div className="carousal-capiton"></div> inside this we added code of search bar from {https://getbootstrap.com/docs/5.0/components/navbar/}
// 6) The search bar is not getting displaed so we have addes style{{zIndex:"10"}} in className="carousal-capiton" 
// 7) For the imagess we have added brightness of 30% --> style={{filter:"brightness 30%"}}
// 8) in id="carouselExampleFade" we have added stylestyle={{objectFit:"contain"}}

import React from 'react'

export default function () {
    return (
        <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain"}}>
                <div className="carousel-inner" id="carousal">
                    <div className="carousel-caption" style={{zIndex:"10"}}>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/300×300/?Burger" className="d-block w-100" style={{ filter: "brightness 30%" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/300×300/?Pasta" className="d-block w-100" style={{ filter: "brightness 30%" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/300×300/?Pastry" className="d-block w-100" style={{ filter: "brightness 30%" }} alt="..." />
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
    )
}