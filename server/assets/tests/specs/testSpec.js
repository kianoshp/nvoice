var expect = require('chai').expect;

// Making sure testing with gulp works

describe('Test test', function(){
  describe('Passing test', function(){
    it('should pass the test', function(){
      expect(2 + 2).to.equal(4);
    });
  });
});
