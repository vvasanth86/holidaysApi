const cheerio = require('cheerio');
const moment = require('moment');

function extractHolidaysFromHTML (html) {
  const $ = cheerio.load(html);
  const vacancyRows = $('.article table tbody tr');

  let holidays = [];
  vacancyRows.each((i, el) => {
    // Extract information from each row of the jobs table
    let info = {};
    let date = moment($(el).children().first().text().trim(), 'MMM D').toISOString();

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
    // let infoNodes = hnode.getElementsByTagName("td"); 

    // console.log([date, infoNodes.innerText, infoNodes[2].innerText]);
    // let closing = $(el).children('.views-field-field-vacancy-deadline').first().text().trim();
    // let job = $(el).children('.views-field-title').first().text().trim();
    // let location = $(el).children('.views-field-name').text().trim();
    // closing = moment(closing.slice(0, closing.indexOf('-') - 1), 'DD/MM/YYYY').toISOString();

    // holidays.push({date, job, location});
  });

  return holidays;
}

module.exports = {
  extractHolidaysFromHTML
};