<?php
	$skill = isset($_GET['skill']) && is_string($_GET['skill']) && isValidSkill($_GET['skill']) ? $_GET['skill'] : 'overall';
	$page = isset($_GET['page']) && is_numeric($_GET['page']) ? $_GET['page'] : 1;

	if ($page < 1)
		$page = 1;

	$skills = explode(',', skills);
?>

<div class="panel panel-default">
	<div class="panel-heading">
			
		
		<h3 class="panel-title">
			<div class="pull-right text-right" style="margin-top:-2px;">
				<?php
					if ($page > 1) {
						echo '<a href="?skill='.$skill.'&page='.($page - 1).'" class="btn btn-primary btn-xs">Prev Page</a>';
					}
				?>
				<a class="btn btn-primary btn-xs" href="?skill=<?php echo $skill;?>&page=<?php echo($page+1); ?>">
					Next Page
				</a>
			</div>
			<?php echo ucwords($skill); ?> Highscores
			
		</h3>
		
	</div>

	<table class="table table-striped table-hover " style="margin-top:0;">

		<tr>
			<th style="width: 30px;">#</th>
			<th style="width: 20px;"></th>
			<th>Username</th>
			<th style="width: 75px;text-align:right;">Cmb Lvl</th>
			<th style="width: 150px;text-align:right;">Level</th>
			<th style="width: 170px;text-align:right;">Experience</th>
		</tr>
		<?php
			$skill_xp = strtolower($skill.'_xp');
			$min = $page == 1 ? 0 : ($page * 25) - 25;

			$users = $db->getAllUsers($skill_xp, $min);
			$rank = $min + 1;

			foreach ($users as $user) {
				$crown = getCrown($crowns, $user['rights']);

				$level = $skill_xp == 'overall_xp' ? getTotalLevel($user, $skills) : getLevelForXp($user[$skill_xp], $skill);
				echo '
					<tr>
						<td>'.$rank.'</td>
						<td>'.($crown == null ? "" : "<img src='".$crown[1]."'>").'</td>
						<td><a href="?player='.$user['username'].'">'.$user['username'].'</a></td>
						<td style="text-align:right;">'.getLevel($user).'</td>
						<td style="text-align:right;">'.number_format($level).'</td>
						<td style="text-align:right;">'.number_format($user[$skill_xp]).'</td>
					</tr>
				';
				$rank++;
			}
		?>
	</table>

	<div class="panel-footer">
		<?php
			if ($page > 1) {
				echo '<a href="?skill='.$skill.'&page='.($page - 1).'" class="btn btn-primary btn-xs">Prev Page</a>';
			}
		?>
		<a class="btn btn-primary btn-xs" href="?skill=<?php echo $skill;?>&page=<?php echo($page+1); ?>">
			Next Page
		</a>
	</div>
</div>