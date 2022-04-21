const fs = require('fs');
const puppeter = require('puppeteer');
const url = 'https://www.interiordefine.com/shop/custom-ottomans';
const path = './ottomans/';
const fileName = 'ottomans';

function saveObj(fileName, data) {
  fs.writeFile(
    `${path}/${fileName}.json`,
    JSON.stringify(data, null, '\t'),
    () => {
      console.log('generate data successfully');
    }
  );
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
        '.swiper-wrapper .category--product.default.swiper-slide.product--to-filter-family'
      )
    );

    const srcSetAttribute = items.slice(8, 9).map((item) => {
      const gethref = item
        .querySelector('a.category--product-lnk')
        .getAttribute('href');
      return gethref;
    });
    return srcSetAttribute;
  });

  const database = await Promise.all(
    links.map(async (link) => {
      const nextPage = await browser.newPage();
      await nextPage.goto(link, { waitUntil: 'networkidle0', timeout: 0 });

      const data = await nextPage.evaluate(() => {
        const data_sku = document.querySelectorAll(
          'script[type="text/javascript"][language="javascript"]'
        )[0].innerHTML;

        const img_tag = document.querySelector(
          '.cylindo-viewer-container.has-thumbs.thumb-location-bottom img'
        );

        const image_url = img_tag
          ? img_tag.hasAttribute('src')
            ? img_tag.getAttribute('src')
            : null
          : null;

        const name = document.querySelector(
          'div.product--configurator-top h1'
        ).innerText;

        const material_type = Array.from(
          document.querySelectorAll('select[name="material-type"] option')
        )
          .slice(0, 4)
          .map(function (e) {
            return {
              name: e.innerText,
              value: e.getAttribute('value'),
              data_description: e.getAttribute('data-description'),
              data_sku: e.getAttribute('data-sku'),
              data_imagesrc: e.getAttribute('data-imagesrc'),
              data_price: parseInt(e.getAttribute('data-price')),
              data_material: e.getAttribute('data-material'),
              data_color: e.getAttribute('data-colors'),
            };
          });

        const legs_type = Array.from(
          document.querySelectorAll('select[name="legs-type"] option')
        )
          .slice(0, 3)
          .map(function (e) {
            return {
              name: e.innerText,
              data_description: e.getAttribute('data-description'),
              data_sku: e.getAttribute('data-sku'),
              data_imagesrc: e.getAttribute('data-imagesrc'),
            };
          });

        return {
          name: name,
          data_sku: data_sku,
          image_url: image_url,
          material_type: material_type,
          legs_type: legs_type,
        };
      });
      return data;
    })
  );

  await browser.close();
  saveObj(fileName, database);
}

main();
