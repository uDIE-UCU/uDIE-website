<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name    = htmlspecialchars($_POST['name']);
    $surname = htmlspecialchars($_POST['surname']);
    $subject = htmlspecialchars($_POST['subject']);
    $email   = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $to      = "microdieucu@gmail.com";
    $headers = "From: noreply@microdie.ucu.edu.uy\r\n";
    $headers .= "Reply-To: noreply@microdie.ucu.edu.uy\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $fullMessage = "Name: $name $surname\nEmail: $email\nSubject: $subject\n\nMessage:\n$message";

    if (mail($to, $subject, $fullMessage, $headers)) {
        echo "Message sent successfully.";
    } else {
        echo "There was an error sending the message.";
    }
}
?>
