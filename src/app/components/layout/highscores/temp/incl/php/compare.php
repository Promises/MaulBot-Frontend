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
		exit;
	}

	if (!isset($_GET['player']) || !isset($_GET['other']) || empty($_GET['player']) || empty($_GET['other'])) {
		echo '<div class="alert alert-danger">Both values must be filled out.</div>';
		exit;
	}

	if (is_array($_GET['player']) || is_array($_GET['other'])) {
		echo '<div class="alert alert-danger">Invalid parameters</div>';
		exit;
	}	

	$skills = explode(",", skills);
	
	$player = $db->getUser(cleanString($_GET['player']));
	$other = $db->getUser(cleanString($_GET['other']));
?>
<div class="panel panel-default">
	<div class="panel-heading">
		<h3 class="panel-title">
		Comparison Charts: 
			<strong><?php echo $player == null ? "Unknown" : $player['username']; ?></strong> vs 
			<strong><?php echo $other == null ? "Unknown" : $other['username']; ?> </strong>
		</h3>
	</div>

	
	<table class="table table-striped table-hover" style="right:0;">
		
		<tr>
			
			<th style="text-align:right;">Level</th>
			<th style="text-align:right;">Experience</th>
			<th style="text-align:right;width:55px;">#</th>

			<th style="width:80px;"></th>

			<th style="width:55px;">#</th>
			<th>Experience</th>
			<th>Level</th>
			
		</tr>
		
		<?php 
		foreach ($skills as $skill) {
			$exp1 = $player == null ? 0 : $player[''.strtolower($skill).'_xp'];
			$exp2 = $other == null ? 0 : $other[''.strtolower($skill).'_xp'];
			
			$rank1 = $player == null ? 0 : $db->getRank($player['username'], $skill);
			$rank2 = $other == null ? 0 : $db->getRank($other['username'], $skill);
			
			$level1 = $skill != "Overall" ? getLevelForXp($exp1, $skill) : getLevel($player);
			$level2 = $skill != "Overall" ? getLevelForXp($exp2, $skill) : getLevel($other);
			
			$class1 = ($rank1 < $rank2 ? "class='success'" : "");
			$class2 = ($rank1 > $rank2 ? "class='success'" : "");
			
			echo '
			<tr>
				
				<td '.$class1.' style="text-align:right;">'.$level1.'</td> 
				<td '.$class1.' style="text-align:right;">'.number_format($exp1).'</td>
				<td style="text-align:right;">'.$rank1.'</td>

				<td style="text-align:center;"><img src="incl/img/skill_icons/'.$skill.'-icon.png"></td>

				<td>'.$rank2.'</td>
				<td '.$class2.'>'.number_format($exp2).'</td>
				<td '.$class2.'>'.$level2.'</td>
				
			</tr>
			';
		}
		?>
	</table>
</div>