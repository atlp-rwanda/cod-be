import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/app.js";   

//Assertion style
chai.should();
//Enable endpoints testing
chai.use(chaiHttp);

//Check if mocha is working. 
//This should be replaced with actuall checking of endpoints
var assert = require('assert');
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});