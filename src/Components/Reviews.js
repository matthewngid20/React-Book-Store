import { useState,useEffect } from "react";
export function Reviews ( props ) {
  const [reviews,setReviews] = useState()

  useEffect( () => {
    if( !reviews ) {
      setReviews( props.items )
    }
  },[props.items])

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
        <div className="col-md-4">
          <div className="card my-2 bg-custom-review" key={key}>
            <div className="card-body" >
              <Stars number={item.stars}/>
              <p className="card-title mt-3">{item.comment}</p>
            </div>
          </div>
        </div>
      )
    })
    return(
    <div className="reviews">
      <h3 className="text-center">Reviews</h3>
      <p className="text-center mb-4">({reviews.length} reviews)</p>
      <div className="row">
        {ReviewItems}
      </div>
    </div>
  )}
  else {
    return <p>No reviews yet. Be the first to review!</p>
  }
}