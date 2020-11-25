<?php 
    session_start();
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
    $user_id = @$_COOKIE['user_id'];
    if ($user_id != null && $user_id != ""){
        header("location:admin.php");
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
				<div class="container" style="padding-top:1%">
					<div class="row justify-content-center">
                        <div class="jumbotron w-50">
                            <form method="post" action="doLogin.php">
                                <?php 
                                    $error = @$_GET['error'];
                                    if($error != null){
                                    ?>
                                        <div class="alert alert-danger" role="alert">
                                            <?=$error?>
                                        </div>
                                    <?php
                                    }
                                ?>
                                <div class="form-group">
                                    <label for="username">Username</label>
                                    <input type="text" class="form-control" id="username" required name="username">
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" class="form-control" id="password" required name="password">
                                </div>
                                <button type="submit" class="btn btn-primary" style="background-color: #fd79a8; border: solid 1px #fd79a8;">Submit</button>
                            </form>
                        </div>
                    </div>
				</div>
			</div>
		</div>

		<div class="row" style="background-image: url('asset/SQA-footer-4.jpg'); min-height: 10%;">
			
		</div>
	</div>
</body>
</html>