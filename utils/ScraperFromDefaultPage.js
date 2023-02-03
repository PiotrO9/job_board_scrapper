const ScraperWithFilter = require('./ScraperWithFilter.js');
async function ScraperFromDefaultPage() {
    const firstPageResults = new Promise(resolve => resolve(ScraperWithFilter(`https://nofluffjobs.com/pl/?criteria=employment%3Dpermanent,zlecenie,b2b,uod,intern&page=1`)));
    const secondPageResults = new Promise(resolve => resolve(ScraperWithFilter(`https://nofluffjobs.com/pl/?criteria=employment%3Dpermanent,zlecenie,b2b,uod,intern&page=2`)));
    const thirdPageResults = new Promise(resolve => resolve(ScraperWithFilter(`https://nofluffjobs.com/pl/?criteria=employment%3Dpermanent,zlecenie,b2b,uod,intern&page=3`)));

    const result = await Promise.all([firstPageResults, secondPageResults, thirdPageResults]);
    return [].concat(...result);
}

module.exports = ScraperFromDefaultPage