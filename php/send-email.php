<?php
// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get form data and sanitize
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r","\n"),array(" "," "),$name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = trim($_POST["phone"]);
    $subject = strip_tags(trim($_POST["subject"]));
    $message = trim($_POST["message"]);
    
    // Recipient email address - CHANGE THIS to your actual email
    $recipient = "info@wellspringclinic.com.au";
    
    // Additional headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    // Email subject
    $email_subject = "New Contact Form Submission: $subject";
    
    // Email body
    $email_body = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #0066cc; }
            .footer { background-color: #333; color: white; padding: 10px; text-align: center; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Contact Form Submission</h2>
            </div>
            <div class='content'>
                <div class='field'>
                    <span class='label'>Name:</span><br>
                    $name
                </div>
                <div class='field'>
                    <span class='label'>Email:</span><br>
                    $email
                </div>
                <div class='field'>
                    <span class='label'>Phone:</span><br>
                    $phone
                </div>
                <div class='field'>
                    <span class='label'>Subject:</span><br>
                    $subject
                </div>
                <div class='field'>
                    <span class='label'>Message:</span><br>
                    " . nl2br(htmlspecialchars($message)) . "
                </div>
            </div>
            <div class='footer'>
                <p>This email was sent from the WellSpring Family Clinic contact form</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Invalid email format";
        exit;
    }
    
    // Validate required fields
    if (empty($name) || empty($subject) || empty($message)) {
        http_response_code(400);
        echo "Please fill in all required fields";
        exit;
    }
    
    // Send email
    if (mail($recipient, $email_subject, $email_body, $headers)) {
        http_response_code(200);
        echo "Thank you! Your message has been sent successfully.";
    } else {
        http_response_code(500);
        echo "Oops! Something went wrong and we couldn't send your message.";
    }
    
} else {
    // Not a POST request
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
?>
