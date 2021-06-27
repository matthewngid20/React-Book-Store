<?php

    // Variables start with $
    $name = "Person";
    $day = "Friday";
    $date = 18;
    $test = "Hello php";

    // String concatenation
    echo "Hello, " . $name . " Today is " . $day;
    echo "<h1>$date</h1>";

    // php can also use single quotes
    echo '<p>' . $day . '</p>';

?>

<div style="background-color:green;color:white;">
    <?php echo $test ?>
</div>