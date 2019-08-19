// -----------------------------------------------------------------------------
//  REST API -- TAGS
// -----------------------------------------------------------------------------
module.exports = (app, Tags) => {
	app.get('/tags', (req, res) => {
		Tags.find((err, tags) => {
			if (err) {
				res.json(err);
			}
			res.json(tags);
		});
	});

	app.get('/tag/:id', (req, res) => {
		Tags.findOne({ _id: req.params.id }, (error, tag) => {
			if (error) {
				res.json({ error });
				throw error;
			}
			res.json(tag);
		});
	});

	app.post('/tag', (req, res) => {
		const tag = new Tags();
		tag.type = req.body.type;
		tag.name = req.body.name.toLowerCase();
		tag.ref = req.body.ref;

		tag.save((error, tag) => {
			if (error) {
				res.json({
					error: error
				});
			}
			res.json({ message: 'Tag added!', data: tag });
		});
	});
};
