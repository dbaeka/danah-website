<?php 
    $user_id = @$_COOKIE['user_id'];
    if ($user_id == null) {
        header("location:login.php");
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>SQTest</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
	<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <style>
        #pageloader
        {
            background: rgba( 255, 255, 255, 0.8 );
            display: none;
            height: 100%;
            position: fixed;
            width: 100%;
            z-index: 9999;
        }

        #pageloader img
        {
            left: 50%;
            margin-left: -32px;
            margin-top: -32px;
            position: absolute;
            top: 50%;
        }
    </style>
</head>
<body>
    <div id="pageloader">
    <img src="http://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.16.1/images/loader-large.gif" alt="processing..." />
    </div>
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
                <div style="margin-top:10px">
                    <form action="generateMultipleToken.php" method="post" enctype="multipart/form-data" id="myForm">
                        <h3>Generate free token</h3>
                        <div class="form-group">
                            <label for="totalToken">Total Token</label>
                            <input type="number" class="form-control-file" id="totalToken" name="total">
                        </div>
                        <div>
                            <button type="submit" class="btn btn-primary" style="background-color: #fd79a8; border: solid 1px #fd79a8;" id="upload" >Generate </button>
                        </div>  
                    </form>
                </div>
            </div>
        </div>
        
        <div class="row w-100 justify-content-center">
            <div class="jumbotron" style="width:50%;margin-top:20px">
                <?php 
                    $msg = @$_GET['msg'];
                    if ($msg != null){
                        ?>
                        <div class="alert alert-success" role="alert">
                            <?= $msg?>
                        </div>
                        <?php
                    }
                    $error = @$_GET['error'];
                    if ($error != null){
                        ?>
                        <div class="alert alert-danger" role="alert">
                            <?= $error?>
                        </div>
                        <?php
                    }
                ?>
                <form action="generateToken.php" method="post">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" id="email" required name="email">
                        <label for="email">Total Token</label>
                        <input type="number" class="form-control" id="total_token" required name="total_token" value=1>
                    </div>
                    <button type="submit" class="btn btn-primary" style="background-color: #fd79a8; border: solid 1px #fd79a8;">Generate Token</button>
                </form>
            </div>
        </div>
        <div class="row w-100 justify-content-center">
            <div class="jumbotron" style="width:50%;margin-top:20px">
                <div style="margin-top:10px">
                    <form action="uploadTemplate.php" method="post" enctype="multipart/form-data" id="myForm">
                        <div class="form-group">
                            <label for="uploadTemplate">Upload List Email</label>
                            <input type="file" class="form-control-file" id="uploadTemplate" name="file">
                        </div>
                        <div>
                            <button type="submit" class="btn btn-primary" style="background-color: #fd79a8; border: solid 1px #fd79a8;" id="upload" >Upload </button>
                            <a href="downloadTemplate.php">
                                download template
                            </a>
                        </div>  
                    </form>
                </div>
            </div>
        </div>
        
    </div>
    <script>
        $("#myForm").on("submit", function(){
            $("#pageloader").fadeIn();
        });//submit
    </script>
</body>
</html>