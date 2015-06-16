'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var chai = require('chai');
var superagent = require('superagent');

describe('Invoice item tests', function() {

  var URL = 'https://localhost:4443';
  var invoiceItemObj = {
    description: 'item on invoice',
    qty: 5,
    rate: 10,
    isFlatFee: true
  };
  var currentItemId;

  /*jshint -W030 */
  describe('CRUD actions', function() {

    describe('Create', function() {
      it('should create a invoiceItem', function(done) {
        superagent.post(URL + '/invoiceItem/create')
          .send(invoiceItemObj)
          .end(function(err, res) {
            invoiceItemObj = res.body;
            currentItemId = res.body._id;
            chai.expect(invoiceItemObj).to.exist;
            chai.expect(invoiceItemObj).to.not.be.undefined;
            chai.expect(invoiceItemObj.description).to
              .equal(invoiceItemObj.description);
            done();
          });
      });
    });

    describe('Read', function() {
      it('should read a invoiceItem', function(done) {
        superagent.get(URL + '/invoiceItem/read')
          .query({itemId: currentItemId})
          .end(function(err, res) {
            if (err) {
              console.log(err);
            }
            var thisItem = res.body;
            chai.expect(thisItem).to.exist;
            chai.expect(thisItem).to.not.be.undefined;
            chai.expect(thisItem.description).to
              .equal(invoiceItemObj.description);
            done();
          });
      });
    });
  });
});
