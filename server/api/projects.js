// -----------------------------------------------------------------------------
//  REST API -- PROJECTS
// -----------------------------------------------------------------------------

module.exports = (app, Projects) => {
	app.get('/projects', async (req, res) => {
		await Projects.find((error, projects) => {
			if (error) {
				res.json({ error });
				throw error;
			}
			res.json(projects);
		});
	});

	app.get('/projects/status', async (req, res) => {
		await Projects.find({ status: 'draft' }, (error, projects) => {
			if (error) {
				res.json({ error });
				throw error;
			}
			res.json(projects);
		});
	});

	app.get('/project/:id', (req, res) => {
		Projects.findOne({ _id: req.params.id }, (error, project) => {
			if (error) {
				res.json({ error });
				throw error;
			}

			res.json(project);
		});
	});

	app.post('/project', (req, res) => {
		const project = new Projects();
		project.type = req.body.type;
		project.title = req.body.title;
		project.status = req.body.status;
		project.authors = req.body.authors;
		project.collaborators = req.body.collaborators;
		//TODO: Series should be a ref!
		project.series = req.body.series;
		project.cast = req.body.cast;
		project.desc = req.body.desc;
		project.genres = req.body.genres;
		project.read = req.body.read;
		project.tags = req.body.tags;

		project.save((error, project) => {
			if (error) {
				res.json({ error: error });
			}
			res.json({ message: 'Project added!', data: project });
		});
	});

	/**
 * PUT single project
 */
	app.put('/project/:id', (req, res) => {
		const editedProject = new Projects();
		editedProject._id = req.params.id;
		editedProject.type = req.body.type;
		editedProject.title = req.body.title;
		editedProject.status = req.body.status;
		editedProject.authors = req.body.authors;
		editedProject.collaborators = req.body.collaborators;
		editedProject.series = req.body.series;
		editedProject.cast = req.body.cast;
		editedProject.desc = req.body.desc;
		editedProject.genres = req.body.genres;
		editedProject.tags = req.body.tags;

		Projects.findByIdAndUpdate(req.params.id, editedProject, { upsert: true }, (error, project) => {
			if (error) {
				res.json({ error });
				throw error;
			}
			res.json(project);
		});
	});

	app.delete('/project/:id', (req, res) => {
		Projects.findByIdAndRemove(req.params.id, (error, project) => {
			if (error) res.send(error);
			res.json({ message: 'Project deleted!', data: project });
		});
	});
};
