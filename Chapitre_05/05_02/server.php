<?php 
    // Takes raw data from the request
    $json = file_get_contents('php://input');
    // Converts it into a PHP object
    $data = json_decode($json);
    $submittedText = $data->text;
    $message = "Vous m'avez dit : " . $submittedText;
    echo json_encode($message);

    exit;
?>