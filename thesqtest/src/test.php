<?php

function read_datas(){
	$myfile = fopen("case.txt", "r") or die("Unable to open file!");
	$line = fread($myfile,filesize("case.txt"));
	$datas = explode("\n", $line);
	$sections = [];
	$questions = [];
	$id = 0;
	foreach ($datas as $data ) {
		$data_split = explode(";", $data);
		$section = ucwords(trim($data_split[0]));
		$question = trim($data_split[1]);
		if (!array_key_exists($section, $questions)){
			$questions[$section]= [];
		}
		array_push($questions[$section],["id"=>$id++,"question"=>$question]);
		array_push($sections, $section);
	}
	$sections = array_values(array_unique($sections));
	
	fclose($myfile);	
	return ["sections"=> $sections, "questions"=>$questions];
}

include "connect.php";
$page= @$_GET['page'];
$page = isset($page)? $page : 0;
$sections = @$_SESSION["sections"];
unset($sections[12]);
$questions = @$_SESSION['questions'];
if ($sections == null){
	$results = read_datas();
	$_SESSION["sections"] = $sections = $results["sections"];
	$_SESSION["questions"] = $questions = $results["questions"];
}
$token = $_GET['token'];
if ($token == null){
	header("location:index.php");
}
$progress = ceil((($page+1)/(count($sections))) * 100);
$query = "SELECT * FROM answers WHERE token = '$token' AND section_id = $page";
$result = $conn->query($query);
$answer = array();
while ($row = $result->fetch_assoc()){
		$answer[$row["question_id"]]=$row["answer"];
}
if($page !=0 && count($answer) ==0){
	$query = "SELECT MAX(section_id) as last_page FROM answers WHERE token = '$token'";
	$result = $conn->query($query);
	$row = $result->fetch_assoc();
	if(count($row) ==0)
		header("location:test.php");
	else{
		$last_page = ++$row['last_page'];
		if($last_page < $page)
			header("location:test.php?page=$last_page");
	}
		
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
				<div class="container">
					<div class="row w-100">
						<div class="progress w-100">
						  <div class="progress-bar" role="progressbar" style="width:<?=$progress?>%" aria-valuenow="<?=$progress?>" aria-valuemin="0" aria-valuemax="100"><?php echo ($page +1)."/".count($sections);?></div>
						</div>
					</div>
					<div class="row">
						<h2><?= $sections[$page]?></h2>
					</div>
					<div class="row w-100">
						<form class="w-100" action="submitTest.php" method="post">
							<input type="hidden" name="section_id" value="<?=$page?>">
							<input type="hidden" name="section_name" value="<?=$sections[$page]?>">
							<input type= "hidden" name="token" value="<?= $token?>">
							<?php foreach($questions[$sections[$page]] as $question){?>
							<div class="form-group " style="background-color: rgba(220,220,220,0.2); padding: 10px; border-radius: 20px;">
    							<label><?=$question['question']?></label>
						    	<div class="form-check">
								<?php $value = 5;
									if ($question['type']=='negative'){
										$value *=-1;
									}
								?>
								  <input class="form-check-input" type="radio" name="<?=$question['id']?>"  <?php echo (@$answer[$question['id']]==$value ? 'checked=""':"");?> id="stronglyAgree" value="<?=$value?>" required="">
								  <label class="form-check-label" for="stonglyAgree">
								    Strongly Agree
								  </label>
								</div>
								<div class="form-check">
								<?php $value = 4;
									if ($question['type']=='negative'){
										$value *=-1;
									}
								?>
								  <input class="form-check-input" type="radio" name="<?=$question['id']?>"  <?php echo (@$answer[$question['id']]==$value ? 'checked=""':"");?> id="agree" value="<?=$value?>" >
								  <label class="form-check-label" for="agree">
								    Agree
								  </label>
								</div>
								<div class="form-check">
								<?php $value = 3;
									if ($question['type']=='negative'){
										$value *=-1;
									}
								?>
								  <input class="form-check-input" type="radio" name="<?=$question['id']?>"  <?php echo (@$answer[$question['id']]==$value ? 'checked=""':"");?> id="neutral" value="<?=$value?>" >
								  <label class="form-check-label" for="neutral">
								    Neutral
								  </label>
								</div>
								<div class="form-check">
								<?php $value = 2;
									if ($question['type']=='negative'){
										$value *=-1;
									}
								?>
								  <input class="form-check-input" type="radio" name="<?=$question['id']?>"  <?php echo (@$answer[$question['id']]==$value ? 'checked=""':"");?> id="disagree" value="<?=$value?>" >
								  <label class="form-check-label" for="disagree">
								    Disagree
								  </label>
								</div>
								<div class="form-check">
								<?php $value = 1;
									if ($question['type']=='negative'){
										$value *=-1;
									}
								?>
								  <input class="form-check-input" type="radio" name="<?=$question['id']?>"  <?php echo (@$answer[$question['id']]==$value ? 'checked=""':"");?> id="stronglyDisagree" value="<?=$value?>">
								  <label class="form-check-label" for="stonglyDisagree">
								    Strongly Disagree
								  </label>
								</div>
						  	</div>
						  	<?php }?>
						  	<div class="float-right">

								<?php if ($page!=0){?>
									<a href="test.php?page=<?=$page-1?>&token=<?=$token?>" style="margin: 10px;">
										<button type="button" class="btn btn-primary btn-lg" style="background-color: #fd79a8; border: solid 1px #fd79a8;">back</button>	
									</a>
								<?php }?>
						  		

						  		<input type="submit" value="next" class="btn btn-primary btn-lg" style="background-color: #fd79a8; border: solid 1px #fd79a8;">
							
						  	</div>
							
						</form>
					</div>
				</div>
			</div>
		</div>

		<div class="row" style="background-image: url('asset/SQA-footer-4.jpg'); min-height: 10%;">
			
		</div>
	</div>
</body>
</html>