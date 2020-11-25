<?php 
    require_once "connect.php";
    header("Content-type: application/vnd.ms-excel");
    header("Content-Disposition: attachment;Filename=user_data.xls");

    $ids = [];
    $selected_users = @$_SESSION['selected_user'];
    if(isset($selected_users)){
        $ids = join(',',array_values($selected_users));
    }
    $query = "SELECT
        token,
        name,
        -1 AS section_id,
        CAST(AVG(total) AS SIGNED) AS total
            FROM
                (
                SELECT
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
                WHERE u.id IN ($ids)
                GROUP BY
                    1,
                    2,
                    3
            ) AS result
            GROUP BY
                1,
                2,
                3
            UNION
            SELECT
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
            JOIN user u  USING(token)
            WHERE u.id IN ($ids)
            GROUP BY
                1,
                2,
                3
            ORDER BY
                token,
                section_id
        ";
    $result = $conn->query($query);
    $header = "No\tName\tTotal Score";
    $sections = $_SESSION['sections'];
    foreach ($sections as $section){
        $header.="\t$section";
    }
    echo $header."\n";
    
    $data_show = [];
    while($row = $result->fetch_assoc()){
        if(!array_key_exists($row["token"],$data_show)){
            $data_show[$row["token"]] = [
                "name"=>$row["name"],
                "results"=>[]
            ];
        }
        array_push($data_show[$row["token"]]["results"],["id"=>$row["section_id"],"score"=>$row["total"]]);
    }
    $index = 1;
    foreach ($data_show as $ds){

        $name = $ds['name'];
        $line = "$index\t$name";
        $total = 0;
        foreach ($ds["results"] as $row){
            $score = $row["score"];
            $line.= "\t$score";
        }
        $index++;
        echo $line."\n";
    }
    
    