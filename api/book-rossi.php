<?php
/**
 * ============================================================
 *  ROSSI VISHNUJITH — Booking Request Mail Handler
 * ============================================================
 *
 *  SETUP INSTRUCTIONS:
 *  1. Upload this file to your PHP-enabled web server (e.g. /api/book-rossi.php).
 *  2. Update the $to_email variable below with your real email address.
 *  3. (Optional) Configure SMTP via PHPMailer for production reliability.
 *  4. Ensure your server allows the mail() function or use an SMTP library.
 *
 *  ENDPOINT:  POST /api/book-rossi.php
 *  PAYLOAD:   JSON { name, email, phone, service, date, message }
 *  RESPONSE:  JSON { success: bool, message: string }
 * ============================================================
 */

// ── Configuration ─────────────────────────────────────────────
$to_email     = "jagath.gj@gmail.com";    // <-- CHANGE THIS to your actual email
$site_name    = "Rossi Vishnujith";
$subject_prefix = "[V46 Booking]";

// ── CORS & Headers ────────────────────────────────────────────
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");   // Restrict to your domain in production
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed."]);
    exit;
}

// ── Parse Input ───────────────────────────────────────────────
$raw  = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid JSON payload."]);
    exit;
}

// ── Validate Required Fields ──────────────────────────────────
$name    = trim($data['name']    ?? '');
$email   = trim($data['email']   ?? '');
$phone   = trim($data['phone']   ?? '');
$service = trim($data['service'] ?? '');
$date    = trim($data['date']    ?? '');
$message = trim($data['message'] ?? '');

$errors = [];
if (empty($name))    $errors[] = "Name is required.";
if (empty($email))   $errors[] = "Email is required.";
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Invalid email address.";
if (empty($service)) $errors[] = "Service type is required.";
if (empty($message)) $errors[] = "Message is required.";

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(["success" => false, "message" => implode(" ", $errors)]);
    exit;
}

// ── Service Label Map ─────────────────────────────────────────
$service_labels = [
    "stunt_show"         => "Stunt Show Booking",
    "race_event"         => "Race Event Appearance",
    "brand_collab"       => "Brand Collaboration",
    "engine_overhaul"    => "Full Engine Overhaul",
    "performance_upgrade"=> "Performance Upgrades",
    "custom_bodywork"    => "Custom Bodywork & Paint",
    "race_prep"          => "Race Bike Preparation",
    "general_service"    => "General Servicing",
    "detailing"          => "Detailing & Restoration",
    "other"              => "Other",
];

$service_label = $service_labels[$service] ?? ucfirst(str_replace("_", " ", $service));
$date_display  = !empty($date) ? date("F j, Y", strtotime($date)) : "Not specified";

// ── Build Email ───────────────────────────────────────────────
$subject = "$subject_prefix New Booking — $service_label from $name";

// Plain-text body
$body_text = <<<EOT
═══════════════════════════════════════════
  NEW BOOKING REQUEST — ROSSI VISHNUJITH
═══════════════════════════════════════════

Name:           $name
Email:          $email
Phone:          $phone
Service:        $service_label
Preferred Date: $date_display

Message:
─────────────────────────────────────────
$message
─────────────────────────────────────────

This request was submitted via the V46 website.
EOT;

// HTML body
$body_html = <<<EOT
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { margin: 0; padding: 0; background: #0A0A0A; font-family: 'Helvetica Neue', Arial, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; background: #111118; }
    .header { background: #0A0A0A; padding: 30px; text-align: center; border-bottom: 3px solid #E8FF00; }
    .header h1 { color: #E8FF00; font-size: 28px; margin: 0; letter-spacing: 4px; }
    .header p { color: #8A8A9A; font-size: 12px; margin-top: 6px; letter-spacing: 2px; }
    .body { padding: 30px; }
    .field { margin-bottom: 20px; }
    .field-label { color: #E8FF00; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px; }
    .field-value { color: #FFFFFF; font-size: 15px; line-height: 1.5; }
    .message-box { background: rgba(255,255,255,0.03); border: 1px solid #1F1F2E; padding: 20px; margin-top: 10px; }
    .message-text { color: #CCCCCC; font-size: 14px; line-height: 1.7; white-space: pre-wrap; }
    .footer { padding: 20px 30px; border-top: 1px solid #1F1F2E; text-align: center; }
    .footer p { color: #555; font-size: 11px; margin: 0; }
    .badge { display: inline-block; background: #E8FF00; color: #0A0A0A; padding: 4px 12px; font-size: 12px; letter-spacing: 1px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>V46</h1>
      <p>NEW BOOKING REQUEST</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="field-label">Name</div>
        <div class="field-value">$name</div>
      </div>
      <div class="field">
        <div class="field-label">Email</div>
        <div class="field-value"><a href="mailto:$email" style="color:#E8FF00;text-decoration:none;">$email</a></div>
      </div>
      <div class="field">
        <div class="field-label">Phone</div>
        <div class="field-value">$phone</div>
      </div>
      <div class="field">
        <div class="field-label">Service</div>
        <div class="field-value"><span class="badge">$service_label</span></div>
      </div>
      <div class="field">
        <div class="field-label">Preferred Date</div>
        <div class="field-value">$date_display</div>
      </div>
      <div class="field">
        <div class="field-label">Message</div>
        <div class="message-box">
          <div class="message-text">$message</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>Submitted via rossivishnujith.com &mdash; V46 Booking System</p>
    </div>
  </div>
</body>
</html>
EOT;

// ── Send Email ────────────────────────────────────────────────
$headers  = "From: $site_name <jagath.gj@gmail.com>\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/alternative; boundary=\"BOUNDARY_V46\"\r\n";

$email_body  = "--BOUNDARY_V46\r\n";
$email_body .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
$email_body .= $body_text . "\r\n\r\n";
$email_body .= "--BOUNDARY_V46\r\n";
$email_body .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";
$email_body .= $body_html . "\r\n\r\n";
$email_body .= "--BOUNDARY_V46--";

$sent = @mail($to_email, $subject, $email_body, $headers);

// ── Auto-reply to customer ───────────────────────────────────
if ($sent) {
    $reply_subject = "We received your booking request — Rossi Vishnujith";
    $reply_body = <<<EOT
Hi $name,

Thank you for reaching out! We've received your booking request for "$service_label".

Our team will review your request and get back to you within 24–48 hours.

If you have any urgent queries, feel free to call us at +91 8289917046.

Ride safe,
Team Rossi Vishnujith
rossivishnujith.com
EOT;

    $reply_headers  = "From: $site_name <jagath.gj@gmail.com>\r\n";
    $reply_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    @mail($email, $reply_subject, $reply_body, $reply_headers);
}

// ── Response ──────────────────────────────────────────────────
if ($sent) {
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Booking request sent successfully!"
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to send email. Please try again or contact us directly."
    ]);
}
?>
