<?php
if(!isset($_POST['submit'])) {
  echo "error; you need to submit the form!";
}

$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$subject = $_POST['subject'];
$messsage = $_POST['message'];


if(empty($firstname) || empty($lastname) || empty($message) || empty($subject)) {
  echo "Name and Message are Mandatory";
  exit;
}

$email_to = 'matw81@gmail.com';
$email_body = "You have received a new message from the user $firstname $lastname\n
              Message is $message";

mail($email_to, $subject, $email_body);

 ?>
