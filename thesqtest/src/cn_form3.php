<?php
    require "connect.php";
    $page = 3;
    $token = @$_GET['token'];
    if($token == null) header("location:index.php");
    $progress = ($page)/3 *100;

    $title = "Form Firmographics";

    $company_headquarterses = ["--choose--","Afghanistan","Åland Islands","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia, Plurinational State of","Bonaire, Sint Eustatius and Saba","Bosnia and Herzegovina","Botswana","Bouvet Island","Brazil","British Indian Ocean Territory","Brunei Darussalam","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Cocos (Keeling) Islands","Colombia","Comoros","Congo","Congo, the Democratic Republic of the","Cook Islands","Costa Rica","Côte d'Ivoire","Croatia","Cuba","Curaçao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands (Malvinas)","Faroe Islands","Fiji","Finland","France","French Guiana","French Polynesia","French Southern Territories","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea-Bissau","Guyana","Haiti","Heard Island and McDonald Islands","Holy See (Vatican City State)","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran, Islamic Republic of","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Korea, Democratic People's Republic of","Korea, Republic of","Kuwait","Kyrgyzstan","Lao People's Democratic Republic","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macao","Macedonia, the former Yugoslav Republic of","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia, Federated States of","Moldova, Republic of","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestinian Territory, Occupied","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn","Poland","Portugal","Puerto Rico","Qatar","Réunion","Romania","Russian Federation","Rwanda","Saint Barthélemy","Saint Helena, Ascension and Tristan da Cunha","Saint Kitts and Nevis","Saint Lucia","Saint Martin (French part)","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Sint Maarten (Dutch part)","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia and the South Sandwich Islands","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Svalbard and Jan Mayen","Swaziland","Sweden","Switzerland","Syrian Arab Republic","Taiwan, Province of China","Tajikistan","Tanzania, United Republic of","Thailand","Timor-Leste","Togo","Tokelau","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay","Uzbekistan","Vanuatu","Venezuela, Bolivarian Republic of","Viet Nam","Virgin Islands, British","Virgin Islands, U.S.","Wallis and Futuna","Western Sahara","Yemen","Zambia","Zimbabwe"];
    $best_occupations = ["--choose--","Construction and Extraction Occupations","Business and Financial Operations Occupations","Building and Grounds Cleaning and Maintenance Occupations","Production Occupations","Farming"," Fishing"," and Forestry Occupations","Food Preparation and Serving Related Occupations","Architecture and Engineering Occupations","Life"," Physical"," and Social Science Occupations","Computer and Mathematical Occupations","Healthcare Support Occupations","Legal Occupations","Management Occupations","Office and Administrative Support Occupations","Installation"," Maintenance"," and Repair Occupations","Education"," Training"," and Library Occupations","Protective Service Occupations","Personal Care and Service Occupations","Community and Social Service Occupations","Arts"," Design"," Entertainment"," Sports"," and Media Occupations","Sales and Related Occupations","Healthcare Practitioners and Technical Occupations","Transportation and Materials Moving Occupations","Other"];
    $job_levels = ["--choose--","Owner/Executive/C-Level","Senior Management","Middle Management","Intermediate","Entry Level","Other"];
    

    $temp_company_headquarters= "--choose--";
    $temp_best_occupation= "--choose--";
    $temp_job_level= "--choose--";

    $query = "SELECT * FROM user_detail WHERE token='$token'";
    $result = $conn->query($query)->fetch_assoc();
    if(isset($result)){
        $temp_company_founded = (($result['company_founded']== null)? "": $result['company_founded']);
        $temp_company_headquarters = (($result['company_headquarters']== null)? "": $result['company_headquarters']);
        $temp_company_city = (($result['company_city']== null)? "": $result['company_city']);
        $temp_company_employee = (($result['company_employee']== null)? "": $result['company_employee']);
        $temp_company_locations = (($result['company_locations']== null)? "": $result['company_locations']);
        $temp_company_own_location = (($result['company_own_location']== null)? "": $result['company_own_location']);
        $temp_company_current_employee = (($result['company_current_employee']== null)? "": $result['company_current_employee']);
        $temp_best_occupation = (($result['best_occupation']== null)? "--choose--": $result['best_occupation']);
        $temp_job_level = (($result['job_level']== null)? "--choose--": $result['job_level']);
        $temp_total_work_year = (($result['total_work_year']== null)? "": $result['total_work_year']);
        $temp_total_work_month = (($result['total_work_month']== null)? "": $result['total_work_month']);
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
						  <div class="progress-bar" role="progressbar" style="width:<?=$progress?>%" aria-valuenow="<?=$progress?>" aria-valuemin="0" aria-valuemax="100"><?php echo ($page)."/ 3"?></div>
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
                            <div class="form-group " style="background-color: rgba(220,220,220,0.2); padding: 10px; border-radius: 20px;">
                                <label for="company_founded">1. In what year was your company founded?</label>
                                <input type="text" name="company_founded" required class="form-control" value = "<?= $temp_company_founded?>">
                            </div>
							<div class="form-group " style="background-color: rgba(220,220,220,0.2); padding: 10px; border-radius: 20px;">
                                <label for="company_headquarters">2. In what country is your company currently headquartered?</label>
                                <select class="form-control" id="company_headquarters" name="company_headquarters" required>
                                    <?php 
                                        foreach($company_headquarterses as $val){
                                    ?>
                                        <option <?= ($temp_company_headquarters == $val? "selected": "")?> <?=(!in_array($temp_company_headquarters,$company_headquarterses) && $val == "Other"? "selected" : "")?> value="<?=($val== "--choose--"? "" : $val)?>"><?=$val?></option>
                                    <?php
                                        }
                                    ?>
                                </select>
                            </div>

                            <div class="form-group " style="background-color: rgba(220,220,220,0.2); padding: 10px; border-radius: 20px;">
                                <label for="company_city">3. In what city is your company currently headquartered?</label>
                                <input type="text" name="company_city" required class="form-control" value = "<?= $temp_company_city?>">
                            </div>

                            <div class="form-group " style="background-color: rgba(220,220,220,0.2); padding: 10px; border-radius: 20px;">
                                <label for="company_employee">4. About how many employees work at your company?</label>
                                <input type="number" name="company_employee" required class="form-control" value = "<?= $temp_company_employee?>">
                            </div>

                            <div class="form-group " style="background-color: rgba(220,220,220,0.2); padding: 10px; border-radius: 20px;">
                                <label for="company_locations">5. About how many locations does your company have?</label>
                                <input type="number" name="company_locations" required class="form-control" value = "<?= $temp_company_locations?>">
                            </div>

                            <div class="form-group " style="background-color: rgba(220,220,220,0.2); padding: 10px; border-radius: 20px;">
                                <label for="company_own_location">6. At which location do you work?</label>
                                <input type="text" name="company_own_location" required class="form-control" value = "<?= $temp_company_own_location?>">
                            </div>

                            <div class="form-group " style="background-color: rgba(220,220,220,0.2); padding: 10px; border-radius: 20px;">
                                <label for="company_current_employee">7. How many employees currently work at the location where you work?</label>
                                <input type="number" name="company_current_employee" required class="form-control" value = "<?= $temp_company_current_employee?>">
                            </div>

                            <div class="form-group " style="background-color: rgba(220,220,220,0.2); padding: 10px; border-radius: 20px;">
                                <label for="best_occupation">8. Which of the following best describes your current occupation?</label>
                                <select class="form-control" id="best_occupation" name="best_occupation" required>
                                    <?php 
                                        foreach($best_occupations as $val){
                                    ?>
                                        <option <?= ($temp_best_occupation == $val? "selected": "")?> <?=(!in_array($temp_best_occupation,$best_occupations) && $val == "Other"? "selected" : "")?> value="<?=($val== "--choose--"? "" : $val)?>"><?=$val?></option>
                                    <?php
                                        }
                                    ?>
                                    <input type="text" name="best_occupation2" <?= (in_array($temp_best_occupation,$best_occupations)? "disabled": "value='$temp_best_occupation'") ?> class="form-control" placeholder="type of gender">
                                </select>
                            </div>

                            <div class="form-group " style="background-color: rgba(220,220,220,0.2); padding: 10px; border-radius: 20px;">
                                <label for="job_level">9. Which of the following best describes your current job level?</label>
                                <select class="form-control" id="job_level" name="job_level" required>
                                    <?php 
                                        foreach($job_levels as $val){
                                    ?>
                                        <option <?= ($temp_job_level == $val? "selected": "")?> <?=(!in_array($temp_job_level,$job_levels) && $val == "Other"? "selected" : "")?> value="<?=($val== "--choose--"? "" : $val)?>"><?=$val?></option>
                                    <?php
                                        }
                                    ?>
                                    <input type="text" name="job_level2" <?= (in_array($temp_job_level,$job_levels)? "disabled": "value='$temp_job_level'") ?> class="form-control" placeholder="type of gender">
                                </select>
                            </div>

                            <div class="form-group " style="background-color: rgba(220,220,220,0.2); padding: 10px; border-radius: 20px;">
                                <label >10. How many employees currently work at the location where you work?</label> <br>
                                <label for="total_work_year">Years</label>
                                <input type="number" name="total_work_year" required class="form-control" value = "<?= $temp_total_work_year?>">
                                <label for="total_work_month">Month</label>
                                <input type="number" name="total_work_month" required class="form-control" value = "<?= $temp_total_work_month?>">
                            </div>

                            
						  	<div class="float-right">

                              <a href="cn_form2.php?token=<?=$token?>" style="margin: 10px;">
                                    <button type="button" class="btn btn-primary btn-lg" style="background-color: #fd79a8; border: solid 1px #fd79a8;">back</button>	
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
        document.getElementsByName("best_occupation")[0].addEventListener("change",function(){
            if (this.value == "Other"){
                document.getElementsByName("best_occupation2")[0].removeAttribute("disabled");
                document.getElementsByName("best_occupation2")[0].setAttribute("required",true);
            }else{
                document.getElementsByName("best_occupation2")[0].setAttribute("disabled",true);
                document.getElementsByName("best_occupation2")[0].removeAttribute("required");
                document.getElementsByName("best_occupation2")[0].value = "";
            }
        });
        document.getElementsByName("job_level")[0].addEventListener("change",function(){
            if (this.value == "Other"){
                document.getElementsByName("job_level2")[0].removeAttribute("disabled");
                document.getElementsByName("job_level2")[0].setAttribute("required",true);
            }else{
                document.getElementsByName("job_level2")[0].setAttribute("disabled",true);
                document.getElementsByName("job_level2")[0].removeAttribute("required");
                document.getElementsByName("job_level2")[0].value = "";
            }
        });
    </script>
</body>

</html>