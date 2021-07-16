import { useState, useEffect } from "react";

export function Home( props ) {

    const [ data, setData ] = useState([])
    const dataURL = "http://localhost:8080/advanced-web/my-app/build/php/book.php";

    useEffect(() => {
        if(data.length === 0){
            fetch( dataURL )
            .then( ( response ) => { response.json() })
            .then( ( jsonData ) => { setData(jsonData) })
            .catch( ( error ) => { console.log(error) })
        }
    }) 

    if( data.length === 0 ) {

        return(
            <div className="home">
                <h2>Homepage - getting data...</h2>
            </div>
        )
    }
    else {
        const Books = data.map( (item) => {
            return(
                <h3>(item.book_title)</h3>
            )
        })
        return(
            <div className="home">
                <h2>Books</h2>
                { Books }
            </div>
        )
    }
}