// -----------------------------------------------------------------------------
//  REST API -- ADMIN
// -----------------------------------------------------------------------------

const fs = require('fs');
const path = require('path');

module.exports = (app, mongoose, apiVersion) => {
	const getDbReadyState = () => {
		let dbState = mongoose.connection.readyState;
		let status = '';

		switch (dbState) {
			case 0:
				status = '0 - Disconnected';
				break;
			case 1:
				status = '1 - Connected';
				break;
			case 2:
				status = '2 - Connecting';
				break;
			case 3:
				status = '3 - Disconnecting';
				break;
			case 4:
				status = '4 - Invalid Credentials';
				break;
			default:
				status = 'X - Status couldn\'nt be obtained';
				break;
		}
		return status;
	};

	const getBackupDirs = () => {
		let source = '../db_backups/';
		const dirs = p => {
			return fs.readdirSync(p).filter(f => {
				return fs.statSync(path.join(p, f)).isDirectory();
			});
		};
		return dirs(source);
	};

	app.get('/admin', (req, res) => {
		res.json({
			api: [
				{
					version: apiVersion,
					logs   : [],
					uptime : process.uptime()
				}
			],
			db: [
				{
					name   : mongoose.connection.db.databaseName,
					status : getDbReadyState(),
					backups: getBackupDirs()
				}
			]
		});
	});
};
