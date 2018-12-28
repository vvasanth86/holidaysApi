const cheerio = require('cheerio');
const moment = require('moment');

function extractHolidaysFromHTML (html, year) {
  const $ = cheerio.load(html);
  const holidayRows = $('.article table tbody tr');

  let holidays = [];
  holidayRows.each((i, el) => {
    // Extract information from each row of the jobs table
    let info = {};
    let dateString = $(el).children().first().text().trim() + " " + year
    let date = moment(dateString, 'MMM D YYYY').toISOString();

    info['date'] = date;
    $(el).children('td').each((i, el) => {
      let val = $(el).text().trim()
      let key = ""
      switch (i) {
        case 0:
          key = "day";
          break;
        case 1:
          key = "name";
          break;
        case 2:
          key = "type";
          break;
      }
      info[key] = val
    });

    holidays.push(info);
  });

  return holidays;
}

module.exports = {
  extractHolidaysFromHTML
};