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

	if (file_exists("result/cn_$token.pdf")){
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
				<div class="container">
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
						<h1 style="color:#fd79a8">魂商-简介</h1>
					</div>
					<div class="row">
						<h3>
                            智商（IQ）和情商  (EQ）和魂商（SQ）有什么区别?
						</h3>
						<div>
                            智商（IQ）的概念已经有一个多世纪了。IQ是对我们理性、逻辑、规则约束以及抽象解决问题能力的一种度量，它看重理性的、以目标为导向的思维方式。在20世纪90年代中期，情商（EQ）的重要性日益凸显，而根据丹尼尔·戈尔曼的定义，EQ让我们能够评估我们所处情境的情绪，并很好地与之相处，尤其是更舒服地回应他人的情绪。<br><br>

							魂商（SQ）的概念是由丹娜左哈尔于2000年提出。按照她的定义，魂商是我们在思考、行动和决策过程中对意义、愿景、价值观的获取和运用以及对更高层次的目标感。她认为，SQ是我们的主要或终极智力——它决定了我们如何运用以及更高效地运用IQ和EQ。SQ具有整体性，提供一种更为整体的情境和意义，并为我们经验中增加了道德这一维度。SQ高的人做事更倾向于有积极的动机，如探索、合作、自主和服务。正如左哈尔所定义的，SQ的高低与宗教信仰和修炼没有必然联系。当然，它可以通过这些体现，但并非必需，就像一个无神论者也可以拥有很高的SQ。<br><br>

							智商和情商都是“有限的”智力，它们使我们能够在界限及规则之内如鱼得水。而相比之下，SQ是一种“无限”的能力，它使我们能 够跳出固有的思维模式思考，不断挑战拓宽界限。<br><br>
                            
                            SQ是变革性的，它允许我们打破旧的范式，创造新的范式，重新定义问题和情境，打破旧模式，并乐于寻找新模式；它使我们有一个创造性的，快乐的，有意义的，有目标的生活，同时领导潜能也被大力挖掘，SQ是我们道德成熟的标志。

						</div>
					</div>
					<div class="row" style="padding-top: 20px ">
						<a href="cn_form.php?token=<?=$token?>">
							<button type="button" class="btn btn-primary btn-lg btn-block" style="background-color: #fd79a8; border: solid 1px #fd79a8;">尝试开始测试</button>	
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