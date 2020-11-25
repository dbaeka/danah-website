<?php

    function change_to_choose($value){
        if($value == "") return "--choose--";
        return $value;
    }
    require "connect.php";
    $page = 1;
    $token = @$_GET['token'];
    if($token == null) header("location:index.php");
    $progress = ($page)/2 *100;

    $title = "";

    $genders = ["--choose--","Female","Male","Other"];
    $ages = ["--choose--","< 18","18-25","26-35","36-45","46-54","55-65","> 65"];
    $degrees = ["--choose--","Postgraduate (Phd)","Postgraduate (Master)", "Bachelor degree", "Associate degree","College education but without degree","High school degree or equivalent","Less than high school degree"];
    $races = ["--choose--","White","Black or African-American","American Indian or Alaskan Native","Asian","Native Hawaiian or other Pacific Islander","From multiple races","Other"];

    $temp_gender = "--choose--";
    $temp_age = "--choose--";
    $temp_degree = "--choose--";
    $temp_race = "--choose--";
    $temp_race_group = "--choose--";

    $query = "SELECT * FROM user_detail WHERE token='$token'";
    $result = $conn->query($query)->fetch_assoc();
    if(isset($result)){
        $temp_gender = change_to_choose($result['gender']);
        $temp_age = change_to_choose($result['age']);
        $temp_degree = change_to_choose($result['degree']);
        $temp_race = change_to_choose($result['race']);
        $temp_race_group = change_to_choose($result['race_group']);
    }

    $query = "SELECT * FROM user WHERE token = '$token'";
    $result = $conn->query($query)->fetch_assoc();
    if(!isset($result)) header("location:index.php");
    $name = $result["name"];
    $email = $result["email"];
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
						  <div class="progress-bar" role="progressbar" style="width:<?=$progress?>%" aria-valuenow="<?=$progress?>" aria-valuemin="0" aria-valuemax="100"><?php echo ($page)."/ 2"?></div>
						</div>
					</div>
					<div class="row" style="margin:10px 0">
						<h2><?= $title?></h2>
					</div>
					<div class="row w-100">
						<form class="w-100" action="submitForm.php" method="post">
							<input type= "hidden" name="token" value="<?= $token?>">
							<input type= "hidden" name="lang" value="cn">
                            <input type= "hidden" name="page" value="<?=$page?>">
                            <div class="row">
                                <div class="form-group col" style="margin-left:10px;background-color: rgba(220,220,220,0.2); padding: 10px; border-radius: 20px;">
                                    <label for="name">1. Name</label>
                                    <input type="text" name="name"  class="form-control" value = "<?= $name?>">
                                </div>
                                <div class="form-group col" style="margin-left:10px;background-color: rgba(220,220,220,0.2); padding: 10px; border-radius: 20px;">
                                    <label for="email">2. Email</label>
                                    <input type="email" name="email"  class="form-control" value = "<?= $email?>">
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col" style="margin-left:10px;background-color: rgba(220,220,220,0.2); padding: 10px; border-radius: 20px;">
                                    <label for="gender">3. Sex</label>
                                    <select class="form-control" id="gender" name="gender" >
                                        <?php 
                                            foreach($genders as $val){
                                        ?>
                                            <option <?= ($temp_gender == $val? "selected": "")?> <?=(!in_array($temp_gender,$genders) && $val == "Other"? "selected" : "")?> value="<?=($val== "--choose--"? "" : $val)?>"><?=$val?></option>
                                        <?php
                                            }
                                        ?>
                                    </select>
                                    <!-- <input type="text" name="gender2" <?= (in_array($temp_gender,$genders)? "disabled": "value='$temp_gender'") ?> class="form-control" placeholder="type of gender"  > -->
                                </div>
                                
                                <div class="form-group col" style="margin-left:10px;background-color: rgba(220,220,220,0.2); padding: 10px; border-radius: 20px;">
                                    <label for="age">4. Age Group</label>
                                    <select class="form-control" id="age" name="age" >
                                        <?php 
                                            foreach($ages as $val){
                                        ?>
                                            <option <?= ($temp_age == $val? "selected": "")?> value="<?=($val== "--choose--"? "" : $val)?>"><?=$val?></option>
                                        <?php
                                            }
                                        ?>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group " style="background-color: rgba(220,220,220,0.2); padding: 10px; border-radius: 20px;">
                                <label for="degree">5. Education Background</label>
                                <select class="form-control" id="degree" name="degree" >
                                    <?php 
                                        foreach($degrees as $val){
                                    ?>
                                        <option <?= ($temp_degree == $val? "selected": "")?> value="<?=($val== "--choose--"? "" : $val)?>"><?=$val?></option>
                                    <?php
                                        }
                                    ?>
                                </select>
                            </div>
                            <div class="form-group " style="background-color: rgba(220,220,220,0.2); padding: 10px; border-radius: 20px;">
                                <label for="race">6. Race/Ethnicity</label>
                                <select class="form-control" id="race" name="race" >
                                    <?php 
                                        
                                        foreach($races as $val){
                                    ?>
                                        <option <?= ($temp_race == $val? "selected": "")?> <?=(!in_array($temp_race,$races) && $val == "Other"? "selected" : "")?> value="<?=($val== "--choose--"? "" : $val)?>"><?=$val?></option>
                                    <?php
                                        }
                                    ?>
                                    <!-- <input type="text" name="race2" <?= (in_array($temp_race,$races)? "disabled": "value='$temp_race'") ?> class="form-control" placeholder="type of race"> -->
                                </select>
                            </div>
                            
                           
						  	<div class="float-right">

								<!-- <?php if ($page!=0){?>
									<a href="form.php?page=<?=$page-1?>&token=<?=$token?>" style="margin: 10px;">
										<button type="button" class="btn btn-primary btn-lg" style="background-color: #fd79a8; border: solid 1px #fd79a8;">back</button>	
									</a>
								<?php }?> -->
						  		

						  		<input type="submit" value="Next" class="btn btn-primary btn-lg" style="background-color: #fd79a8; border: solid 1px #fd79a8;">
							
						  	</div>
							
						</form>
					</div>
				</div>
			</div>
		</div>

		<div class="row" style="background-image: url('asset/SQA-footer-4.jpg'); min-height: 10%;">
			
		</div>
	</div>

    <!-- <script>
        document.getElementsByName("gender")[0].addEventListener("change",function(){
            if (this.value == "Other"){
                document.getElementsByName("gender2")[0].removeAttribute("disabled");
                document.getElementsByName("gender2")[0].setAttribute("required",true);
            }else{
                document.getElementsByName("gender2")[0].setAttribute("disabled",true);
                document.getElementsByName("gender2")[0].removeAttribute("required");
                document.getElementsByName("gender2")[0].value = "";
            }
        });
        document.getElementsByName("race")[0].addEventListener("change",function(){
            if (this.value == "Other"){
                document.getElementsByName("race2")[0].removeAttribute("disabled");
                document.getElementsByName("race2")[0].setAttribute("required",true);
            }else{
                document.getElementsByName("race2")[0].setAttribute("disabled",true);
                document.getElementsByName("race2")[0].removeAttribute("required");
                document.getElementsByName("race2")[0].value = "";
            }
        });
    </script> -->
</body>

</html>