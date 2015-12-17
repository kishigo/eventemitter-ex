// Write your tests here!
// Here is an example.
if (Meteor.isClient) {
	let EventEx = new EventEmitterEx();
	var listener1Entered = false, listener2Entered = false;
	var listener1 = function listener1 (foo) {
		listener1Entered = true;
		throw 'listener1';
	};
	var listener2 = function listener2 (foo) {
		listener2Entered = true;
	};
	//Tinytest.add('emitter - test environment', function(test) {
	//	test.isTrue(typeof EventEmitter !== 'undefined', 'test environment not initialized EventEmitter');
	//});
	Tinytest.add('EventEmitterEx - test environment', function(test) {
		test.isTrue(typeof EventEmitterEx !== 'undefined', 'test environment not initialized EventEmitterEx');
	});
	Tinytest.addAsync('EventEmitterEx - test basic event', function(test, completed) {
		var emitter = new EventEmitterEx();

		emitter.on('test', function(foo, bar) {
			test.equal(foo, 'foo', 'foo is not foo');
			test.equal(bar, 'bar', 'bar is not bar');

			completed();
		});

		emitter.emit('test', 'foo', 'bar');
	});
	Tinytest.add('EventEmitterEx - no exception handler Test', function (test) {
		listener1Entered = listener2Entered = false;
		let emitter = new EventEmitterEx();
		test.notEqual(emitter, null, 'Expected eventEmitter to be non-null');
		// No exception handler => expect listener1, listener2 to fire
		emitter.on('TestRethrow', listener1);
		emitter.on('TestRethrow', listener2);
		try {
			emitter.emit('TestRethrow', {data: null});
		}
		catch (e) {
		}
		test.equal(listener1Entered, true, 'Expected listener1Entered = true');
		test.equal(listener2Entered, true, 'Expected listener2Entered = false');
	});
	Tinytest.add('EventEmitterEx - exception handler Test', function (test) {
		listener1Entered = listener2Entered = false;
		let emitter = new EventEmitterEx(function (exception) {
			throw exception
		});
		test.notEqual(emitter, null, 'Expected eventEmitter to be non-null');
		// No exception handler => expect listener1, listener2 to fire
		emitter.on('TestRethrow', listener1);
		emitter.on('TestRethrow', listener2);
		try {
			emitter.emit('TestRethrow', {data: null});
		}
		catch (e) {
		}
		test.equal(listener1Entered, true, 'Expected listener1Entered = true');
		test.equal(listener2Entered, false, 'Expected listener2Entered = false');
	});
}
