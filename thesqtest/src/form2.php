<?php
    require "connect.php";
    $page = 2;
    $token = @$_GET['token'];
    if($token == null) header("location:index.php");
    $progress = ($page)/2 *100;

    $title = "";

    $employee_statuses = ["--choose--","Employed, working 40 or more hours per week","Employed, working 1-39 hours per week","Not employed, looking for work","Not employed, NOT looking for work","Retired","Disabled, not able to work"];
    $last_payments = ["--choose--","$0 to $9,999","$10,000 to $24,999","$25,000 to $49,999","$50,000 to $74,999","$75,000 to $99,999","$100,000 to $124,999","$125,000 to $149,999","$150,000 to $174,999","$175,000 to $199,999","$200,000 and up","Prefer not to answer"];
    $occupations = ["--choose--","Architecture and Engineering Occupations","Healthcare Support Occupations","Legal Occupations","Life"," Physical"," and Social Science Occupations","Personal Care and Service Occupations","Office and Administrative Support Occupations","Building and Grounds Cleaning and Maintenance Occupations","Food Preparation and Serving Related Occupations","Sales and Related Occupations","Production Occupations","Computer and Mathematical Occupations","Management Occupations","Education"," Training"," and Library Occupations","Installation"," Maintenance"," and Repair Occupations","Farming"," Fishing"," and Forestry Occupations","Community and Social Service Occupations","Arts"," Design"," Entertainment"," Sports"," and Media Occupations","Protective Service Occupations","Business and Financial Operations Occupations","Construction and Extraction Occupations","Healthcare Practitioners and Technical Occupations","Transportation and Materials Moving Occupations","Other"];

    $temp_employee_status = "--choose--";
    $temp_last_payment = "--choose--";
    $temp_occupation = "--choose--";

    $query = "SELECT * FROM user_detail WHERE token='$token'";
    $result = $conn->query($query)->fetch_assoc();
    if(isset($result)){
        $temp_employee_status = (($result['employee_status']== null || $result['employee_status']== "")? "--choose--": $result['employee_status']);
        $temp_last_payment = (($result['last_payment']== null || $result['last_payment']== "")? "--choose--": $result['last_payment']);
        $temp_occupation = (($result['occupation']== null || $result['occupation']== "")? "--choose--": $result['occupation']);
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
						  <div class="progress-bar" role="progressbar" style="width:<?=$progress?>%" aria-valuenow="<?=$progress?>" aria-valuemin="0" aria-valuemax="100"><?php echo ($page)."/ 2"?></div>
						</div>
					</div>
					<div class="row" style="margin:10px 0">
						<h2><?= $title?></h2>
					</div>
					<div class="row w-100">
						<form class="w-100" action="submitForm.php" method="post">
							<input type= "hidden" name="token" value="<?= $token?>">
							<input type= "hidden" name="lang" value="en">
                            <input type= "hidden" name="page" value="<?=$page?>">
							<div class="form-group " style="background-color: rgba(220,220,220,0.2); padding: 10px; border-radius: 20px;">
                                <label for="employee_status">1. Which of the following categories best describes your employment status?</label>
                                <select class="form-control" id="employee_status" name="employee_status">
                                    <?php 
                                        foreach($employee_statuses as $val){
                                    ?>
                                        <option <?= ($temp_employee_status == $val? "selected": "")?>  value="<?=($val== "--choose--"? "" : $val)?>"><?=$val?></option>
                                    <?php
                                        }
                                    ?>
                                </select>
                            </div>
                            
                            <div class="form-group " style="background-color: rgba(220,220,220,0.2); padding: 10px; border-radius: 20px;">
                                <label for="last_payment">2. How much total combined money did all members of your HOUSEHOLD earn last year??</label>
                                <select class="form-control" id="last_payment" name="last_payment">
                                    <?php 
                                        foreach($last_payments as $val){
                                    ?>
                                        <option <?= ($temp_last_payment == $val? "selected": "")?> value="<?=($val== "--choose--"? "" : $val)?>"><?=$val?></option>
                                    <?php
                                        }
                                    ?>
                                </select>
                            </div>
                            
                            <div class="form-group " style="background-color: rgba(220,220,220,0.2); padding: 10px; border-radius: 20px;">
                                <label for="occupation">3. Which of the following best describes your current occupation?</label>
                                <select class="form-control" id="occupation" name="occupation">
                                    <?php 
                                        foreach($occupations as $val){
                                    ?>
                                       <option <?= ($temp_occupation == $val? "selected": "")?> <?=(!in_array($temp_occupation,$occupations) && $val == "Other"? "selected" : "")?> value="<?=($val== "--choose--"? "" : $val)?>"><?=$val?></option>
                                    <?php
                                        }
                                    ?>
                                    <!-- <input type="text" name="occupation2" <?= (in_array($temp_occupation,$occupations)? "disabled": "value='$temp_occupation'") ?> class="form-control" placeholder="type of occupation"> -->
                                </select>
                            </div>

						  	<div class="float-right">

								
                                <a href="form.php?token=<?=$token?>" style="margin: 10px;">
                                    <button type="button" class="btn btn-primary btn-lg" style="background-color: #fd79a8; border: solid 1px #fd79a8;">Back</button>	
                                </a>
								
						  		<input type="submit" value="Begin Test" class="btn btn-primary btn-lg" style="background-color: #fd79a8; border: solid 1px #fd79a8;">
							
						  	</div>
							
						</form>
					</div>
				</div>
			</div>
		</div>

		<div class="row" style="background-image: url('asset/SQA-footer-4.jpg'); min-height: 10%;">
			
		</div>
	</div>
    <script>
        // document.getElementsByName("occupation")[0].addEventListener("change",function(){
        //     if (this.value == "Other"){
        //         document.getElementsByName("occupation2")[0].removeAttribute("disabled");
        //         document.getElementsByName("occupation2")[0].setAttribute("required",true);
        //     }else{
        //         document.getElementsByName("occupation2")[0].setAttribute("disabled",true);
        //         document.getElementsByName("occupation2")[0].removeAttribute("required");
        //         document.getElementsByName("occupation2")[0].value = "";
        //     }
        // });
    </script>

</body>

</html>