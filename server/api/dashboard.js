// -----------------------------------------------------------------------------
//  REST API -- DASHBOARD
// -----------------------------------------------------------------------------
module.exports = (app, Characters, Projects) => {
	app.get('/dashboard', (req, res) => {
		Projects.count((err, projectCount) => {
			if (err) {
				res.json(err);
			}
			Characters.count((err, characterCount) => {
				if (err) {
					res.json(err);
				}
				res.json({
					projects  : projectCount || 0,
					characters: characterCount || 0
				});
			});
		});
	});
};
