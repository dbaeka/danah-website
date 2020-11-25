<?php 
require_once("connect.php");
$page = $_POST['page'];
$token = $_POST["token"];
$lang = $_POST['lang'];
if ($page == "1"){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $query = "UPDATE user SET name = '$name' , email = '$email' WHERE token ='$token'";
    $conn->query($query);

    $gender = @$_POST["gender2"];
    $gender = ($gender== null ?$_POST["gender"] :$gender);
    $race = @$_POST['race2'];
    $race = ($race== null ?$_POST["race"] :$race);
    $age = $_POST['age'];
    $race_group = "";
    $degree = $_POST['degree'];


    $query = "SELECT * FROM user_detail WHERE token = '$token'";
    $result = $conn->query($query);
    $row = $result->fetch_assoc();
    if (!isset($row)){
        $query = "INSERT INTO user_detail (token,gender,age,race,race_group,degree) VALUES('$token','$gender','$age','$race','$race_group','$degree')";
        $test = $conn->query($query);
    }else{
        $query = "UPDATE user_detail SET gender = '$gender', age = '$age', race = '$race', race_group = '$race_group', degree = '$degree'
            WHERE token = '$token'
        ";
        $conn->query($query);
    }
    if($lang == "en"){
        header("location:form2.php?token=$token");
    }else {
        header("location:cn_form2.php?token=$token");
    } 
}elseif ($page == "2"){
    $occupation = @$_POST['occupation2'];
    $occupation = ($occupation== null ?$_POST["occupation"] :$occupation);
    $employee_status = $_POST['employee_status'];
    $last_payment = $_POST['last_payment'];
    $query = "UPDATE user_detail SET employee_status = '$employee_status', last_payment = '$last_payment', occupation = '$occupation'
            WHERE token = '$token'
    ";
    $conn->query($query);
    // if($lang == "en"){
    //     header("location:form3.php?token=$token");
    // }else {
    //     header("location:cn_form3.php?token=$token");
    // } 
    if($lang == "en"){
        header("location:test.php?token=$token");
    }else {
        header("location:cn_test.php?token=$token");
    } 
}else{
    $best_occupation = @$_POST['best_occupation2'];
    $best_occupation = ($best_occupation== null ?$_POST["best_occupation"] :$best_occupation);
    $job_level = @$_POST['job_level2'];
    $job_level = ($job_level== null ?$_POST["job_level"] :$job_level);
    $company_founded = $_POST['company_founded'];
    $company_headquarters = $_POST['company_headquarters'];
    $company_city = $_POST['company_city'];
    $company_employee = $_POST['company_employee'];
    $company_locations = $_POST['company_locations'];
    $company_own_location = $_POST['company_own_location'];
    $company_current_employee = $_POST['company_current_employee'];
    $total_work_year = $_POST['total_work_year'];
    $total_work_month = $_POST['total_work_month'];

    $query = "UPDATE user_detail SET 
    company_founded = '$company_founded',
    company_headquarters = '$company_headquarters',
    company_city = '$company_city',
    company_employee = $company_employee,
    company_locations = $company_locations,
    company_own_location = '$company_own_location',
    company_current_employee = $company_current_employee,
    total_work_year = $total_work_year,
    total_work_month = $total_work_month,
    best_occupation = '$best_occupation',
    job_level = '$job_level'
    WHERE token = '$token'
    ";

    $conn->query($query);
    if($lang == "en"){
        header("location:test.php?token=$token");
    }else {
        header("location:cn_test.php?token=$token");
    } 
}