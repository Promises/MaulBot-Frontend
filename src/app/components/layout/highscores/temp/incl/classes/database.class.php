<?php
class Database {
	
	private $host;
	private $username;
	private $password;
	private $database;
	private $con;
	private $table;
	
	/**
	 * @param String $host
	 * @param String $user
	 * @param String $pass
	 * @param String $db
	 * @param String $table
	 */
	public function __construct($host, $user, $pass, $db, $table) {
		$this->host 	= $host;
		$this->username = $user;
		$this->password = $pass;
		$this->database = $db;
		$this->table 	= $table;
	}
	
	public function connect() {
		$this->con = new PDO('mysql:host='.$this->host.';dbname='.$this->database.';charset=utf8', $this->username, $this->password);
		$this->con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
		$this->con->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
	}
	
	public function getCon() {
		return $this->con;
	}
	
	public function countUsers($iron) {
		$stmt = $this->con->prepare("SELECT * FROM $this->table LIMIT 500");
		$stmt->execute();
		return count($stmt->fetchAll(PDO::FETCH_ASSOC));
	}
	
	public function getUser($name) {
		$stmt = $this->con->prepare("SELECT * FROM $this->table WHERE username=:name");
		$stmt->bindParam(":name", $name);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}
	
	public function getAllUsers($skill, $min) {
		$stmt = $this->con->prepare("SELECT * FROM $this->table ORDER BY $skill DESC LIMIT $min, 25");
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	public function getRank($user, $skill) {
		$sk = strtolower($skill)."_xp";
		$stmt = $this->con->prepare("SELECT * FROM $this->table ORDER BY $sk DESC LIMIT 200");
		$stmt->execute();
		$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$count = 1;
		foreach ($results as $entry) {
			if (strtolower($entry['username']) == strtolower($user)) {
				return $count;
			}
			$count++;
		}
	}

}
?>