import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import {Spinner} from './Spinner'

export function Detail(props) {
  const [book, setBook] = useState()
  const [showReview, setShowReview] = useState(false)

  const { bookId } = useParams()
  const history = useHistory()
  

  useEffect(() => {
    if (!book) {
      props.handler(bookId)
        .then((bookData) => setBook(bookData))
        .catch((error) => console.log(error))
    }
  })

  const addReview = () => {
    if( props.auth === true ) {
      // console.log('can write review')
      setShowReview( true )
    }
    else {
      history.push(`/login?returnPath=book/${bookId}`)
    }
  }

  const handleReview = ( event ) => {
    event.preventDefault()
    const data = new FormData( event.target )
    let review = {}
    review.stars = data.get('stars')
    review.comment = data.get('comment')
    review.book = bookId
    review.user = props.user.uid
    props.reviewHandler( review )
      .then( res => console.log(res) )
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

  if (!book) {
    return <Spinner size={64}/>
  }
  else {
    return (
      <div className="row mt-4">
        <div className="col-md-6">
          <img className="img-fluid" src={book.cover_image} />
        </div>
        <div className="col-md-6">
          <h3>{book.title}</h3>
          <h4>By {book.author}</h4>
          <p>{book.pages} pages</p>
          <p>ISBN {book.isbn13} {book.isbn10}</p>
          <p>Published by {book.publisher}</p>
          <p>Year {book.year}</p>
          <div className="d-flex">
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={addReview}
              >
                Review book
            </button>
            <button 
              type="button" 
              className="btn btn-primary ms-2"
              onClick={addToFavourites}
              >
                Add to Favourites
            </button>
          </div>
          <div className="mt-4" style={{display: (showReview === true) ? "block" : "none"}}>
            <h5>Review {book.title}</h5>
            <form id="review" onSubmit={handleReview}>
              <label htmlFor="stars">Stars</label>
              <select className="form-select" name="stars" id="stars">
                <option value="1">1 star</option>
                <option value="2">2 stars</option>
                <option value="3">3 stars</option>
                <option value="4">4 stars</option>
                <option value="5">5 stars</option>
              </select>
              <label>Say something about the book (no spoilers!)</label>
              <textarea name="comment" cols="30" rows="3" className="form-control" placeholder="I love this book..."></textarea>
              <button type="submit" className="btn btn-success mt-2">Save</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}