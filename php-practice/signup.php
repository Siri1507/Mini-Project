<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $db = new mysqli("localhost", "root", "", "trial");

    if ($db->connect_error) {
        die("Connection failed: " . $db->connect_error);
    }
    $checkQuery = "SELECT * FROM users WHERE username='$username'";
    $checkResult = $db->query($checkQuery);

    if ($checkResult->num_rows > 0) {
        echo "Username already taken. Please choose another.";
    } else {
        $insertQuery = "INSERT INTO users (username, password) VALUES ('$username', '$hashedPassword')";
        if ($db->query($insertQuery) === TRUE) {
            echo "Registration successful. You can now <a href='login.html'>login</a>.";
        } else {
            echo "Error: " . $insertQuery . "<br>" . $db->error;
        }
    }
    $db->close();
}
?>

