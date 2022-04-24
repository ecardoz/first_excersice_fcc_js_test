const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Guest');
          done();
        });
    });
    // #2
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .get('/hello?name=Edgar')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Edgar');
          done();
        });
    });
    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .put('/travellers')

        .end(function (err, res) {
          //assert.equal(err, res);
          assert.equal(res.status, 200);
          done();
        });
    });
    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .put('/travellers')

        .end(function (err, res) {
          //assert.equal(err, res);
          assert.equal(res.status, 200);
          done();
        });
    });
  });
});

const Browser = require('zombie');
Browser.site = 'http://localhost:3000';

suite('Functional Tests with Zombie.js', function () {
  this.timeout(5000);
  const browser = new Browser();

  suiteSetup(function(done) {
    return browser.visit('/', done);
  });

  suite('Headless browser', function () {
    test('should have a working "site" property', function() {
      assert.property(Browser, 'site');
    });
  });

  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('Submit the surname "Colombo" in the HTML form', function (done) {
      browser.fill('surname', 'Colombo');
      browser.pressButton('submit', function () {
        browser.assert.success();
        browser.assert.text('#name', 'Cristoforo');
        browser.assert.text('#surname', 'Colombo');
        browser.assert.element('#dates', 1);
        done();
      });
    });
    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      //assert.fail();

      //done();
      browser.fill('surname', 'Vespucci');
      browser.pressButton('submit', function () {
        browser.assert.success();
        browser.assert.text('#name', 'Amerigo');
        browser.assert.text('#surname', 'Vespucci');
        browser.assert.element('#dates', 1);
        done();
      });
    });
  });
});
