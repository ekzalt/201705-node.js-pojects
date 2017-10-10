const assert = require('assert');

// assert.ok() // ? == true

// success
assert.ok(true);
assert.ok('str');
assert.ok({});

// error
assert.ok(false);
assert.ok('');
assert.ok(0);
assert.ok(null);

///////////////////////////////////////////////////

// assert.equal() // ? == ?

// success
assert.equal(true, true);
assert.equal('xy', 'x' + 'y');
assert.equal('1', 1);

// error
assert.equal({ a: 1 }, { a: 1 });

///////////////////////////////////////////////////

// assert.strictEqual() // ? === ?

// success
assert.strictEqual(true, true);
assert.strictEqual('xy', 'x' + 'y');

// error
assert.strictEqual('1', 1);
assert.strictEqual({ a: 1 }, { a: 1 });

///////////////////////////////////////////////////

// assert.deepEqual()

// success
assert.deepEqual(true, true);
assert.deepEqual('xy', 'x' + 'y');
assert.deepEqual('1', 1);
assert.deepEqual({ a: 1 }, { a: 1 });

///////////////////////////////////////////////////

let notes = '';
assert.ok(notes instanceof Array, 'notes is not Array'); // error
