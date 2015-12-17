Package.describe({
	name: 'kishigo:eventemitter-ex',
	version: '0.0.1',
	// Brief, one-line summary of the package.
	summary: 'Wraps the client side listener callback with try-catch',
	// URL to the Git repository containing the source code for this package.
	git: 'https://github.com/kishigo/eventemitter-ex.git',
	// By default, Meteor will default to using README.md for documentation.
	// To avoid submitting documentation, set this field to null.
	documentation: 'README.md'
});

Package.onUse(function (api) {
	api.versionsFrom('1.2.1');
	api.use('ecmascript');
	api.use('underscore');
	api.use('raix:eventemitter');
	api.export('EventEmitterEx');
	api.addFiles('eventemitter-ex.js');
});

Package.onTest(function (api) {
	api.use('ecmascript');
	api.use('underscore');
	api.use('tinytest');
	api.use('kishigo:eventemitter-ex');
	api.addFiles('eventemitter-ex-tests.js', 'client');
});
