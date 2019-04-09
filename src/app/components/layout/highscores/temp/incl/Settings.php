<?php
	require 'incl/classes/database.class.php';

	#edit database info here
	$db = new Database("localhost", "root", "pass", "database", "hs_users");
	$db->connect();

	$maxResults = 25;
	define("skills", "Attack,Defence,Strength,Constitution,Ranged,Prayer,Magic,Cooking,Woodcutting,Fletching,Fishing,Firemaking,Crafting,Smithing,Mining,Herblore,Agility,Thieving,Slayer,Farming,Runecrafting,Hunter,Construction,Summoning,Dungeoneering");

	$crowns = array(
		array(1, "incl/img/crowns/mod.png"),
		array(4, "incl/img/crowns/crown1.png"),
		array(5, "incl/img/crowns/crown4.png"),
		array(6, "incl/img/crowns/crown3.png")
	);

	function getCrown($crowns, $rights) {
		for ($i = 0; $i < count($crowns); $i++) {
			if ($crowns[$i][0] == $rights) {
				return $crowns[$i];
			}
		}
		return null;
	}

	function getSkillIcons($skills) {
		echo '<a href="?skill=Overall" title="Overall" data-toggle="tooltip" data-placement="top"><img src="incl/img/skill_icons/Overall-icon.png" class="skill-icon"></a>';
		for ($i = 0; $i < count($skills); $i++) {
			$tooltip = 'title="'.$skills[$i].'" data-toggle="tooltip" data-placement="top"';
			echo '<a href="?skill='.$skills[$i].'" '.$tooltip.'><img src="incl/img/skill_icons/'.$skills[$i].'-icon.png" class="skill-icon"></a>';
		}
	}

	function isValidSkill($skill) {
		$skills = explode(',', skills);
		foreach ($skills as $sk) {
			if (strtolower($sk) == strtolower($skill))
				return true;
		}
		return false;
	}

	function cleanString($string) {
		return preg_replace("/[^A-Za-z0-9 _]/", ' ', $string);
	}
	
	function cleanInt($string) {
		return preg_replace("/[^0-9]/", ' ', $string);
	}

	function getTotalLevel($user, $skills) {
		$total = 0;
		foreach ($skills as $skill) {
			$total += getLevelForXp($user[strtolower($skill).'_xp'], $skill);
		}
		return $total;
	}
	
	function getLevelForXp($exp, $skill) {
		$points = 0;
		$output = 0;
		for ($lvl = 1; $lvl <= (strtolower($skill) == 'dungeoneering' ? 120 : 99); $lvl++) {
			$points += floor($lvl + 300.0 * pow(2.0, $lvl / 7.0));
			$output = (int) floor($points / 4);
			if (($output - 1) >= $exp) {
				return $lvl;
			}
		}
		return (strtolower($skill) == 'dungeoneering' ? 120 : 99);
	}
	
	function getCombatLevel($row) {
		$attack = getLevelForXp($row['attack_xp'], "");
		$defence = getLevelForXp($row['defence_xp'], "");
		$strength = getLevelForXp($row['strength_xp'], "");
		$hp = getLevelForXp($row['constitution_xp'], "");
		$prayer = getLevelForXp($row['prayer_xp'], "");
		$ranged = getLevelForXp($row['ranged_xp'], "");
		$magic = getLevelForXp($row['magic_xp'], "");
		$combatLevel = (int) (($defence + $hp + floor($prayer / 2)) * 0.25) + 1;
		$melee = ($attack + $strength) * 0.325;
		$ranger = floor($ranged * 1.5) * 0.325;
		$mage = floor($magic * 1.5) * 0.325;
	
		if ($melee >= $ranger && $melee >= $mage) {
			$combatLevel += $melee;
		} else if ($ranger >= $melee && $ranger >= $mage) {
			$combatLevel += $ranger;
		} else if ($mage >= $melee && $mage >= $ranger) {
			$combatLevel += $mage;
		}
		return (int)$combatLevel;
	}
	
	function getLevel($row) {
		return (int)(getCombatLevel($row) + getSummoningCombatLevel($row));
	}
	
	function getSummoningCombatLevel($row) {
		return getLevelForXp($row['summoning_xp'], "") / 8;
	}

	function getXPForLevel($level) {
		$points = 0;
		$output = 0;
		for ($lvl = 1; $lvl <= $level; $lvl++) {
			$points += floor($lvl + 300.0 * pow(2.0, $lvl / 7.0));
			if ($lvl >= $level) {
				return $output;
			}
			$output = (int) floor($points / 4);
		}
		return 0;
	}
?>