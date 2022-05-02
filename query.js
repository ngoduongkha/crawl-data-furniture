const fs = require('fs');
const linkCheck = require('link-check');

String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substring(0, index) +
    replacement +
    this.substring(index + replacement.length)
  );
};

function queryBrand() {
  let query = `INSERT INTO "brands"(brand_id, brand_name)\nVALUES`;
  const id = "nextval('brand_brand_id_seq'::regclass)";

  query = query.concat(`\n\t(${id}, 'Sloan'),`);
  query = query.concat(`\n\t(${id}, 'Maxwell'),`);
  query = query.concat(`\n\t(${id}, 'Otto'),`);
  query = query.concat(`\n\t(${id}, 'Miller'),`);
  query = query.concat(`\n\t(${id}, 'Rowan'),`);
  query = query.concat(`\n\t(${id}, 'Ines'),`);
  query = query.concat(`\n\t(${id}, 'Tatum'),`);
  query = query.concat(`\n\t(${id}, 'Colten'),`);
  query = query.concat(`\n\t(${id}, 'Charly'),`);

  query = query.replaceAt(query.lastIndexOf(','), ';\n');

  return query;
}

function queryCategory() {
  let query = `INSERT INTO "categories"(category_id, category_name, parent_id)\nVALUES`;
  const id = "nextval('category_category_id_seq'::regclass)";

  query = query.concat(`\n\t(${id}, 'Phòng khách', null),`);
  query = query.concat(`\n\t(${id}, 'Sectional', 1),`);
  query = query.concat(`\n\t(${id}, 'Left Chaise Sectional', 2),`);
  query = query.concat(`\n\t(${id}, 'U-Sectional', 2),`);
  query = query.concat(`\n\t(${id}, 'Sleeper Sectional', 2),`);
  query = query.concat(`\n\t(${id}, 'Sofa', 1),`);
  query = query.concat(`\n\t(${id}, 'Sofa', 6),`);
  query = query.concat(`\n\t(${id}, 'Loveseat', 6),`);
  query = query.concat(`\n\t(${id}, 'Sleeper Sofa', 6),`);
  query = query.concat(`\n\t(${id}, 'Ottoman', 1),`);
  query = query.concat(`\n\t(${id}, 'Accent Ottoman', 10),`);
  query = query.concat(`\n\t(${id}, 'Stool Ottoman', 10),`);
  query = query.concat(`\n\t(${id}, 'Bench', 1),`);
  query = query.concat(`\n\t(${id}, 'Accent Bench', 13),`);
  query = query.concat(`\n\t(${id}, 'Chair', 1),`);
  query = query.concat(`\n\t(${id}, 'Accent Chair', 15),`);

  query = query.replaceAt(query.lastIndexOf(','), ';\n');

  return query;
}

function queryProduct(json, category_id_list, brand_id_list) {
  let query = `INSERT INTO "products"(product_id, product_name, product_desc, brand_id, category_id, image)\nVALUES`;
  const id = "nextval('product_product_id_seq'::regclass)";
  const list_product = Array.from(json);

  for (let index = 0; index < list_product.length; index++) {
    const element = list_product[index];

    query = query.concat(
      `\n\t(${id}, '${element['name']}', '${element['product_desc']}', ${brand_id_list[index]}, ${category_id_list[index]}, '${element['image_url']}'),`
    );
  }

  query = query.replaceAt(query.lastIndexOf(','), ';\n');

  return query;
}

function queryOption(category_id_list) {
  let query = `INSERT INTO "options"(option_id, category_id, option_name)\nVALUES`;
  const id = "nextval('options_option_id_seq'::regclass)";

  Array.from(category_id_list).map((e) => {
    query = query.concat(`\n\t(${id}, ${e}, 'Chất liệu'),`);
    query = query.concat(`\n\t(${id}, ${e}, 'Chất liệu chân'),`);
  });

  query = query.replaceAt(query.lastIndexOf(','), ';\n');

  return query;
}

function queryProductvariant(json) {
  let query = `INSERT INTO "variants"(variant_id, product_id, image, price, quantity, sku)\nVALUES`;
  const id = "nextval('variants_variant_id_seq'::regclass)";

  for (let i = 0; i < json.length; i++) {
    const json_product = json[i];
    const material_type = Array.from(json_product['material_type']).slice(0, 4);
    const legs_type = Array.from(json_product['legs_type']).slice(0, 3);
    const image = json_product['image_url'];

    if (legs_type.length == 0) {
      for (let k = 0; k < material_type.length; k++) {
        const material = material_type[k];
        let image_url = image
          .replace('BI-132', material['data_sku'])
          .replace('COLOR:2210A', 'COLOR:' + material['data_sku'])
          .replace('CW-006', material['data_sku'])
          .replace('8519A', material['data_sku'])
          .replace('AK-618-16', material['data_sku'])
          .replace('SE-170', material['data_sku'])
          .replace('CW-001', material['data_sku'])
          .replace('SE-173', material['data_sku'])
          .replace('ROY-001', material['data_sku'])
          .replace('SE-166', material['data_sku'])
          .replace('CU-155', material['data_sku']);

        linkCheck(image_url, function (err, result) {
          if (err) {
            console.log(err);
            return;
          }
          if (result.statusCode == 404) {
            console.log(image_url);
            image_url = null;
          }
        });

        query = query.concat(
          `\n\t(${id}, ${i + 1 + product_count}, '${image_url}', ${
            json_product['product_price'] + material['data_price']
          }, 10, '${
            json_product['product_sku'] + ' - ' + material['data_sku']
          }'),`
        );
      }
    } else {
      for (let k = 0; k < material_type.length; k++) {
        const material = material_type[k];
        for (let j = 0; j < legs_type.length; j++) {
          const leg = legs_type[j];
          let image_url = image
            .replace('BI-132', material['data_sku'])
            .replace('COLOR:2210A', 'COLOR:' + material['data_sku'])
            .replace('LEG001-1', leg['data_sku'])
            .replace('LEG008-3', leg['data_sku'])
            .replace('CW-006', material['data_sku'])
            .replace('LEG018-1', leg['data_sku'])
            .replace('LEG007-1', leg['data_sku'])
            .replace('8519A', material['data_sku'])
            .replace('AK-618-16', material['data_sku'])
            .replace('LEG014-3', leg['data_sku'])
            .replace('SE-170', material['data_sku'])
            .replace('CW-001', material['data_sku'])
            .replace('LEG016-1', leg['data_sku'])
            .replace('SE-173', material['data_sku'])
            .replace('LEG039-2', leg['data_sku'])
            .replace('ROY-001', material['data_sku'])
            .replace('LEG038-2', leg['data_sku'])
            .replace('SE-166', material['data_sku'])
            .replace('CU-155', material['data_sku']);

          linkCheck(image_url, function (err, result) {
            if (err) {
              console.log(err);
              return;
            }
            if (result.statusCode == 404) {
              console.log(image_url);
              image_url = null;
            }
          });

          query = query.concat(
            `\n\t(${id}, ${i + 1 + product_count}, '${image_url}', ${
              json_product['product_price'] + material['data_price']
            }, 10, '${
              json_product['product_sku'] +
              ' - ' +
              material['data_sku'] +
              ' - ' +
              leg['data_sku']
            }'),`
          );
        }
      }
    }
  }

  query = query.replaceAt(query.lastIndexOf(','), ';\n');

  return query;
}

function queryvariantValue(json) {
  let query = `INSERT INTO "variant_value"(option_id, variant_id, option_value, option_image)\nVALUES`;
  let list_product = Array.from(json);

  for (let i = 0; i < list_product.length; i++) {
    const product = list_product.at(i);
    const material_type = Array.from(product['material_type']).slice(0, 4);
    const legs_type = Array.from(product['legs_type']).slice(0, 3);

    if (legs_type.length == 0) {
      for (let k = 0; k < material_type.length; k++) {
        const material = material_type[k];

        query = query.concat(
          `\n\t(${option_count + 1}, ${variant_count + 1}, '${
            material['name']
          }', '${material['data_imagesrc']}'),`
        );
        query = query.concat(
          `\n\t(${option_count + 2}, ${variant_count + 1}, null, null),`
        );
        variant_count = variant_count + 1;
      }
    }

    for (let k = 0; k < material_type.length; k++) {
      for (let h = 0; h < legs_type.length; h++) {
        const material = material_type[k];
        const leg = legs_type[h];

        query = query.concat(
          `\n\t(${option_count + 1}, ${variant_count + 1}, '${
            material['name']
          }', '${material['data_imagesrc']}'),`
        );
        query = query.concat(
          `\n\t(${option_count + 2}, ${variant_count + 1}, '${leg['name']}', '${
            leg['data_imagesrc']
          }'),`
        );
        variant_count = variant_count + 1;
      }
    }
  }

  option_count = option_count + 2;
  query = query.replaceAt(query.lastIndexOf(','), ';\n');

  return query;
}

let product_count = 0;
var variant_count = 0;
var option_count = 0;

fs.readFile('./sectionals/sectionals-final.json', 'utf8', async (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let json = JSON.parse(data);

  let query = queryBrand();
  query = query.concat(queryCategory());
  query = query.concat(queryProduct(json, [5, 3, 4, 3], [1, 1, 1, 1]));
  query = query.concat(queryOption([3, 4, 5]));
  query = query.concat(queryProductvariant(json));
  query = query.concat(queryvariantValue(json));

  product_count = product_count + Array.from(json).length;

  fs.writeFile('query.sql', query, { flag: 'w+' }, (err) => {
    if (err)
      console.log(err);
  });
});

fs.readFile('./sofas/sofas-final.json', async (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let json = JSON.parse(data);
  let query = queryProduct(json, [7, 8, 9, 9], [9, 9, 9, 9]);
  query = query.concat(queryOption([7, 8, 9]));
  query = query.concat(queryProductvariant(json));
  query = query.concat(queryvariantValue(json));

  product_count = product_count + Array.from(json).length;

  fs.writeFile('query.sql', query, { flag: 'a' }, (err) => {
    if (err) console.log(err);
  });
});

fs.readFile('./chairs/chairs-final.json', 'utf8', async (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let json = JSON.parse(data);
  let query = queryProduct(json, [16, 16, 16, 16], [2, 2, 2, 1]);
  query = query.concat(queryOption([16]));
  query = query.concat(queryProductvariant(json));
  query = query.concat(queryvariantValue(json));

  product_count = product_count + Array.from(json).length;

  fs.writeFile('query.sql', query, { flag: 'a' }, (err) => {
    if (err) console.log(err);
  });
});

fs.readFile('./ottomans/ottomans-final.json', 'utf8', async (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let json = JSON.parse(data);
  let query = queryProduct(json, [11, 11, 11, 12], [1, 7, 2, 8]);
  query = query.concat(queryOption([11, 12]));
  query = query.concat(queryProductvariant(json));
  query = query.concat(queryvariantValue(json));

  product_count = product_count + Array.from(json).length;

  fs.writeFile('query.sql', query, { flag: 'a' }, (err) => {
    if (err) console.log(err);
  });
});

fs.readFile('./benches/benches-final.json', 'utf8', async (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let json = JSON.parse(data);
  let query = queryProduct(json, [14, 14, 14, 14], [3, 4, 5, 6]);
  query = query.concat(queryOption([14]));
  query = query.concat(queryProductvariant(json));
  query = query.concat(queryvariantValue(json));

  product_count = product_count + Array.from(json).length;

  fs.writeFile('query.sql', query, { flag: 'a' }, (err) => {
    if (err) console.log(err);
  });
});
