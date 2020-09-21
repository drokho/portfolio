<?php

$name=$_POST['name'];
$email=$_POST['email'];
$phone=$_POST['phone'];
$message=$_POST['message'];


//$name="test";
//$message="Test Message";
//$email="test@email.com";
$to="typhoongraphics@yahoo.com";
$from="TGX Notifier <tgx-notifier@tgx1.com>";
$body="Someone is trying to contact you regarding design services. \n \n Here is their message: \n \n  $message \n \n ------------------------- \n Name: $name \n Telephone: $phone \n Email: $email \n";

$headers = "" .
		   "Reply-To:" . $from . "\r\n" .
		   "X-Mailer: PHP/" . phpversion();
	   
$headers .= 'MIME-Version: 1.0' . "\r\n";
$headers .= "From: " . $from .  "\r\n";	

if($name != "" ) 
{
    if(mail($to,"New TGX Lead",$body, $headers)) 
    { 
        echo "Thank you for contacting me, I will get back to you as soon as I can!</h3>";
    }
    else
    {
        echo "<h3>Oops! This is embarrasing! Something must have gone wrong. Can you please fill out the form again?</h3>";
    }
}
 
  
 //echo $headers . "<br>" . $to . "<br>" . $from . "<br>" . $body . "<br>";
 
 ?>
 

 
