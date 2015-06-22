'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var chai = require('chai');
var superagent = require('superagent');

describe('Invoice item tests', function() {

  var URL = 'https://localhost:4443';
  var invoiceItemObj = {
    invoiceId: "5585b661719fa48cdd857835",
    description: 'item on invoice',
    qty: 5,
    rate: 10,
    isFlatFee: true
  };
  var currentItemId;
  var currentInvoiceId = "558317feee627fa68f5aab21";
  var modifiedItem = {
    invoiceId: "558039a859496aeaecffeda8",
    description: 'item on invoice',
    qty: 100,
    rate: 10,
    isFlatFee: true
  };
  /*jshint -W030 */
  describe('CRUD actions', function() {

    describe('Create', function() {
      it('should create an invoiceItem', function(done) {
        superagent.post(URL + '/invoiceItem/create')
          .send(invoiceItemObj)
          .end(function(err, res) {
            invoiceItemObj = res.body;
            currentItemId = res.body.invoiceItems[0]._id;
            chai.expect(invoiceItemObj).to.exist;
            chai.expect(invoiceItemObj).to.not.be.undefined;
            chai.expect(invoiceItemObj.description).to
              .equal(invoiceItemObj.description);
            done();
          });
      });
    });

    describe('Read', function() {
      it('should read an invoiceItem', function(done) {
        superagent.get(URL + '/invoiceItem/read')
          .query({
            invoiceId: currentInvoiceId,
            itemId: currentItemId
          })
          .end(function(err, res) {
            if (err) {
              console.log(err);
            }
            var thisItem = res.body;
            console.log(thisItem);
            chai.expect(thisItem).to.exist;
            chai.expect(thisItem).to.not.be.undefined;
            chai.expect(thisItem.description).to
              .equal(invoiceItemObj.description);
            done();
          });
      });
    });

    describe('Update', function() {
      it('should update an invoiceItem', function(done) {
        superagent.put(URL + '/invoiceItem/update')
          .send({
            itemObj: modifiedItem,
            itemId: currentItemId
          })
          .end(function(err, res) {
            if (err) {
              console.log(err);
            }
            var thisItem = res.body;
            chai.expect(thisItem).to.exist;
            chai.expect(thisItem).to.not.be.undefined;
            chai.expect(thisItem.qty).to
              .equal(modifiedItem.qty);
            done();
          });
      });
    });

    describe('Delete', function() {
      it('should delete an invoiceItem', function(done) {
        superagent.del(URL + '/invoiceItem/delete')
          .send({
            itemId: currentItemId
          })
          .end(function(err, res) {
            if (err) {
              console.log(err);
            }
            chai.expect(res.statusCode).to.equal(200);
            chai.expect(res.body).to.exist;
            chai.expect(res.body.status).to.equal('complete');
            chai.expect(res.body.isRemoved).to.be.true;
            done();
          });
      });
    });
    /*jshint -W030 */
  });
});
