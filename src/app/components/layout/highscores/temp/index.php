<?php include 'incl/Settings.php'; ?>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=iso-8859-1">
	<meta name="author" content="">
	<title>Foxtrot 718 - Highscores</title>
	<link rel="stylesheet" href="incl/css/theme/default.css">
	<link rel="stylesheet" href="incl/css/custom.css">
	<link rel="stylesheet" href="incl/css/font-awesome.min.css">
</head>
<body>

	<div class="navbar navbar-default">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">Foxtrot</a>
			</div>
			<div class="navbar-collapse collapse navbar-responsive-collapse">
				<ul class="nav navbar-nav">
					<li class="active"><a href="#">Active</a></li>
					<li><a href="#">Link</a></li>
					<li><a href="#">Link</a></li>
					<li><a href="#">Link</a></li>
					<li><a href="#">Link</a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">Theme <b class="caret"></b></a>
						<ul class="dropdown-menu">
							<li><a href="#" id="theme" data-css="default.css">Default</a></li>
							<li class="divider"></li>
							<li><a href="#" id="theme" data-css="cerulean.css">Cerulean</a></li>
							<li><a href="#" id="theme" data-css="cosmo.css">Cosmo</a></li>
							<li><a href="#" id="theme" data-css="cyborg.css">Cyborg</a></li>
							<li><a href="#" id="theme" data-css="darkly.css">Darkly</a></li>
							<li><a href="#" id="theme" data-css="flatly.css">Flatly</a></li>
							<li><a href="#" id="theme" data-css="journal.css">Journal</a></li>
							<li><a href="#" id="theme" data-css="lumen.css">Lumen</a></li>
							<li><a href="#" id="theme" data-css="paper.css">Paper</a></li>
							<li><a href="#" id="theme" data-css="readable.css">Readable</a></li>
							<li><a href="#" id="theme" data-css="sandstone.css">Sandstone</a></li>
							<li><a href="#" id="theme" data-css="simplex.css">Simplex</a></li>
							<li><a href="#" id="theme" data-css="slate.css">Slate</a></li>
							<li><a href="#" id="theme" data-css="spacelab.css">Spacelab</a></li>
							<li><a href="#" id="theme" data-css="superhero.css">Superhero</a></li>
							<li><a href="#" id="theme" data-css="united.css">United</a></li>
							<li><a href="#" id="theme" data-css="yeti.css">Yeti</a></li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</div>


	<section id="page-header">
		<div class="container">
			<div class="col-md-12 col-md-12">
				<h1>Foxtrot Highscores</h1>
				Compete and Compare with other players!
			</div>
		</div>
	</section>
	
	<section id="main-body">
		<div class="container">
			<div class="col-md-12 col-md-12">
				<div class="panel panel-default">
					<div class="panel-body" style="text-align:center">
				    	<?php getSkillIcons(explode(',', skills)); ?>
					</div>
				</div>
			</div>

			<div class="col-md-9 col-md-9">
				
				<?php
					if (!isset($_GET['player']) && !isset($_GET['other'])) {
						include 'incl/php/maintable.php';
					} else {
						if (isset($_GET['player']) && isset($_GET['other']) && !empty($_GET['player']) && !empty($_GET['other'])) {
							include 'incl/php/compare.php';
						} else if (isset($_GET['player']) && !empty($_GET['player']) && !isset($_GET['other'])) {
							include 'incl/php/player.php';
						} else if (!isset($_GET['player']) && isset($_GET['other']) && !empty($_GET['other'])) {
							include 'incl/php/player.php';
						}
					}
				?>

			</div>

			<div class="col-md-3 col-md-3">

				<div class="panel panel-default">
					<div class="panel-heading"><h3 class="panel-title">Search</h3></div>
					<div class="panel-body">
						<form id="search-form">
							<div class="form-group">
								<input class="form-control" id="search-input" name="player" placeholder="Username here">
							</div>
							<button type="submit" class="btn btn-primary btn-block"><i class="fa fa-search"></i> Search</button>
						</form>
					</div>
				</div>

				<div class="panel panel-default">
					<div class="panel-heading"><h3 class="panel-title">Compare</h3></div>
					<div class="panel-body">
						<form id="search-form">
							<div class="form-group">
								<input class="form-control" id="player-input" name="player" placeholder="Username here">
							</div>
							<div class="form-group">
								<input class="form-control" id="compare-input" name="other" placeholder="Username here">
							</div>
							<button type="submit" class="btn btn-primary btn-block"><i class="fa fa-search"></i> Search</button>
						</form>
					</div>
				</div>
			</div>


		</div>
	</section>

	<script src="incl/js/jquery-1.11.1.min.js"></script>
	<script src="incl/js/jquery.cookie.js"></script>
	<script src="incl/js/bootstrap.js"></script>
	<script src="incl/js/custom.js"></script>
	<script src="incl/js/smoothscroll.js"></script>

</body>
</html>