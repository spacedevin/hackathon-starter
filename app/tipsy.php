<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Tipsy\Tipsy;

Tipsy::config('../config/*.ini');
Tipsy::config('../config/*.yml');
Tipsy::config(['path' => __DIR__ . '/../']);

/*
if (getenv('CLEARDB_DATABASE_URL')) {
	$tipsy->config(['db' => ['url' => getenv('CLEARDB_DATABASE_URL')]]);
}
CLEARDB_DATABASE_URL
DATABASE_URL
MONGOLAB_URI
*/


// define routes here for anything that uses route params
Tipsy::router()
	->when('api/user/:id', '\App\Controller\Api\User')
	->when('auth/:service', '\App\Controller\Auth')
	->when('scss/assets/:file', '\App\Controller\Scss');


// simple session management using redis
Tipsy::middleware('Session', [
	'run' => function() {
		/*
		$client = new \Predis\Client(getenv('REDIS_URL') ? getenv('REDIS_URL') : Tipsy::config()['redis']);
		$handler = new App\Session($client);
		session_set_save_handler($handler);
		*/
		session_start();
	}
]);

Tipsy::run();
