// sinon spy

const ee = require('events').EventEmitter;
const { should, expect } = require('chai');
const mockery = require('mockery');
const sinon = require('sinon');

describe('note id generator', function () {
  it('should call when emit', function () {
    // создаем шпиона
    let spy = sinon.spy();

    ee.on('slide', someFunc, spy);
    ee.emit('slide');

    spy.calledOnce.should.be.true;
  });

  it('should call handler when', function () {
    // создаем шпиона
    let spy = sinon.spy(function () {
      console.log('hello');
    });

    ee.on('slide', someFunc, spy);
    ee.emit('slide'); // 'hello'

    spy.calledOnce.should.be.true;
  });

  it('should not call handler', function () {
    // создаем шпиона
    let spy = sinon.spy();

    ee.on('slide', someFunc, spy);
    ee.emit('yo');

    spy.called.should.be.false;
  });

  it('should call handler twice - 2', function () {
    // создаем шпиона
    let spy = sinon.spy();

    ee.on('slide', someFunc, spy);
    ee.emit('slide');
    ee.emit('slide');

    spy.callCount.should.equal(2);
  });

  it('should call handler with args', function () {
    // создаем шпиона
    let spy = sinon.spy();

    ee.on('slide', someFunc, spy);
    ee.emit('slide', 'send data');

    let firstCall = spy.getCall(0);
    firstCall.args.length.should.equal(1);
    firstCall.calledWith('send data').should.be.true;
  });
});
