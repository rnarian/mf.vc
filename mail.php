<?php



// define constants
define('TO_MAIL', 'hi@marianfriedmann.de');
define('TO_NAME', 'Marian Friedmann');
define('SUBJECT', 'Webform at mf.vc');

require __DIR__ . '/vendor/autoload.php';

// get POST vars
$mail = isset($_POST['mail']) ? nl2br($_POST['mail']) : false;
$message = isset($_POST['message']) ? nl2br($_POST['message']) : false;

// deliver function
function deliver($mail, $message) {
  $simpleMail = new SimpleMail();
  $simpleMail->setTo(TO_MAIL, TO_NAME)
       ->setSubject(SUBJECT)
       ->setFrom($mail, $mail)
       ->addGenericHeader('X-Mailer', 'PHP/' . phpversion())
       ->addGenericHeader('Content-Type', 'text/html; charset="utf-8"')
       ->setMessage($message)
       ->setWrap(100);
  $send = $simpleMail->send();
  echo ($send) ? 'Mail sent successfully' : 'Could not send mail';
}

//usleep(300000);
//sleep(2);

// validate & send
if (!$mail) {
  echo "Mail is missing";
} else if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
  echo "Mail is invalid";
} else if (!$message) {
  echo "Message is missing";
} else {
  deliver($mail, $message);
  usleep(300000);
}

?>
