// -----------------------------------------------------------------------------
//  REST API -- HISTORY
// -----------------------------------------------------------------------------

module.exports = (app, Events) => {
	app.get('/events', (req, res) => {
		Events.find((err, events) => {
			if (err) {
				res.json(err);
			}
			res.json(events);
		});
	});

	app.get('/events/:filter', (req, res) => {
		Events.find((err, events) => {
			if (err) {
				res.json(err);
			}
			let latestEvents = events;

			switch (req.params.filter) {
				case 'latest':
					latestEvents = latestEvents.slice(0, 5);
					res.json(latestEvents);
					break;
				default:
					res.json(latestEvents);
			}
		});
	});

	app.post('/event', (req, res) => {
		const event = new Events();
		event.user = req.body.user;
		event.action = req.body.action;
		event.timestamp = new Date().getTime();
		event.ref = req.body.ref;

		event.save((error, event) => {
			if (error) {
				res.json({
					error: error
				});
			}
			res.json({ message: 'Event added!', data: event });
		});
	});
};
