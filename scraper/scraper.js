const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  try {
    console.log("Launching browser...");

    // Launch Puppeteer browser
    const browser = await puppeteer.launch({ headless: true }); // headless: true runs without a browser UI
    const page = await browser.newPage();

    console.log("Opening the page...");
    await page.goto('https://example.com'); // Replace with your target URL

    // Scraping the page title
    const title = await page.title();
    console.log('Page Title: ', title);

    // Scraping content of <h1> tag
    const content = await page.$eval('h1', (el) => el.innerText);
    console.log('Scraped Content: ', content);

    // Scraping all links on the page
    const links = await page.$$eval('a', (links) => links.map(link => link.href));
    console.log('All Links: ', links);

    // Save the links into a JSON file
    fs.writeFileSync('scrapedLinks.json', JSON.stringify(links, null, 2));

    console.log("Links saved to scrapedLinks.json");

    console.log("Closing browser...");
    await browser.close();
  } catch (error) {
    console.error("Error occurred: ", error);
  }
})();
