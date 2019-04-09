<?php
	
	$included_files = get_included_files();
	$includesMainFile = false;

	foreach ($included_files as $filename) {
		if (basename($filename) == "Settings.php") {
			$includesMainFile = true;
			break;
		}
	}
	
	if (!$includesMainFile) {
		echo 'Nope.';
		exit;
	}

	$name = "";

	if (isset($_GET['player']) && is_string($_GET['player']) && !empty($_GET['player'])) {
		$name = cleanString($_GET['player']);
	} else if (isset($_GET['other']) && is_string($_GET['other']) && !empty($_GET['other'])) {
		$name = cleanString($_GET['other']);
	}

	if ($name == "" || strlen($name) < 3) {
		echo '<div class="alert alert-danger">Player was not specified or was invalid. Please try again.</div>';
	} else {
		$user =  $db->getUser($name);
		$skills = explode(',', skills);

		if ($user == null) {
			echo '<div class="alert alert-danger">No results were found for that player.</div>';
		} else {
			$compl = (int)($user['overall_xp'] / 5000000000 * 100);

			echo'<div class="panel panel-default">
			     <div class="panel-heading"><h3 class="panel-title">Statistics for <strong>'.$user['username'].'</strong></h3></div>

			     <div class="progress progress-striped active" style="border-radius:0;">
					 <div class="progress-bar" style="width: '.$compl.'%"></div>
				 </div>

				 <table class="table table-striped table-hover" style="margin-top:0;">';

			echo '<tr>
					<th style="width: 35px;"></th>
					<th style="width: 60px;">Rank</th>
					<th style="width: 140px;">Experience</th>
					<th style="width: 140px;">To Next Level</th>
					<th style="width: 75px;">Level</th>
				</tr>';

			foreach ($skills as $sk) {
				$exp = $user[''.strtolower($sk).'_xp'];
				$level = getLevelForXp($exp, $sk);

				$nextLevel = getXpForLevel($level + 1);

				$remaining = $level == 99 || $level == 120 ? 0 : $nextLevel - $exp;
				echo '<tr>
						<td><a href="?skill='.$sk.'"><img src="incl/img/skill_icons/'.$sk.'-icon.png"></a></td>
						<td>'.$db->getRank($user['username'], $sk).'</td>
						<td>'.number_format($exp).'</td>
						<td>'.number_format($remaining).'</td>
						<td>'.getLevelForXp($exp, $sk).'</td>
						
						
					  </tr>';

			}
			echo '</table></div>';
		}
	}

?>