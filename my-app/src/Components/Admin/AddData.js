import { useState } from 'react'

export function AddData( props ){
    const [message,setMessage] = useState()
    const [error,setError] = useState( false )

    const submitHandler = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        event.target.reset()
        const obj = new Object()
        formData.forEach( (value,key) => {
            obj[key] = value
        } )
        // Upload image to get url
        if( obj.cover_image ){
            const string = Math.random().toString(36).substr(2,5)
            const name = obj.cover_image.name
            const title = obj.title
            // To remove spaces:
            //const title = obj.title.split('').join('')
            const path = 'books/' + string + title + name
            props.imageHandler( path, obj.cover_image )
            .then( (url) => {
                obj.cover_image = url
                props.handler( obj )
                .then ( (response) => {
                    setMessage('The book has been added successfully!')
                    setError( false )
                } )
                .catch( (error) => {
                    setMessage('There has been an error!')
                    setError( true )
                } )
            })
            .catch( (error) => console.log(error) )
        }
        else { 
            console.log('Need image')
        }
    }

    const Feedback = ( props ) => {
        setTimeout( () => {
            setMessage(null)
            setError(false)
        }, props.duration )
        return(
            <div className={ (error) ? "alert alert-danger" : "alert alert-success" }
            style={{ display: (message) ? "block" : "none" }} >
                { props.content }
            </div>
        )
    }
    

    return(
        <form id="add-data" onSubmit={ submitHandler } >
            <label htmlFor="title">Book Title</label>
            <input type="text" className="form-control" name="title" placeholder="Book Title" id="title"/>
            
            <label htmlFor="tagline">Tagline</label>
            <input type="text" className="form-control" name="tagline" placeholder="Tagline" id="tagline"/>

            <div className="row">
                <div className="col-md-6">
                    <label htmlFor="isbn13">ISBN13</label>
                    <input type="text" className="form-control" name="title" placeholder="ISBN13" id="isbn13"/>
                    </div>
                    <div className="col-md-6">
                    <label htmlFor="isbn10">ISBN10</label>
                    <input type="text" className="form-control" name="isbn10" placeholder="ISBN10" id="isbn10"/>
                </div>
            </div>

            <label htmlFor="author">Author</label>
            <input type="text" className="form-control" name="author" placeholder="Author" id="author"/>

            <label htmlFor="publisher">Publisher</label>
            <input type="text" className="form-control" name="title" placeholder="Publisher" id="publisher"/>

            <label htmlFor="year">Year</label>
            <input type="number" className="form-control" name="year" placeholder="Year" id="year"/>

            <label htmlFor="pages">Pages</label>
            <input type="number" className="form-control" name="pages" placeholder="Pages" id="pages"/>

            <label htmlFor="cover_image">Cover Image</label>
            <input type="file" className="form-control" name="cover_image" placeholder="Cover image" id="cover_image"/>

            <div className="buttons row d-flex flex-row">
                <button type="reset" className="btn btn-secondary">Reset</button>
                <button type="submit" className="btn btn-primary">Add Book</button>
            </div>
            <Feedback duration={3000} content={message} />
            
        </form>
    )
} 