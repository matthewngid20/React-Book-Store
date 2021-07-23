export function AddData( props ){
    return(
        <form id="add-data">
            <label htmlFor="title">Book Title</label>
            <input type="text" className="form-control" name="title" placeholder="Book Title" id="title"/>
            
            <label htmlFor="tagline">Tagline</label>
            <input type="text" className="form-control" name="tagline" placeholder="Tagline" id="tagline"/>

            <label htmlFor="isbn13">ISBN13</label>
            <input type="text" className="form-control" name="title" placeholder="ISBN13" id="isbn13"/>

            <label htmlFor="isbn10">ISBN10</label>
            <input type="text" className="form-control" name="isbn10" placeholder="ISBN10" id="isbn10"/>

            <label htmlFor="author">Author</label>
            <input type="text" className="form-control" name="author" placeholder="Author" id="author"/>

            <label htmlFor="publisher">Publisher</label>
            <input type="text" className="form-control" name="title" placeholder="Publisher" id="publisher"/>

            <label htmlFor="year">Year</label>
            <input type="number" className="form-control" name="year" placeholder="Year" id="year"/>

            <label htmlFor="pages">Pages</label>
            <input type="number" className="form-control" name="pages" placeholder="Pages" id="pages"/>

            <label htmlFor="cover_image">Cover Image</label>
            <input type="text" className="form-control" name="cover_image" placeholder="Cover image" id="cover_image"/>

            <div className="buttons row d-flex flex-row">
                <button type="reset" className="btn btn-secondary">Reset</button>
                <button type="submit" className="btn btn-primary">Add Book</button>
            </div>
            
        </form>
    )
} 