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

    if (file_exists("result/cn_$token.pdf")){
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
        'axis_font'         => "droidsansfallback",
        'axis_font_size'    => 13,
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

        $sections = $_SESSION['cn_sections'];
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
        $a ["显示你灵商的总览"] = $row["avg_answer"];
        $trend_line = [];
        $trend_line ["显示你灵商的总览"] = ($row["avg_answer"]-10 >0 ? $row["avg_answer"]-10 :0 );
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
            'axis_font'         => 'droidsansfallback',
            'axis_font_size'    => 13,
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
                $score["显示你灵商的总览"] = $row['score'];
                $trend_line["显示你灵商的总览"] = ($row['score']-10 >0 ? $row['score']-10 :0 );
            }else{
                if ($row['label'] == "critical thinking") $row['label']= "批判性的思维";
                if ($row['label'] == "reflective thinking") $row['label']= "反思的思维";
                if ($row['label'] == "creativity") $row['label']= "创造力";
                if ($row['label'] == "intuition") $row['label']= "直觉的能力";
                if ($row['label'] == "moral maturity") $row['label']= "道德的成熟度";
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
        'axis_font'         => 'droidsansfallback',
        'axis_font_size'    => 13,
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
                $score["批判性的思维"] = $row['score'];
                $trend_line["批判性的思维"] = ($row['score']-10 >0 ? $row['score']-10 :0 );
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
        'axis_font'         => 'droidsansfallback',
        'axis_font_size'    => 13,
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
                $score["反思的思维"] = $row['score'];
                $trend_line["反思的思维"] = ($row['score']-10 >0 ? $row['score']-10 :0 );
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
            'axis_font'         => 'droidsansfallback',
            'axis_font_size'    => 13,
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
                $score["创造力"] = $row['score'];
                $trend_line["创造力"] = ($row['score']-10 >0 ? $row['score']-10 :0);
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
            'axis_font'         => 'droidsansfallback',
            'axis_font_size'    => 13,
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
                $score["直觉的能力"] = $row['score'];
                $trend_line["直觉的能力"] = ($row['score']-10 >0 ? $row['score']-10 :0);
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
            'axis_font'         => 'droidsansfallback',
            'axis_font_size'    => 13,
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

        $sections = $_SESSION['cn_sections'];
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
        $a ["道德的成熟"] = $row["avg_answer"];
        $trend_line = [];
        $trend_line ["道德的成熟"] = ($row["avg_answer"]-10 >0 ? $row["avg_answer"]-10:0);
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
    
    
    $sections = $_SESSION['cn_sections'];
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
            if($row['conclution'] == "high") return "若高";
            if($row['conclution'] == "low") return "若低";
            else $row['conclution']=  "如何培养此特性";
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
        if($result_conclution[$id] == "high") return "若高";
        if($result_conclution[$id] == "low") return "若低";
        else return "如何培养此特性";
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
    $obj_pdf->setFontSubsetting(true);
    $obj_pdf->SetMargins(0,0,0,false );  
    $obj_pdf->setPrintHeader(false);  
    $obj_pdf->setPrintFooter(false);  
    $obj_pdf->SetAutoPageBreak(TRUE, 0);
    $obj_pdf->SetFont('droidsansfallback', '', 12,false);

    
    function footer($page) {
        // global $obj_pdf;
        // $obj_pdf->SetMargins(0,0,0,true);  
        // $obj_pdf->SetAutoPageBreak(TRUE, 0);
        $text = '<div style="background-color:#DE4B99;color:white;font-size:10px;border-bottom:solid 100px #DE4B99;position:inline-block"><br>'.space(10).'Copyright © 2020 Danah Zohar '.space(130).$page.'<br></div>';
        return $text;
    }

    function footer_page($page){
        global $obj_pdf;
        $text = '<div style="background-color:#DE4B99;color:white;font-size:10px;border-bottom:solid 100px #DE4B99;position:inline-block"><br>'.space(10).'Copyright © 2020 Danah Zohar '.space(130).$page.'<br></div>';
        $obj_pdf->SetFont('helvetica', '', 12,false);
        $obj_pdf->setMargins(0,0,0,true);
        $obj_pdf->writeHTMLCell(0, 0,0,282, ( $text), 0, 0, false,false, 'L', false);
        $obj_pdf->SetFont('droidsansfallback', '', 12,false);
    }
    function set_margin(){
        global $obj_pdf;
        $obj_pdf->setMargins(PDF_MARGIN_LEFT,0,PDF_MARGIN_RIGHT,true);
        $obj_pdf->SetAutoPageBreak(TRUE, 0);
    }

    $page_cover = '
        <div><img src="asset/image002.jpg" alt=""></div>
        <div style="width:100vw;text-align:center; font-size:20px;">
            <h1>灵性商数 （SQ）  自测问卷</h1>
        </div>
        <br>
        <div style="width:100vw;text-align:center">
            '.enter(10).'
            <span style="color:#fd79a8;font-size:20px">
            '.$name.'
            </span> 
        </div>';
    
    $first_page = '
            <div style="width:100vw; text-alignment:center">
                '.space(22).'<span style="font-size:20px;">灵性商数 评量一览表</span>
            </div>
            <div style="color:#DE4B99;font-size:18px;"><b>什么是心灵商数 （SQ）?</b>
            </div>
            <div style="text-align:justify;font-size:14px;">
            左哈尔 （Danah Zohar）首先在她1997 年出版的『重新撰写企业大脑』一书中介绍灵性商数（灵商）的概念。没有涉及宗教的信仰和修炼，灵商指示出如何更高层次的价值，意义和目的感影响一个人的决定和行为。
            '.enter(2).'
            左哈尔从复杂的适应系统中整理出十二个灵商的特性。每一个由有机体 （ 包括人类）所构成错综复杂的适应系统可视为一个有生命力的量子系统，每个系统展现自我组织和在不定又多样的环境中奋斗的能力。它还能很有创意地与自身的环境对话，并有效地应用外围的变化。左哈尔主张，当人类的思维和行为模式能与他们身处的系统相应时，他们最能挖掘和发挥潜在的能力。左哈尔列出十二个具有改革性灵商的特性，这十二个特性也是对适应系统意识的指针。按这个逻辑，你这十二个原则自测问卷的结果也代表你量子思考的能力。很重要的，当你研读和反思你个人量表的同时，请记住当我们十二特性达到平衡状态时，也是我们最能发挥思想和行为潜力的时刻。            
            </div>
        <div style="color:#DE4B99;font-size:18px;"><b>领导的五个关键思维技巧是什么？ </b>
        </div>
        <div style="text-align:justify;font-size:14px;">
            当今一个有经济效益，负责任，持有可持续性又能服务顾客和民众需要的机构对其领导的能力有前所未有的要求。今日的领导不但需要适应日日更新转换的科技， 还要面对种种急速又复杂不定的变化。基于此，左哈尔认为领导需要五种关键的思维技巧：
            <ul>
            <li>批判性的思维</li>
            <li>反思的思维</li>
            <li>创造力</li>
            <li>直觉的能力</li>
            <li>道德的成熟度</li>
            </ul>以上的每一个思维技巧都和所有或部分灵商十二特性有关。陶冶培育灵商十二特性可以加强思维技巧，增进领导力。'.enter(1);

    $second_page = '<div style="color:#DE4B99;font-size:18px;"><b>灵商自测问卷的内容</b>
        </div>
        <div style="font-size:14px;text-align:justify;">为了帮助你了解灵商的评量表，所设定的自测问卷分成几个项目：
            <br><span style="color:#DE4B99;font-size:18px;">'.enter(1).'<b>第一项：个人灵商评量总览</b></span>
            <br><span style="font-size:14px"> 这个项目根据你对问卷的回答，显示你灵商的总览。</span>
            <br><span style="color:#DE4B99;font-size:18px;">'.enter(1).'<b>第二项： 十二特性的个别详细分析</b></span>
            <br><span style="font-size:14px">这个项目根据你的评量结果提供详细的反馈，并给你一些如何培养每一特性的启发。</span>
            <br><span style="color:#DE4B99;font-size:18px;">'.enter(1).'<b>第三项： 领导力思维技巧评量表</b></span>
            <br><span style="font-size:14px">这个项目呈现你五个领导关键思维技巧的评量。</span>
            <br><span style="color:#DE4B99;font-size:18px;">'.enter(1).'<b>第四项：下一步</b></span>
            <br><span style="font-size:14px">在最后给你建议如何应用你的灵商评量表。</span>
        </div>
        <br>
        <div style="color:#DE4B99;font-size:18px;text-align:justify;"><b>如何使用灵商评量表</b></div>
        <div style="font-size:14px">
        多少你会觉得你的灵商评量表和你认知的自己有点落差。我们自测问卷的另一个价值在于它能让你从另一个角度来看自己的优缺点。然而，这并不代表绝对真理或对于你能力的绝对评估，只是以不同的观点，根据所得到的信息列出指针。'.enter(2).'
        我们极力建议你与有准证的灵商教练，咨商师或协调员讨论你的评量表，这样可以提供机会让你更深地认识你的长短处，学习培养经营每个特性，进而达到灵商平衡的境界。我们的最终极目标是希望你了解能够如何促进个人的发展，有更丰盛的人生，对组织的成功有更多的贡献。
        </div>';
    
    $third_page = '<div style="color:#DE4B99;font-size:18px;"><b>第一项： 灵商评量总览</b>
        </div>
        <div style="font-size:13px;">您的个人心理评估是 <b>'.$conclution.enter(2).'</b>您最擅长以下原则: '.$strongest.enter(2).'您在以下原则上最弱: '.$weekness.'
        </div>';
    
    $forth_page = '<div style="color:#DE4B99;font-size:18px;"><b>第二项： 十二特性的个别详细分析</b>
        </div>
        <div style="font-size:14px;text-align:justify">这个项目根据你的评量结果提供详细的反馈，并给你一些培养每一特性的启发。</div>
        <br>
        <div style="color:#DE4B99;font-size:18px;"><b> 灵商的十二个特性：</b>
        </div>
        <span style="font-size:15px;">
        <br>1. <b>自我体悟</b> :了解自己的信念，价值观与能深深激发自己的事物。
        <br><br>2. <b>自发</b> :活在当下；对当下的事物有所反应。
        <br><br>3. <b>愿景和价值导向</b> :对事情可以如何更好或不同及如何到达此目标持有愿景； 为深层的价值观而活。
        <br><br>4. <b>整体性</b> :能够洞视更大的模式，关系和联结；有强烈的归属感。
        <br><br>5. <b>同理心</b> :拥有感同深受，深切同情的特质。
        <br><br>6. <b>拥抱多元</b> :尊重而非鄙视他人和陌生状况呈现出的差异性。
        <br><br>7. <b>场域独立</b> :能够不受大众的影响，独自持守自己的信念。
        <br><br>8. <b>追根到底，问「为什么」</b> :藉着问「为什么？」来彻底了解事情的原委。
        <br><br>9. <b>重新组织，改变框架</b> :有能力从状况中跳出，看到更大的格局; 用不同的视角观察； 范式转移。
        <br><br>10. <b>积极面对逆境</b> :能够接受错误，并从中学习，视问题为机会；复原能力强。
        <br><br>11. <b>谦逊</b> :视自己不过为大舞台上的一个角色，认知个人在世界所处的位置，一次为自我批评和鉴别论断的根据。
        <br><br>12. <b>使命感</b> :一种服务大于自身事物的召唤。是「仆人领导」的依据。
        </span>';

    
    $fifth_page = '<div style="color:#DE4B99;font-size:18px;"><b>1. '.$sections[0].'</b>
        </div>
        <div style="font-size:15px">
            您的个人资料是 <b>'.find_result_onsection(0).'</b> 尊重 '.$sections[0].enter(2).'
            <b>若高</b>:  你对自己的思维过程，感情和动机有很好的认知。故此，你能伸触到深层的自我，心境和平，超越限制自我思想的束缚，可以很真实地生活。你渴望与你真正的自我连结，期盼挑起按照内心最深的价值和意义来行事的责任。你的自我体悟促使你对自己的优缺点和自己的其他特性有更深层的洞见。这表示你很了解自己对他人的影响，也很能了解和体恤他人。'.enter(2).'
            因为要自我体悟，你必须停留在当下时刻一阵子才能体悟潜在内部的发展，这个体悟的过程能够帮助你改变你的想法和对事物的解释。你能够查验到思想和对事物的解释将你指引的方向，在他们影响你之前，你就先掌控他们，进而你就进入量子思维的范畴，成为一位你生存经验的共创者。这个「自我体悟」特性和在错综复杂的适应系统中「自我组织」的原则是息息相关的。一但系统与环境进行对话，沉睡在内部的潜力就能够转换成适当的形态，参与适应系统的自我组织。
            '.enter(3).'
            <b>若低</b>: 你可能常常不知道自己的感受为何，或不明白为什么你会有这样思想，感觉，和举动。故此，你时常经历到负面的思考和情绪，或常被肤浅的事情干扰。这些负面的经验可能让你失去深层的成就感，甚至危害了你自尊心的健康。
        '.enter(2).'你觉得很难和深层的自我连结。这个深层的自我能够帮助你控制你的思想和感觉，使你能够和自己及周边的环境机建立更有意义及更具创造性的关系。可能在过去，你没有足够的机会去探索与内心自我更深层的关系和加强自我体悟的进深。
        很多人会觉得单单「面对自己」就是一件令人畏缩的事。在当今社会，让我们分心的事是无法计数，所以我们情不自禁地在身外寻找便捷的方法来解决的问题。很多时候，光是想到要单独面对自己，就会激起怕被负面思考和情绪冲击的恐惧， 因此与其相信你有可能进入更深层自我认知和体悟的境界，你只一味想办法去逃避。
        </div>';
   
    $sixest_page = '<div style="font-size:15px;">
        '.enter(2).'<b>如何培养此特性</b>: 培养此特性你可以先从询问和探讨自己为何无法在「自我体悟」上有更好的开发和进步开始。你可以自己探讨，或请你的朋友，家人，与你有类似旅程经验的人士，或者是受过训练的教练，老师帮助你一起探询。
        '.enter(2).'静坐沉思是提升你的「自我体悟」很有效的练习。为了达到最高的效果，我们建议你将沉思静坐列入生活作息的常规。有很多材料可以帮助你从一次15-20 分钟开始，日后再慢慢加长时段。加入谈话小组也是一个增进「自我体悟」的好办法，在着重反思的支持环境里，你可以有机会从和他人的对话当中认识自己。
        '.enter(2).'每天找适合的空间和时段“聆听”自己，感受你的身体正在告诉你些什么。在每天的结尾，回顾一天所发生的事情，到底在何时何处你是最真实的或最虚假的？一天当中，你有没有特别注意到自己对某些事情的反应？很多人发现写日记是发展「自我体悟」很有用的方法，记录自己想法和感受的过程可以提供新鲜的观感。同时从阅读日记中，可以观察到自己一段时间后思想和感情的改变，这也可给你的人生体验带来更多的综合感。
        </div>';
    $sevent_page = '<div style="color:#DE4B99;font-size:18px;"><b>2. '.$sections[1].'</b>
                    </div>
                    <div style="font-size:15px;">您的个人资料是 <b>'.find_result_onsection(1).'</b> 尊重 '.$sections[1].enter(2).'<b>若高</b>: 你经常能够活在当下，对当时的情境清新地作出机动性的反应。你对新的经验有孩童般敞开的心境。你可以毫无包袱地思想和感受，不需要装饰，顾及礼节，没有偏见，拘谨和惧怕。因为你有勇气允许人际关系中有赤裸真实和脆弱的一面，你不会从防御和自卫的立场面对或处理与他人的关系。
                '.enter(2).'「自发」不能和「自我强迫」或「直觉反应」混为一谈。「自发」指的是为要带出正面的成效随时准备好的响应。若想要从失败，尝试，实验，探寻和开放的胸襟中学习，「自发」是最必要的前提。「自发」敞开了生命中的潜力。
                '.enter(2).'「自发」和适应系统中「界限中的不稳定性」的原则有关。复杂的适应系统存在于混乱的边缘。在不稳定和混乱的区域中，需要能够保持灵活，满有机动性地适应和面对环境的变化。
                '.enter(2).'<b>若低</b>: 你可能太过于凭着自己的控制欲，习惯和刻板反应或低落的自信行事。你可能被残留下来的旧态度，偏见和臆测所拘限，让你无法以崭新的方式，有效地克服挑战。你可能很难以开放的胸襟面对其他的人和环境。
                '.enter(2).'孩童多半拥有与生俱来很高的心灵商数， 但是在整个社会化的过程中，他们被教导要赢合家庭，教育和工作组织的期望，他们的「自发」特性就渐渐失落。到一个地步，他们自发性的反应不但没有得到鼓励，甚至是被正面抹杀。你大概可以认同这点。另外，人生中的一些重大事件可能让你害怕显露你的弱点，觉得需要包装真实的自己，你深怕一但人们看到真正你，就会伤害你。
                '.enter(2).'<b>如何培养此特性</b>: 就如其他的特性，有很多方法可以增进你的「自发」力， 一切在于你决定要支取多少他人所提供的支持和指引。 找出构成你固定行为习惯的动力。是否因为你持守着某些恐惧，使你无法坦然面对新的环境？害怕冒险？害怕看起来 “愚蠢”？害怕展现真正的你？你是否有以外表论断人的倾向？将这些写下来可能对你有益处。
                '.enter(2).'或许你可以特意催促自己去接触不熟悉的环境和人，注意一下你的直觉和反应。到底是那里让你感到不安呢？什么让你想要批评？你也可以参加一些需要「自发」的活动，比如加入即兴表演班或一些有关自我发展的辅导课程。你有很多参与的选择。
                    </div>';

    $eight_page = '<div style="color:#DE4B99;font-size:18px;"><b>3. '.$sections[2].'</b>
                    </div>
                    <div style="font-size:15px;">您的个人资料是 <b>'.find_result_onsection(2).'</b> 尊重 '.$sections[2].enter(2).'<b>若高</b>: 你深思你的价值观，並尝试活出你的价值观。你觉得你的价值观定义你的为人。你被更深层或更高的价值，如希望造福人羣或创造更美好的世界所启发和触动。你是个理想主义者，被更好的愿景所启示和激发。你有超越给予环境的视野，为尚未生成的处境焦心。你能够用这种能力来启发别人，更重要的，因为你言行一致，人们深信你会信守诺言，你是个诚实可靠的人。你宁愿拒绝违反道德的快捷方式，而选择遵循一个艰巨但是踏实的长远目标。
                '.enter(2).'你的「愿景和价值导向」给你对来全面的健康和福祉。按医学的研究，当在帮助他人或觉得是在委身于更高的目的时，人脑中的快乐中心就被启动。
                '.enter(2).'<b>若低</b>: 你可能愤世嫉俗，对人生和你的人际关系失去信心。你觉得与周遭的人和环境是疏离的。你在乎自己的关怀和野心。在你人生经历中，他人或环境只是供你使用或开发的外在“其他”。你可能常落入个人短暂利益的陷阱，变得过于物质主义，惯于使用操控的手段，对他人缺乏关怀。
                '.enter(2).'愿景和价值指数的低落不但会抹杀个人的幸福感也会给四周的环境，特别是你扮演领导角色的环境，带来负面的影响。投机取巧的运动员或道德冷漠或有道德污点的公众人物都是不好的榜样。团队或组织的领导若无法言行一致，没有高标准的生活规范，自然就减低了共事同仁们的工作士气和生产力。他们也可以残害整个社会，正如那些商界专业人士为了满足个人的贪婪，夺取短暂的盈利，造成2008 年的财经危机。
                '.enter(2).'「愿景和价值导向」与复杂的适应系统中「及时出现」的原则相应。「及时出现」的系统大于部分的总和。这个完整的系统拥有个别部分所没有的质量和属性。没有愿景和价值的人将自己和整体的美好和利益隔离。
                '.enter(2).'<b>如何培养此特性</b>: 多做刻意的练习可以让你有更高的自觉，让你更清楚看你自我中心的视野和强制的行为对他人和环境所带来的影响。你可以敞开聆听别人对你态度和行为严苛的观察，然后做深一层的自我反省。人们相信你吗？人们觉得你是可靠的吗？你喜欢你自己吗？你对自己的成就感到欣慰吗？你觉得你是别人很好的典范吗？
                '.enter(2).'看看你人生当中有什么机会是你可以为更高的愿景和更深的价值付诸行动的？ 这些行动会给你和他人带来什么结果？你可以开始一个新的计划，让你自己投身於附有更高价值的活动和领导行动。
                </div>';

    $nineth_page = '<div style="color:#DE4B99;font-size:18px;"><b>4. '.$sections[3].'</b>
                    </div>
                    <div style="font-size:15px;">您的个人资料是 <b>'.find_result_onsection(3).'</b> 尊重 '.$sections[3].enter(2).'<b>若高</b>: 你有能力看到更大格局里的模式和关系。你能透视事情之间的关系，它们之间的重叠和影响。你能珍赏每一个小部分和细节，能珍惜个体是一个更大整体的一部分。你认为每一个问题都有它的两面，有更深的真理或现实的差异。你能在有限中看到无限，在浪涛中看到大海。你尝试藉着透视深层水流趋势和事情发生可能性的规范倾向来塑造你胸襟开阔，直觉和反思的特性。你经历到身，心，灵密切的联结，视自己的身，心，灵是一个更大系统中的一部分。
                '.enter(2).'有健康的「整体性」并不是表示完全撤销个人的界限或要忽视细节。相反的，「整体性」指的是在当下时刻，以合宜，有效和必要的方式来看一个较大的格局，但同时能认知局部的价值，知道何时对局部给予关注和照顾。这个特性也应用在复杂的适应系统的「整体性」上。这些适应系统没有界限，没有清楚的分化。每一个部分互相纠缠牵扯就如量子的非局域性效应一般。
                '.enter(2).'<b>若低</b>: 你可能是个极端的还原论者 （化约论者）或原子论者，牺牲了大格局，迷失在细节中。你过于狭隘地集中于问题本身，忽略了问题所置身的广泛层面。你可能很容易盲目推崇权威或赋予权贵，过于看重自我和自己所拥有的。你可能感觉疏离，视他人为抽离的分子，因而造成你有一种孤独隔离和受难的感觉。这也让与你有互动的人接收从你而来负面的能量。在社群，组织甚至在全球的范畴中感到疏离和支离破碎是当今世界许多苦难的来源。你之所以在个人的层面没有经历到「整体性」是因为你未曾从你的环境中得到重视和鼓励。牛顿式的世界观对现今的社会有深邃的影响，这个世界观强调我们不过是冷漠无息宇宙运作中一个无关紧要的原子。这个观点助长了偏颇的个人主义和无意义感。
                '.enter(2).'<b>如何培养此特性</b>: 在一系列的事件中寻找一致或曾浮现的主题。尝试从你所在之处随意发散串联，或从四方出发连结到你当下之处。也可观察某个行动或事件带出来的一连串后果。你可以选择以自己或全球为你的出发点，花一段时间来反思这些连结，这些连结延伸的程度和转变会带给你意外的惊喜。这是个很有用的练习，尤其是当你面临职场上挑战的时候。创造个蜘蛛网状的构思图，或将处境在纸上用非直线的格式呈现出来，这对培养「整体性」都是很有帮助的。尝试去参与一些大于自我，超越自己当下处境的计划工程。或许在职场上你可以尝试用新的方式和他人互动，参加一些社区的活动，或找出时间和大自然联结。听音乐或参观展览也可以帮助你有更宽广的视野。你可以试试张着眼冥想，比如聚焦在一根蜡烛上，或在大自然中漫步静思。有很多方法可以打开我们的感观，让我们可以去与超越自我的世界联结。
                    </div>';
    $tenth_page = '<div style="color:#DE4B99;font-size:18px;"><b>5. '.$sections[4].'</b>
                    </div>
                    <div style="font-size:15px;">您的个人资料是 <b>'.find_result_onsection(4).'</b> 尊重 '.$sections[4].enter(2).'<b>若高</b>: 「同理心」就是能与人感同身受的特质。这表是你能够很强烈地同情他人的感受，并能将自己放在他人的处境中。为了他人的好处，你不但渴望也愿意付出行动，为要减轻他人的重担和痛苦。既然你能深切体验他人的感触，你能与他人分享人性的本质。我不只是我兄弟的守护者，量子的现实告诉我：我就是我的兄弟。
                '.enter(2).'你并不害怕展现你的慈心，并且尽量尝试做出正面的改变，这不但鼓舞了他人和你自己，也给你的环境带来正面的连锁反应。
                '.enter(2).'「同理心」让你能从他人，即使是观点与你不同甚至是相违背的人身上，感受到人性的共同本质。「同理心」甚至让你可以对你的敌人或可能对你有威胁的人感同身受。你可能对他们有所防卫，但是你仍然可以爱和原谅他们。
                '.enter(2).'然而，这并不表示你会极端到为了他人的好处，你习惯性地否定或压抑自己的情感。其实是基于我们对自己的了解和接纳，或对自己表示真诚的同情，我们才有更大的容量去施与对他人的同情。因此很重要的，我们要特意保持自己的平衡，才不至于自己的资源枯竭或给自己带来无谓的伤害。
                '.enter(2).'<b>若低</b>: 没有健康的「同理心」，你对他人的需要没有敏感度，你很难去了解或同情别人，特别是与你不同或不属于你群体的人。你对别人的灾难痛苦冷酷无情，或是急于作苛刻的论断。更近一步，由于与人的疏离，你自己的痛苦也日剧加增。
                '.enter(2).'造成一个人缺乏同理心的原因很多。至今针对「同理心」的源由和影响「同理心」的社会和生理因素有很多学术研究上的争议。一个在缺乏同理心环境长大的人可能会觉得比较难向他人表示同情。那些在受虐环境成长的人，因为心中积满痛苦，导致对他人的苦楚视而不见，甚至希望将自己的痛苦转加在别人身上。
                '.enter(2).'脑显像图的研究显示，过去和当前的某些环境因素，会导致脑部控制「同理心」部位的活动减少。一些极端的个案甚至显示，灾难或疾病甚至会使脑部指使「同理心」区域受损。</div>';
    $eleventh_page = '<div style="font-size:15px;"> <b>如何培养此特性</b>:  脑有可塑性，有重新搭线的能力。人的自我也具有成长和更新的功能。不论是因为受到生理或情绪上的伤害或打击，受损或迟钝的脑部活动可藉着正向的引导和加强得以修复。一个充满挫败痛苦的自我是可以痊愈的。那些经历过心灵伤痛的，常常是最敏锐，最能体验他人楚痛的。很多人发现，关怀他人的痛苦事实上是减轻自己伤痛的最好方法。主动提拔和栽培他人是培养此特性的一个很好途径，同时也可营造双赢的局面。
                '.enter(2).'处心积虑地将自己放在别人的处境，问自己： 「是我的话，我会怎么做？我会怎样表现？我会如何感受？」这都可以增加你对别人的「同理心」：若不是上帝的恩典，我也会遭遇到同样的困境。了解他人为何会有如此的举动能够让你不急着轻易严苛批判。了解自己为什么会如此行事和感受，对自己发出一些同情也能提升你对他人的同情。
                '.enter(2).'以慈爱和关怀作为静默沉思的主题有对发展「同理心」也是很有帮助的。首先花几分钟对你关心的人送出关爱的思想；第二，向与你关系紧张或有冲突的人送出关心的意念； 第三，对一个陌生人发送关怀的思想； 最后，给你自己发送爱的信息。
                '.enter(2).'这个灵商的「同理心」特性和复杂适应系统中的「适应」原则呼应。这些适应系统不只一直在学习，在探寻自己未来的过程当中，他们也在创造。这类的适应总是发生于内在敏锐感应的相互自发创造中。
                </div>';

    $twelveth_page ='<div style="color:#DE4B99;font-size:18px;"><b>6. '.$sections[5].'</b>
                    </div>
                    <div style="font-size:15px;">您的个人资料是 <b>'.find_result_onsection(5).'</b> 尊重 '.$sections[5].enter(2).'<b>若高</b>: 与其贬低，你倾向于关爱和欣赏与你不同的人们。你知道簇拥差异的价值和意义。你承认知识是发展理解和容忍的关键。你感念真理是多面的，甚至是无限的，因此在许多情境中，没有“唯一最好的方法”。你常以为，想要明白问题和真相的最好方式就是用各种可能的视角来观察探讨。
                '.enter(2).'你认为最好的学习途径就是跳出自己的舒适区，故此你为挑战你离开舒适区的人或事而感恩。你能够尊重和肯定别人的观点（宗教，信仰，论点等），即使他人的看法与你大有不同。你同时也能对自己的论点保持谦卑的态度。拥有这些特质，你必须是有很深的安全感让你可以坦然地质问自己和持守你认为是神圣的。这些特质使你成为思想宽广，乐于学习的人。
                '.enter(2).'<b>若低</b>: 或许过去你并没有什么可以「拥抱多元」的机会。你可能一直成长生活在单一雷同的文化和环境中。你的父母或朋友可能鼓励你要贬低歧视正常范围以外的事物和生活方式。你可能对自己的信仰和价值观没有什么安全感，以至不同的信仰和价值观给你带来威胁的感觉。你或许觉得和与自己相似的人相处比较舒服和容易。
                '.enter(2).'或许你过去的某个经验或间接收到的信息让你对某些人和他的出身有负面的假设。这也可能表示你已将某些人和其他与你出身背景不同的人做了一贯的负面联想。这些假设和联想可能附在潜意识裡或已根深蒂固，需要作一番努力才能探出底部的源由。
                '.enter(2).'不论原因为何，因为无法接纳赞赏差异，你很多时候是以狭隘，傲慢，急躁，孤傲，排他，偏激和不安的心态和立场在领导他人。你可能因此觉得被恐惧笼罩，无法享受多彩多姿生命中的丰盛和喜乐，这也夺取了你从中学习和成长的机会。
                '.enter(2).'排他，不包容，思想狭隘，和歧视等负面的心态不但影响个人，给社群带来深远的影响已在全球的历史中重复证实。
                反思「整体性」的原则，除了看每个人独特的个别性，每个人也具有人类共同的特质。各人的差异造成每个人的独特性，但是人类共同具有的特质让我们可以与他人凝聚联合。或许与我们不同的人与我们的共同性大於差异性；而那些我们觉得与我们相似的人和我们的差异可能比我们想象的要多得多。量子的世界观允许我们同时有几乎两级化的思想和主义，并能接受在很多情况下两者都是正确的。';
                
    $thiteen_page = '<div style="font-size:15px"><b>如何培养此特性</b>: 如果你常在尊重赞赏他人差异这方面挣扎，你可能最好反省一下到底背后的原因为何？在那方面这些不同之处让你感到不自在？你是觉得受到威胁，还是觉得无法赞同？如果有以上的感觉，你要进一步探讨这些感觉的根据是什么？是不是你将你自己的无价值感和不被接受感投射在这些人或事上？
                '.enter(2).'或许你只是对学习其他文化没有兴趣，或觉得没有必要。为什么你会这样以为呢？这会带来什么影响？多一点变化会使你的人生更有乐趣，不是吗？
                '.enter(2).'学习多样文化能激发有价值的洞见，让你能对文化的差异性有更深的认识。尝试特意与和你有显著不同的人多多交谈，看看他们是否可以教导你什么有意义的功课。试着将你自己沉浸于其他的文化之中。有几种方法可以达到这个目的，比如： 选择一个特别的地方度假； 享用别国的餐点；参与其他宗教的聚会；读一本其他类的书；看你从未看过的电视节目。接触一些不同的谈论和政治观点，然后沉淀反思一下。
                '.enter(2).'T灵性商数中「拥抱多元」的特质与在复杂适应系统中的「进化转变」原则相应。突变对系统中最后浮现出未来的结构，扮演一个具有创意的角色。转变和能变异是在地球上生存很关键的特质。
                    </div>';

    $fourteen_page ='<div style="color:#DE4B99;font-size:18px;"><b>7. '.$sections[6].'</b>
                    </div>
                    <div style="font-size:15px;">您的个人资料是 <b>'.find_result_onsection(6).'</b> 尊重 '.$sections[6].enter(2).'<b>若高</b>: 「场域独立」的人能够超越周围的情境，独立行动和思考。他们能抵抗群众的影响，把持自己的信念，即使到孤立或被排挤的地步。
                '.enter(2).'你会仔细地聆听他人和自我询查，但是经过必要的多方测试，你知道自己的想法，不论同侪的压力多大，仍然坚持自己的观点，愿意为你的信念奋斗。你能够透视和抵挡会影响你独立思辨的狂澜。「场域独立」指的是能够从你当下的直接环境中抽离，看到自己的出路。批判思维，稳健，专注，持守，独立思考和自我反省是你的优点。
                '.enter(2).'这好像有点矛盾，因为在灵性商数中讲求的是有「整体性」但又能「场域独立」。表面上看来这两个好像是极端的特质，但在量子物理和与其连结的世界观是允许两者并为正确的。两者不一定非要二选一，也可能两者皆可。有些物质可以同时在微波和粒子的状态。东方哲学里对现实世界也有类似的了解。在道学里，阴和阳是同时存在的；佛学中，存在包涵了有限和无限两个层面。
                '.enter(2).'请务必记得，灵商中最重要的是要知道何时运用那个灵商特质，运用到什么程度以致达到平衡。若过于极端，「场域独立」会引我们远离「整体性」，反之亦然。
                '.enter(2).'这个灵商的特质与复杂适应系统的「被外来控制破坏」的原则相应。若我们强制施加外控，内部本有精致的次序和平衡就被破坏，系统中的自我组织瓦解，退回成牛顿式的系统。这也说明若要一个复杂的适应系统运作，一定要有某程度的自主性，就如「场域独立」的特性。
                '.enter(2).'<b>若低</b>: 很容易被游说，被众说云云指使，依赖他人的意见和环境的指示，需要他人的认可。这也表示你无法独立，很难自己做决定、做批判式的论断。
                '.enter(2).'从以上讨论过具变革性的「被外来控制破坏」原则来看，一个人生命中如果没有给予健康程度的自主权，他「场域独立」能力就会被压抑。这个人可能变得软弱无力，自尊心低落，处处要依附他人，觉得被局限在负面的模式和局面当中。';
    $fithteen_page ='<div style="font-size:15px;"> 
    一个人可能藉着一味附和众所接纳的社会常规，将自己设定在过于平顺安逸的状态。或许他们所受的教育没有给他有应用批判和独立思考的机会。缺乏「场域独立」可以展现于个人层面，也可能出现于一个未被挑战或改进过的系统中。
                '.enter(2).'<b>如何培养此特性</b>: 探讨在那方面和为什么你缺乏「场域独立」。你可能需要一些人的支持和引导来进行这件事，就是那些能促使你独立思考，善于聆听，让你觉得受重视，有足够的「自我体悟」，不会过于容易猜忌的人。这也能建立你的自尊心。对各方面而言，自尊心是很重要的。
                '.enter(2).'或许你会认为私底下独自经营「场域独立」也不错。默想静坐是最理想的，它能提升你独立探询的能力。正如佛陀所强调：「不要因为这是我告诉你的，你就全盘相信，要自己去发现。」
                '.enter(2).'研究显示，一但我们设定在某一情况要有某种特定的思想，感觉和行动模式，我们的脑也按这样的设计安排脑神经的通路，以致于我们每次皆以雷同的方式反应。幸好脑神经有可塑性，可以逐步改变脑神经的线路，能朝更自主，更独立的方向迈进。定期特意的练习就会有卓越的效果。
                '.enter(2).'问问自己一生中曾受到什么人的影响？给自己空间去反思这些人是如何影响你的思维，感觉和行为？你就能够学会如何发展你的批判性思维。或许当你觉得信心多一点的时候，你就会发现在群组中建立你的「场域独立」是很值得的。你可以加入一个论谈小组或参加辩论会。
                    </div>';

    $sixteen_page = '<div style="color:#DE4B99;font-size:18px;"><b>8. '.$sections[7].'</b>
                    </div>
                    <div style="font-size:15px;">您的个人资料是 <b>'.find_result_onsection(7).'</b> 尊重 '.$sections[7].enter(2).'<b>若高</b>: 你有了解事情真相，探究到底的需要。你认为没有任何事是理所当然的，你要探清它的理由和基础。你对发掘情势的内部运作和他人的想法充满好奇。你常想要探讨表面之外更深更广的部分。
                '.enter(2).'你有制造不安的勇气；你并不害怕问自己和别人困难的问题。故此，你愿意怀疑自己和他人的假设和价值。你自愿要审查每一个观点，看看是否还有更多的选择。因为常会觉得应该还有其他的答案，你认为「问题」本身与「答案」一样有价值的。你的能力在于改变安定现状的界限，而非只在界限之内运作。
                '.enter(2).'然而，很重要的是不要失去平衡。我们不应当用问题来惹怒他人，或用问题来向他人炫耀我们的机智。
                '.enter(2).'灵商中「追根究底，问『为什么』」这个特质和复杂适应系统中的「探测」原则联结。系统不断探测可能的未来，不断重新创造。
                '.enter(2).'<b>若低</b>: C孩子们天生就具有想要了解和探测自己周边世界的好奇心。他们没完没了地问问题，这是他们学习认识世界的途径。如果在生命中，你询问「为什么」的频率变小了，可能是出于以下原因。
                '.enter(2).'或许一些事件让你开始恐惧表达自己的好奇或害怕找到了答案。或许你的父母，老师或老板不鼓励你有追根究底，问问题的习惯，你可能害怕因此若怒他们或受到处罚。
                '.enter(2).'不论如何，不问重要的问题导致你缺乏好奇心或缺乏深入的投入。你可能变得更消极，更容易迷失上当。你因此缺乏自动自发的情怀，容易随波逐流。你可能没有什么成就感，但却不知道为什么。如果你愿意更深层地探索，很多你自己或你四周围人们生命中的问题是可以解决或避免的。
                '.enter(2).'有时候，要问某些问题是很痛苦的。这时，重要的是要调整自己的步调，准备好后再继续探寻。如果你决定要往前探究，为了避免过重的情绪负荷，最好徴得他人的支持和辅导。在某些状况，可能寻求在个人发展上受过训练的专业人士的协助会比较合适。一但你开始问深一点的问题，即便一开始可能觉得是个挑战，久而久之，你会感受到更多的释放， 领悟和平安。';
    $seventeen_page = '<div style="font-size:15px;"><b>如何培养此特性</b>: 不论是私下或依靠他人的支持或协助，开始审查为什么你不问一些基层关键的问题。若你找到结论，就要挑战自己，鞭策自己在何时和如何开始问问题！
                '.enter(2).'你可以将这种询问的模式应用在生活的其他层面或更宽广的界面。挑战你对事物自定的结论，想想这些结论的基础是什么？你的这些结论准确可靠吗？
                '.enter(2).'特意地练习是激发这个特性极好的方法。当你在沉静中观察自己的情绪和思维，你渐渐开始发觉更深层的自我。当我们看清错误，恐惧和欲望的真相和允许自己去改变它们的时候，它们对我们冲击的力量相对就减小，进而我们的经验也会有所改变。
                '.enter(2).'试着将这种询问的精神带进你每天的生活当中。特别留心观察意外或非常态的事件，它们常常是让你从完全不同角度看事情的提示和线索。
                    </div>';

    $eighteen_page = '<div style="color:#DE4B99;font-size:18px;"><b>9. '.$sections[8].'</b>
                </div>
                <div style="font-size:15px;">您的个人资料是 <b>'.find_result_onsection(8).'</b> 尊重 '.$sections[8].enter(2).'<b>若高</b>: 你有能力从某个情境，建议，策略或问题中退一步，看到大格局或另一个选择。你将问题和状况放进一个新的框架，可能是一个更大的框架。你能够用广角镜头和对准焦距不同的视角来看问题。你可以聚焦在大范围的内容，和近处的细节。你可以将议题放在更大的时间和空间范畴。这个长远看来会是如何？怎样可以将愿景延伸到更大的群体？若同样的内涵，但是面临更大的问题又会如何？这只是怎样大格局的一部分？你有能力察觉到自己的假设如何限制你的洞察力，你能够以超越那些假设和超越自己范例的角度来观察。
            '.enter(2).'这种能够看到大格局「重新组织，改变框架」的能力可以与几个其他的特性连结，特别是「整体性」。然而「重新组织，改变框架」强调对环境的重新改造和学习而言。对于任何真正的创造，这是一个必要的特质。你有愿景，有宽广的视野，有冒险的精神，有洞见，有创意，对任何可能性都采取开放的态度。「重新组织，改变框架」的能力与复杂适应系统中「重新处境化」原则相应。这些系统藉着重新学习，重新改变内在环境的格局，框架和质量。            
            '.enter(2).'<b>若低</b>: Y你可能够于注重在你眼前看为正确的事物，或者太过聚焦在自己对情境或问题的观点上。你的视野过于狭隘，以致选择有限。缺乏选备方案已给你和你所处的环境带来不少麻烦和困扰。
            '.enter(2).'在某些时候，因为你无法改变框架，你变得刻板僵硬。另一种可能就是你对事情局面持有悲观失望，穷途末路的感觉。其实只要你愿意退一步，用宽广一点的视野来看就会找到可行的解决方案。或许你的环境并不鼓励你有创新的想法。也可能你过去没有机会去发展你重组改变框架的思维技巧。在稍后我们观察12个灵商特性和5 个思想技巧的段落，我会对这点有更详细的剖析。
            '.enter(2).'<b>如何培养此特性</b>: 你可以尝试一些能帮助你发展重组能力的练习。设计一套在某状况的问题或议题的概念模式，然后尝试创出几种更完整或不同的模式。假想一个具有挑战性的处境，然后用尽个各种可能的角度去检视。你也可以试试拿一样东西，然后想出一些你从来没想象过有关这东西的荒谬用途，不要用常理来回答。这可以帮助训练你超越简单的合理推理方式，能够用非传统，更创新的方式来思考。你也可以参与一些脑力激荡的群组活动，看看别人是如何探讨问题的。问自己：「如果…?」让自己多接触新的人，地方和思想。让你感到意外或挑战的事物能够帮助你以不同和不熟悉的方式来了解和探究。学习体会经常踏出舒适区的价值。</div>';

    $nineteen_page = '<div style="color:#DE4B99;font-size:18px;"><b>10. '.$sections[9].'</b>
            </div>
            <div style="font-size:15px;">您的个人资料是 <b>'.find_result_onsection(9).'</b> 尊重 '.$sections[9].enter(2).'<b>若高</b>: 中国文字中 “危机”是危险和机会的组合。很多时候人生当中所遭遇的困难可视为学习和成长的机会。你能从错误中获取智慧，从挫折中寻得益处，从苦难或失败中成长和学习。人生的历练使你变得更强壮，更有智慧。更妙的是，你有一个悲剧性的觉悟：并非所有的问题都有答案，所有的差异都能得到认同，但你仍旧以你最好一面往前迈进，你的智慧因而更得以增长。
        '.enter(2).'你有勇气面对并承认自己的软弱，缺点，和以前犯过的错误，并能从中学习改进。这些都是智慧和成熟的基础。因为知道自己已经“尽其所能”，你内心一定有一种无可言语的平静。
        '.enter(2).'你一定也是很可靠，很有弹性，有能力激发鼓舞其他的人。「积极面对逆境」帮助你去面对不悦快的真相，在不明确当中处之泰然。切勿将「积极面对逆境」原则极端应用，认为自己或别人的缺点都是需要改变的。我们都是人，要在我们的不完美中当中看到完美。某些人的怪异和瑕疵就是他美丽和独特之处。至于到底那一些特质是要改变的，就取决于它们对个人和他人全面的影响。很重要的，我们是要看这个特质与「自我体悟」，「谦逊」，「整体性」等其他特性的平衡。「积极面对逆境」的特性在复杂的适应系统中带出「混序」。这些系统在混乱中创出秩序，「有序」程度趋向增加。他们在无形无构造的区域中创出新的结构。
        '.enter(2).'<b>若低</b>: 无法正面面对逆境，我们常会有招架不住、失望的感觉，活在过去的记忆中，觉得自己是个受害者，或过于埋怨我们的环境。当面临逆境，我们可能变得过于自我防御，或愤世嫉俗，以致无法疗伤痊愈。
        '.enter(2).'然而，我们也不要低估厄运笼罩给人所带来破坏性的影响。我们是不同的个体，很难完全了解让别人超越或无法超越逆境的因素或逆境承受力的指数为何。避免论断自己或他人，小心处理。研究显示，我们生长的环境和过去负面的经验会影响我们脑内部的搭线。我们若发展失败主义者的思维，就自然等着失败的来临。每一次我们成功地从错误中学习或成功地克服困难，我们就重新搭建脑部神经的运作方式。就像复杂适应系统有重新定义自己和与环境共创的潜能，量子思维和灵商的原则也能改变我们过去的环境和固定的思维模式。';
        
    $twenty_page = '<div style="font-size:15px"><b>如何培养此特性</b>: 历史中有许多精彩故事讲述人们如何克服艰巨的环境，这也证实了人类克服逆境的潜力。多熟悉这些人的事迹，他们必能激励你，给予你正面的能量。另外阅读有关如何用正面的态度面对困难和失望的书籍，这对你肯定会有帮助。想想你那些曾经勇于面对逆境的亲友。
        '.enter(2).'尝试回顾一下你的人生。你觉得什么在牵扯你？你面对什么问题？有什么重复的模式是有挑战性或破坏性的 （ 留意你自己的行为，你与他人的互动，或你周围人的举动）？你是否可以试试用比较积极的方式来应对？你觉得这些模式会产生的缘由为何？是不是有过去的事情牵绊着你？你可以如何改变呢？
        '.enter(2).'更多察觉究竟什么事情让你裹足不前是改变的一大步。为了能够给你的人生带来一些改变，一但你自觉到牵绊自己的事物，你可以用写日记的方式给自己定一些目标，先从小的开始。你可以向他人或一个群体寻求帮助，让他们帮助你更正面地面对逆境。这也能帮助你去发现人生中，对你有意义的事物是什么。人类是意义驱使的动物，只要是触及个人认为有意义的事物，都具有高度推动力和改变力。加入一个能够与你人生意义完全连结的群体或参加一些你认为有意义的活动，这也能帮助发展你的反弹恢复力，比如在大自然中散步，参加艺术社团，参与社区活动，或者在办公室多与他人联结互动。沉思默想能大大地改变我们的思维方式，也是建立反弹恢复力有效的方法。
            </div>';
    $twenty_one_page = '<div style="color:#DE4B99;font-size:18px;"><b>11. '.$sections[10].'</b>
            </div>
            <div style="font-size:15px;">您的个人资料是 <b>'.find_result_onsection(10).'</b> 尊重 '.$sections[10].enter(2).'<b>若高</b>: 你强烈地认知你不过是一个大舞台大剧组中的一位小演员，你对自我重要性的真实认知是建立在比自我更深或超越自我的根基上。故此，你对浩瀚和繁复的人生有一种赞叹感，这促使你去观察他人的优点，和清楚地认知你自己的成就其实是建立在他人的支持和成功上。你对他人的批评和建议持有开放的态度，也总是愿意诚恳地省察自己的臆测和行为。
        '.enter(2).'量子物理中最重要的原则是要我们注意到我们是不可能对每一个人或每一个状况有完全的了解。根据海森堡的不确定性原理  ，想要创立架构，设计策略，或做决定是注定永远在捕风捉影。你明白人不可能“知道所有”，而是总有可学习的。你感觉人生就像在探险。谦逊的态度让你持有能与他人共同创造的精神。
        '.enter(2).'「谦逊」并不表示过于对自己苛刻或过于自我辩护，或重复地牺牲自己的喜好。「谦逊」是看自己与他人基本上是同等的，不是高于或低于他人。
        '.enter(2).'<b>若低</b>: 缺乏「谦逊」会使自己或他人遭受痛苦。没有谦虚的态度，一个人很容易充满骄傲，甚至有时变成狂妄。不愿给人当有的尊重和认可，你变得跋扈或嚣张。你可能将太多的精力放在与人竞争和尝试证实自己比别人强上。你可能从不省察自己的假设或信念，因此也不可能有什么更新。一个缺乏「谦逊」的人可能是个很糟的领导，因为他们不会给他人有发表意见的空间或鼓励他人展现他们的才华。
        '.enter(2).'一个人缺乏「谦逊」的特质，可能是因为他成长的过程中，没有给予看自己不过是大格局的一小部分和学习与他人在立足点上联结之价值的机会。或许他们在过去一直是众所瞩目的焦点，或获得太多、太容易。在一些例子，缺乏「谦逊」可能只是企图补偿潜在低落的自尊，或遮掩他们的不安全感。
        '.enter(2).'<b>如何培养此特性</b>: 审查你与他人的关系，聆听他人对你的见解。大家觉得你是傲慢的吗？他们有没有说你都不听别人的？人们是不是说你无法接受批评？鼓足勇气面对他人对你的观察，并加以反思。为什么你总以为你最懂、知道得比别人多？你真的比别人聪明，比别人强吗？你可能误失了什么？特别留你需要被人感激赞赏的地方。你是否曾经感激过他人呢 反思你是如何愧对他人或生命中的际遇。尽力注意到他人的长处和贡献。你是否曾经赞美过他人或给人正面的反馈呢？为何不呢？刻意地去夸奖他人。询求他人的想法，反省自己可以从中学到什么。尝试深思一些能给你不同观点的譬喻， 比如将你的人生看成大洋中的个水滴。 在量子力学里，「量子真空」其实是宇宙能源之“海”，而我们每一个人只是大洋中的一个小波浪。
            </div>';
    $twenty_two_page ='<div style="color:#DE4B99;font-size:18px;"><b>12. '.$sections[11].'</b>
            </div>
            <div style="font-size:15px;">您的个人资料是 <b>'.find_result_onsection(11).'</b> 尊重 '.$sections[11].enter(2).'<b>若高</b>: Vocation这个字出源于拉丁文 vocare, 就是「使命」的意思。 你觉得有完成人生某个任务的使命，有一种深层个人化（但超越个人）的目的。你发自内心深处要为一个更高的目的付出，有一种让你人生有贡献、使世界因你而不同的使命感。这种使命感或人生目的常伴有尊敬，感恩和希望能回馈的情操。这是「仆人领导」决定性的特质。这是大众公认诚实的领导，优良父母，积极公民最必要的品格。
        '.enter(2).'拥有使命感表示你常常是深思熟虑，立场稳健。你常经历平静和有归属的感觉。你满有助人和激励人的活力和决心。
        '.enter(2).'当追逐你的愿景和目标，你要避免走极端，不要过于严肃像个苦行憎。很重要是要保持健康程度的均衡和幽默感。
        '.enter(2).'<b>若低</b>: 缺乏「使命感」的原因很多。或许你过去没有被鼓励要世界因你而不同。你过去可能也感觉过有一个使命向你召唤，但是因为觉得缺乏内在的动力或适当的环境让你无法付诸行动。 （ 参考「积极面对逆境」）
        '.enter(2).'现在越来越多此类的例子，在当今物质主义当道的社会里，你被教导你最需要响往追求的应该是物质上的富裕，眼前表面的成就。或许你对人生的雄心过于狭窄，或只限于你认为能力可达到的范围，一但你达到了你又觉得“不过如此”。你可能觉得无聊，空虚，或不满足，因为你尚未发现什么能够给你更高的目的和真正的意义。
        '.enter(2).'因为缺乏「使命感」，你可能会感到人生没有动力。故此，你的生活可能很难有纪律和方向感。你可能觉得你只是在“漂浮”。你可能掉入低动力的状态，比如无感麻痹或甚至忧郁。
        '.enter(2).'<b>如何培养此特性</b>: 尝试反思到底什么真正触动和激励你，如何将此热情转换为影响。为什么你目前的目标和活动不是朝这方向前进？在生活中尝试实验一些新的事物，看看是否会让你觉得更丰富满足？看看别人的例子，到底是什么给予他们意义和生命力？或许咨商师和顾问可以从职场规划的角度来给你一些忠告，指示你可以从职场寻得更多意义的途径。
        '.enter(2).'你有什么能力和天赋（ 如健康，可动性，教育，物质享受，爱心等）？如何将它们与其他更不幸的人分享？你上一次真正帮助某人是什么时候？你现在可能协助他人吗？或许你可以提拔一个年轻人，为社区或某志愿工程贡献一点时间和心力。
            </div>';
    
    $twenty_three_page = '<div style="color:#DE4B99;font-size:18px;"><b>第三项： 领导力思维技巧评量表</b>
        </div>
        <div style="font-size:15px;">
        当今一个有经济效益，负责任，持有可持续性又能服务顾客和民众需要的机构对其领导的能力有前所未有的要求。今日的领导不但需要适应日日更新转换的科技， 还要面对种种繁复，不定，和急速的变化。此项以领导必备的五种关键思维技巧来呈现你灵性商数的评量：
            <ul>
            <li> 批判性的思维</li>
            <li> 反思的思维</li>
            <li> 创造力</li>
            <li> 直觉的能力</li>
            <li> 道德的成熟度</li>
            </ul>
        </div>
        <div style="font-size:15px">'.enter(20).'每一个思维技巧都有一组对应的灵商特性。例如：若想要增进批判性思维，一个人或一个团队需要培养几个相关的灵商特性。以下是有关五个关键思维技巧和其相对应的灵商特性的详细解说。
        </div>';

    $twenty_four_page = '<div style="color:#DE4B99;font-size:18px;"><b>批判性的思维</b>
                </div>
                <div style="font-size:15px;">
                能够独立思考和判断；有能力分辨争论的好与坏并鉴查出其相关适用性；有能力察觉自己的假设和偏见或潜伏在一个策略或思维系统中的假设和偏见，进而能进一步超越或改变这些假设和偏见。
                </div>'.enter(25).'
                    <div style="font-size:15px;"><ul><li> <b>自我体悟</b>: 能意识自己假设和偏见的能力。这能力使你看到自己的想法和行为对于搅扰系统或团体所扮演的角色。</li>
                    '.enter(1).'<li> <b>场域独立</b>: 有能力跳出所属团队的假设和偏见并知道这些假设和偏见对行为和策略带来负面和无谓的影响。
                    '.enter(1).'<li> <b>追根究底问「为什么」</b>: 随时准备好询问自己和他人的假设，偏见和价值。有能力认知自己不明白所在，并能探索未知。</li>
                    '.enter(1).'<li> <b>重新组织，改变框架</b>: 认清驾驭自己和团队思想和行为的假设和偏见后，能作更改，以新的视角看状况和问题。</li>
                    </ul>
                    </div>';

    $twenty_five_page = ' <div style="color:#DE4B99;font-size:18px;"><b>反思的思维</b>
                    </div>
                    <div style="font-size:15px;">能从处境或个人情绪中跳出，以冷静和超然的态度看待事物是反思的思维必要的能力，这也就是所谓“抽离”的能力。反思的思维允许我们去理解事情的意义和可能的结论，了解为何事情会发生或为何自己或他人会有如此的行为，并且能够从大量的资讯中选出有用的数据。
                    </div>'.enter(23).'
                    <div style="font-size:15px;">
                    <ul>
                        <li> <b>自我体悟</b>: 可能因为身处其境或过于专注于一个难题使我无法退一步反思。过于情绪的投入或对于某些事情运作方法的坚持让我成为情境或问题的一部分。只有当我意识到自己的投入状况，潜伏内在的假设，偏见和情绪，我才可能反思。反省这些项目在我生命中扮演的角色是反思很重要的过程。</li>
                        '.enter(1).'
                    </ul>
                    </div> ';
    $twenty_six_page ='<div style="font-size:15px;">
        <ul>
            <li> <b>追根究底，问「为什么」</b>: 藉着退一步的距离，我可以问自己或他人为何会有如此的情绪或委身。例如，到底是情况那部分惹怒我？是否类似的状况都会让我不愉快？为什么？当我愤怒的时候，我的行为是怎样的？我的怒气会如何影响周边的环境，如何呈现我自己？为何我自己或他人能对某个信念如此坚持？是我还是他人容易冲动地作批判和下结论？我们是否考虑更深广的内涵，更大的格局？我是否以批判的态度观察所有相关的评论和可能性？为何不？探讨一下问题的根本，到底造成问题的原因是什么？可以如何用不同的角度来探讨？</li> 
            '.enter(1).'<li> <b>谦逊</b>: 有自我批评的度量和有能力认知自己在某情况中是扮演负面的角色是优质反思的必备条件。我必须有谦卑的态度承认自己曾经犯错，然后反省犯错的原因。聆听他人的意见和想法能够提升反思的品质。</li>
            '.enter(1).'<li> <b>积极面对逆境</b>: 诚实的自我评估或自我批判可能会带来痛苦，我必须要有勇气来面对并反思其意义。通常这种对自己和自己行为的不安感觉是自我成长的第一步。</li>
            '.enter(1).'<li> <b>改变组织，重建框架</b>: 反思通常能够促使我们能更清楚看事情和造成困境和难题的元素。我们可以从中受益，如果我们以后面对类似情境时有新的视角和新的解决方案。反思帮助我们改变我们的思想行为，让我们避免一再犯同样的错误。</li>
        </ul>
        </div> ';
    $twenty_seven_page = '<div style="color:#DE4B99;font-size:18px;"><b>创造力 </b>
            </div>
            <div style="font-size:15px;">
            一种能用新颖和惊喜的方式去看，听，想和行动的能力。能超越传统僵化的范畴思想。一个有创意的人给世界带来新奇的事物，改变他人观察，思想和经验的方式。有创造力的人常常不按常规行事，能在“不可能”中看到可能。他们常问：「为什么？」 「如果万一…?」
            </div>'.enter(25).'
            <div style="font-size:15px;">
            <ul>
            <li> <b>自发</b>: 人们常说有创造力的人是以儿童的眼光来看世界。孩子们不会被过去做事的方法或僵化的假设所牵绊。他们在困境和难题中“玩耍”。对小孩而言，每一件事都是第一次，都是新的挑战，新的经历。「自发」允许我们以新鲜“第一次”的态度迎接事物，没有任何设限的包袱，也允许我们开发我们创造的潜力（ 量子隐藏秩序）。</li>
            '.enter(1).'<li> <b>追根究底，问「为什么？」</b>: 有人说爱因斯坦是个创造奇才，他事事期盼挖掘到底，想要了解整个宇宙是如何运作。他的「自发性」让他以新奇的眼光来探究现实，然后问：「为什么？」同样的，孩子们藉着问无限的问题来了解世界，他们将东西拆散，观察内部的构造。他们质疑通俗习惯，规范和权威。问题没有问完的时候。问题创造现实。</li>
            </ul>
            </div>';

    $twenty_eight_page = '<div style="font-size:15px;">
            <ul>
            <li> <b>拥抱多元</b>:  迎接新的经验，思想，不同的做事方法能够造就新的思维。多元化给我们新的看法和勇气去尝试新的事物，激发我们去检讨我们固定的想法和做事的方式。多元化丰富我们的想象力。</li>
            '.enter(1).'<li> <b>场域独立</b>: 有创造力的人能独立思考，不受他人的想法和作为所拘束。他们常是反常古怪，与众不同的，他们也不在乎如此。有创意的人需要作别人没做过的实验，问别人觉得过于颠覆的问题。他们需要勇气去真实地面对自己的发现，即便他们的洞见尚未得到他人的赞赏。很多伟大的思想，艺术或文学创造都得不到创作者同时期人士的肯定和欣赏。有创意的人通常是活在时代之前。</li>
            '.enter(1).'<li> <b>整体性</b>: 许多创造力出于能看到别人无法察觉到的连结和相似之处。能够洞察连结和类比让我们可以查验到更深层的可能性和解释。能透视一个理论或情境的整体面，促使我们辨别其中的破口和异於常态痕迹，然后我们可以问：「到底缺失了什么？」「是什么被忽略了？」</li>
            '.enter(1).'<li> <b>改变组织，重建框架</b>: 能重组框架，重新建立规条，从新的观点观察事物就是卓越创造力的表现。</li>
            </ul>
            </div>';
    $twenty_nine_page = '<div style="color:#DE4B99;font-size:18px;"><b>直觉的能力 </b>
            </div>
            <div style="font-size:15px;">能用直觉或超常的理性看出问题或情境中的关系和模式并察觉出其中意义的能力。这种能力能够掌握事物的全观或关键的部位，引出新的理解，认出潜伏的契机和可能性。直觉似乎有个缓慢反复的过程，但却能够导致突发的火花和顿悟。开始的时候可能需要花些精力将直觉的顿悟转换成理性的争论，好让他人理解明白。
            </div>'.enter(23).'
            <div style="font-size:15px;">
                <ul>
                <li> <b>自我体悟</b>: 对自己身体的认知和体悟是直觉重要的过程。肠胃的搅动或抽紧，呼吸的紧迫，胸口膨胀的感觉常常就是直觉的先兆。这些身体的信号正对你发出集中精神，反思，或对突发事件调速的邀请。</li>
                '.enter(1).'
                </ul>
            </div>';

    $thirty_page = '<div style="font-size:15px;">
            <ul>
            <li> <b>整体性</b>: 当在直觉过程中反刍的阶段，一个人常让自己思维“漫游”，就是在内心的地平线扫描寻找与问题或情境相似或能连结的信息。根据脑电图（EEG）研究显示，当我们集中精神逐步思考时，脑的某些部分会特别活跃。但是当我们在放松的状态 （比如散步，作轻松的运动，思想放空），睡觉或冥想时，我们的脑是全面完整运作。头脑能自我对话。当直觉顿悟出现，突然能看到状况或问题的全局和几个关键元素的连接。特意从几样分离的事物中找出它们的关系，想出它们连结之处有助于直觉力的增长。</li>
            '.enter(1).'<li> <b>拥抱多元</b>: 接触不同的人物，想法或经验常常能触发直觉的能力。差异促使我们去做比较，帮助我们看到相似，连结之处和前所未想过新的模式。如果我们能以开放的心情来面对差异，我们也敞开我们的头脑去开拓新的思维。</li>
            '.enter(1).'<li> <b>改变组织，重建框架</b>: 直觉的能力取决于开放的胸襟，乐于以新的方式来看事情，愿意在刻板范畴之外观察和思考。直觉的顿悟常常促使我们应用完全不同的视角。故此，直觉的能力和创造力是息息相关的。</li>
            </ul>
        </div>';

    $thirty_one_page = '<div style="color:#DE4B99;font-size:18px;"><b>道德的成熟 </b>
            </div>
            <div style="font-size:15px;">
            道德的成熟在我们整个灵性商数很重要的部分，我们不论个人或职场上的人际关系，我们身为公民的品质都要有成熟的道德为基础。从一个人的敏感，体贴，责任感和推动其行为，决定和人际关系背后的价值观中可看出一个人道德成熟的程度。它也反应在我们承诺的深度，及作承诺和保守承诺的能力上。道德成熟的人是值得信任的，是心胸开放和公平的，能感受并忠于他们的角色。道德的成熟需要有批判和反思的思维，是我们品格的反射。故此，需要所有十二个灵商的特性方能达到道德的成熟。想要反思你道德的成熟度，你要省察你十二个灵商特性中的强和弱项为何，以提升强健各特性为目标，学习培养每个特性。如果你有一两特性显示较弱，反省原因。反省的过程也要记得，每一个特性是如何反应你的品格。
            </div>';

    $thirty_two_page = '<div style="color:#DE4B99;font-size:18px;"><b>第四项： 下一步</b>
            </div>
            <div style="font-size:13px;text-align:justify">
            我们极力推荐你与关系亲近的人讨论你灵性商数的自测评量表。最好是能与一位教练，咨商师或协调员面对面有个反馈的时段。这可以给你一个机会去讨论和反思你的强项和弱项，进而思考可以在那方面改进。与其他完成灵商评量的组群讨论也是会很有帮助。请记住，别人对你的看法不见得会与你对自己的看法一致。
            '.enter(2).'每一个新的经验，新的问题，都是我们改变和成长的机会。你可以常常拿出你的灵性商数自测评量表，检视自己的进展，或把它当作是一个往前迈进新的可能途径的资源。
        '.enter(2).'若你对其他有关灵商或量子思考的专业服务有兴趣，或希望购买多份灵性商数自测问卷，以供他人测试，请电邮至 sqsrq@danahzohar.com
        '.enter(2).'更多有关 左哈尔及其著作的资料，请至网页查询： danahzohar.com
            </div>';

    // page 1

    $obj_pdf->AddPage();
    $obj_pdf->writeHTMLCell(0, 0,0,0, ( $page_cover), 0, 0, false,false, 'L', false);
    footer_page("");
   
   
    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $first_page, 0, 0, false,false, 'L', false);
    footer_page(2);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $second_page, 0, 0, false,false, 'L', false);
    footer_page(3);
    
    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $third_page, 0, 0, false,false, 'L', false);
    $obj_pdf->ImageSVG('@' . $full_graph, $x=15, $y=70, $w='', $h='', $link='http://www.tcpdf.org', $align='', $palign='', $border=0, $fitonpage=true);
    footer_page(4);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $forth_page, 0, 0, false,false, 'L', false);
    footer_page(5);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $fifth_page, 0, 0, false,false, 'L', false);
    footer_page(6);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $sixest_page, 0, 0, false,false, 'L', false);
    footer_page(7);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $sevent_page, 0, 0, false,false, 'L', false);
    footer_page(8);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $eight_page, 0, 0, false,false, 'L', false);
    footer_page(9);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $nineth_page, 0, 0, false,false, 'L', false);
    footer_page(10);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $tenth_page, 0, 0, false,false, 'L', false);
    footer_page(11);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $eleventh_page, 0, 0, false,false, 'L', false);
    footer_page(12);
    
    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $twelveth_page, 0, 0, false,false, 'L', false);
    footer_page(13);
    
    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $thiteen_page, 0, 0, false,false, 'L', false);
    footer_page(14);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $fourteen_page, 0, 0, false,false, 'L', false);
    footer_page(15);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $fithteen_page, 0, 0, false,false, 'L', false);
    footer_page(16);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $sixteen_page, 0, 0, false,false, 'L', false);
    footer_page(17);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $seventeen_page, 0, 0, false,false, 'L', false);
    footer_page(18);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $eighteen_page, 0, 0, false,false, 'L', false);
    footer_page(19);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $nineteen_page, 0, 0, false,false, 'L', false);
    footer_page(20);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $twenty_page, 0, 0, false,false, 'L', false);
    footer_page(21);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $twenty_one_page, 0, 0, false,false, 'L', false);
    footer_page(22);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $twenty_two_page, 0, 0, false,false, 'L', false);
    footer_page(23);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $twenty_three_page, 0, 0, false,false, 'L', false);
    $obj_pdf->ImageSVG('@' . full_graph_group(), $x=15, $y=90, $w='', $h='', $link='http://www.tcpdf.org', $align='', $palign='', $border=0, $fitonpage=true);
    footer_page(24);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $twenty_four_page, 0, 0, false,false, 'L', false);
    $obj_pdf->ImageSVG('@' . critical_thinking_graph(), $x=15, $y=55, $w='', $h='', $link='http://www.tcpdf.org', $align='', $palign='', $border=0, $fitonpage=true);
    footer_page(25);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $twenty_five_page, 0, 0, false,false, 'L', false);
    $obj_pdf->ImageSVG('@' . reflective_thinking_graph(), $x=15, $y=55, $w='', $h='', $link='http://www.tcpdf.org', $align='', $palign='', $border=0, $fitonpage=true);
    footer_page(26);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $twenty_six_page, 0, 0, false,false, 'L', false);
    footer_page(27);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $twenty_seven_page, 0, 0, false,false, 'L', false);
    $obj_pdf->ImageSVG('@' . creativity_graph(), $x=15, $y=55, $w='', $h='', $link='http://www.tcpdf.org', $align='', $palign='', $border=0, $fitonpage=true);
    footer_page(28);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $twenty_eight_page, 0, 0, false,false, 'L', false);
    footer_page(29);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $twenty_nine_page, 0, 0, false,false, 'L', false);
    $obj_pdf->ImageSVG('@' . intutition_graph(), $x=15, $y=55, $w='', $h='', $link='http://www.tcpdf.org', $align='', $palign='', $border=0, $fitonpage=true);
    footer_page(30);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $thirty_page, 0, 0, false,false, 'L', false);
    footer_page(31);

    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $thirty_one_page, 0, 0, false,false, 'L', false);
    $obj_pdf->ImageSVG('@' . moral_maturity_graph(), $x=15, $y=90, $w='', $h='', $link='http://www.tcpdf.org', $align='', $palign='', $border=0, $fitonpage=true);
    footer_page(32);
    
    $obj_pdf->AddPage();
    set_margin();
    $obj_pdf->writeHTMLCell(0, 0,15,10, $thirty_two_page, 0, 0, false,false, 'L', false);
    footer_page(33);

    $path = getcwd();
    $obj_pdf->Output("$path/result/cn_$token.pdf","F");
    
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
        $attachment = "result/cn_$token.pdf";
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