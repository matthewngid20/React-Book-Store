<?php
    namespace bookstore;

    class Database {
        private $host;
        private $username;
        private $password;
        private $databasename;
        protected $connection;

        protected function __construct(){
            $this -> host = "localhost";
            $this -> username = "website";
            $this -> password = "password";
            $this -> databasename = "Heartbooks";
            $this -> connection = mysqli_connect(
                $this -> host,
                $this -> username,
                $this -> password,
                $this -> databasename
            );
        }

        protected function getConnection(){
            return $this -> connection;
        }
    }

?>