const baseuri = 'http://localhost:3030';
const axios = require('axios');

const testProjectId = '5c2e38fdbfcb4562e33ffe58';
const testCharacterId = '5c3f166db50bd9919450aac1';

/** TODO: Mock API Calls */

describe('PROJECTS', () => {
	test('GET All Projects', () => {
		axios.get(baseuri + '/books').then(res => {
			expect(res.status).toBe(200);
			//expect(res.data).toHaveLength(1);
		});
	});

	test('GET Project by Id', () => {
		axios.get(baseuri + '/book/' + testProjectId).then(res => {
			expect(res.status).toBe(200);
			//expect(res.data).toHaveLength(1);
		});
	});
});

describe('CHARACTERS', () => {
	test('GET All Characters', () => {
		axios.get(baseuri + '/characters').then(res => {
			expect(res.status).toBe(200);
		});
	});

	test('GET Character by Id', () => {
		axios.get(baseuri + '/character/' + testCharacterId).then(res => {
			expect(res.status).toBe(200);
		});
	});
});

describe('EVENTS', () => {
	test('GET All Events', () => {
		axios.get(baseuri + '/events').then(res => {
			expect(res.status).toBe(200);
			// expect(res.data).toHaveLength(1);
		});
	});
});

describe('ADMIN', () => {
	test('GET Admin Data', () => {
		axios.get(baseuri + '/admin').then(res => {
			expect(res.status).toBe(200);
			// expect(res.data).toHaveLength(1);
		});
	});
});
