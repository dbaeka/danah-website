<?php
    require_once 'SVGGraph/autoloader.php';
    require_once "connect.php";

    $token = @$_GET['token'];
    
    if ($token == null){
        header("location:index.php");
    }
    $query = "SELECT * FROM user where token = '$token'";
    $result = $conn->query($query);
    $row = @$result->fetch_assoc();

    if(!isset($row)){
        header("location:index.php");
    }

    if (file_exists("result/$token.pdf")){
        header('location:resultExist.php');
        return;
	}
    
    function full_graph(){
        global $conn;
        global $token;
        global $name;
        $settings = array(
        'context_stroke_width'=>0,
        'stroke_width'      => 0,
        'stroke_colour'     => 'rgb(237, 76, 103)',
        'back_stroke_width' => 1,
        'back_stroke_colour'=> '#000',
        'axis_colour'       => '#333',
        'axis_overlap'      => 2,
        'axis_font'         => 'Arial',
        'axis_font_size'    => 10,
        'label_colour'      => '#000',
        'pad_right'         => 20,
        'pad_left'          => 20,
        'link_base'         => '/',
        'show_grid'         => false,
        'link_target'       => '_top',
        'fill_under'        => array(true,false),
        'marker_size'       => 0,
        'marker_type'       => array('circle'),
        'marker_colour'     => array('blue'),
        'axis_text_angle_h' => 270,
        'show_bar_labels'   => true,
        'axis_text_space_h' => 120,
        'axis_text_position_h'=>"outside",
        'axis_max_v'=> 140,
        'axis_font_size_v' =>14,
        'bar_label_position'=> "above",
        'bar_label_font_weight' =>"bold",
        'bar_label_font_size'=>12

        );

        $sections = $_SESSION['sections'];
        $query = "SELECT section_id, CAST(ROUND ((SUM(answer)+14)*3.5)AS SIGNED) as total FROM (

            SELECT a.* FROM `answers` a JOIN (
            SELECT token, question_id, max(created_timestamp) as created_timestamp
                FROM answers
            GROUP BY 1,2
            )m using(token,question_id,created_timestamp)
        ) a
        WHERE token = '$token'
        GROUP BY 1";

        $result = $conn->query($query);
        $answers = [];
        while($row= $result->fetch_assoc()){
            array_push($answers,[
                "id"=>$row['section_id'],
                "y"=>$row['total']
            ]);
        }

        $temp_value = [];
        
        $query = "SELECT
                CAST(AVG(total) AS SIGNED) AS avg_answer
            FROM
                (
                SELECT
                    section_id,
                    CAST(ROUND ((SUM(answer)+14)*3.5)AS SIGNED) as total
                FROM
                    (
                        SELECT a.* FROM `answers` a JOIN (
                        SELECT token, question_id, max(created_timestamp) as created_timestamp
                            FROM answers
                        GROUP BY 1,2
                        )m using(token,question_id,created_timestamp)
                    ) a
                WHERE
                    token = '$token'
                GROUP BY
                    1
            ) AS result";

        $result = $conn->query($query);
        $row = $result->fetch_assoc();
        //$temp_value [$name." sq score"] = 0;
        $a = [];
        $a ["Your overall SQ profile"] = $row["avg_answer"];
        $trend_line = [];
        $trend_line ["Your overall SQ profile"] = ($row["avg_answer"]-10 >0 ? $row["avg_answer"]-10 :0 );
        foreach ($answers as $answer){
            
                $temp_value[$sections[$answer["id"]]]=$answer["y"];
                $trend_line[$sections[$answer["id"]]]=($answer["y"]-10 >0 ? $answer["y"]-10 :0 ) ;
            
        }
        $values= [];
        $combines = $a + $temp_value;
        // $combines = array_values(array_unique($combines));
        // for($i =0 ; $i <count($combines);$i++){
        //     $combines[$i]-=10;
        // }
        array_push($values,$a);
        array_push($values,$trend_line);
        array_push($values,$temp_value);
        


        $colours = array(
            array('#eee'),array('red'),array('pink'), array("red")
        );


        $graph = new Goat1000\SVGGraph\SVGGraph(700, 500, $settings);

        $graph->colours($colours);
        $graph->values($values);

        return $graph->fetch('StackedBarAndLineGraph');
    }

    function full_graph_group(){
        global $conn;
        global $token;
        global $name;
        $settings = array(
            'context_stroke_width'=>0,
            'stroke_width'      => 0,
            'stroke_colour'     => 'rgb(237, 76, 103)',
            'back_stroke_width' => 1,
            'back_stroke_colour'=> '#000',
            'axis_colour'       => '#333',
            'axis_overlap'      => 2,
            'axis_font'         => 'Arial',
            'axis_font_size'    => 10,
            'label_colour'      => '#000',
            'pad_right'         => 20,
            'pad_left'          => 20,
            'link_base'         => '/',
            'show_grid'         => false,
            'link_target'       => '_top',
            'fill_under'        => array(true,false),
            'marker_size'       => 0,
            'marker_type'       => array('circle'),
            'marker_colour'     => array('blue'),
            'axis_text_angle_h' => 270,
            'show_bar_labels'   => true,
            'axis_text_space_h' => 120,
            'axis_text_position_h'=>"outside",
            'axis_max_v'=> 140,
            'axis_font_size_v' =>14,
            'bar_label_position'=> "above",
            'bar_label_font_weight' =>"bold",
            'bar_label_font_size'=>12
        
        );

        $query = "SELECT
        'overal score' AS label,
        CAST(AVG(total) AS SIGNED) AS score
            FROM
                (
                SELECT
                    section_id,
                    CAST(ROUND ((SUM(answer)+14)*3.5)AS SIGNED) as total
                FROM
                    (
                        SELECT a.* FROM `answers` a JOIN (
                        SELECT token, question_id, max(created_timestamp) as created_timestamp
                            FROM answers
                        GROUP BY 1,2
                        )m using(token,question_id,created_timestamp)
                    ) a
                WHERE
                    token = '$token'
                GROUP BY
                    1
            ) AS result
            UNION
            SELECT
                'critical thinking' AS label,
                CAST(AVG(total) AS SIGNED) AS score
            FROM
                (
                SELECT
                    section_id,
                    CAST(ROUND ((SUM(answer)+14)*3.5)AS SIGNED) as total
                FROM
                    (
                        SELECT a.* FROM `answers` a JOIN (
                        SELECT token, question_id, max(created_timestamp) as created_timestamp
                            FROM answers
                        GROUP BY 1,2
                        )m using(token,question_id,created_timestamp)
                    ) a
                WHERE
                    token = '$token' AND section_id IN(0, 6, 7, 8)
                GROUP BY
                    1
            ) AS result
            UNION
            SELECT
                'reflective thinking' AS label,
                CAST(AVG(total) AS SIGNED) AS score
            FROM
                (
                SELECT
                    section_id,
                    CAST(ROUND ((SUM(answer)+14)*3.5)AS SIGNED) as total
                FROM
                    (
                        SELECT a.* FROM `answers` a JOIN (
                        SELECT token, question_id, max(created_timestamp) as created_timestamp
                            FROM answers
                        GROUP BY 1,2
                        )m using(token,question_id,created_timestamp)
                    ) a
                WHERE
                    token = '$token' AND section_id IN(0, 7, 10, 9, 8)
                GROUP BY
                    1
            ) AS result
            UNION
            SELECT
                'creativity' AS label,
                CAST(AVG(total) AS SIGNED) AS score
            FROM
                (
                SELECT
                    section_id,
                    CAST(ROUND ((SUM(answer)+14)*3.5)AS SIGNED) as total
                FROM
                    (
                        SELECT a.* FROM `answers` a JOIN (
                        SELECT token, question_id, max(created_timestamp) as created_timestamp
                            FROM answers
                        GROUP BY 1,2
                        )m using(token,question_id,created_timestamp)
                    ) a
                WHERE
                    token = '$token' AND section_id IN(1, 7, 5, 6, 3, 8)
                GROUP BY
                    1
            ) AS result
            UNION
            SELECT
                'intuition' AS label,
                CAST(AVG(total) AS SIGNED) AS score
            FROM
                (
                SELECT
                    section_id,
                    CAST(ROUND ((SUM(answer)+14)*3.5)AS SIGNED) as total
                FROM
                    (
                        SELECT a.* FROM `answers` a JOIN (
                        SELECT token, question_id, max(created_timestamp) as created_timestamp
                            FROM answers
                        GROUP BY 1,2
                        )m using(token,question_id,created_timestamp)
                    ) a
                WHERE
                    token = '$token' AND section_id IN(0, 3, 5, 8)
                GROUP BY
                    1
            ) AS result
        ";

        $result = $conn->query($query);
        $score = [];
        $scores = [];
        $trend_line = [];
        while($row = $result->fetch_assoc()){
            if(count($score) ==0){
                $score["Your overall SQ profile"] = $row['score'];
                $trend_line["Your overall SQ profile"] = ($row['score']-10 >0 ? $row['score']-10 :0 );
            }else{
                $scores[$row['label']] = $row['score'];
                $trend_line[$row['label']] = ($row['score']-10 >0 ? $row['score']-10 :0 );
            }
        }
        $values= [];
        array_push($values,$score);
        array_push($values,$trend_line);
        array_push($values,$scores);

        $colours = array(
            array('#eee'),array('red'),array('pink')
        );


        $graph = new Goat1000\SVGGraph\SVGGraph(700, 500, $settings);

        $graph->colours($colours);
        $graph->values($values);

        return $graph->fetch('StackedBarAndLineGraph');   

    }


    function critical_thinking_graph(){
        global $conn;
        global $token;
        global $name;
        global $sections;
        $settings = array(
        'context_stroke_width'=>0,
        'stroke_width'      => 0,
        'stroke_colour'     => 'rgb(237, 76, 103)',
        'back_stroke_width' => 1,
        'back_stroke_colour'=> '#000',
        'axis_colour'       => '#333',
        'axis_overlap'      => 2,
        'axis_font'         => 'Arial',
        'axis_font_size'    => 10,
        'label_colour'      => '#000',
        'pad_right'         => 20,
        'pad_left'          => 20,
        'link_base'         => '/',
        'show_grid'         => false,
        'link_target'       => '_top',
        'fill_under'        => array(true,false),
        'marker_size'       => 0,
        'marker_type'       => array('circle'),
        'marker_colour'     => array('blue'),
        'axis_text_angle_h' => 270,
        'show_bar_labels'   => true,
        'axis_text_space_h' => 120,
        'axis_text_position_h'=>"outside",
        'axis_max_v'=> 140,
        'axis_font_size_v' =>14,
        'bar_label_position'=> "above",
        'bar_label_font_weight' =>"bold",
        'bar_label_font_size'=>12

        );

        $query = " SELECT
                    -1 AS label,
                    CAST(AVG(total) AS SIGNED) AS score
                FROM
                    (
                    SELECT
                        section_id,
                        CAST(ROUND ((SUM(answer)+14)*3.5)AS SIGNED) as total
                    FROM
                        (
                            SELECT a.* FROM `answers` a JOIN (
                        SELECT token, question_id, max(created_timestamp) as created_timestamp
                            FROM answers
                        GROUP BY 1,2
                        )m using(token,question_id,created_timestamp)
                        ) a
                    WHERE
                        token = '$token' AND section_id IN(0, 6, 7, 8)
                    GROUP BY
                        1
                ) AS result
                UNION
                SELECT
                    section_id AS label,
                    total  AS score
                FROM
                    (
                    SELECT
                        section_id,
                        CAST(ROUND ((SUM(answer)+14)*3.5)AS SIGNED) as total
                    FROM
                        (
                            SELECT a.* FROM `answers` a JOIN (
                        SELECT token, question_id, max(created_timestamp) as created_timestamp
                            FROM answers
                        GROUP BY 1,2
                        )m using(token,question_id,created_timestamp)
                        ) a
                    WHERE
                        token = '$token' AND section_id IN(0, 6, 7, 8)
                    GROUP BY
                        1
                ) AS result
        ";

        $result = $conn->query($query);
        $score = [];
        $scores = [];
        $trend_line = [];
        while($row = $result->fetch_assoc()){
            if(count($score) ==0){
                $score["Critical Thinking"] = $row['score'];
                $trend_line["Critical Thinking"] = ($row['score']-10 >0 ? $row['score']-10 :0 );
            }else{
                $scores[$sections[$row['label']]] = $row['score'];
                $trend_line[$sections[$row['label']]] = ($row['score']-10 >0 ? $row['score']-10 :0 );
            }
        }
        $values= [];
        array_push($values,$score);
        array_push($values,$trend_line);
        array_push($values,$scores);

        $colours = array(
            array('#eee'),array('red'),array('pink')
        );


        $graph = new Goat1000\SVGGraph\SVGGraph(700, 500, $settings);

        $graph->colours($colours);
        $graph->values($values);

        return $graph->fetch('StackedBarAndLineGraph'); 
    }

    function reflective_thinking_graph(){
        global $conn;
        global $token;
        global $name;
        global $sections;
$settings = array(
        'context_stroke_width'=>0,
        'stroke_width'      => 0,
        'stroke_colour'     => 'rgb(237, 76, 103)',
        'back_stroke_width' => 1,
        'back_stroke_colour'=> '#000',
        'axis_colour'       => '#333',
        'axis_overlap'      => 2,
        'axis_font'         => 'Arial',
        'axis_font_size'    => 10,
        'label_colour'      => '#000',
        'pad_right'         => 20,
        'pad_left'          => 20,
        'link_base'         => '/',
        'show_grid'         => false,
        'link_target'       => '_top',
        'fill_under'        => array(true,false),
        'marker_size'       => 0,
        'marker_type'       => array('circle'),
        'marker_colour'     => array('blue'),
        'axis_text_angle_h' => 270,
        'show_bar_labels'   => true,
        'axis_text_space_h' => 120,
        'axis_text_position_h'=>"outside",
        'axis_max_v'=> 140,
        'axis_font_size_v' =>14,
        'bar_label_position'=> "above",
        'bar_label_font_weight' =>"bold",
        'bar_label_font_size'=>12

        );

        $query = "SELECT
                    -1 AS label,
                    CAST(AVG(total) AS SIGNED) AS score
                FROM
                    (
                    SELECT
                        section_id,
                        CAST(ROUND ((SUM(answer)+14)*3.5)AS SIGNED) as total
                    FROM
                        (
                            SELECT a.* FROM `answers` a JOIN (
                        SELECT token, question_id, max(created_timestamp) as created_timestamp
                            FROM answers
                        GROUP BY 1,2
                        )m using(token,question_id,created_timestamp)
                        ) a
                    WHERE
                        token = '$token' AND section_id IN(0,7,10,9,8)
                    GROUP BY
                        1
                ) AS result
                UNION
                SELECT
                    section_id AS label,
                    total  AS score
                FROM
                    (
                    SELECT
                        section_id,
                        CAST(ROUND ((SUM(answer)+14)*3.5)AS SIGNED) as total
                    FROM
                        (
                            SELECT a.* FROM `answers` a JOIN (
                        SELECT token, question_id, max(created_timestamp) as created_timestamp
                            FROM answers
                        GROUP BY 1,2
                        )m using(token,question_id,created_timestamp)
                        ) a
                    WHERE
                        token = '$token' AND section_id IN(0,7,10,9,8)
                    GROUP BY
                        1
                ) AS result
        ";

        $result = $conn->query($query);
        $score = [];
        $temp_scores = [];
        $trend_line = [];
        while($row = $result->fetch_assoc()){
            if(count($score) ==0){
                $score["Reflective Thinking"] = $row['score'];
                $trend_line["Reflective Thinking"] = ($row['score']-10 >0 ? $row['score']-10 :0 );
            }else{
                $temp_scores[$row['label']] = $row['score'];
                $trend_line[$sections[$row['label']]] = ($row['score']-10 >0 ? $row['score']-10 :0 );
            }
        }
        $scores[$sections[0]] = $temp_scores[0];
        $scores[$sections[7]] = $temp_scores[7];
        $scores[$sections[10]] = $temp_scores[10];
        $scores[$sections[9]] = $temp_scores[9];
        $scores[$sections[8]] = $temp_scores[8]; 
        $values= [];
        array_push($values,$score);
        array_push($values,$trend_line);
        array_push($values,$scores);

        $colours = array(
            array('#eee'),array('red'),array('pink')
        );


        $graph = new Goat1000\SVGGraph\SVGGraph(700, 500, $settings);

        $graph->colours($colours);
        $graph->values($values);

        return $graph->fetch('StackedBarAndLineGraph'); 
    }

    function creativity_graph(){
        global $conn;
        global $token;
        global $name;
        global $sections;
        $settings = array(
            'context_stroke_width'=>0,
            'stroke_width'      => 0,
            'stroke_colour'     => 'rgb(237, 76, 103)',
            'back_stroke_width' => 1,
            'back_stroke_colour'=> '#000',
            'axis_colour'       => '#333',
            'axis_overlap'      => 2,
            'axis_font'         => 'Arial',
            'axis_font_size'    => 10,
            'label_colour'      => '#000',
            'pad_right'         => 20,
            'pad_left'          => 20,
            'link_base'         => '/',
            'show_grid'         => false,
            'link_target'       => '_top',
            'fill_under'        => array(true,false),
            'marker_size'       => 0,
            'marker_type'       => array('circle'),
            'marker_colour'     => array('blue'),
            'axis_text_angle_h' => 270,
            'show_bar_labels'   => true,
            'axis_text_space_h' => 120,
            'axis_text_position_h'=>"outside",
            'axis_max_v'=> 140,
            'axis_font_size_v' =>14,
            'bar_label_position'=> "above",
            'bar_label_font_weight' =>"bold",
            'bar_label_font_size'=>12
        );

        $query = "SELECT
                    -1 AS label,
                    CAST(AVG(total) AS SIGNED) AS score
                FROM
                    (
                    SELECT
                        section_id,
                        CAST(ROUND ((SUM(answer)+14)*3.5)AS SIGNED) as total
                    FROM
                        (
                            SELECT a.* FROM `answers` a JOIN (
                        SELECT token, question_id, max(created_timestamp) as created_timestamp
                            FROM answers
                        GROUP BY 1,2
                        )m using(token,question_id,created_timestamp)
                        ) a
                    WHERE
                        token = '$token' AND section_id IN(1,7,5,6,3,8)
                    GROUP BY
                        1
                ) AS result
                UNION
                SELECT
                    section_id AS label,
                    total  AS score
                FROM
                    (
                    SELECT
                        section_id,
                        CAST(ROUND ((SUM(answer)+14)*3.5)AS SIGNED) as total
                    FROM
                        (
                            SELECT a.* FROM `answers` a JOIN (
                        SELECT token, question_id, max(created_timestamp) as created_timestamp
                            FROM answers
                        GROUP BY 1,2
                        )m using(token,question_id,created_timestamp)
                        ) a
                    WHERE
                        token = '$token' AND section_id IN(1,7,5,6,3,8)
                    GROUP BY
                        1
                ) AS result
        ";

        $result = $conn->query($query);
        $score = [];
        $temp_scores = [];
        $trend_line = [];
        while($row = $result->fetch_assoc()){
            if(count($score) ==0){
                $score["Creativity"] = $row['score'];
                $trend_line["Creativity"] = ($row['score']-10 >0 ? $row['score']-10 :0);
            }else{
                $temp_scores[$row['label']] = $row['score'];
                $trend_line[$sections[$row['label']]] = ($row['score']-10 >0 ? $row['score']-10 :0);
            }
        }
        $scores[$sections[1]] = $temp_scores[1];
        $scores[$sections[7]] = $temp_scores[7];
        $scores[$sections[5]] = $temp_scores[5];
        $scores[$sections[6]] = $temp_scores[6];
        $scores[$sections[3]] = $temp_scores[3];
        $scores[$sections[8]] = $temp_scores[8]; 
        $values= [];
        array_push($values,$score);
        array_push($values,$trend_line);
        array_push($values,$scores);

        $colours = array(
            array('#eee'),array('red'),array('pink')
        );


        $graph = new Goat1000\SVGGraph\SVGGraph(700, 500, $settings);

        $graph->colours($colours);
        $graph->values($values);

        return $graph->fetch('StackedBarAndLineGraph'); 
    }

    function intutition_graph(){
        global $conn;
        global $token;
        global $name;
        global $sections;
        $settings = array(
            'context_stroke_width'=>0,
            'stroke_width'      => 0,
            'stroke_colour'     => 'rgb(237, 76, 103)',
            'back_stroke_width' => 1,
            'back_stroke_colour'=> '#000',
            'axis_colour'       => '#333',
            'axis_overlap'      => 2,
            'axis_font'         => 'Arial',
            'axis_font_size'    => 10,
            'label_colour'      => '#000',
            'pad_right'         => 20,
            'pad_left'          => 20,
            'link_base'         => '/',
            'show_grid'         => false,
            'link_target'       => '_top',
            'fill_under'        => array(true,false),
            'marker_size'       => 0,
            'marker_type'       => array('circle'),
            'marker_colour'     => array('blue'),
            'axis_text_angle_h' => 270,
            'show_bar_labels'   => true,
            'axis_text_space_h' => 120,
            'axis_text_position_h'=>"outside",
            'axis_max_v'=> 140,
            'axis_font_size_v' =>14,
            'bar_label_position'=> "above",
            'bar_label_font_weight' =>"bold",
            'bar_label_font_size'=>12
        );

        $query = "SELECT
                    -1 AS label,
                    CAST(AVG(total) AS SIGNED) AS score
                FROM
                    (
                    SELECT
                        section_id,
                        CAST(ROUND ((SUM(answer)+14)*3.5)AS SIGNED) as total
                    FROM
                        (
                            SELECT a.* FROM `answers` a JOIN (
                        SELECT token, question_id, max(created_timestamp) as created_timestamp
                            FROM answers
                        GROUP BY 1,2
                        )m using(token,question_id,created_timestamp)
                        ) a
                    WHERE
                        token = '$token' AND section_id IN(0,3,5,8)
                    GROUP BY
                        1
                ) AS result
                UNION
                SELECT
                    section_id AS label,
                    total  AS score
                FROM
                    (
                    SELECT
                        section_id,
                        CAST(ROUND ((SUM(answer)+14)*3.5)AS SIGNED) as total
                    FROM
                        (
                            SELECT a.* FROM `answers` a JOIN (
                        SELECT token, question_id, max(created_timestamp) as created_timestamp
                            FROM answers
                        GROUP BY 1,2
                        )m using(token,question_id,created_timestamp)
                        ) a
                    WHERE
                        token = '$token' AND section_id IN(0,3,5,8)
                    GROUP BY
                        1
                ) AS result
        ";

        $result = $conn->query($query);
        $score = [];
        $temp_scores = [];
        $trend_line = [];
        while($row = $result->fetch_assoc()){
            if(count($score) ==0){
                $score["Intuition"] = $row['score'];
                $trend_line["Intuition"] = ($row['score']-10 >0 ? $row['score']-10 :0);
            }else{
                $temp_scores[$row['label']] = $row['score'];
                $trend_line[$sections[$row['label']]] = ($row['score']-10 >0 ? $row['score']-10 :0);
            }
        }
        $scores[$sections[0]] = $temp_scores[0];
        $scores[$sections[3]] = $temp_scores[3];
        $scores[$sections[5]] = $temp_scores[5];
        $scores[$sections[8]] = $temp_scores[8];
        $values= [];
        array_push($values,$score);
        array_push($values,$trend_line);
        array_push($values,$scores);

        $colours = array(
            array('#eee'),array('red'),array('pink')
        );


        $graph = new Goat1000\SVGGraph\SVGGraph(700, 500, $settings);

        $graph->colours($colours);
        $graph->values($values);

        return $graph->fetch('StackedBarAndLineGraph'); 
    }

    function moral_maturity_graph(){
        global $conn;
        global $token;
        global $name;
        $settings = array(
            'context_stroke_width'=>0,
            'stroke_width'      => 0,
            'stroke_colour'     => 'rgb(237, 76, 103)',
            'back_stroke_width' => 1,
            'back_stroke_colour'=> '#000',
            'axis_colour'       => '#333',
            'axis_overlap'      => 2,
            'axis_font'         => 'Arial',
            'axis_font_size'    => 10,
            'label_colour'      => '#000',
            'pad_right'         => 20,
            'pad_left'          => 20,
            'link_base'         => '/',
            'show_grid'         => false,
            'link_target'       => '_top',
            'fill_under'        => array(true,false),
            'marker_size'       => 0,
            'marker_type'       => array('circle'),
            'marker_colour'     => array('blue'),
            'axis_text_angle_h' => 270,
            'show_bar_labels'   => true,
            'axis_text_space_h' => 120,
            'axis_text_position_h'=>"outside",
            'axis_max_v'=> 140,
            'axis_font_size_v' =>14,
            'bar_label_position'=> "above",
            'bar_label_font_weight' =>"bold",
            'bar_label_font_size'=>12
        );

        $sections = $_SESSION['sections'];
        $query = "SELECT section_id, CAST(ROUND ((SUM(answer)+14)*3.5)AS SIGNED) as total FROM (
            SELECT a.* FROM `answers` a JOIN (
            SELECT token, question_id, max(created_timestamp) as created_timestamp
                FROM answers
            GROUP BY 1,2
            )m using(token,question_id,created_timestamp)
        ) a
        WHERE token = '$token'
        GROUP BY 1";

        $result = $conn->query($query);
        $answers = [];
        while($row= $result->fetch_assoc()){
            array_push($answers,[
                "id"=>$row['section_id'],
                "y"=>$row['total']
            ]);
        }

        $temp_value = [];
        
        $query = "SELECT
                    CAST(AVG(total) AS SIGNED) AS avg_answer
                FROM
                    (
                    SELECT
                        section_id,
                        CAST(ROUND ((SUM(answer)+14)*3.5)AS SIGNED) as total
                    FROM
                        (
                            SELECT a.* FROM `answers` a JOIN (
                        SELECT token, question_id, max(created_timestamp) as created_timestamp
                            FROM answers
                        GROUP BY 1,2
                        )m using(token,question_id,created_timestamp)
                        ) a
                    WHERE
                        token = '$token'
                    GROUP BY
                        1
                ) AS result";

        $result = $conn->query($query);
        $row = $result->fetch_assoc();
        //$temp_value [$name." sq score"] = 0;
        $a = [];
        $a ["Moral Maturity"] = $row["avg_answer"];
        $trend_line = [];
        $trend_line ["Moral Maturity"] = ($row["avg_answer"]-10 >0 ? $row["avg_answer"]-10:0);
        foreach ($answers as $answer){
            
                $temp_value[$sections[$answer["id"]]]=$answer["y"];
                $trend_line[$sections[$answer["id"]]]=($answer["y"]-10 >0 ? $answer["y"]-10:0);
            
        }
        $values= [];
        $combines = $a + $temp_value;
        array_push($values,$a);
        array_push($values,$trend_line);
        array_push($values,$temp_value);
        


        $colours = array(
            array('#eee'),array('red'),array('pink')
        );


        $graph = new Goat1000\SVGGraph\SVGGraph(700, 500, $settings);

        $graph->colours($colours);
        $graph->values($values);

        return $graph->fetch('StackedBarAndLineGraph');
    }

    function space($total){
        $text = "";
        while(($total--) > 0){
            $text.="&nbsp;";
        }
        return $text;
    }

    function enter($total){
        $text = "";
        while(($total--) > 0){
            $text.="<br>";
        }
        return $text;
    }
    

    

    // print_r($sections);
    $sections = $_SESSION['sections'];
    $query = "SELECT
                section_id,
                CASE WHEN total >= 115 THEN 'high' WHEN total >= 70 THEN 'normal' ELSE 'low'
            END AS conclution
            FROM
                (
                SELECT
                    section_id,
                    CAST(ROUND ((SUM(answer)+14)*3.5)AS SIGNED) as total
                FROM
                    (
                        SELECT a.* FROM `answers` a JOIN (
                        SELECT token, question_id, max(created_timestamp) as created_timestamp
                            FROM answers
                        GROUP BY 1,2
                        )m using(token,question_id,created_timestamp)
                    ) a
                WHERE
                    token = '$token'
                GROUP BY
                    1
                UNION
            SELECT
                -1 AS section_id,
                CAST(AVG(total) AS SIGNED) AS total
            FROM
                (
                SELECT
                    section_id,
                    CAST(ROUND ((SUM(answer)+14)*3.5)AS SIGNED) as total
                FROM
                    (
                        SELECT a.* FROM `answers` a JOIN (
                        SELECT token, question_id, max(created_timestamp) as created_timestamp
                            FROM answers
                        GROUP BY 1,2
                        )m using(token,question_id,created_timestamp)
                    ) a
                WHERE
                    token = '$token'
                GROUP BY
                    1
            ) AS result
            ) AS overal
            ORDER BY
                section_id
        ";
    $result = $conn->query($query);
    $result_conclution = [];
    $strongest = "";
    $weekness = "";
    $conclution = "";
    while ($row = $result->fetch_assoc()){
        if ($row['section_id'] == -1){
            $conclution = $row['conclution'];
            continue;
        }
        $result_conclution[$row['section_id']] = $row['conclution'];
        if($row["conclution"]=="high"){
            if($strongest != "") $strongest .=" , ";
            $strongest.= $sections[$row['section_id']];
        }else if($row["conclution"]=="low"){
            if($weekness != "") $weekness .=" , ";
            $weekness.= $sections[$row['section_id']];
        }
    }

    function find_result_onsection($id){
        global $result_conclution;
        return $result_conclution[$id];
    }

    $query = "SELECT * FROM user WHERE token = '$token'";
    $result = $conn->query($query);
    $row = $result->fetch_assoc();
    $email = $row['email'];
    $name = $row['name'];
    $full_graph = full_graph();
    // $strongest = "Holism, Self-Awareness.";
    // $weekness = "Field-Independence, Ability to Reframe, Sense of Vocation, Celebration of Diversity";
    
    

    require_once('tcpdf_min/tcpdf.php');  
    $obj_pdf = new TCPDF('P', PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);  
    $obj_pdf->SetCreator(PDF_CREATOR);  
    $obj_pdf->SetTitle("Export HTML Table data to PDF using TCPDF in PHP");  
    $obj_pdf->SetHeaderData('', '', PDF_HEADER_TITLE, PDF_HEADER_STRING);  
    // $obj_pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));  
    // $obj_pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));  
    $obj_pdf->SetDefaultMonospacedFont('helvetica');  
    // $obj_pdf->SetAutoPageBreak(TRUE, 0);
    //$obj_pdf->SetFooterMargin(PDF_MARGIN_FOOTER);  
    $obj_pdf->SetMargins(0,0,0,false );  
    $obj_pdf->setPrintHeader(false);  
    $obj_pdf->setPrintFooter(false);  
    $obj_pdf->SetAutoPageBreak(TRUE, 0);
    $obj_pdf->SetFont('helvetica', '', 12);  
    
    function footer($page) {
        // global $obj_pdf;
        // $obj_pdf->SetMargins(0,0,0,true);  
        // $obj_pdf->SetAutoPageBreak(TRUE, 0);
        $text = '<div style="background-color:#DE4B99;color:white;font-size:10px;border-bottom:solid 100px #DE4B99;position:inline-block"><br>'.space(10).'Copyright &copy; 2020 Danah Zohar '.space(130).$page.'<br></div>';
        return $text;
    }
    function set_margin(){
        global $obj_pdf;
        $obj_pdf->setMargins(PDF_MARGIN_LEFT,0,PDF_MARGIN_RIGHT,true);
        $obj_pdf->SetAutoPageBreak(TRUE, 0);
    }

    $page_cover = '
        <div><img src="asset/image002.jpg" alt=""></div>
        <div style="width:100vw;text-align:center">
            <h1>
            SQ Self-Report Questionnaire</h1>
        </div>
        <br>
        <div style="width:100vw;text-align:center">
            '.enter(10).'
            <span style="color:#fd79a8;font-size:20px">
            '.$name.'
            </span> 
        </div>
        <div>
            '.enter(10).'
            <span style="font-size:20px;">
            SQ Profile Report
            </span>
            '.enter(13).footer('').'
        </div>';
    
    $first_page = '
            <div style="color:#DE4B99;font-size:15px;"><b>What is SQ?</b>
            </div>
            <div style="text-align:justify;font-size:14px;">
            Danah Zohar introduced the concept of SQ in her 1997 book Re-Wiring the Corporate Brain. Without reference to religious belief or practice, SQ represents the extent that higher values, meaning and a sense of purpose influence an individual’s decisions and actions.'.enter(2).'
            Danah Zohar derived 12 principles of SQ from the properties of complex adaptive systems. All living organisms, including we humans, are such systems. A complex adaptive system can be viewed as a living quantum system, displaying a capacity to self-organize, to thrive on uncertainty and diversity, creatively to re-create itself in dialogue with its environment, and to make positive use of change. In her work, Danah Zohar argues that we humans achieve our optimum potential when we think and behave in ways that reinforce the properties of such systems. She has identified the 12 transformative principles of SQ as the conscious equivalents of the properties of complex adaptive systems. Following this logic, your profile in respect of the 12 SQ principles is also an indication of your strength as a quantum thinker.
            '.enter(2).'
        As you read through and reflect on your profile, it is important to remember that we think and behave at our highest potential when we balance all 12 SQ principles.        
            </div>
        <div style="color:#DE4B99;font-size:15px;"><b>What are the 5 Key Thinking Skills for Leaders? </b>
        </div>
        <div style="text-align:justify;font-size:14px;">
            To be a leader of or within an organization that is profitable, responsible, and sustainable and that serves the needs of customers or citizens demands greater ability than ever before. Today\'s leaders must deal with uncertainty, complexity, rapid change, and ever-new technology. Accordingly, Danah Zohar argues that leaders require 5 key thinking skills:
            <ul>
                <li> Critical Thinking </li> 
                <li> Reflective Thinking </li> 
                <li> Creativity </li> 
                <li> Intuition </li> 
                <li> Moral Maturity </li> 
            </ul>Each of these 5 key thinking skills is supported by some or all of the 12 SQ principles. By cultivating the relevant SQ principles, we can develop our thinking skills and improve our capacity as leaders.'.enter(1);

    $second_page = '<div style="color:#DE4B99;font-size:15px;"><b>Contents of the SQ Profile Report </b>
        </div>
        <div style="font-size:14px;text-align:justify;">To help understand your SQ profile, information in this report is organized in the following sections:
            <br><span style="color:#DE4B99;font-size:15px;">'.enter(1).'<b>Section 1: Overall SQ profile </b></span>
            <br><span style="font-size:14px">This section shows your overall SQ profile based on your answers to the SQ Self- Report Questionnaire.</span>
            <br><span style="color:#DE4B99;font-size:15px;">'.enter(1).'<b>Section 2: Detailed analysis for each of the 12 SQ principles </b></span>
            <br><span style="font-size:14px">This section provides detailed feedback on each aspect of your SQ profile and gives insight into how to cultivate each principle.</span>
            <br><span style="color:#DE4B99;font-size:15px;">'.enter(1).'<b>Section 3: Leadership thinking skills profile </b></span>
            <br><span style="font-size:14px">This section represents your SQ profile in terms of the 5 key thinking skills for leaders.
            </span>
            <br><span style="color:#DE4B99;font-size:15px;">'.enter(1).'<b>Section 4: Next steps </b></span>
            <br><span style="font-size:14px">This last section suggests what you might do with the feedback on your SQ profile.
            </span>
        </div>
        <br>
        <div style="color:#DE4B99;font-size:15px;text-align:justify;"><b> How to use the SQ Profile Report </b></div>
        <div style="font-size:14px">
        It is likely that, in at least some respects, your SQ profile may surprise you, not matching your self-image. Part of the value of the SQ Self-Report Questionnaire is that it allows you to obtain a different view of your strengths and weaknesses. It should not, however, be regarded as an absolute truth or a definitive analysis of your capabilities. Perceptions do, by their nature, differ. Rather the information is to be used as a guide.'.enter(2).'
        It is highly recommended that this report be discussed with a certified SQ coach, counsellor or facilitator. This will provide an opportunity for you to deepen your understanding of your strengths and weaknesses and to learn how to cultivate each principle and achieve a balanced SQ profile. Ultimately, this will help you understand how you can develop personally to enjoy a more fulfilled life and better contribute to your organizational success.
        </div>';
    
    $third_page = '<div style="color:#DE4B99;font-size:15px;"><b>Section 1: Overall SQ Profile </b>
        </div>
        <div style="font-size:13px;">Your SQ profile is <b>'.$conclution.enter(2).'</b>You are strongest in the following principles: '.$strongest.enter(2).'You are weakest in the following principles: '.$weekness.'
        </div>';
    
    $forth_page = '<div style="color:#DE4B99;font-size:15px;"><b>Section 2: Detailed Analysis for Each of the 12 SQ Principles
            </b>
        </div>
        <div style="font-size:14px;text-align:justify">
        This section provides detailed feedback on each aspect of your SQ profile and gives insight into how to cultivate each principle.
        </div>
        <br>
        <div style="color:#DE4B99;font-size:15px;"><b>The 12 Principles of SQ:
            </b>
        </div>
        <span style="font-size:13px;text-align:justify">
        <br>1. <b>Self-Awareness</b>: To know what I believe in, what I value, and what deeply motivates me.
        <br><br>2. <b>Spontaneity</b>: To live in and be responsive to the moment and all that it contains.
        <br><br>3. <b>Being Vision- and Value-Led</b>: To have a vision of how things could be better or different and to work to achieve this; to have a set of deep values and to live by these.
        <br><br>4. <b>Holism</b>: Ability to see larger patterns, relationships and connections; a sense of belonging.
        <br><br>5. <b>Compassion</b>: Quality of \'feeling-with\' and deep empathy.
        <br><br>6. <b>Celebration of Diversity</b>: Valuing other people and unfamiliar situations for their differences, not despite them.
        <br><br>7. <b>Field-Independence</b>: To be able to stand against the crowd and maintain my own convictions.
        <br><br>8. <b>Asking Fundamental Why? Questions</b>: The need to understand things, to get to the bottom of them.
        <br><br>9. <b>Ability to Reframe</b>: Ability to stand back from a situation and to see the bigger picture; to see a situation from an alternative perspective; to change paradigm.
        <br><br>10. <b>Positive Use of Adversity</b>:Ability to accept and learn from mistakes ,to see problems as opportunities; resilience.
        <br><br>11. <b>Humility</b>:Senseofbeingaplayerinalargerdrama,ofmytrueplaceinworld; the basis for self-criticism and critical judgment.
        <br><br>12. <b>Sense of Vocation</b>:Being \'called\' to serve some thing greater than myself; the basis for the \'servant leader\'.
        </span>';

    
    $fifth_page = '<div style="color:#DE4B99;font-size:15px;"><b>1. '.$sections[0].'</b>
        </div>
        <div style="font-size:12px;text-align:justify">
            Your profile is <b>'.find_result_onsection(0).'</b> in respect of '.$sections[0].enter(2).'
            <b>If High</b>: You have a good understanding of your own thought processes, feelings and motives. As a result you have access to your deeper self, which provides you with a sense of peace, freedom from self-limiting beliefs and the ability to live in an authentic way. You have the urge to be in contact with your true self and the responsibility to act from your deepest values and meanings. Your self-awareness also enables you to gain insight into your strengths, weaknesses and other aspects of your character. This means that you tend to have a good understanding of your effect on other people and a better understanding of, and empathy for, others as well.'.enter(2).'
        Because self-awareness requires that you remain present in the moment long enough to perceive your underlying internal processes, it can help you to change your thoughts and interpretations. You are able to see what direction they are taking you in and therefore have control over them before they take hold, allowing you to move into the realm of quantum thinking whereby you become a co-creator in your experience of existence. This SQ principle of self-awareness is correlated with the transformative principle of Self-Organization within a complex adaptive system, whereby it has a deep order sleeping within - a potentiality which then takes on whatever form it will adopt as the system self-organizes in dialogue with its environment.
            '.enter(3).'
            <b>If Low</b>: You may find it difficult to know how you feel at times or indeed why you think, feel and behave in the way that you do. As a result you may frequently experience a range of negative thoughts and emotions, or often get distracted by superficial things; all of which can take away from a deeper sense of fulfillment and a healthy level of self-esteem. You might also not be very aware of the effect that you have on other people.
        '.enter(2).'You find it difficult to be in contact with your deeper self, which could otherwise help to give you more control over your thoughts and feelings, enabling you to form a more meaningful and productive relationship with yourself and your surroundings. It could be that you have not had enough of an opportunity in the past to explore this deeper relationship with yourself and to nurture your levels of self-awareness, or perhaps there is another reason. Many people find the prospect of simply being with themselves a little daunting to begin with. In modern society there are many kinds of distraction available at our fingertips and so many of us have become conditioned to look for a quick fix to our problems outside of ourselves. In many cases, the idea of being alone with oneself can bring up fears of being overwhelmed with negative thought processes and feelings. You may have been desperately trying to avoid these, instead of having the faith that you may be able to change these internal processes for the better.
        </div>';
   
    $sixest_page = '<div style="font-size:12px;text-align:justify">
        '.enter(2).'<b>How to nurture</b>: A good place to start may be to ask yourself, and to explore, why it is that you have not been able to work on your levels of self-awareness more. You can do this either on your own or with the support of someone else such as: a friend, family member, someone else who is on a similar journey to yours, or a trained professional such as a coach or counsellor.
        '.enter(2).'Mindfulness meditation can be a very useful practice to raise your levels of self- awareness. For the optimum result, it is recommended that you incorporate some mindfulness practice into your life on a regular basis. There are many resources available to guide you in this, and you may want to begin with a 15-20 minute session, and build it up at a later date. Dialogue groups are another way to build self- awareness. Within this supported and reflective environment, you have the opportunity to learn about yourself through your interactions with others.
        '.enter(2).'Try to find space and time to \'hear\' yourself each day, and to feel what your body is telling you. Review events of at the end of each day. When where you able to be most authentic or inauthentic? Was there anything you particularly noticed about your reactions to things throughout the day? Many find it very useful to keep a journal. The process of writing your thoughts and feelings down can help to provide you with a fresh perspective. Also the ability to read back and reflect on how much your thoughts and feelings have changed over a period of time can help to provide you with more of a sense of integration in your experiences.
        </div>';
    $sevent_page = '<div style="color:#DE4B99;font-size:15px;"><b>2. '.$sections[1].'</b>
                    </div>
                    <div style="font-size:12px;text-align:justify">Your profile is <b>'.find_result_onsection(1).'</b> respect of '.$sections[1].enter(2).'<b>If High</b>: You are often able to live in the moment, to be responsive to the moment in an impromptu way, to be fresh; you have a child-like quality of openness to new experiences. You are able to think and feel without the baggage of conditioning, prejudice, politeness, timidity or fear. You have the courage to allow room for vulnerability and authenticity in your relationships, so that you are not coming from a defensive or guarded position.
                '.enter(2).'Spontaneity is not to be confused with being impulsive or simply acting on instinct. It involves a readiness to respond in a way that is required in order to bring about a positive effect on the situation. Spontaneity is a necessary prelude to learning by trial and error, experimentation, exploration, and open-mindedness. It opens us further to life\'s potentialities.
                '.enter(2).'Spontaneity is correlated to the transformative principle of Bounded Instability within a complex adaptive system. A complex adaptive system exists only at the edge of chaos, in a zone of instability and chaos, which requires an ability to remain flexible and responsive to changes in the environment.
                '.enter(2).'<b>If Low</b>: You probably act too much from control, habit, fear, rigidity, and lack of self- confidence. You may be constrained by residual attitudes, prejudices and assumptions, which prevent you from dealing effectively with challenges in a fresh way. You may experience difficulty in encountering other people and situations with an open perspective.
                '.enter(2).'Children are born with a high capacity for SQ including spontaneity, but it can often get lost in the process of socialization as they are taught to follow the expectations of family, educational and work institutions, etc. to the point where their spontaneous responses are not encouraged, or even positively discouraged. This may resonate with you. Other life events may have led you to become guarded or fearful of allowing your vulnerability, and thus your authenticity, to show. You may fear that if people can \'see\' you, they will hurt you.
                '.enter(2).'<b>How to nurture</b>: There are many ways to work on your spontaneity, and as with each principle it is for you to decide how much you wish to involve the support or guidance of others along the way. Try to identify what motivates you to engage in habitual or conditioned behavior. Are you holding onto certain fears which cause you to avoid embracing new situations? A fear of risk-taking? A fear of seeming \'stupid\'? A fear of showing who you truly are? Do you tend to judge others by their outward appearance? It may be helpful to write these things down.
                '.enter(2).'Perhaps you could expose yourself to unfamiliar situations and people and pay attention to your reactions and impulses. What is making you uncomfortable? What is making you judge? You could also try an activity, that requires spontaneity, such as an improvisation class or a self-development course that involves group work. There are many activities and courses to choose from.
                    </div>';

    $eight_page = '<div style="color:#DE4B99;font-size:15px;"><b>3. '.$sections[2].'</b>
                    </div>
                    <div style="font-size:12px;text-align:justify">Your profile is <b>'.find_result_onsection(2).'</b> respect of '.$sections[2].enter(2).'<b>If High</b>: You reflect on your values and try to live by them. You feel that your values define the person that you are. You are inspired and motivated by deeper or \'higher\' values, such as a desire to serve or to help in building a better world. You are idealistic, inspired, and motivated by a vision or a yearning for some better way. You see beyond the given circumstances, and ache for the not yet born.
                '.enter(2).'You are able to use this ability to help inspire others, and importantly your actions match your words, meaning that you can be relied upon to deliver on your promises. You are trustworthy. You would choose to turn down an unethical quick fix in order to work towards more challenging long-term goals that you truly believe in.
                '.enter(2).'Being vision and value led has benefits for your overall health and sense of wellbeing. Medical studies have shown that pleasure centers in the brain are activated, and the immune system stimulated, when helping others or feeling dedicated to some higher purpose.
                '.enter(2).'<b>If Low</b>: You may be cynical and experience a lack of trust in your relationship to others, or indeed in life itself. You may simply feel detached from others or your environment, more involved with your own concerns and ambitions. You may experience others, or the environment, as \'other\', there for your use or exploitation. You may have a tendency to get caught up by short-term personal gain, possibly taking the form of excessive materialism, lack of regard for others, engaging in simply expedient behavior.
                '.enter(2).'A low level of vision and values can be detrimental to our own sense of wellbeing as mentioned above, but it also tends to have a negative effect on our environment too, particularly where we play a leadership role. Sportsmen who cheat or public figures who engage in amoral or immoral behavior serve as poor role-models for others. Team or organizational leaders who fail to \'walk the talk\', who fail to be seen to be living by some higher values, lower the morale and productivity of their workforce. They can even damage society as a whole, as in the case of those finance professionals whose self-serving greed and desire for short-term gain caused the financial crisis of 2008.
                '.enter(2).'Being vision and value led is connected with the principle of Emergence within a complex adaptive system. Emergent systems are greater than the sum of their parts.The whole has qualities and properties that the individual parts do not in themselves possess. Those lacking in vision and values isolate themselves from the good of, and hence the benefits of, belonging to the whole.
                '.enter(2).'<b>How to nurture</b>: Mindfulness practice can bring you higher self-awareness, making more clear to you the effect on others or the environment of your self-centered or expedient behavior. You can listen openly to the observations of others who may be critical of your attitudes and behavior, and you can engage in \'soul-searching\'. Do people trust you? Can people rely on you? Do you really like yourself? Are you really happy with what you have achieved? Do you think you are a good role-model for others? Look at what opportunities there are in your life to act from some higher vision or deeper values. What would be the consequences for others? For you? You might \'kick- start\' a new approach by making some resolutions to be more value led in certain of your activities or acts of leadership.
                </div>';

    $nineth_page = '<div style="color:#DE4B99;font-size:15px;"><b>4. '.$sections[3].'</b>
                    </div>
                    <div style="font-size:12px;text-align:justify">Your profile is <b>'.find_result_onsection(3).'</b> respect of '.$sections[3].enter(2).'<b>If High</b>: You have the ability to see larger patterns and relationships. You see connections between things, their overlaps and influences. You appreciate that the part, the detail, the individual, is always part of a larger whole. You see that every question has at least two sides, and that there is a deeper truth or reality within the differences. You have the ability to see the infinite within the finite, the sea within the waves. Hence you tend to see the deeper currents and patterns of a situation of possibility. This makes you broad-minded, intuitive and reflective. It is also likely that you experience a sense of connection between mind, body and soul, and view them as part of a larger system.
                '.enter(2).'This is not to say that embracing a healthy level of holism means dissolving one\'s personal boundaries or not paying attention to detail. Far from it. Having a sense of holism means looking at the bigger picture in a way that is appropriate, useful and required at the time, whilst also knowing the value of, and when to pay attention to and nurture, the parts. Holism as a spiritual principle is related to the complex adaptive system property of Holism. These systems have no internal boundaries, no recognizably separate parts. Each part is entangled and impinges with every other part, which can be demonstrated by the effect of quantum non-locality.
                '.enter(2).'<b>If Low</b>: You may be too reductionist, or \'atomistic\', and therefore get lost in detail, at the expense of the broader picture. You may focus too narrowly on problems, failing to see their wider context. You may have a tendency to be too partisan or too parochial, too concerned with \'me\' and \'mine\'. You may feel separate, seeing others as \'other\'. This in turn can lead to a sense of isolation and suffering at a personal level, and also have a negative impact on others with whom you interact. A sense of isolation and fragmentation is sometimes experienced within communities, organizations or at a global level too, and this is the source of much of the world\'s suffering. At a personal level you may not experience much in the way of holism because your environment has not valued or encouraged it. The Newtonian worldview, which has had an enormous influence on modern society, emphasizes the notion that we are all just random atoms within a cold and lifeless universe, cogs in some universal machine. This has encouraged both excessive individualism and a sense of meaninglessness.
                '.enter(2).'<b>How to nurture</b>: Look for the unifying or emerging theme running through a course of events. Follow through a chain of casual connections radiating outward from or towards where you are now, or the chain of consequences that followed from some action or event. You could choose something either personal or global as your starting point. Reflect on these connections for a time, and you may be surprised at how far- reaching, or in what ways these connections extend. This may be an especially useful exercise for you to try when looking at potential challenges in your career or business. Creating a spider-diagram or mind-map or putting the situation onto paper in another non-linear format may assist this process. Try to do something that makes you feel part of something larger than yourself or your own immediate situation. Perhaps there are new ways to relate to others in your business, to get involved with a community project, or to take the time to connect to your natural surroundings. You may find that listening to music or visiting an exhibition helps to give you a broader view. You could try meditation with your eyes open for a change - perhaps while focusing on a candle - or a walking meditation in natural surroundings. These are all ways to open our senses to connect with something greater than our sense of self as an isolated individual.
                    </div>';
    $tenth_page = '<div style="color:#DE4B99;font-size:15px;"><b>5. '.$sections[4].'</b>
                    </div>
                    <div style="font-size:12px;text-align:justify">Your profile is <b>'.find_result_onsection(4).'</b> respect of '.$sections[4].enter(2).'<b>If High</b>: Compassion is the quality of \'feeling with\' (com-passion). This means that you have a strong ability to empathize and/or sympathize with other beings, and are often able to put yourself in their position. You have the desire, and where possible take steps, to make their circumstances less burdensome and less painful – for their sake. Hence you have a feeling-with another to the extent of knowing that at a deeper level, you are them, and that you share a common humanity. I am not just my brother\'s keeper. Quantum reality tells me that I am my brother.
                '.enter(2).'You are not afraid to be tenderhearted and to try and make a positive difference where possible. This can be uplifting both for yourself and others, as well as having a positive knock-on affect on your environment.
                '.enter(2).'Compassion enables you to feel this common humanity even with someone whose views seem alien or are opposite to yours. It even allows you to feel-with and to understand your enemies or those who may threaten you. You may have to guard yourself against them, but you can still love or forgive them.
                '.enter(2).'However this does not mean going to the extreme in which you make a habit of negating or repressing your own feelings for the sake of others. It is by understanding and accepting our own feelings, or indeed showing genuine compassion towards ourselves that we have a greater capacity to show compassion towards others. In this way it is also important to be mindful of keeping yourself in balance, so that your own resources do not become depleted and you are not needlessly putting yourself in harm\'s way.
                '.enter(2).'<b>If Low</b>: Without a healthy level of compassion you can become insensitive to the needs of others. It may be difficult to understand or sympathize with others - perhaps with those who are different from you or your group. This can lead to acts of cruelty, indifference to others\' suffering, or becoming too ready to form harsh judgments. It can also lead to increased levels of your own suffering as you distance yourself from others.
                '.enter(2).'There can be many reasons for a person to demonstrate low levels of compassion. There has been much debate around the origins of compassion, and
                '.enter(2).'exploration into various sociobiological factors that may affect the degree to which someone possesses it. People who have been raised in an environment lacking compassion may sometimes find it more challenging to demonstrate it towards others. Those raised in an abusive environment may be filled with pain that blinds them to the pain of others, or perhaps even that makes them wish to inflict pain on others.
                '.enter(2).'Brain imaging studies highlight areas in the brain involved in compassion. These can become less active due to various circumstances both past and present, and in extreme cases these centers in our brain can become damaged due to trauma or illness.';
    $eleventh_page = '<b>How to nurture</b>: The brain is \'plastic\' and has a remarkable ability to rewire itself, and the human self has the capacity for constant growth and renewal. Whether due to physical or emotional trauma, damaged or \'dulled\' brain activity can usually be repaired through positive action and reinforcing behavior. A damaged, pain-filled self can heal, and those who have known the suffering of emotional pain can often become the most sensitive to and caring about the pain of others. Many find that, indeed, addressing the pain of others is the best way to assuage one\'s own. Volunteering, or mentoring others, can be one way to do this, and can be a win-win situation.
                '.enter(2).'Consciously putting myself in another\'s position, asking myself, \'What would I do? How would I behave? How would I feel?\' can increase my compassion for others: \'There but for the grace of God go I\'. Understanding why others do as they do can prevent a rush to harsh judgment. Understanding why I do the things I do and feeling some compassion for myself can also raise my compassion for others.
                '.enter(2).'The meditation practice of loving kindness can be useful in developing compassion. Spend a few minutes first sending loving thoughts towards someone that you care about; then, secondly, towards someone with whom you experience tension or conflict; and thirdly, towards a stranger. Then direct loving thoughts towards yourself.
                '.enter(2).'The SQ principle of Compassion coincides with the complex adaptive system\'s property of being Adaptive. These systems not only learn as they go, they create themselves as they act to explore their own futures. This adaption is always in mutually self-creative dialogue to which they are internally sensitive.
                </div>';

    $twelveth_page ='<div style="color:#DE4B99;font-size:15px;"><b>6. '.$sections[5].'</b>
                    </div>
                    <div style="font-size:12px;text-align:justify">Your profile is <b>'.find_result_onsection(5).'</b> respect of '.$sections[5].enter(2).'<b>If High</b>: You tend to love and appreciate other people because of their differences rather than despite their differences. You see the value in embracing the unfamiliar, recognizing that knowledge is crucial in developing tolerance and understanding. You appreciate that truth is multi-faceted, perhaps infinite, and thus in many circumstances there is no \'one best way\'. You often take the view that your best approximation to understanding a problem or a truth is to capture as many different perspectives on it as possible.
                '.enter(2).'You see that stepping outside your comfort zone can be one of the best ways to learn something, and thus you are thankful for things and people that challenge this. You have an ability to respect a point of view (a religion, a belief, an argument etc.) as valid, even though it is different from your own, and an ability to be humble about the importance of your own opinion. All of these qualities require that you can be deeply secure enough in yourself to question yourself and all that you hold sacred. This makes you deeply open-minded and open to learning.
                '.enter(2).'<b>If Low</b>: Perhaps you have not had the opportunity to celebrate much in the way of diversity in the past. You may have been raised in a largely homogeneous culture or environment. You may have been encouraged by parents or friends to feel discrimination against different lifestyles or things outside the accepted norm. You may be insecure about your own beliefs or values and thus feel threatened by different ones. You may just find it more comfortable or easier to be with people and things familiar to you.
                '.enter(2).'Perhaps an experience you have had, or some secondhand information you have received about someone who is different than you, has led you to make negative assumptions about them or their background. Perhaps this has meant that you have also formed negative associations between them and others from different backgrounds to yourself. A number of these associations and assumptions may be subconscious or deeply ingrained, and it may therefore require some effort to get to the bottom of them.
                '.enter(2).'Whatever the cause, by not embracing diversity you may at times lead from a position of narrow-mindedness or arrogance, or be impatient, exclusive, insular and insecure, holding onto prejudices. This can leave you feeling overly fearful and take away from your ability to enjoy to the full the rich tapestry that life has to offer. This can rob you of the opportunity to learn and grow from it. In addition to an individual\'s sense of isolation, the affects of exclusion, intolerance, narrow-mindedness, and discrimination often have far-reaching repercussions within communities and at a global level, as history has repeatedly demonstrated.
                '.enter(2).'Reflecting back on the principle of Holism, it is possible to see that besides each person\'s distinctiveness, which makes us all unique, there is a common thread of humanity that unifies us all. Perhaps we share more commonalities with those who we consider different than we realize, and perhaps those who we consider to be similar have more unique qualities than we are aware of. A quantum worldview allows us to hold two seemingly diametrically opposed beliefs or ideas, and to appreciate that in many cases both are true.';
                
    $thiteen_page = '<b>How to nurture</b>: If you struggle with valuing other people for their differences, it may be good for you to reflect on the reasons behind it. In what way do these differences make you uncomfortable? Do you feel threatened by them or disapproving? And if so, it might be worth further exploring the validity of these emotions. Is there any chance that you might be projecting onto others things about your own nature that you deem unworthy or unacceptable?
                '.enter(2).'Perhaps you simply have no interest or do not see the relevance of learning about other cultures. Why is this? What are the effects of this? Could your life be more interesting if more varied?
                '.enter(2).'It may provide you with valuable insight to learn more about such differences. Attempt to gain more exposure to and consider engaging in dialogue with others who have notable differences to you, in order to see if they can teach you something valuable. Try to immerse yourself in other cultures. There are many ways to do this. Go on a holiday to someplace different. Eat some new \'foreign\' kind of food. Attend another religion\'s place of worship. Read a different kind of book, even watch something on television you have never watched before. Expose yourself to different arguments and political views and reflect on them.
                '.enter(2).'The SQ principle of Celebration of Diversity corresponds with the complex adaptive system\'s property of showing Evolutionary Mutations. Mutations play a creative role in the final emergent structure of these systems\' future. Mutations and indeed the quality of mutability play a key role in the survival of life on earth.
                    </div>';

    $fourteen_page ='<div style="color:#DE4B99;font-size:15px;"><b>7. '.$sections[6].'</b>
                    </div>
                    <div style="font-size:12px;text-align:justify">Your profile is <b>'.find_result_onsection(6).'</b> respect of '.$sections[6].enter(2).'<b>If High</b>: Someone who is field-independent has the ability to act and think independently of the surrounding context. They have the ability to stand against the crowd, and to have their own convictions, even if doing so isolates them or makes them unpopular.
                '.enter(2).'You have carefully questioned yourself and listened to others, but after all these necessary tests you know your own mind and are able to hold your own point of view despite group pressure. You are willing to fight for what you believe in. More subtly, you are able to see through, and stand against currents of your culture that would influence your independent judgment. Field-Independence means being able to stand apart from your immediate circumstances and see your way through. Your strengths include critical thinking, being steady and focused, steadfast, independent-minded, and self-reflective.
                '.enter(2).'It might appear paradoxical that SQ should thrive on both Holism and Field- Independence, as they can appear at first to be opposing principles, but quantum physics and the worldview connected with it allow for both to be true. Things can be both/and instead of either/or. Something can exist in both a wave-like and a particle- like state at the same time. A similar understanding of the nature of reality can be found in schools of Eastern philosophy. Within Daoism, yin co-exists with yang and vice versa; in Buddhism, existence is perceived as having both finite and infinite aspects.
                '.enter(2).'It is important to remember that, as with all of the SQ principles, balance is required in knowing when the use of each principle is important, and to what degree. If taken to an extreme, Field-Independence could lead us away from a sense of Holism and vice versa.
                '.enter(2).'The SQ principle of Field-Independence relates to the complex adaptive system\'s property of being Destroyed By Outside Control. The delicately poised internal order and balance of these systems is destroyed if we try to impose control from the outside. Their own self-organization collapses and they revert to being Newtonian systems. This demonstrates that in order for a complex adaptive system to function, it needs to have a degree of autonomy, as is the case with Field-Independence.
                '.enter(2).'<b>If Low</b>: You are too easily swayed by convention, suggestible, or dependent on approval, on others\' opinions or on circumstances, possibly even blind to your own temptations and motivations. This means that you are likely to struggle to make decisions on your own, to be independent and to make critical judgments.
                '.enter(2).'As seen with the transformative principle of Being Destroyed By Outside Control, the ability to be field-independent can be stifled if one is not granted a healthy degree of autonomy or agency in life. A person can become disempowered and suffer from low self-esteem, leaving them susceptible to being dependent on others, and feeling trapped in negative thought patterns and situations.
                '.enter(2).'A person may have been conditioned to be overly compliant through the implementation of accepted societal norms. Perhaps their educational system may not have provided opportunity for them to employ critical thinking skills and independent thought. A lack of Field-Independence can lead to problems at a personal level, or within a system in which the status quo is not challenged and potentially improved upon.';
    $fithteen_page ='<b>How to nurture</b>: Explore ways in which you might be lacking Field-Independence and why. You may wish to do this with the support or guidance of someone who will help to empower your independent thinking - someone who is good at active listening, who makes you feel validated, and who has enough self-awareness to not form assumptions too easily. This may also help to build your self-esteem, which is important in many ways.
                '.enter(2).'Perhaps you feel that it might a good idea to develop ways of nurturing your field- independence as a solitary pursuit. Meditation is ideal for this, and can encourage your capacity for independent inquiry. As the Buddha said: \'Do not believe anything just because I have told you it is so. Find out for yourself.\'
                '.enter(2).'Studies have shown that once we have been conditioned to think, feel and behave a certain way within a given situation, the brain lays down neural pathways that reinforce this behaviour so that we are prone to reacting in a similar way. Fortunately, due to the neuroplasticity, it is possible to take steps to rewire the brain towards greater autonomy and independence. Regular mindfulness practice is excellent for this.
                '.enter(2).'Question the influences in your life, and try to allow yourself the space to reflect on how they make you think, feel and behave. You can learn to develop your overall critical thinking skills. Perhaps when you feel confident enough to do so, you might find it rewarding to build on your Field-Independence within a group setting. This may take the form of joining a dialogue group or taking part in a debate.
                    </div>';

    $sixteen_page = '<div style="color:#DE4B99;font-size:15px;"><b>8. '.$sections[7].'</b>
                    </div>
                    <div style="font-size:12px;text-align:justify">Your profile is <b>'.find_result_onsection(7).'</b> respect of '.$sections[7].enter(2).'<b>If High</b>: You have a need to understand things, to get to the bottom of them. A tendency to take nothing for granted, but to question its reasons and foundations. You have a fundamental curiosity that seeks to probe the inner workings of situations and other people\'s thinking. You are inclined to want to get beyond the \'given\' and to explore further.
                '.enter(2).'You have the courage to rock the boat; you are unafraid to ask difficult questions of yourself and others. Thus you have a willingness to question your own assumptions and values, as well of those of others. You employ a willingness to investigate every point of view to see if there are alternatives. You have a tendency to feel that there may be more beyond every \'answer\', thus you highly value questions in themselves, as much as and independently of the answers. You have the ability to work towards transforming some of the boundaries of the status quo, as opposed to simply working within them.
                '.enter(2).'However, it is important not to lose balance. We should not ask questions just to upset others or to impress them with our cleverness.
                '.enter(2).'The SQ principle of Asking Fundamental Why? Questions ties in with the complex adaptive system\'s property of Exploration. These systems are constantly exploring their own possible futures and re-creating themselves as they go.
                '.enter(2).'<b>If Low</b>: Children are born with a natural curiosity to understand and explore the world around them. They ask endless questions. This is how they learn about the world. If your tendency to ask fundamental questions in life has diminished, there can be many reasons for this.
                '.enter(2).'Perhaps events have led you to become fearful in expressing your curiosity, or to become afraid of the prospect of discovering the answers. Maybe your parents or teachers, or your boss, discouraged your propensity to ask fundamental questions. You may be afraid of incurring displeasure or punishment.
                '.enter(2).'In any case, not asking fundamental questions can lead to a lack of curiosity or a lack of deep involvement, or you may become more passive or gullible than you would otherwise be. You may lack a sense of initiative as a result, or have a tendency to conform too easily. You may experience dissatisfaction without understanding why. There may be problems in your life or the lives of those around you that could be avoided or resolved, were you to explore the situation more fully.
                '.enter(2).'Sometimes it is painful to ask certain questions, and it is important in this case that you pace yourself and feel ready to explore things further. In this instance, should you wish to further your inquiry, it may be advisable to seek the support and guidance of someone else, to help avoid the possibility of feeling overwhelmed. In some circumstances it may be helpful to seek guidance from a professional who is trained in personal development. In many cases you may well find that as you start to question things more fully, even if it is challenging to begin with, you eventually find a greater sense of peace, understanding and liberation.';
                
    $seventeen_page = '<b>How to nurture</b>: Either on your own, or with the support or guidance of someone else, begin to question why you do not ask so many fundamental questions. When you come to a conclusion, start to explore this. Ask why, how and when this came to be. In short, start asking questions!
                '.enter(2).'You can practice applying this mode of enquiry to other things in your life and in context of the wider world. Challenge the conclusions you reach in themselves. What are they based on? Do the conclusions you have previously reached hold validity?
                '.enter(2).'Mindfulness practice is excellent for generating this kind of enquiry. As you observe in stillness the thought processes and emotions that you are experiencing, you begin to notice what underpins them. False beliefs, fears and desires carry less weight when we can understand them for what they are, allowing us to transform them, and thus our experience.
                '.enter(2).'Try to bring this questioning nature into your daily life. Pay attention to surprising or anomalous events or facts – they are often clues to seeing things from a wholly new perspective.
                    </div>';

    $eighteen_page = '<div style="color:#DE4B99;font-size:15px;"><b>9. '.$sections[8].'</b>
                </div>
                <div style="font-size:12px;text-align:justify">Your profile is <b>'.find_result_onsection(8).'</b> respect of '.$sections[8].enter(2).'<b>If High</b>: You have an ability to stand back from a situation, suggestion, strategy, problem etc. and look for the bigger picture, or an alternative one. Literally, you put the problem or situation in a new frame, possibly a larger one that gives context. You are able to use a wide-frame lens, as well as to zoom in from alternative perspectives. You are able to concentrate on the overall context as well as the immediate details. You may put problems and issues into a larger space/time perspective. What will it look like in the longer term? What will its consequences be in the longer term? How will it look to the extended vision of a larger group, or within the context of a larger problem? What is this a piece of? You have the ability to become aware of your assumptions, and see how they constrain your perspective. You can then see beyond those assumptions, i.e., see beyond your own paradigm.
            '.enter(2).'The ability to reframe is connected to a number of the other principles, and especially to the principle of holism with respect to the ability to look at the bigger picture. But with reframing, the emphasis is on the reshaping and relearning of the environment. This is an essential quality for any real creativity. You tend to be visionary, broad in outlook, adventurous, insightful, open to possibilities, and innovative. The SQ principle of Ability to Reframe is related to the complex adaptive system property of Re-Contextualizing. These systems reframe their own inner development as they re-contextualize (relearn) the boundaries and qualities of their environment.
            '.enter(2).'<b>If Low</b>: You may be too focused on what is right in front of you, or too fixed on your view of the situation or problem. This can narrow your perspective, leading to a seemingly limited set of options. This makes you less likely to find alternatives and solutions and can create problems for you and within your environment.
            '.enter(2).'In some cases, though not necessarily, the inability to reframe can lead to your taking a position of stubbornness or rigidity. In other cases it can lead to a sense of hopelessness or desperation about situations that might have other more workable solutions were one able to look further afield. Perhaps your environment has been one that discourages unconventional thinking. It may that be that you have not had the opportunity in the past to build on some of the thinking skills that would help to nurture your ability to reframe. This will be explored in more detail in the next section of this report, which examines the relationship between 5 key thinking skills and the 12 SQ principles.
            '.enter(2).'<b>How to nurture</b>: You could try some exercises that might help you to develop your capacity to reframe. Perhaps build a set of conceptual models that contextualize a problem or issue, and then try to make versions that are more comprehensive (\'larger\') or different than the last. Try to visualize a challenging situation, and explore it from as many different angles as possible. You could try an exercise in which you pick out an object and then try to think of a handful of ridiculous possible uses for it that you have not encountered before. Do not allow yourself to pick anything sensible or rational. This can help to train your brain to think in more creative ways and unconventional ways, instead of simply using rational thought processes. You could engage in brainstorming sessions with other people, noticing how they approach the problem or situation. Ask yourself, \'What if...?\' Expose yourself to new people, places and ideas. Things that surprise or challenge you may help you understand and explore situations in a different and unfamiliar way. Learn to see the value in stepping outside your comfort zone from time to time.
                </div>';

    $nineteen_page = '<div style="color:#DE4B99;font-size:15px;"><b>10. '.$sections[9].'</b>
            </div>
            <div style="font-size:12px;text-align:justify">Your profile is <b>'.find_result_onsection(9).'</b> respect of '.$sections[9].enter(2).'<b>If High</b>: The Chinese characters for \'crisis\' comprise the component character for \'danger\' and another relating to \'opportunity\'. There are times when encountering the most difficult things in life can serve as an opportunity to learn and grow. You have the ability to gain insight from mistakes, to grow and learn from suffering or failure, to make gains from your setbacks. You become stronger and wiser through life\'s testing. More subtlety, you possess a tragic recognition that not all problems have solutions, and not all differences can be resolved, though you still carry on as best you can, and often a great deal wiser. You have the courage to look at your own weaknesses, faults and past mistakes, to own them, to learn from them and perhaps to correct them. These form part of the foundations for wisdom and maturity. You are far more likely to gain a sense of peace in your life, knowing that you gave it \'your best shot\'.
        '.enter(2).'You are likely to be resilient and dependable, with the ability to inspire and uplift others. Positive use of adversity helps you to face unpleasant truths, and to be better able to live with uncertainty. The principle of the positive use of adversity should not be taken to the extreme, in which a person views weakness in themselves or in others as something that is always necessarily in need of change. We are all human, and sometimes there can be a kind of perfection in our imperfections. People\'s quirks and imperfections can be a part of what makes them beautiful and unique. Deciding on what aspects of character could be changed depends on things such the overall affect on the self and others. In this regard it is important to look at the relevance of the other principles such as Self- Awareness, Humility and Holism, for example, in order to maintain a more balanced perspective.
        '.enter(2).'The SQ principle of Positive Use of Adversity connects to the complex adaptive system property of bringing Order out of Chaos. These systems create order out of chaos; they have \'negative entropy\'. They bring a new form into an unformed or unconstructed arena.
        '.enter(2).'<b>If Low</b>: Without the positive use of adversity we can feel overwhelmed, hopeless, victimized or stuck in the past, or we can blame our circumstances too much. We can become defensive or cynical in the face of adversity and thus prevent healing. However, it should not be underestimated how devastating the effects can be when people when people are overwhelmed by adversity. We are all individuals, and without stepping into someone else\'s shoes, it can be hard to know all the factors that influence whether someone is able to rise above their difficulties or not, and also to what degree. Avoid being judgmental towards yourself or others, and try small steps.
        '.enter(2).'Studies have shown that the environment in which we were raised and past negative experiences can affect the way in which the brain wires itself. We can develop a defeatist mind set, almost inviting further failure. Each time we succeed in learning from a mistake or successfully overcoming a difficulty, we rewire our brains. Just as the complex adaptive system has the potential to redefine itself as it goes along, and to co-create with its environment, so is there enormous potential for quantum thinking and SQ principles to transcend our previous circumstances and old thinking patterns.';
        
    $twenty_page = '<b>How to nurture</b>: There are remarkable stories throughout history of people who have triumphed in the face of tremendous adversity and that demonstrate just how much humankind is capable of. Familiarizing yourself with some of these may inspire or strengthen you. Also, reading spiritual literature that deals with how to view suffering or setbacks in a more positive way may help. Think of friends or family who have faced adversity with courage.
        '.enter(2).'Try to look at some of your life circumstances. What do you feel held back by? What problems do you encounter? Are there any repeated patterns (perhaps in your own behavior, your interactions with others or things you notice with the people around you) that appear in your life as challenging or destructive? Could you try to find ways to respond more positively? Why do you think that these patterns occur? Do you feel held back by things in the past? How could you change this?
        '.enter(2).'Becoming more aware of things that can hold us back is a big step in changing them. Once you have become more aware of these things, you might choose to keep a journal in which you set yourself some goals, perhaps small ones to begin with, in order to bring about changes in your life. It might be helpful to seek the advice or guidance of someone else or the support of a group to help you work on building more positive use of adversity. It may also help you to discover what it is in your life that gives you meaning. As meaning-driven creatures, the ability to get in touch with what gives us meaning can be highly motivating and life-changing. Joining a group or taking up an activity in which you can connect more fully with what is meaningful to you may help you to develop your resilience. This could be anything from taking a walk in nature, to joining an art group, joining a community project or finding more ways to connect to people at work. Meditation has a tremendous capacity to alter our thought processes and is highly recommended in building resilience.
            </div>';
    $twenty_one_page = '<div style="color:#DE4B99;font-size:15px;"><b>11. '.$sections[10].'</b>
            </div>
            <div style="font-size:12px;text-align:justify">Your profile is <b>'.find_result_onsection(10).'</b> respect of '.$sections[10].enter(2).'<b>If High</b>: You have a sense that you are but one player in a larger drama, a sense that your self-importance comes, truly, from something deeper than, or from beyond, yourself. This gives you a sense of awe about the vastness and complexity of life, causes you to observe the good qualities of others, and gives you a sense of how much your achievements are supported by others and grounded on their achievements. You are open to the suggestions and criticisms of others and always deeply willing to question your own assumptions or behavior.
        '.enter(2).'The most important principle of quantum physics focuses our attention on the impossibility of knowing everything about any person or situation. According to Heisenberg\'s Uncertainty Principle, those who would create structures, design strategies, or make decisions are forever destined to grasp at shadows. You know that you do not \'know it all\' and that there is always more to learn. This gives your life a sense of adventure. A sense of humility can provide a feeling of liberation and the ability to work in the spirit of co-creativity with others.
        '.enter(2).'Humility does not mean becoming overly self-critical or self-apologetic, or repeatedly sacrificing your own interests. It is about seeing yourself as fundamentally equal to others instead of higher or lower than them.
        '.enter(2).'<b>If Low</b>: A lack of humility can lead to the suffering of the self and of others. Without humility one can become too filled with pride, and in some cases even fanatical. You do not give others their due, and this can make you domineering or grandiose. You may devote too much of your energy to competing with others, trying to prove yourself better than them. Your may not question your assumptions or beliefs, and thus you do not renew them. A lack of humility can make someone a poor leader because they tend not to empower or make room for the opinions and talents of others.
        '.enter(2).'It may be that someone without much sense of humility was raised in an environment in which they were not given the opportunity to see themselves as part of the bigger picture and to learn the value in connecting with others on an equal footing. Perhaps they were made too much the center of attention, or given too much too easily. In some cases a lack of humility can be an attempt to compensate for an underlying lack of self-worth or to mask other insecurities.
        '.enter(2).'<b>How to nurture</b>: Look at your relation to others and listen to what they say about you. Do people say you are arrogant? Do they say you do not listen? Do people say you cannot take criticism? Have the courage to look at these observations and reflect on them. Why is it that you think you know more or always know best? Are you really wiser or better than others? What might you be missing? Notice areas in which you seem to need appreciation or flattery. Do you ever show appreciation to others?
        '.enter(2).'Reflect on how much you owe to others, or to life\'s circumstances. Make an effort to notice others\' strengths and contributions. Do you ever compliment them or give them positive feedback? Why not? Make a conscious effort to do so. Invite others to tell you what they think, reflecting on how much you might actually learn.
        '.enter(2).'Try reflecting on metaphors that can give you a different perspective, for example looking at your life as a drop in the ocean. In quantum reality, the quantum vacuum is the \'sea\' of energy upon which the universe is written, and each of us but one wave upon that sea.
            </div>';
    $twenty_two_page ='<div style="color:#DE4B99;font-size:15px;"><b>12. '.$sections[11].'</b>
            </div>
            <div style="font-size:12px;text-align:justify">Your profile is <b>'.find_result_onsection(11).'</b> respect of '.$sections[11].enter(2).'<b>If High</b>: The word vocation is derived from the Latin vocare; literally, a \'calling\'. You feel called to pursue a certain course in life, a sense of deep personal (transpersonal!) purpose. You feel a need to act from your deepest self or in service to a higher purpose, a desire to make your life useful, to make a difference. This sense of vocation or having a life-purpose is often accompanied by a sense of reverence, a sense of gratitude, a wish \'to give something back\'. This is a definitive quality of the servant leader. A person can be called to be an honest leader, a good parent, an active citizen. The essential quality is that \'it has to be\'.
        '.enter(2).'Having a sense of vocation means that you are inclined to be thoughtful and grounded. You are likely to feel a deep sense of peace and a sense of belonging. You have a vitality and sense of resolve that helps to inspire others.
        '.enter(2).'While pursuing your vision or purpose, you should avoid the extreme of becoming overly serious or tending towards asceticism. In this regard it is important to keep a healthy sense of humor, balance and proportion.
        '.enter(2).'<b>If Low</b>: There can be many reasons for lacking a sense of vocation. Perhaps you were not encouraged in the past to feel that you could or should make a difference. You may have felt a calling at times, but also felt that you lacked the inner resources or that your circumstances prevented action. (See Positive Use of Adversity.)
        '.enter(2).'Perhaps, as is increasingly the case with growing materialism in society, you were taught that the highest value you should aspire to is the making of material wealth, or something else that feels superficial to you now. Perhaps your life\'s ambitions were too narrow or limited for your abilities, and having achieved them you feel, \'So what?\' You may be feeling bored, empty or dissatisfied, as though you have not yet discovered what gives your life a sense of higher purpose or real meaning.
        '.enter(2).'Lacking a sense of vocation you might experience a lack of motivation in life. This could take the form of finding it difficult to bring discipline into your life, or a sense of lacking direction. You may be feeling, \'I am just drifting\'. You could slip into acting from lower motivations like apathy, or even depression.
        '.enter(2).'<b>How to nurture</b>: Try to reflect on what really moves or motivates you and how you can use it to make a difference. Why are your present goals or activities not doing that? Experiment with life, try something new and see if it makes you feel more fulfilled. Look at the example of others. What is it they are doing that seems to give them more meaning or vitality? Perhaps you could get some advice about your career path from a counselor or advisor in order to see if there are ways to make a more meaningful path achievable through your work.
        '.enter(2).'Reflect on what abilities and gifts you may have (health, mobility, education, material comfort, love, etc.) and think how you might share these with others who are less fortunate. When was the last time you really helped somebody? Could you do so now? Perhaps you could mentor a young person or give some of your time to a community or voluntary project.
            </div>';
    
    $twenty_three_page = '<div style="color:#DE4B99;font-size:15px;"><b>Section 3: Leadership Thinking Skills Profile </b>
        </div>
        <div style="font-size:12px;text-align:justify">
            To be a leader of or within an organization that is profitable, responsible, and sustainable and that serves the needs of customers or citizens demands greater ability than ever before. Today’s leaders must deal with uncertainty, complexity, rapid change, and ever-new technology. This section represents your SQ profile in terms of five key thinking skills required by every leader.
            <ul>
            <li> Critical Thinking</li>
            <li> Reflective Thinking </li>
            <li> Creativity</li>
            <li> Intuition</li>
            <li> Moral Maturity</li>
            </ul>
        </div>
        <div style="font-size:12px">'.enter(25).'Each of the key thinking skills is supported by a subset of the 12 principles of SQ. In order to improve a given skill, for instance, the capacity for critical thinking, a person or a team must cultivate the corresponding principles. Your specific profiles for each of the 5 key thinking skills and the underlying SQ principles are as follows.
        </div>';

    $twenty_four_page = '<div style="color:#DE4B99;font-size:15px;"><b>Critical Thinking </b>
                </div>
                <div style="font-size:12px;text-align:justify">
                    Having the capacity for independent thinking and judgment; the power to discriminate good arguments from poor ones, to assess what is and is not relevant; the ability to surface one\'s own assumptions and biases, or the assumptions and biases latent in a strategy or system of thought, and the ability then to grow beyond or change these assumptions as necessary.
                </div>'.enter(25).'
                    <div style="font-size:12px;"><ul><li> <b>Self-Awareness</b>: The ability to recognize my own assumptions and biases. The ability to see what role my own thinking or behaviour might be playing to disturb the system or group.</li>
                    '.enter(1).'<li> <b>Field-Independence</b>: The ability to stand outside the assumptions or biases of my group/team and see how these may be having a negative or undesired influence on behaviour or strategy.</li>
                    '.enter(1).'<li> <b>Asking Fundamental Why? Questions</b>: A readiness and an ability to question my own or others’ assumptions, biases, and values. An ability to surface what I do not know and a readiness to explore the unknown.</li>
                    '.enter(1).'<li> <b>Ability to Reframe</b>: Now that I have recognized the assumptions and biases driving my own or the team’s thoughts and behavior, the ability to change these and to look at the problem or situation from a new perspective.</li>
                    </ul>
                    </div>';

    $twenty_five_page = ' <div style="color:#DE4B99;font-size:15px;"><b>Reflective Thinking </b>
                    </div>
                    <div style="font-size:12px;text-align:justify">
                    Crucial to reflective thinking is an ability to stand back from a situation or one\'s own emotions about it and to look at it with cool detachment. This is called \'distancing\'. Reflective thinking allows us to understand what things mean and what conclusions can be drawn from them; to understand why things happen and why myself or others behave as they do; to be able to select the relevant data from a mass of information.
                    </div>'.enter(23).'
                    <div style="font-size:12px;text-align:justify">
                    <ul>
                        <li> <b>Self-Awareness</b>: My own immediate involvement in a situation or the concentration with which I have been focusing on a problem can prevent me from standing back to reflect on it. Strong emotion or strong commitment to a particular way of doing something makes me a part of the situation or problem. Reflection becomes possible only when I become aware of my own involvement, when I become aware of the assumptions, biases or emotions that I had been harbouring. Thinking about the role these have played is an important part of the reflective process.</li>
                        '.enter(1).'<li> <b>Asking Fundamental Why? Questions</b>: Using the distance gained by standing back, I can now ask why I or others displayed the emotions or commitments that they did. What was it about the situation that made me angry, for instance? Do I always tend to get angry in that sort of situation? Why? Why do I behave as I do when I am angry and what contribution did it make to the situation? What does this say about me? Why was I or someone else so certain of a conviction? Am I or they quick to rush to judgments or conclusions? Did we consider the wider context, the bigger picture? Did we look at all relevant arguments or possibilities critically? Why not? Look at the root of a problem. What really caused it? How might it be looked at differently? </li> 
                    </ul>
                    </div> ';
    $twenty_six_page ='<div style="font-size:12px;text-align:justify">
        <ul>
            <li> <b>Humility</b>: The capacity for self-criticism and an ability to recognize my own negative role in a situation is critical to sound reflection. I must have the humility to admit that I might have been wrong and then to ask why. Listening to others nourishes reflective thinking.</li>
            '.enter(1).'<li> <b>Positive Use of Adversity</b>: Such honest self-assessment or self-criticism can be painful, and I must have the courage to face that and reflect on its meaning. Often, the things that make me uncomfortable about myself or my behaviour are my starting points for personal growth.</li>
            '.enter(1).'<li> <b>Ability to Reframe</b>: Reflection usually causes us to see things more clearly and to understand what has gone into making a difficult situation or intractable problem. We benefit from this when we can arrive at a fresh point of view or a resolution to behave differently should that kind of situation or problem arise again. Reflection helps us to alter our thinking and behaviour and prevents us from making the same mistakes over and over again.</li>
        </ul>
        </div> ';
    $twenty_seven_page = '<div style="color:#DE4B99;font-size:15px;"><b>Creativity </b>
            </div>
            <div style="font-size:12px;text-align:justify">
            An ability to see, think, hear, or act in a new or surprising way. An ability to \'think outside the box\'. A creative person brings something new into the world, changes the way that others think or see or experience. Creative people may act outside the rules or the usual way of doing things. They see possibility in the \'impossible\'; they ask, \'Why not?\' or \'What if...?\'
            </div>'.enter(25).'
            <div style="font-size:12px;text-align:justify">
            <ul>
            <li> <b>Spontaneity</b>: It is often said that the creative person sees the world with the eyes of a child. Children are not hindered by past ways of doing things or by a set of hardened assumptions. They \'play\' with situations and problems. To the child, everything is a first time, a first challenge, a fresh experience. Spontaneity allows us to greet things freshly, as though for the first time, without conceptual baggage. It allows us to dip into our creative potential (the quantum \'implicate order\').</li>
            '.enter(1).'<li> <b>Asking Fundamental Why? Questions</b>: It is said that Einstein was such a creative genius because he longed to get to the bottom of things, to understand why the universe works as it does. His spontaneity allowed him to look at reality afresh, then he asked, \'Why?\' Again, children learn about their world by endlessly asking questions. They take things apart, they look inside, they question habits, rules and authority. We can never ask too many questions. Questions literally make reality.</li>
            </ul>
            </div>';

    $twenty_eight_page = '<div style="font-size:12px;text-align:justify">
            <ul>
            <li> <b>Celebration of Diversity</b>: Opening ourselves to new experiences, new thoughts, different ways of doing things makes us think differently. Diversity gives us new ideas and encourages us to try new things. It makes us ask questions about our usual ways of thinking or doing things. Diversity enriches the imagination.</li>
            '.enter(1).'<li> <b>Field-Independence</b>: Creative people are independent people, unconstrained by the way others think or do things. They are often unusual or \'eccentric\'. They do not mind being different. Creativity requires doing experiments that others may not do, asking questions that others might even think subversive. And it requires the courage to be true to one\'s new insights, even if these are not readily appreciated by others. Many great thoughts or works of art or literature were not appreciated in their creator\'s life-time. Creative people are often ahead of their time.</li>
            '.enter(1).'<li> <b>Holism</b>: Much creativity flows from seeing connections or similarities between things that others have not seen. An ability to see connections or analogies often allows us to see some deeper underlying possibility or explanation. The ability to see an argument or a situation as a whole often causes us to see a hole or anomaly in it; then we ask, \'What is missing here?\' \'What has been overlooked?\'</li>
            '.enter(1).'<li> <b>Ability to Reframe</b>: The ability to reframe, to reinvent the rules, to see things from a new perspective is the creative act par excellence.</li>
            </ul>
            </div>';
    $twenty_nine_page = '<div style="color:#DE4B99;font-size:15px;"><b>Intuition </b>
            </div>
            <div style="font-size:12px;text-align:justify">
            An almost instinctive or extra-rational ability to see patterns and relationships in a situation or problem and to recognize that these have a meaning. The ability to grasp the whole or crux of a situation that leads to new understanding. Insight into the possibilities latent in a situation. Intuition seems to be a slow, ruminative process that can result in an instant flash of insight. At first, it may require some effort to ground an intuitive insight in a rational argument that others can follow.
            </div>'.enter(23).'
            <div style="font-size:12px;text-align:justify">
                <ul>
                <li> <b>Self-Awareness</b>: An awareness of one\'s own body, \'somatic self-awareness\', is important in the intuitive process. A stirring or tightening in the gut, constrained or quick breathing, a feeling that the chest might burst often precedes an intuitive insight. Such bodily signals can be an invitation to concentrate or reflect, or just to \'make space\' for something to burst through.</li>
                '.enter(1).'<li> <b>Holism</b>: During the ruminative stage of the intuitive process, one often lets the mind \'wander\', literally scanning the inner horizon for connections or similarities or things that may bear on a problem or situation. EEG studies demonstrate that when we concentrate or think step-by-step, the brain is more active in some areas than others, its attention more focused. When we relax (go for a walk, do a gentle sport, just take our mind off things), sleep, or meditate, the brain functions more as a whole. The brain \'speaks to itself\'. And when the intuitive insight comes, it is often a sense of suddenly seeing the whole of a situation or problem, seeing how its various elements hang together. Consciously thinking of possible connections or relationships between apparently separate things can aid the intuitive process.</li>
                </ul>
            </div>';

    $thirty_page = '<div style="font-size:12px;text-align:justify">
            <ul>
            <li> <b>Celebration of Diversity</b>: Exposing oneself to different ideas, people, or experiences often sparks the intuitive process. Difference makes us compare things and helps us to see similarities, connections or new patterns that have not previously occurred to us. If we are open to diversity, we are inviting the mind to explore new ways.</li>
            '.enter(1).'<li> <b>Ability to Reframe</b>: Intuitive ability is linked to being open-minded, open to new ways of looking at things, open to seeing or thinking \'outside the box\'. An intuitive insight often causes us to adopt a wholly different perspective. Thus intuition and creativity are closely linked.</li>
            </ul>
        </div>';

    $thirty_one_page = '<div style="color:#DE4B99;font-size:15px;"><b>Moral Maturity </b>
            </div>
            <div style="font-size:12px;text-align:justify">
            Moral maturity is a large component of our overall SQ profile, bearing on everything to do with our personal and professional relationships and our qualities as a citizen. It reflects the extent to which we are sensitive, thoughtful, responsible, and value-driven in our actions, decisions, and relationships. It also reflects our ability to make and to keep commitments, and the depth of those commitments themselves. Morally mature people are trustworthy, sense and play their part, are open-minded and fair. It calls upon our critical and reflective thinking skills and is a reflection of our general character. Thus it depends upon all of the 12 principles of SQ. To reflect on your moral maturity, look at where you may be strong or weak in each of the 12 principles, and review the sections of Section 2 above about what it means to be strong and how to nurture each principle. If you were weak in one or more of the principles, reflect on why. As you do so, bear in mind how each principle reflects on your general character.
            </div>';

    $thirty_two_page = '<div style="color:#DE4B99;font-size:15px;"><b>Section 4: Next steps </b>
            </div>
            <div style="font-size:13px;text-align:justify">
            It is highly recommended that you discuss this SQ profile report with someone close to you, ideally in a face-to-face feedback session with a coach, counsellor or facilitator. This will provide an opportunity for you to discuss and reflect on your strengths and weaknesses and consider where to focus your development. Discussing it with others in a group/team who have all completed the SQ Self-Report Questionnaire may be helpful. 
            '.enter(2).'Remember that others do not always see us as we see ourselves!
        With every new experience and with each new problem that we face we have an opportunity to change and grow. You can return to your SQ profile from time to time to assess your development or as a source for reflection on a possible new way forward.
        '.enter(2).'Should you wish to seek alternative professional services relating to SQ or quantum thinking, or wish to purchase multiple instances of the SQ Self-Report Questionnaire to administer to others, please email sqsrq@danahzohar.com.
        For more information on Danah Zohar and her work, please visit danahzohar.com.
            </div>';

    // page 1
   
    $obj_pdf->AddPage();
    $obj_pdf->writeHTMLCell(0, 0,0,0, $page_cover, 0, 0, false,false, 'L', false);
   
    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $first_page, 0, 0, false,false, 'L', false);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(2), 0, 0, false,false, 'B', false);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $second_page, 0, 0, false,false, 'L', false);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(3), 0, 0, false,false, 'B', false);
    
    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $third_page, 0, 0, false,false, 'L', false);
    $obj_pdf->ImageSVG('@' . $full_graph, $x=15, $y=70, $w='', $h='', $link='http://www.tcpdf.org', $align='', $palign='', $border=0, $fitonpage=true);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(4), 0, 0, false,false, 'B', false);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $forth_page, 0, 0, false,false, 'L', false);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(5), 0, 0, false,false, 'B', false);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $fifth_page, 0, 0, false,false, 'L', false);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(6), 0, 0, false,false, 'B', false);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $sixest_page, 0, 0, false,false, 'L', false);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(7), 0, 0, false,false, 'B', false);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $sevent_page, 0, 0, false,false, 'L', false);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(8), 0, 0, false,false, 'B', false);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $eight_page, 0, 0, false,false, 'L', false);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(9), 0, 0, false,false, 'B', false);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $nineth_page, 0, 0, false,false, 'L', false);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(10), 0, 0, false,false, 'B', false);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $tenth_page, 0, 0, false,false, 'L', false);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(11), 0, 0, false,false, 'B', false);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $eleventh_page, 0, 0, false,false, 'L', false);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(12), 0, 0, false,false, 'B', false);
    
    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $twelveth_page, 0, 0, false,false, 'L', false);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(13), 0, 0, false,false, 'B', false);
    
    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $thiteen_page, 0, 0, false,false, 'L', false);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(14), 0, 0, false,false, 'B', false);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $fourteen_page, 0, 0, false,false, 'L', false);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(15), 0, 0, false,false, 'B', false);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $fithteen_page, 0, 0, false,false, 'L', false);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(16), 0, 0, false,false, 'B', false);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $sixteen_page, 0, 0, false,false, 'L', false);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(17), 0, 0, false,false, 'B', false);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $seventeen_page, 0, 0, false,false, 'L', false);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(18), 0, 0, false,false, 'B', false);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $eighteen_page, 0, 0, false,false, 'L', false);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(19), 0, 0, false,false, 'B', false);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $nineteen_page, 0, 0, false,false, 'L', false);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(20), 0, 0, false,false, 'B', false);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $twenty_page, 0, 0, false,false, 'L', false);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(21), 0, 0, false,false, 'B', false);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $twenty_one_page, 0, 0, false,false, 'L', false);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(22), 0, 0, false,false, 'B', false);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $twenty_two_page, 0, 0, false,false, 'L', false);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(23), 0, 0, false,false, 'B', false);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $twenty_three_page, 0, 0, false,false, 'L', false);
    $obj_pdf->ImageSVG('@' . full_graph_group(), $x=15, $y=90, $w='', $h='', $link='http://www.tcpdf.org', $align='', $palign='', $border=0, $fitonpage=true);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(24), 0, 0, false,false, 'B', false);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $twenty_four_page, 0, 0, false,false, 'L', false);
    $obj_pdf->ImageSVG('@' . critical_thinking_graph(), $x=15, $y=55, $w='', $h='', $link='http://www.tcpdf.org', $align='', $palign='', $border=0, $fitonpage=true);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(25), 0, 0, false,false, 'B', false);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $twenty_five_page, 0, 0, false,false, 'L', false);
    $obj_pdf->ImageSVG('@' . reflective_thinking_graph(), $x=15, $y=55, $w='', $h='', $link='http://www.tcpdf.org', $align='', $palign='', $border=0, $fitonpage=true);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(26), 0, 0, false,false, 'B', false);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $twenty_six_page, 0, 0, false,false, 'L', false);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(27), 0, 0, false,false, 'B', false);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $twenty_seven_page, 0, 0, false,false, 'L', false);
    $obj_pdf->ImageSVG('@' . creativity_graph(), $x=15, $y=55, $w='', $h='', $link='http://www.tcpdf.org', $align='', $palign='', $border=0, $fitonpage=true);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(28), 0, 0, false,false, 'B', false);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $twenty_eight_page, 0, 0, false,false, 'L', false);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(29), 0, 0, false,false, 'B', false);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $twenty_nine_page, 0, 0, false,false, 'L', false);
    $obj_pdf->ImageSVG('@' . intutition_graph(), $x=15, $y=55, $w='', $h='', $link='http://www.tcpdf.org', $align='', $palign='', $border=0, $fitonpage=true);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(30), 0, 0, false,false, 'B', false);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $thirty_page, 0, 0, false,false, 'L', false);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(31), 0, 0, false,false, 'B', false);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $thirty_one_page, 0, 0, false,false, 'L', false);
    $obj_pdf->ImageSVG('@' . moral_maturity_graph(), $x=15, $y=90, $w='', $h='', $link='http://www.tcpdf.org', $align='', $palign='', $border=0, $fitonpage=true);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(32), 0, 0, false,false, 'B', false);
    
    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $thirty_two_page, 0, 0, false,false, 'L', false);
    $obj_pdf->setMargins(0,0,0,true);
    $obj_pdf->writeHTMLCell(0, 0,0,282, footer(33), 0, 0, false,false, 'B', false);

    $path = getcwd();
    $obj_pdf->Output("$path/result/$token.pdf","F");
    
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    require "vendor/autoload.php";
    function send_email (){
        global $name;
        global $email;
        global $token;
        
        $mail = new PHPMailer();
        $mail->IsSMTP(); // enable SMTP
        $mail->SMTPDebug = 0;  // debugging: 1 = errors and messages, 2 = messages only
        $mail->SMTPAuth = true;  // authentication enabled
        $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for GMail
        $mail->Host = 'thesqtest.com';
        $mail->Port = 465; 
        $mail->Username = 'admin@thesqtest.com';
        $mail->Password = 'adminunited33';
        $mail->setFrom("admin@thesqtest.com","SQ Test");
        $mail->addAddress($email);
        $mail->Subject = 'Result of Sq test';
        $mail->Body    = "Dear $name,\nThank you for taking The SQ Test , here is your profile report.";
        $attachment = "result/$token.pdf";
        $mail->AddAttachment($attachment,"$name.pdf");
        return $mail->send();
    }
    send_email();

    // $obj_pdf->Output('/Applications/XAMPP/xamppfiles/htdocs/php/sqtest/sample.pdf', 'F');
    // echo $content;

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
    <script language="javascript" type="text/javascript">
        function windowClose() {
        window.open('','_parent','');
        window.close();
        }
    </script>
</head>
<body>
<div class="row" style="background-image: url('asset/SQA-header-4.jpg'); min-height: 20%;">
			
            </div>
    
            <div class="row h-100" style="min-height: 70%">
                <div class="jumbotron w-100 h-75" style="background-color:white">
                    <div class="container h-50">
                        <div class="row justify-content-center align-items-center">
                            <div class="jumbotron" style="background-color:rgba(255,100,100,0.1)">
                                <h1 style="color:#fd79a8;text-align:center">Thank you for taking The SQ Test !
<br>The report has been successfully sent to your email. </h1>
                            </div>
                            
                        </div>

                        <div class="row justify-content-center align-items-center">
                    </div>
                </div>
            </div>
    
            <div class="row" style="background-image: url('asset/SQA-footer-4.jpg'); min-height: 10%;">
                
            </div>
</body>
</html>