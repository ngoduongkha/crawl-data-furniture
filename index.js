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
  fs.writeFile(`${path}/${fileName}.json`, JSON.stringify(data, null, '\t'), () => {
    console.log('generate data successfully');
  });
}

async function main() {
  const browser = await puppeter.launch();
  const page = await browser.newPage();

  await page.goto(url);

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }

  const links = await page.evaluate(() => {
    const items = Array.from(
      document.querySelectorAll(
        '.row.category-page-row div.col-inner .image-fade_in_back'
      )
    );

    const srcSetAttribute = items.slice(0, 20).map((item) => {
      const gethref = item.querySelector('a').getAttribute('href');
      return gethref;
    });

    return srcSetAttribute;
  });

  console.log(links);

  const database = await Promise.all(
    links.map(async (link) => {
      const page = await browser.newPage();
      await page.goto(link, { waitUntil: 'load', timeout: 0 });

      const data = await page.evaluate(() => {
        const title = document.querySelector('h1.product-title').innerText;
        const price = String(
          document.querySelector('.woocommerce-Price-amount.amount').innerText
        );
        const size = document.querySelector(
          'div.product-attribute.product-attribute-item.product-attribute-item-0 span.product-attribute-option'
        ).innerText;
        const productBaseId = document.querySelector('.sku').innerText;
        const detailMaterial = Array.from(
          document.querySelectorAll(
            'div.product-attribute.product-attribute-item.product-attribute-item-0 span.product-attribute-option'
          )
        ).map((e) => e.innerText);
        detailMaterial.shift();
        return {
          ProductBasetId: productBaseId,
          CategoryId: 5,
          BrandId: 1,
          MaterialId: 1,
          Name: title,
          Size: size,
          Description: '',
          Quantity: 0,
          Price: price,
          Image: '',
          detailMaterial: detailMaterial,
        };
      });
      return data;
    })
  );

  await browser.close();
  saveObj('sofa', database);
}
main();
