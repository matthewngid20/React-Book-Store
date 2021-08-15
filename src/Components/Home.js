import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../App.css';
import image from '../resources/website_banner.png';
import imageNews from '../resources/book_news.jpg'

import { Spinner } from "./Spinner";

export function Home ( props ) {
  const [ data, setData ] = useState()
 
  useEffect( () => {
    setData( props.data )
  }, [props.data] )
  

  if( !data ) {
    return(
      <Spinner size={64} />
    )
  }
  else {
    const Books = data.map( (item, key) => {
      return(
        <div className="container-slider col-md-3 my-2 zoom" key={key}>
          <div className="card book position-relative bg-custom-beige text-custom">
            <Link 
            className="position-absolute" 
            to={"book/" + item.id } 
            style={{top:0,bottom:0,left:0,right:0}}/>
            <img 
            src={item.cover_image} 
            className=" book-shadow card-img-top " 
            alt={item.title} 
            style={{width: '100%', objectFit: 'scale-down', objectPosition: 'center'}}
            />
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p>by {item.author}</p>
            </div>
          </div>
        </div>
      )
    })
    return(
      <div className="home">

          <div className="row">
            <img src={image} className="img-fluid" style={{width:'100%', height:'100%'}}/>
          </div>

          <div className="row justify-content-center bg-custom-beige text-center">
          { Books }
          </div>
          <div className="row justify-content-center bg-custom-blue text-light align-items-center">
            <div className="col-md-6">
              <h4 className="text-center">Some book news</h4>
              <p className="m-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            <div className="col-md-4 p-3">
              <div className="row mt-4 text-center">
              <img src={imageNews} className="img-fluid rounded  mx-auto d-block" style={{width:'auto', height:'250px'}}/>
              </div>
              <div className="row mt-4 mx-3 text-center">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
              </div>
            </div>
          </div>
      </div>
    )
  }
  
}