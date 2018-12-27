'use strict';
const request = require('axios');
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
    const holidaysHTML = await request('https://www.timeanddate.com/holidays/india/2018', 
    {'headers': {'accept-language': 'en-GB,en-US'}});
    const holidays = extractHolidaysFromHTML(holidaysHTML.data)
    response[STATUS_CODE] = 200
    response["body"] = JSON.stringify(holidays)
  } catch (e) {
    response[STATUS_CODE] = 500
    response["body"] = e
  }
  return response
}