import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
        <div className="col-md-3 my-2 zoom" key={key}>
          <div className="card position-relative">
            <Link 
            className="position-absolute" 
            to={"book/" + item.id } 
            style={{top:0,bottom:0,left:0,right:0}}/>
            <img 
            src={item.cover_image} 
            className="card-img-top" 
            alt={item.title} 
            style={{width: '100%', height: '300px', objectFit: 'scale-down', objectPosition: 'center'}}
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

          <div className="row mt-4">
            <img src = ""></img>
          </div>

          <div className="row mt-4 mb-4 justify-content-center">
          { Books }
          </div>

          <div className="row mt-4 mb-4 justify-content-space-between">

            <div className="col-md-6">
              <h4 className="text-center">Some book news</h4>
              <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                nisi ut aliquip ex ea commodo consequat.</p>
            </div>

            <div className="col-md-4">
              <div className="row mt-4 text-center">
                <p>(book cover goes here)</p>
              </div>
              <div className="row mt-4 text-center">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
              </div>
            </div>
          </div>
      </div>
       
    )
  }
  
}