const puppeteer = require('puppeteer');

async function ScraperDetailPage(url) {
    const browser = await puppeteer.launch({
        defaultViewport: {
            width: 1920,
            height: 1080
        }
    });
    const page = await browser.newPage();
    await page.goto(url);

    let NecessarySkillsSection = await page.$$('body > nfj-root > nfj-layout > nfj-main-content > div > nfj-posting-details > div > common-main-loader > main > article > div:nth-child(1) > common-posting-content-wrapper > div:nth-child(1) > div#posting-requirements > section:nth-child(1) > ul > li');
    let RequirementsSection = await page.$$('body > nfj-root > nfj-layout > nfj-main-content > div > nfj-posting-details > div > common-main-loader > main > article > div:nth-child(1) > common-posting-content-wrapper > div:nth-child(1) > section:nth-of-type(2) > div > nfj-read-more > div > ul:nth-of-type(1) > li')

    let NeccessarySkillsArray = [];
    let RequirementsArray = [];
    let Description; 
    try {
        Description = await page.$eval('body > nfj-root > nfj-layout > nfj-main-content > div > nfj-posting-details > div > common-main-loader > main > article > div:nth-child(1) > common-posting-content-wrapper > div:nth-child(1) > section:nth-of-type(3) > div > nfj-read-more > div > p', element => element.textContent)
    }
    catch(error) {
        Description = ""
    }

    console.log(Description)

    for(let i = 1; i < NecessarySkillsSection.length; i++) {
        let OneSkil
        try {
            OneSkil = await page.$eval(`body > nfj-root > nfj-layout > nfj-main-content > div > nfj-posting-details > div > common-main-loader > main > article > div > common-posting-content-wrapper > div > div > section > ul > li:nth-child(${i}) > span`, element => element.innerText);
        }
        catch(error) {
            break
        }

        NeccessarySkillsArray.push(OneSkil)
    }

    for(let i = 1; i < RequirementsSection.length; i++) {
        let OneRequirement
        try {
            OneRequirement = await page.$eval(`body > nfj-root > nfj-layout > nfj-main-content > div > nfj-posting-details > div > common-main-loader > main > article > div:nth-child(1) > common-posting-content-wrapper > div:nth-child(1) > section:nth-of-type(2) > div > nfj-read-more > div > ul:nth-of-type(1) > li:nth-child(${i})`, element => element.innerText)
        } 
        catch(error) {
            break
        }
        RequirementsArray.push(OneRequirement)
    }

    return {
        NeccessarySkillsList: NeccessarySkillsArray,
        RequirementsList: RequirementsArray,
        JobOfferDescription: Description
    }
}

module.exports = ScraperDetailPage;