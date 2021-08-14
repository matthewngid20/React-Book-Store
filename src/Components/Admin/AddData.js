import { useState } from 'react'

export function AddData(props) {
  const [message,setMessage] = useState()
  const [error,setError] = useState(false)

  const submitHandler = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    event.target.reset()
    const obj = new Object()
    formData.forEach((value, key) => {
      obj[key] = value
    })
    // upload image to get the url
    if (obj.cover_image) {
      const string = Math.random().toString(36).substr(2, 5)
      const name = obj.cover_image.name
      const title = obj.title
      // const title = obj.title.split(' ').join('')
      const path = 'books/' + string + title + name
      props.imageHandler(path, obj.cover_image)
        .then((url) => {
          obj.cover_image = url
          props.handler(obj)
            .then((response) => {
              setMessage('The book has been added!')
              setError(false)
            } )
            .catch((error) => {
              setMessage('There has been an error!')
              console.log(error)
              setError(true)
            })
        })
        .catch((error) => console.log(error))
    }
    else {
      console.log('need image')
    }
  }

  const Feedback = (props) => {
    setTimeout( () => {
      setMessage(null)
      setError(false)
    }, props.duration )
    return(
      <div className={ (error) ? "alert alert-danger" : "alert alert-success" }
      style={{ display: (message) ? "block" : "none" }}>
        {props.content}
      </div>
    )
  }

  return (
    <div className="bg-custom-blue text-light p-5 d-flex justify-content-center">
      <div className="col-md-8">
        <form id="add-data" onSubmit={submitHandler}>
          <h3 className="text-center">Add a book</h3>
          <label htmlFor="title">Book Title</label>
          <input type="text" className="form-control" name="title" placeholder="Book title" id="title" />
          <label htmlFor="series">Series</label>
          <input type="text" className="form-control" name="series" placeholder="Book series" id="series" />

          <div className="row">
            <div className="col-md-6">
              <label htmlFor="isbn13">ISBN 13</label>
              <input type="text" className="form-control" name="isbn13" placeholder="ISBN 13" id="isbn13" />
            </div>
            <div className="col-md-6">
              <label htmlFor="isbn10">ISBN 10</label>
              <input type="text" className="form-control" name="isbn10" placeholder="ISBN 10" id="isbn10" />
            </div>
          </div>
          <label htmlFor="author">Author(s)</label>
          <input type="text" className="form-control" name="author" placeholder="Separate multiple authors with comma" id="author" />
          <label htmlFor="genres">Genre(s)</label>
          <input type="text" className="form-control" name="genres" placeholder="Separate multiple genres with comma" id="genres" />
          <label htmlFor="synopsis">Synopsis</label>
          <textarea className="form-control" name="synopsis" placeholder="Book synopsis" id="synopsis" rows="3" />
          <label htmlFor="publisher">Publisher</label>
          <input type="text" className="form-control" name="publisher" placeholder="Book publisher" id="publisher" />
          <label htmlFor="year">Year</label>
          <input type="number" className="form-control" name="year" placeholder="Year published" id="year" />
          <label htmlFor="pages">Pages</label>
          <input type="number" className="form-control" name="pages" placeholder="Pages" id="pages" />
          <label htmlFor="cover_image">Image</label>
          <input type="file" className="form-control" name="cover_image" placeholder="Cover image" id="cover_image" />
          <div className="mt-3 buttons d-flex flex-row justify-content-between">
            <button type="submit" className="btn btn-custom-blue">Add Book</button>
            <button type="reset" className="btn btn-danger">Clear</button>
          </div>
          <div className="my-2">
            <Feedback duration={3000} content={message} />
          </div>
        </form>
      </div>
    </div>
  )
}