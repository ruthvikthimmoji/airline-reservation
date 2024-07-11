<?php
$conn = new mysqli('localhost', 'root', '', 'airline_reservation');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM flights";
$result = $conn->query($sql);

$flights = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $flights[] = $row;
    }
}

echo json_encode($flights);

$conn->close();
?>
