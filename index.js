const fs = require('fs');
const puppeter = require('puppeteer');
const dowloader = require('image-downloader');
const url = 'https://nhaxinh.com/danh-muc/phong-khach/sofa/';
const path = './phong-khach/sofa/';

async function saveImage(nameFile, urlLink) {
  try {
    if (!fs.existsSync(nameFile)) {
      fs.mkdirSync(nameFile);
    }
    dowloader.image({
      url: urlLink,
      dest: nameFile,
    });
  } catch (e) {
    console.log(e);
  }
}

function saveObj(fileName, data) {
  fs.writeFile(`${path}/${fileName}.json`, JSON.stringify(data), () => {
    console.log('generate data successfully');
  });
}

async function main() {
  const browser = await puppeter.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'load', timeout: 0 });

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }

  const links = await page.evaluate(() => {
    const items = Array.from(
      document.querySelectorAll(
        '.row.category-page-row div.col-inner .image-fade_in_back'
      )
    );

    const srcSetAttribute = items.slice(0, 1).map((item) => {
      const gethref = item.querySelector('a').getAttribute('href');
      return gethref;
    });

    return srcSetAttribute;
  });

  console.log(links);

  await browser.close();

  const database = await links.map(async (link) => {
    const browser = await puppeter.launch();
    const page = await browser.newPage();
    await page.goto(link, { waitUntil: 'load' });

    console.log('aaaa');

    const data = await page.evaluate(() => {
      const title = document.querySelector('h1.product-title').innerText;
      const price = document.querySelector(
        '.woocommerce-Price-amount.amount'
      ).innerText;
      return {
        Name: title,
        Price: price,
      };
    });

    return data;
  });
  await browser.close();

  console.log(database);
}
main();
