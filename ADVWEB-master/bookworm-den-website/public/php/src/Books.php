<?php
    namespace bookstore;

    use bookstore\Database;

    class Books extends Database {

        public function __construct() {
            parent::__construct();
        }

        public function getBooks(){
            $query = "SELECT * FROM book";
            $statement = $this -> connection -> prepare($query);

            // If running this statement fails
            if($statement -> execute() == false){
                echo "query or database error";
            }
            else {
                $result = $statement -> get_result();
                $books = array();
                // Loop through the result to add each book
                // Row represents a row in the book table
                // fetch_assoc() converts a row into an associative array
                // Example: ["book id" => 1, "book title" => "Save the cat!"]
                while( $row = $result -> fetch_assoc() ) {
                    array_push( $books, $row );
                }
                return $books;
            }
        }
    }

?>