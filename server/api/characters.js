// -----------------------------------------------------------------------------
//  REST API -- CHARACTERS
// -----------------------------------------------------------------------------
module.exports = (app, Characters) => {
	app.get('/characters', async (req, res) => {
		await Characters.find((error, characters) => {
			if (error) {
				res.json({ error });
				throw error;
			}
			res.json(characters);
		});
	});

	app.get('/character/:id', async (req, res) => {
		await Characters.findOne({ _id: req.params.id }, (error, character) => {
			if (error) {
				res.json({ error });
				throw error;
			}
			res.json(character);
		});
	});

	app.post('/character', (req, res, next) => {
		const character = new Characters();
		character.first_name = req.body.first_name;
		character.middle_name = req.body.middle_name;
		character.last_name = req.body.last_name;
		character.full_name = req.body.full_name;
		character.birthday = req.body.birthday;
		character.nationality = req.body.nationality;
		character.origin = req.body.origin;
		character.gender = req.body.gender;
		character.projects = req.body.projects;
		character.series = req.body.series;
		character.desc = req.body.desc;

		character.save((error, character) => {
			if (error) {
				return next(error);
			}

			res.json({ message: 'Character added!', data: character });
		});
	});

	app.put('/character/:id', (req, res) => {
		const editedCharacter = new Characters();
		editedCharacter._id = req.params.id;
		editedCharacter.first_name = req.body.first_name;
		editedCharacter.middle_name = req.body.middle_name;
		editedCharacter.last_name = req.body.last_name;
		editedCharacter.full_name = req.body.full_name;
		editedCharacter.birthday = req.body.birthday;
		editedCharacter.nationality = req.body.nationality;
		editedCharacter.origin = req.body.origin;
		editedCharacter.gender = req.body.gender;
		editedCharacter.projects = req.body.projects;
		editedCharacter.series = req.body.series;
		editedCharacter.desc = req.body.desc;

		Characters.findByIdAndUpdate(req.params.id, editedCharacter, { upsert: true }, (error, character) => {
			if (error) {
				res.json({ error });
				throw error;
			}
			res.json(character);
		});
	});

	app.post('/view_character', (req, res) => {
		Characters.findById(req.body._id, (err, selection) => {
			if (err) res.send(err);
			res.json(selection);
		});
	});

	app.post('/edit_character', (req, res) => {
		Characters.findById(req.body._id, (err, character) => {
			if (err) res.send(err);
			res.json(character);
		});
	});

	app.delete('/character/:id', (req, res) => {
		Characters.findByIdAndRemove(req.params.id, (err, character) => {
			if (err) res.send(err);
			res.json({ message: 'Character deleted!', data: character });
		});
	});
};
