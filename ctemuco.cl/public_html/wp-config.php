<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'db05shibly465t' );

/** Database username */
define( 'DB_USER', 'uhnp2glrbxp5l' );

/** Database password */
define( 'DB_PASSWORD', '10h1ezja4o2u' );

/** Database hostname */
define( 'DB_HOST', '127.0.0.1' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          'eoyT_7Dr?:D4!GSH}4(D&_DOy@*U:gXC8dp0**kQH0sAO4 nXH+gDr&22JXS@5H}' );
define( 'SECURE_AUTH_KEY',   'NA5BU06.9Niu*#]N|Oiz F`-!zu5L$f7u#X=&ldI2,4p33WkIDN/|}asCy0r4>Vy' );
define( 'LOGGED_IN_KEY',     'b82z9lLfw<`f0e+8!+NvS|[2#^6@lZFHN#(C/4EY7)jDJ>?/@[B6IR,1/0cW^)N/' );
define( 'NONCE_KEY',         '_jV3/pc58#09t}/cE?clPa!;h|)WhpO0I0.d}.O++!_F[Sc$DwYa/Ok> ;mjK0@w' );
define( 'AUTH_SALT',         '[Bf98RBe!jF;PTE;,yXm&e-uW_+q*9WI1 buMJ~STk[Y(cMk+h]yomu_t=kD#f#s' );
define( 'SECURE_AUTH_SALT',  '5Go*KR*M|_8gIa3[[aWk6?%+|V+7q;<i0t_u($S[7k,.q=W]P3|q9Ij5j,pIw_LO' );
define( 'LOGGED_IN_SALT',    '}1c,v?A`c&?hUsw~!er.st)qkZ6/j84!KdtaVkP;=EI2a[mXS.}:(b;W:nEHjVp2' );
define( 'NONCE_SALT',        ']A[e#b?bApqyM6c7lHxYEd9|Co5[M3U;ZMm8ppUoC)8]+.J icoLvSVGvM?s((G8' );
define( 'WP_CACHE_KEY_SALT', 'i8%^vTctS]j`xb7xS*g)Mh#= S_F.]YuWy!.FtLKcwIr%|3>$F*f)lKtxdpZzbFn' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'rou_';


/* Add any custom values between this line and the "stop editing" line. */



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
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
@include_once('/var/lib/sec/wp-settings-pre.php'); // Added by SiteGround WordPress management system
require_once ABSPATH . 'wp-settings.php';
@include_once('/var/lib/sec/wp-settings.php'); // Added by SiteGround WordPress management system
