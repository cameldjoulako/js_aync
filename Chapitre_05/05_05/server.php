<?php 
    header('Access-Control-Allow-Origin: *');
    if($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
        header('Access-Control-Allow-Methods: POST');
        header('Access-Control-Allow-Headers: Content-Type');
    }
    if ($_SERVER['REQUEST_METHOD'] == 'POST'){
        header('Content-type: application/json');
        // Takes raw data from the request
        $json = file_get_contents('php://input');
        // Converts it into a PHP object
        $data = json_decode($json);
        $submittedText = $data->text;
        $message = "Vous m'avez dit : " . $submittedText;
        echo json_encode($message);
    }
   
    exit;
?>