import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import {Spinner} from './Spinner'
import { Reviews } from "./Reviews";
import ReactStars from "react-rating-stars-component";
import React from "react";
import { render } from "react-dom";

export function Detail(props) {
  const [book, setBook] = useState()
  const [favourites,setFavourites] = useState()
  const [showReview, setShowReview] = useState(false)
  const [bookReviews,setBookReviews] = useState()
  // disable review button if user has reviewed the book
  const [disableReview, setDisableReview] = useState( false )
  // disable favourite button if user has added the book
  const [disableFavs,setDisableFavs] = useState(false)


  const { bookId } = useParams()
  const history = useHistory()
  

  useEffect(() => {
    if (!book) {
      props.handler(bookId)
        .then((bookData) => setBook(bookData))
        .catch((error) => console.log(error))
    }
    if( !bookReviews ) {
      props.getReviews( bookId )
      .then( (result) => {
        setBookReviews( result )
      })
      .catch( (error) => console.log(error) )
    }
    // get favourites here
  })

  useEffect( () => {
    if( bookReviews && props.user ) {
      bookReviews.forEach( (review) => {
        if( review.userId == props.user.uid ) {
          setDisableReview( true )
        }
      })
    }
    // check if user has this book in favourites, disable fav button if yes
  }, [bookReviews])


  const addReview = () => {
    if( props.auth === true ) {
      // console.log('can write review')
      setShowReview( true )
    }
    else {
      // if user is not logged in take them to login page and set this page as a return path,
      // so user can be taken back here after login/ register
      history.push(`/login?returnPath=book/${bookId}&msg=${escape("Log in to review "+book.title)}`)
    }
  }

  const handleReview = ( event ) => {
    event.preventDefault()
    const data = new FormData( event.target )
    let review = {}
    data.forEach( (value,key) => review[key] = value )
    props.reviewHandler( review )
      .then( () => {
        setDisableReview(true)
        setShowReview(false)
      } )
      .catch( error => console.log(error) )
  }

  const addToFavourites = () => {
    if( props.auth === true ) {
      console.log('can add favourite')
    }
    else {
      history.push('/login/'+bookId)
    }
  }

  const starRating = {
    size: 24,
    count: 5,
    isHalf: false,
    value: 0,
    activeColor: "yellow",
    onChange: newValue => {
      //console.log(`Selected rating is: ${newValue}`);
      return newValue;
    }
  };

  if (!book) {
    return <Spinner size={64}/>
  }
  else {
    return (
      
      <div className="container-fluid">

        {/* Book info section */}
        <div className="bg-custom-blue text-light p-5">
          <div className="row">
            <div className="col-md-auto">
              <img 
              className="img-fluid rounded" 
              src={book.cover_image} 
              style={{width: 'auto', height: '400px'}}
                />
            </div>

            <div className="col-md-auto" style={{marginLeft:'30px'}}>
              <h3>{book.title} ({book.year})</h3>
              <h5>Author(s): {book.author}</h5>
              <p>Series: {book.series}</p>
              <p>Publisher: {book.publisher}</p>
              <p>Genre(s): {book.genres}</p>
              <p>{book.pages} pages</p>
              <p>ISBN {book.isbn13} {book.isbn10}</p>
              
                <button 
                  type="button" 
                  className="btn btn-custom-blue"
                  onClick={addToFavourites}
                  >
                    Add to Favourites
                </button>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-auto">
              <h5>Synopsis</h5>
              <p>{book.synopsis}</p>
            </div>
          </div>          
        </div>

  
        {/* Review section */}
        <div className="bg-custom-brown text-light p-5">
          <div className="row">
          <Reviews items={bookReviews}/>
          <p className="text-center mt-4">Did you read this book? Tell us what you think!</p>
            <div className="d-flex justify-content-center">
              <button 
                type="button" 
                className="btn btn-custom-blue"
                onClick={addReview}
                >
                  Leave a review
              </button>
            </div>

            <div className="mt-5" style={{display: (showReview === true) ? "block" : "none"}}>
              <h5>Review {book.title} ({book.year}) by {book.author}</h5>
              <form id="review" onSubmit={handleReview}>
                <label htmlFor="stars" className="mt-2">Your rating</label>

                {/* Needs to be fixed */}

                <ReactStars {...starRating} />
                <input type="hidden" name="stars" id="stars" defaultValue="0" value={starRating.onChange} />

                {/* <select className="form-select bg-custom-beige mt-2" name="stars" id="stars" defaultValue="5">
                      <option value="1">1 star</option>
                      <option value="2">2 stars</option>
                      <option value="3">3 stars</option>
                      <option value="4">4 stars</option>
                      <option value="5">5 stars</option>
                    </select>
                 */}
                 
                <label className="mt-2">Your review (no spoilers!)</label>
                <textarea name="comment" cols="30" rows="3" className="form-control bg-custom-beige mt-2 review-form-custom" placeholder="This book made me feel..."></textarea>
                <input type="hidden" name="bookId" value={bookId} />
                <input type="hidden" name="userId" value={(props.user) ? props.user.uid: ""} />
                <input type="hidden" name="userName" value={(props.user) ? props.user.displayName : ""} />
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-custom-blue m-4">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}