<?php 
    $user_id = @$_COOKIE['user_id'];
    if ($user_id == null) {
        header("location:login.php");
    }

    require_once "connect.php";

    $data_per_page = 10;

    $max_data = 0;

    $query = "SELECT COALESCE(count(DISTINCT u.id),0) as max_data FROM user u JOIN answers USING(token)";
    $result = $conn->query($query);
    
    $max_data = $result->fetch_assoc()['max_data'];
    $page = @$_GET['page'];
    if(!isset($page)){
        $page = 0;
    }

    $start = ($page * $data_per_page);
    $end = ( ($start+10 > $max_data ? $max_data: $start+10) );
    
    $query = "SELECT
                id,
                token,
                name,
                -1 AS section_id,
                CAST(AVG(total) AS SIGNED) AS total
            FROM
                (
                SELECT
                    u.id,
                    token,
                    name,
                    section_id,
                    CAST(ROUND ((SUM(answer)+14)*3.5)AS SIGNED) as total
                FROM
                    (
                        SELECT a.* FROM `answers` a JOIN (
                        SELECT token, question_id, max(created_timestamp) as created_timestamp
                            FROM answers
                        GROUP BY 1,2
                        )m using(token,question_id,created_timestamp)
                    )a
                JOIN user u USING(token)
                GROUP BY
                    1,
                    2,
                    3,
                    4
            ) AS result
            GROUP BY
                1,
                2,
                3,
                4
            ORDER BY
                id desc,
                section_id
            LIMIT $start, $end
        ";

    $result = $conn->query($query);
    $sections = $_SESSION['sections'];
    
    $selected_user = @$_SESSION['selected_user'];
    
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>SQTest</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
	<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
	<link rel="stylesheet" type="text/css" href="css/style.css">

    <script>
        function generate_click(id){
            var checked = document.getElementById(id).checked;
            var http = new XMLHttpRequest();
            var url = 'selectUser.php';
            var data = "id="+id+"&checked="+checked;
            http.open('POST', url, true);

            //Send the proper header information along with the request
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            http.onreadystatechange = function() {//Call a function when the state changes.
                
            }
            http.send(data);
        }
    </script>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="admin.php">SQ Test</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
        <a class="nav-item nav-link" href="admin.php">Generate Token</a>
        <a class="nav-item nav-link" href="viewResult.php">View Result</a>
        <a class="nav-item nav-link" href="logout.php">Logout</a>
        </div>
    </div>
    </nav>
    <div class="container w-100">
        <div class="row w-100 justify-content-center">
            <div class="jumbotron" style="width:50%;margin-top:20px">
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Overall SQ profile</th>
                        <th scope="col">Generate</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php 
                            $index = $start+1;
                             while($row = $result->fetch_assoc()){
                                 $name = $row['name'];
                                 $total = $row['total'];
                                 $id = $row['id'];
                                ?>
                                    <tr>
                                    <th scope="row"><?= $index++ ?></th>
                                    <td><?= $name?></td>
                                    <td style="text-align:center"><?= $total?></td>
                                    <td style="text-align:center"><input type="checkbox" onclick="generate_click('<?=$id?>')" class="form-check-input" id="<?=$id?>"
                                    <?= (@array_key_exists($id,$selected_user))? "checked" : ""?>
                                    ></td>
                                    </tr>
                                <?php
                            }
                        
                        ?>
                        
                    </tbody>
                </table>
                <div class="container">
                    <div class="row">
                        <div class="col-8">
                            <?php 
                                if ($index >1){
                                    ?>
                                        <a href="generateExcel.php">
                                            <button type="submit" class="btn btn-primary" style="background-color: #fd79a8; border: solid 1px #fd79a8;">Generate Excel</button>
                                        </a>
                                    <?php 
                                }
                            ?>
                        </div>
                        <div class="col text-right">
                            <?php
                                if($start >0){
                            ?>
                                <a href="viewResult.php?page=<?= ($page-1)?>">
                                    <button type="submit" class="btn btn-primary" style="background-color: #fd79a8; border: solid 1px #fd79a8;">prev</button>
                                </a>
                            <?php 
                                }
                            ?>
                            <?php 
                                if($end != $max_data){
                            ?>
                            <a href="viewResult.php?page=<?= ($page+1)?>">
                                <button type="submit" class="btn btn-primary" style="background-color: #fd79a8; border: solid 1px #fd79a8;">next</button>
                            </a>
                            <?php
                                }
                            ?>
                        </div>
                    </div>
                    
                </div>
                
                
            </div>
        </div>
    </div>
</body>
</html>