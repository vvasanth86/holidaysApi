'use strict';
const axios = require('axios');
const moment = require('moment');
const {extractHolidaysFromHTML} = require('./helper');
const STATUS_CODE = "statusCode"

exports.holidays = async (event) => {
  let response = {
    	"isBase64Encoded": false,
    	"body": "",
    	"headers": {
    		"Content-Type": "application/json"
    	}
  }
  
  try {
    // default to current year
    let year = moment().year();

    // override if incoming request has year specified
    if (event.queryStringParameters !== null && event.queryStringParameters !== undefined) {
      if (event.queryStringParameters.year !== undefined && 
        event.queryStringParameters.year !== null && 
        event.queryStringParameters.year !== "") {
        console.log("Received year: " + event.queryStringParameters.year);
        year = event.queryStringParameters.year;
      }
    }
  
    const url = 'https://www.timeanddate.com/holidays/india/' + year
    const holidaysHTML = await axios(url, {'headers': {'accept-language': 'en-GB,en-US'}});
    // extract holidays JSON from HTML
    const holidays = extractHolidaysFromHTML(holidaysHTML.data, year)
    response[STATUS_CODE] = (holidays.length == 0) ? 204 : 200
    response["body"] = JSON.stringify(holidays)
  } catch (e) {
    response[STATUS_CODE] = 500
    response["body"] = JSON.stringify(e.message)
  }

  return response
}