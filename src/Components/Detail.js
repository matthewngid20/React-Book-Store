import { useState, useEffect } from "react";
import { useParams, useHistory,useLocation} from "react-router";
import {Spinner} from './Spinner'
import { Reviews } from "./Reviews";
import ReactStars from "react-rating-stars-component";
import React from "react";
import { render } from "react-dom";

const useQuery = () => {
  return new URLSearchParams( useLocation().search )
}

export function Detail(props) {
  const [book, setBook] = useState()
  const [favourites,setFavourites] = useState()
  const [showReview, setShowReview] = useState(false)
  const [bookReviews,setBookReviews] = useState()
  const [message,setMessage] = useState()
  const [returnPath,setReturnPath] = useState()
  // disable review button if user has reviewed the book
  const [disableReview, setDisableReview] = useState( false )
  // disable favourite button if user has added the book
  const [disableFavs,setDisableFavs] = useState(false)


  const { bookId } = useParams()
  const history = useHistory()
  const query = useQuery()

  useEffect( () => {
    const path = query.get('returnPath')
    if( path !== undefined ) {
      setReturnPath( path )
    }
  })

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
  const [rating, setRating] = useState(0) // initial rating value

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate)
    // Some logic
  }
  const starRating = {
    size: 24,
    count: 5,
    isHalf: false,
    value: 0,
    activeColor: "yellow",
    onChange: handleRating
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

        {/* Purchase section */}
        <div className="bg-custom-beige text-custom p-5">
        <h3 className="text-center">Where to read</h3>
          <table className="table table-bordered mt-5 text-dark text-center">
            <thead>
              <tr>
                <th colspan="2"><h5>Hardback</h5></th>
                <th colspan="2"><h5>Paperback</h5></th>
                <th colspan="2"><h5>eBook</h5></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">Edition 1 - $24.99</td>
                <td><i className="fas fa-cart-plus" style={{fontSize:'24px'}}></i></td>
                <td scope="row">Edition 1 - $24.99</td>
                <td><i className="fas fa-cart-plus" style={{fontSize:'24px'}}></i></td>
                <td scope="row">Edition 1 - $24.99</td>
                <td><i className="fas fa-cart-plus" style={{fontSize:'24px'}}></i></td>
              </tr>
              <tr>
                <td scope="row">Edition 2 - $19.99</td>
                <td><i className="fas fa-cart-plus" style={{fontSize:'24px'}}></i></td>
                <td scope="row">Edition 2 - $19.99</td>
                <td><i className="fas fa-cart-plus" style={{fontSize:'24px'}}></i></td>
                <td scope="row">Edition 2 - $19.99</td>
                <td><i className="fas fa-cart-plus" style={{fontSize:'24px'}}></i></td>
              </tr>
              <tr>
                <td scope="row">Edition 3 - $24.99</td>
                <td><i className="fas fa-cart-plus" style={{fontSize:'24px'}}></i></td>
                <td scope="row">Edition 3 - $24.99</td>
                <td><i className="fas fa-cart-plus" style={{fontSize:'24px'}}></i></td>
                <td scope="row">Edition 3 - $24.99</td>
                <td><i className="fas fa-cart-plus" style={{fontSize:'24px'}}></i></td>
              </tr>
            </tbody>
          </table>
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
                <ReactStars {...starRating} />
                <input type="hidden" name="stars" id="stars" defaultValue="0" value={rating} />
                <label className="mt-2">Your review (no spoilers!)</label>
                <textarea name="comment" cols="30" rows="3" className="form-control bg-custom-beige mt-2 review-form-custom" placeholder="This book made me feel..."></textarea>
                <input type="hidden" name="bookId" value={bookId} />
                <input type="hidden" name="userId" value={(props.user.email)} />
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