'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var chai = require('chai');
var superagent = require('superagent');

describe('Invoice API tests', function() {

  var URL = 'https://localhost:4443';
  var invoiceObj = {
    title: 'invoice1',
    description: 'invoice for bob',
    poNumber: 123456,
    invoiceNumber: 1001,
    taxApplied: true,
    feeApplied: true,
    status: 'entered',
    invoiceItems: []
  };
  var currentInvoiceId;
  var modifiedInvoice = {
    title: 'invoice27',
    description: 'invoice for bob',
    poNumber: 123456,
    invoiceNumber: 1001,
    taxApplied: true,
    feeApplied: true,
    status: 'entered',
    invoiceItems: []
  };
  /*jshint -W030 */
  describe('CRUD actions', function() {

    describe('Create', function() {
      it('should create an invoice', function(done) {
        superagent.post(URL + '/invoice/create')
          .send(invoiceObj)
          .end(function(err, res) {
            invoiceObj = res.body;
            currentInvoiceId = res.body._id;
            chai.expect(invoiceObj).to.exist;
            chai.expect(invoiceObj).to.not.be.undefined;
            chai.expect(invoiceObj.title).to
              .equal(invoiceObj.title);
            done();
          });
      });
    });

    describe('Read', function() {
      it('should read an invoice', function(done) {
        superagent.get(URL + '/invoice/read')
          .query({invoiceId: currentInvoiceId})
          .end(function(err, res) {
            if (err) {
              console.log(err);
            }
            var thisInvoice = res.body;
            chai.expect(thisInvoice).to.exist;
            chai.expect(thisInvoice).to.not.be.undefined;
            chai.expect(thisInvoice.title).to
              .equal(invoiceObj.title);
            done();
          });
      });
    });

    describe('Update', function() {
      it('should update a invoice', function(done) {
        superagent.put(URL + '/invoice/update')
          .send({
            invoiceObj: modifiedInvoice,
            invoiceId: currentInvoiceId
          })
          .end(function(err, res) {
            if (err) {
              console.log(err);
            }
            var thisInvoice = res.body;
            chai.expect(thisInvoice).to.exist;
            chai.expect(thisInvoice).to.not.be.undefined;
            chai.expect(thisInvoice.title).to
              .equal(modifiedInvoice.title);
            done();
          });
      });
    });

    describe('Delete', function() {
      it('should delete a invoice', function(done) {
        superagent.del(URL + '/invoice/delete')
          .send({
            invoiceId: currentInvoiceId
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
