<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
$debug = true;

$db_name = 'c9243410_wp26';
$db_pass = '2-SAp76X@n';
$db_user = 'c9243410_wp26';

if ($debug) {
    $db_name = 'testdb';
    $db_user = 'tester';
    $db_pass = 'test12345';
}

define('DB_NAME', $db_name);

/** MySQL database username */
define('DB_USER', $db_user);

/** MySQL database password */
define('DB_PASSWORD', $db_pass);

/** MySQL hostname */
define('DB_HOST', '127.0.0.1');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY', 'hmvpwwd4jw4emtlkmnpfx5fsn73yabrlpirhsfv0iivbovwlqa7cncsnpje5v0ji');
define('SECURE_AUTH_KEY', 'p611x7d0aflnpu4a2fib81yxzrmkdwf9t9xy57z2wwdv1mqesmyu7diiqvuix5v8');
define('LOGGED_IN_KEY', 'pynwcibs15wfktynuzrppwtkcd08wnkw4e9intf6pmuoa1dyhk8zdgon438eoqct');
define('NONCE_KEY', 'e0ihono8obnboehpoyeg5uukxzmxnh2waughyj4yfxkzzelvr5dscuvvc2sa0zky');
define('AUTH_SALT', 'ktxkzlpco0f4klxfuwqjw4iszqtp8okxtgbu4rquwd686zg2baax0jrpmwfe2pmr');
define('SECURE_AUTH_SALT', '7kyzldq8sqfdrem75s4ea5kww1iuxxcebhvbvkpqf07xo10mllkrpx1ehfgw7fxj');
define('LOGGED_IN_SALT', 'f3hsp4a2bnmerczmmqzi6gxtgmzehbr3bxgwv1cid5qsa6cry5mfeosrl77s4cog');
define('NONCE_SALT', 'clnzjzy1ktb2rryc8oppxdgknskxnozo09rosda8grtnn16nm9o95tspyc45s2p4');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wpgk_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/');
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
