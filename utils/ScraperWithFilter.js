const puppeteer = require('puppeteer');

async function ScraperWithFilter(url) {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {
            width: 1920,
            height: 1080
        }
    });
    const page = await browser.newPage();
    await page.goto(url);

    const ResponseOffers = []

    
    let Offers = await page.$$('body > nfj-root > nfj-layout > nfj-main-content > div > nfj-postings-search > div > common-main-loader > nfj-search-results > nfj-postings-list:nth-child(1) > div.list-container.ng-star-inserted a.posting-list-item div.posting-info');
    

    for(let i = 1; i <= Offers.length; i++) {
        let SingleSalary = await page.$eval(`body > nfj-root > nfj-layout > nfj-main-content > div > nfj-postings-search > div > common-main-loader >  nfj-search-results > nfj-postings-list:nth-child(1) > div.list-container.ng-star-inserted a:nth-child(${i}).posting-list-item div.posting-info nfj-posting-item-tags span`, element => element.innerText)
        let SingleJobOfferName = await page.$eval(`body > nfj-root > nfj-layout > nfj-main-content > div > nfj-postings-search > div > common-main-loader > nfj-search-results > nfj-postings-list:nth-child(1) > div.list-container.ng-star-inserted a:nth-child(${i}).posting-list-item nfj-posting-item-title .posting-title__wrapper div h3`, element => element.innerText)
        let SingleCompanyName = await page.$eval(`body > nfj-root > nfj-layout > nfj-main-content > div > nfj-postings-search > div > common-main-loader > nfj-search-results > nfj-postings-list:nth-child(1) > div.list-container.ng-star-inserted a:nth-child(${i}).posting-list-item nfj-posting-item-title .posting-title__wrapper .posting-title__company`, element => element.innerText)
        let LogoUrl; 
        try {
            LogoUrl = await page.$eval(`body > nfj-root > nfj-layout > nfj-main-content > div > nfj-postings-search > div > common-main-loader > nfj-search-results > nfj-postings-list:nth-child(1) > div.list-container.ng-star-inserted a:nth-child(${i}).posting-list-item .posting-image common-image-blur div picture img`, element => element.src)
        }
        catch(error) {
            LogoUrl = undefined
        }
        let JobCity = await page.$eval(`body > nfj-root > nfj-layout > nfj-main-content > div > nfj-postings-search > div > common-main-loader > nfj-search-results > nfj-postings-list:nth-child(1) > div.list-container.ng-star-inserted a:nth-child(${i}).posting-list-item div.posting-info nfj-posting-item-city div span`, element => element.innerText)
        let JobDetailsLink = await page.$eval(`body > nfj-root > nfj-layout > nfj-main-content > div > nfj-postings-search > div > common-main-loader > nfj-search-results > nfj-postings-list:nth-child(1) > div.list-container.ng-star-inserted a:nth-child(${i}).posting-list-item`, element => element.href)

        let offer = {
            salary: SingleSalary,
            jobOfferName: SingleJobOfferName,
            companyName: SingleCompanyName,
            jobCity: JobCity,
            jobDetailsLink: JobDetailsLink,
            logoUrl: LogoUrl
        }

        ResponseOffers[i-1] = offer
    }
    await browser.close();
    return ResponseOffers;
}

module.exports = ScraperWithFilter