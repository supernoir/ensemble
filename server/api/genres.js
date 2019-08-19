// -----------------------------------------------------------------------------
//  REST API -- GENRES
// -----------------------------------------------------------------------------
const genres_en = require('../data/genres/en-US.json');

module.exports = app => {
	app.get('/genres', (req, res) => {
		res.json({
			data: genres_en
		});
	});
};
