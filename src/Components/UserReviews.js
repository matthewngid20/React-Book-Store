import { useState,useEffect } from "react";

export function UserReviews ( props ) {

  const [reviews,setReviews] = useState()

    // Display user's past reviews
    useEffect( () => {
      if( !reviews ) {
        setReviews( props.items )
      }
    },[props.items])

    // Show stars
    const Stars = (props) => {
      let elements = []
      // stars is out of 5, so if i < number of stars add 1 else add 0
      // so for 1 star, array will be [1,0,0,0,0]
      for( let i=0; i<5; i++) {
        elements.push( (i < props.number) ? 1 : 0 )
      }
      
      const Items = elements.map( (item) => {
        if( item === 1 ) {
          // return solid star if value is 1
          return <i className="fas fa-star" style={{color:"yellow"}}></i>
        }
        else {
          // return empty star otherwise (value is 0)
          return <i className="far fa-star" style={{color:"yellow"}}></i>
        }
      })
      
      return(
        <div className="d-flex">
          {Items}
        </div>
      )
    }

    if( reviews ) {
      const ReviewItems = reviews.map( (item,key) => {
        return (
            <div key={key}>
              <div className="col">
                <Stars number={item.stars}/>
                <p>{item.comment}</p>
              </div>
            </div>
        )
      })
      return(
      <div className="reviews">
        <p>You left {reviews.length} reviews:</p>
        <div className="row">
          {ReviewItems}
        </div>
      </div>
    )}
    else {
      return <p>You haven't left any review yet.</p>
    }
}


