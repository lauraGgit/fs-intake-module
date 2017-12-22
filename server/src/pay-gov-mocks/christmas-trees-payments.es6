'use strict';

const express = require('express');
const request = require('request'); // npm install request
const jose = require('node-jose');
const passport = require('passport');
const xml = require('xml');
const uuid = require('uuid/v4');

const util = require('../util.es6');
const vcapConstants = require('../vcap-constants.es6');
const treesDb = require('../models/trees-db.es6');
const middleware = require('../middleware.es6');

const payGov = {};

let transactions = {};

/** router for mock pay.gov  specific endpoints */
payGov.router = express.Router();

payGov.router.options('*', middleware.setCorsHeaders, (req, res) => {
  res.set('Access-Control-Allow-Headers', 'accept, content-type');
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS, PATCH');
  res.send();
});

payGov.router.post('/mock-pay-gov', function(req, res) {
  const requestBody = req.body['S:Envelope']['S:Body'][0];

  let xmlResponse = '';

  const token = uuid();
  const paygovTrackingId = util.getRandomString(5).toUpperCase();

  if (
    requestBody['ns2:startOnlineCollection'] &&
    requestBody['ns2:startOnlineCollection'][0]['startOnlineCollectionRequest'][0]
  ) {
    let startCollectionRequest = requestBody['ns2:startOnlineCollection'][0]['startOnlineCollectionRequest'][0];
    let accountHolderName = startCollectionRequest.account_holder_name;
    if (accountHolderName && accountHolderName == '1 1') {
      xmlResponse = `<?xml version="1.0" encoding="UTF-8"?>
                      <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
                        <S:Header>
                           <work:WorkContext xmlns:work="http://oracle.com/weblogic/soap/workarea/">
                           </work:WorkContext>
                        </S:Header>
                        <S:Body>
                          <S:Fault xmlns:ns4="http://www.w3.org/2003/05/soap-envelope">
                            <faultcode>S:Server</faultcode>
                            <faultstring>TCS Error</faultstring>
                            <detail>
                              <ns2:TCSServiceFault xmlns:ns2="http://fms.treas.gov/services/tcsonline">
                                <return_code>4019</return_code>
                                <return_detail>>No agency application found for given tcs_app_id ${
                                  startCollectionRequest.tcs_app_id
                                }.</return_detail>
                              </ns2:TCSServiceFault>
                            </detail>
                          </S:Fault>
                         </S:Body>
                      </S:Envelope>`;
    } else if(accountHolderName && accountHolderName == '1 2') {
      xmlResponse = null;
    }else {
      xmlResponse = `<?xml version="1.0" encoding="UTF-8"?>
                      <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
                        <S:Header>
                         <work:WorkContext xmlns:work="http://oracle.com/weblogic/soap/workarea/">
                         </work:WorkContext>
                        </S:Header>
                        <S:Body>
                          <ns2:startOnlineCollectionResponse xmlns:ns2="http://fms.treas.gov/services/tcsonline">
                            <startOnlineCollectionResponse>
                              <token>${token}</token>
                            </startOnlineCollectionResponse>
                          </ns2:startOnlineCollectionResponse>
                        </S:Body>
                      </S:Envelope>`;
    }
  } else if (
    requestBody['ns2:completeOnlineCollection'] &&
    requestBody['ns2:completeOnlineCollection'][0]['completeOnlineCollectionRequest'][0]
  ) {
    let collectionRequest = requestBody['ns2:completeOnlineCollection'][0]['completeOnlineCollectionRequest'][0];
    let requestToken = collectionRequest.token[0];
    let tokenStatus = transactions[requestToken];

    if (tokenStatus && tokenStatus.status == 'failure') {
      let returnCode = '0000';
      if (tokenStatus.errorCode) {
        returnCode = tokenStatus.errorCode;
      }
      xmlResponse = `<?xml version="1.0" encoding="UTF-8"?>
                      <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
                        <S:Header>
                           <work:WorkContext xmlns:work="http://oracle.com/weblogic/soap/workarea/">
                           </work:WorkContext>
                        </S:Header>
                        <S:Body>
                          <S:Fault xmlns:ns4="http://www.w3.org/2003/05/soap-envelope">
                            <faultcode>S:Server</faultcode>
                            <faultstring>TCS Error</faultstring>
                            <detail>
                              <ns2:TCSServiceFault xmlns:ns2="http://fms.treas.gov/services/tcsonline">
                                <return_code>${returnCode}</return_code>
                                <return_detail>The application does not accept credit cards or the transaction exceeds the maximum daily limit for credit card transactions. The transaction will not be processed.</return_detail>
                              </ns2:TCSServiceFault>
                            </detail>
                          </S:Fault>
                         </S:Body>
                      </S:Envelope>`;
    } else {
      xmlResponse = `<?xml version="1.0" encoding="UTF-8"?>
                      <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
                        <S:Header>
                         <work:WorkContext xmlns:work="http://oracle.com/weblogic/soap/workarea/">
                         </work:WorkContext>
                        </S:Header>
                        <S:Body>
                          <ns2:completeOnlineCollectionResponse xmlns:ns2="http://fms.treas.gov/services/tcsonline">
                            <completeOnlineCollectionResponse>
                              <paygov_tracking_id>${paygovTrackingId}</paygov_tracking_id>
                            </completeOnlineCollectionResponse>
                          </ns2:completeOnlineCollectionResponse>
                        </S:Body>
                      </S:Envelope>`;
    }
  }
  if (xmlResponse !== null) {
    res.set('Content-Type', 'application/xml; charset=utf-8');
    res.send(xmlResponse);
  }
  else {
    res.status(500).send();
  }
  
});

payGov.router.post('/mock-pay-gov-process', middleware.setCorsHeaders, function(req, res) {
  const token = req.body.token;
  const cc = req.body.cc;

  let status = 'success';
  let errorCode;
  if (cc.startsWith('000000000000')) {
    status = 'failure';
    let code = cc.slice(cc.length - 4, cc.length + 1);
    if (code != '0000') {
      errorCode = code;
    }
  }
  transactions[token] = { status: status, errorCode: errorCode };
  return res.status(200).json(transactions[token]);
});

payGov.router.get('/mock-pay-gov', middleware.setCorsHeaders, function(req, res) {
  treesDb.christmasTreesPermits
    .findOne({
      where: {
        paygovToken: req.query.token
      },
      include: [
        {
          model: treesDb.christmasTreesForests
        }
      ]
    })
    .then(permit => {
      if (permit) {
        const successUrl =
          vcapConstants.intakeClientBaseUrl +
          '/applications/christmas-trees/forests/' +
          permit.christmasTreesForest.forestAbbr +
          '/permits/' +
          permit.permitId;
        const mockResponse = {
          token: permit.permitId,
          paymentAmount: permit.totalCost,
          applicantName: permit.firstName + ' ' + permit.lastName,
          applicantEmailAddress: permit.emailAddress,
          amountOwed: permit.totalCost,
          tcsAppID: req.query.tcsAppID,
          orgStructureCode: permit.orgStructureCode,
          successUrl: successUrl
        };
        return res.status(200).send(mockResponse);
      } else {
        res.status(404).send();
      }
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

module.exports = payGov;
