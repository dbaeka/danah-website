<?php

	require_once "connect.php";
	$sections = [];
	function read_datas(){
		$myfile = fopen("case.txt", "r") or die("Unable to open file!");
		$line = fread($myfile,filesize("case.txt"));
		$datas = explode("\n", $line);
		$sections = [];
		$questions = [];
		$id = 0;
		$total_negative =1;
		foreach ($datas as $data ) {
			$data_split = explode(";", $data);
			$section = ucwords(trim($data_split[0]));
			$question = trim($data_split[1]);
			
			if (!array_key_exists($section, $questions)){
				$questions[$section]= [];
				$total_negative =1;
			}
			$type = "negative";
			if($total_negative >4){
				$type = "positive";
			}
			$total_negative++;
			array_push($questions[$section],["id"=>$id++,"question"=>$question,"type"=>$type]);
			array_push($sections, $section);
		}
		$sections = array_values(array_unique($sections));
		
		fclose($myfile);	
		return ["sections"=> $sections, "questions"=>$questions];
	}
	if ($sections == null){
		$results = read_datas();
		$_SESSION["sections"] = $sections = $results["sections"];
		$_SESSION["questions"] = $questions = $results["questions"];
	}
	$token = @$_GET["token"];
	if ($token == null){
		header("location:login.php");
		return;
	}

	$query = "SELECT * FROM user where token = '$token'";
    $result = $conn->query($query);
    $row = @$result->fetch_assoc();

    if(!isset($row)){
		header("location:index.php");
		return;
    }

	if (file_exists("result/$token.pdf")){
		header('location:resultExist.php');
		return;
	}

?>

<!DOCTYPE html>
<html>
<head>
	<title>SQTest</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
	<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>


<body>
	<div class="container h-100 w-100">
		<div class="row" style="background-image: url('asset/SQA-header-4.jpg'); min-height: 20%;">
			
		</div>

		<div class="row" style="min-height: 70%">
			<div class="jumbotron w-100" style="background-color:white">
				<div class="container" >
					<div class="row" style="margin-left:77%;font-size:22px">
						<div class="column">
							Language/语言 :&nbsp;
						</div>
						<div class="column">
							<a href="index.php?token=<?=$_GET['token']?>">EN</a>
						</div>
						<div class="column">
							|
						</div>
						<div class="column">
							<a href="cn_index.php?token=<?=$_GET['token']?>">CN</a>
						</div>
						
					</div>
					<div class="row justify-content-center">
						<h1 style="color:#fd79a8">SQ INTRODUCTION</h1>
					</div>
					<div class="row">
						<h3>
							What is the difference between IQ, EQ, and SQ?
						</h3>
						<div>
							The notion of an intelligence quotient (IQ) has been in use for over a century. IQ is a measure of our rational, logical, rule-bound, abstract problem-solving intelligence and refers to a style of rational, goal-oriented thinking. In the mid-1990’s, emotional intelligence (EQ) was increasingly seen as important. As Daniel Goleman defines it, EQ enables us to assess emotional situation we are in and then to behave appropriately within it, particularly to respond appropriately to the emotions of others.<br><br>

							The concept of spiritual intelligence (SQ) was introduced by Danah Zohar in 2000. She defined it as our access to and use of meaning, vision, values, and a sense of higher purpose in our thinking, actions and decision-making. SQ, she argued, is our primary or ultimate intelligence in that it determines the effectiveness and uses to which we put our IQ and EQ. SQ gives us a holistic sense of context and meaning, and adds a moral dimension to our experience. People who are high in SQ are more likely to act from positive motivations like exploration, cooperation, self-mastery, and service. As Zohar defines it, SQ has no necessary relation to religious belief or practice. It may be expressed through these but, equally, an atheist could be high in SQ.<br><br>

							Both IQ and EQ are “finite” intelligences. They enable us to play within the boundaries or rules of a situation. SQ is an “infinite” intelligence. It enables us to think “outside the box” , to play with the boundaries. SQ is a transformative intelligence that allows us to break old paradigms and invent new ones, to reframe problems and situations, to dissolve old patterns and be open to finding new ones. It enables us to have a creative, happy, meaningful, and purposeful life and greatly increases leadership potential. It is an indicator of our moral maturity.
						</div>
					</div>
					<div class="row" style="padding-top: 20px ">
						<a href="form.php?token=<?=$token?>">
							<button type="button" class="btn btn-primary btn-lg btn-block" style="background-color: #fd79a8; border: solid 1px #fd79a8;">Try begin test</button>	
						</a>
					</div>
				</div>
			</div>
		</div>

		<div class="row" style="background-image: url('asset/SQA-footer-4.jpg'); min-height: 10%;">
			
		</div>
	</div>
</body>
</html>