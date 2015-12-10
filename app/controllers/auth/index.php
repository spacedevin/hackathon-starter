<?php

namespace App\Controller;

use OAuth\OAuth2\Service\Facebook;
use OAuth\Common\Storage\Session;
use OAuth\Common\Consumer\Credentials;

class Auth extends \Tipsy\Controller {
	public function init() {
		$name = $this->tipsy()->request()->loc(1);
		if (!$this->tipsy()->config()['auth'][$name]) {
			die('no auth');
		}

		$storage = new Session();
		$credentials = new Credentials(
			$this->tipsy()->config()['auth'][$name]['key'],
			$this->tipsy()->config()['auth'][$name]['secret'],
			$this->tipsy()->request()->url()
		);

		$serviceFactory = new \OAuth\ServiceFactory();

		$service = $serviceFactory->createService($name, $credentials, $storage, []);

		if (!empty($_GET['code'])) {

			$state = isset($_GET['state']) ? $_GET['state'] : null;
			$token = $service->requestAccessToken($_GET['code'], $state);

			switch ($name) {
				case 'facebook':
					$data = json_decode($service->request('/me'), true);
					$result = [
						id => $data['id'],
						name => $data['name']
					];
					break;

				case 'github':
					$data = json_decode($service->request('user'), true);
					print_r($data);
					$result = [
						id => $data['id'],
						name => $data['name']
					];
					break;
			}

			if ($result['id']) {
				header('Location: /account');
			}

		} else {
			$url = $service->getAuthorizationUri();
			header('Location: ' . $url);
		}
	}
}