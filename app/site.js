if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('sw.js')
		.then(console.log('SW registered'))
		.catch(console.error('An error occurred while registering the SW'));
}
