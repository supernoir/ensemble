const baseuri = 'http://localhost:3030';
const axios = require('axios');

describe('BOOKS', () => {
	test('GET All Books', () => {
		axios.get(baseuri + '/books').then(res => {
			expect(res.status).toBe(200);
			//expect(res.data).toHaveLength(1);
		});
	});

	test('GET Book by Id', () => {
		axios.get(baseuri + '/book/1').then(res => {
			expect(res.status).toBe(200);
			//expect(res.data).toHaveLength(1);
		});
	});

});

describe('CHARACTERS', () => {
	test('GET All Characters', () => {
		axios.get(baseuri + '/characters').then(res => {
			expect(res.status).toBe(200);
			// expect(res.data).toHaveLength(1);
		});
	});

	test('GET Character by Id', () => {
		axios.get(baseuri + '/character/1').then(res => {
			expect(res.status).toBe(200);
			// expect(res.data).toHaveLength(1);
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