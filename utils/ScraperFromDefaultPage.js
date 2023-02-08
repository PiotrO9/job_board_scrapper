const ScraperWithFilter = require('./ScraperWithFilter.js');
async function ScraperFromDefaultPage() {
    const pages = [1, 2, 3, 4];
  const tasks = pages.map(page => {
    return new Promise(resolve => resolve(ScraperWithFilter(`https://nofluffjobs.com/pl/?criteria=employment%3Dpermanent,zlecenie,b2b,uod,intern&page=${page}`)));
  });

  const results = await Promise.all(tasks);
  const combinedArray = [].concat(...results);
  return combinedArray;
}

module.exports = ScraperFromDefaultPage