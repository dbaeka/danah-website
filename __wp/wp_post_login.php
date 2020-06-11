<?php

/** Load WordPress Bootstrap */
require_once __DIR__ . '/wp-load.php';

/** Allow for cross-domain requests (from the front end). */
//send_origin_headers();


header( "Access-Control-Allow-Origin: http://localhost:8000" );
header( "Content-Type: application/json; charset=UTF-8" );
header( "Access-Control-Allow-Methods: POST" );
header( 'Access-Control-Allow-Credentials: true' );
header( "Access-Control-Max-Age: 3600" );
header( "Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With" );

$rest_json = file_get_contents( "php://input" );
$_POST     = json_decode( $rest_json, true );


if ( isset( $_POST['action'] ) && $_POST['action'] == 'wp_login' ) {
	if ( isset( $_POST['username'] ) ) {
		$error = 0;

		if ( $error == 0 ) {
			$username = $_POST['username'];
			$signon   = programmatic_login( $username );
			if ( $signon == true ) {
				$data['state'] = 200;
				echo json_encode( $data );
				exit();
			} else {
				$data['state'] = 400;
				echo json_encode( $data );
				exit();
			}
		} else {
			$data['state']        = 400;
			$data['response_msg'] = 'invalid parameters';
			echo json_encode( $data );
			exit();
		}
	} else {
		$data['state']        = 400;
		$data['response_msg'] = 'invalid parameters';
		echo json_encode( $data );
		exit();
	}
} else {
	$data['state']        = 400;
	$data['response_msg'] = 'required parameters missing';
	echo json_encode( $data );
	exit();
}


/**
 * Programmatically logs a user in
 *
 * @param string $username
 *
 * @return bool True if the login was successful; false if it wasn't
 */
function programmatic_login( $username ) {
	if ( is_user_logged_in() ) {
		wp_logout();
	}

	add_filter( 'authenticate', 'allow_programmatic_login', 10, 3 );    // hook in earlier than other callbacks to short-circuit them
	$user = wp_signon( array( 'user_login' => $username ) );
	remove_filter( 'authenticate', 'allow_programmatic_login', 10, 3 );

	if ( is_a( $user, 'WP_User' ) ) {
		wp_set_current_user( $user->ID, $user->user_login );

		if ( is_user_logged_in() ) {
			return true;
		}
	}

	return false;
}

/**
 * An 'authenticate' filter callback that authenticates the user using only     the username.
 *
 * To avoid potential security vulnerabilities, this should only be used in     the context of a programmatic login,
 * and unhooked immediately after it fires.
 *
 * @param WP_User $user
 * @param string $username
 * @param string $password
 *
 * @return bool|WP_User a WP_User object if the username matched an existing user, or false if it didn't
 */
function allow_programmatic_login( $user, $username, $password ) {
	return get_user_by( 'login', $username );
}