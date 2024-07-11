<?php
$conn = new mysqli('localhost', 'root', '', 'airline_reservation');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$flight_id = $_POST['flight'];

$sql = "INSERT INTO passengers (name, email, phone) VALUES ('$name', '$email', '$phone')";
if ($conn->query($sql) === TRUE) {
    $passenger_id = $conn->insert_id;
    $sql = "INSERT INTO bookings (flight_id, passenger_id) VALUES ('$flight_id', '$passenger_id')";
    if ($conn->query($sql) === TRUE) {
        echo "Booking successful!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
