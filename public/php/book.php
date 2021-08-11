<?php
    require('vendor/autoload.php');

    use bookstore\Books;

    $books = new Books();

    $books_results = $books -> getBooks(); 

    //print_r( $book_results );

    echo json_encode( $books_results );

?>