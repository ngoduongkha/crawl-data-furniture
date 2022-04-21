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
  let query = `INSERT INTO "brand"(brand_id, brand_name)\nVALUES`;
  query = query.concat(`\n\t(1, 'Sloan'),`);
  query = query.concat(`\n\t(2, 'Maxwell'),`);
  query = query.concat(`\n\t(3, 'Otto'),`);
  query = query.concat(`\n\t(4, 'Miller'),`);
  query = query.concat(`\n\t(5, 'Rowan'),`);
  query = query.concat(`\n\t(6, 'Ines'),`);
  query = query.concat(`\n\t(7, 'Tatum'),`);
  query = query.concat(`\n\t(8, 'Colten'),`);
  query = query.concat(`\n\t(9, 'Charly'),`);

  query = query.replaceAt(query.lastIndexOf(','), ';\n');

  return query;
}

function queryCategory() {
  let query = `INSERT INTO "category"(category_id, category_name, parent_id)\nVALUES`;
  query = query.concat(`\n\t(1, 'Phòng khách', null),`);
  query = query.concat(`\n\t(2, 'Sectional', 1),`);
  query = query.concat(`\n\t(3, 'Left Chaise Sectional', 2),`);
  query = query.concat(`\n\t(4, 'U-Sectional', 2),`);
  query = query.concat(`\n\t(5, 'Sleeper Sectional', 2),`);
  query = query.concat(`\n\t(6, 'Sofa', 1),`);
  query = query.concat(`\n\t(7, 'Sofa', 6),`);
  query = query.concat(`\n\t(8, 'Loveseat', 6),`);
  query = query.concat(`\n\t(9, 'Sleeper Sofa', 6),`);
  query = query.concat(`\n\t(10, 'Ottoman', 1),`);
  query = query.concat(`\n\t(11, 'Accent Ottoman', 10),`);
  query = query.concat(`\n\t(12, 'Stool Ottoman', 10),`);
  query = query.concat(`\n\t(13, 'Bench', 1),`);
  query = query.concat(`\n\t(14, 'Accent Bench', 13),`);
  query = query.concat(`\n\t(15, 'Chair', 1),`);
  query = query.concat(`\n\t(16, 'Accent Chair', 15),`);

  query = query.replaceAt(query.lastIndexOf(','), ';\n');

  return query;
}

function queryProduct(json, category_id_list, product_count, brand_id_list) {
  let query = `INSERT INTO "product"(product_id, product_name, brand_id, category_id, image)\nVALUES`;
  const list_product = Array.from(json);

  for (let index = 0; index < list_product.length; index++) {
    query = query.concat(
      `\n\t(${index + 1 + product_count}, '${list_product[index]['name']}', ${
        brand_id_list[index]
      }, ${category_id_list[index]}, '${list_product[index]['image_url']}'),`
    );
  }

  query = query.replaceAt(query.lastIndexOf(','), ';\n');

  return query;
}

function queryOption(category_id_list) {
  let query = `INSERT INTO "options"(option_id, category_id, option_name)\nVALUES`;

  Array.from(category_id_list).map((e) => {
    query = query.concat(`\n\t(1, ${e}, 'Chất liệu'),`);
    query = query.concat(`\n\t(2, ${e}, 'Chất liệu chân'),`);
  });

  query = query.replaceAt(query.lastIndexOf(','), ';\n');

  return query;
}

function queryProductvariant(json, product_count) {
  let query = `INSERT INTO "product_variant"(product_id, variant_id, image, price, quantity, sku)\nVALUES`;
  for (let i = 0; i < json.length; i++) {
    const json_product = json[i];
    const material_type = Array.from(json_product['material_type']).slice(0, 4);
    const legs_type = Array.from(json_product['legs_type']).slice(0, 3);
    const image = json_product['image_url'];
    let variant_id = 0;

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
          `\n\t(${i + 1 + product_count}, ${variant_id + 1}, '${image_url}', ${
            json_product['product_price'] + material['data_price']
          }, 10, '${
            json_product['product_sku'] + ' - ' + material['data_sku']
          }'),`
        );

        variant_id = variant_id + 1;
      }
    }

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
          `\n\t(${i + 1 + product_count}, ${variant_id + 1}, '${image_url}', ${
            json_product['product_price'] + material['data_price']
          }, 10, '${
            json_product['product_sku'] +
            ' - ' +
            material['data_sku'] +
            ' - ' +
            leg['data_sku']
          }'),`
        );
        variant_id = variant_id + 1;
      }
    }
  }

  query = query.replaceAt(query.lastIndexOf(','), ';\n');

  return query;
}

function queryvariantValue(json, product_count, category_id_list) {
  let query = `INSERT INTO "variant_value"(product_id, option_id, variant_id, category_id, option_value)\nVALUES`;
  let list_product = Array.from(json);

  for (let i = 0; i < list_product.length; i++) {
    const product = list_product.at(i);
    const material_type = Array.from(product['material_type']).slice(0, 4);
    const legs_type = Array.from(product['legs_type']).slice(0, 3);
    let variant_id = 1;

    if (legs_type.length == 0) {
      for (let k = 0; k < material_type.length; k++) {
        query = query.concat(
          `\n\t(${i + 1 + product_count}, 1, ${variant_id}, ${
            category_id_list[i]
          }, '${material_type[k]['name']}'),`
        );
        query = query.concat(
          `\n\t(${i + 1 + product_count}, 2, ${variant_id}, ${
            category_id_list[i]
          }, null),`
        );
        variant_id = variant_id + 1;
      }
    }

    for (let k = 0; k < material_type.length; k++) {
      for (let h = 0; h < legs_type.length; h++) {
        query = query.concat(
          `\n\t(${i + 1 + product_count}, 1, ${variant_id}, ${
            category_id_list[i]
          }, '${material_type[k]['name']}'),`
        );
        query = query.concat(
          `\n\t(${i + 1 + product_count}, 2, ${variant_id}, ${
            category_id_list[i]
          }, '${legs_type[h]['name']}'),`
        );
        variant_id = variant_id + 1;
      }
    }
  }

  query = query.replaceAt(query.lastIndexOf(','), ';\n');

  return query;
}

let product_count = 0;

fs.readFile('./sectionals/sectionals-final.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let json = JSON.parse(data);

  let query = queryBrand();
  query = query.concat(queryCategory());
  query = query.concat(
    queryProduct(json, [5, 3, 4, 3], product_count, [1, 1, 1, 1])
  );
  query = query.concat(queryOption([3, 4, 5]));
  query = query.concat(queryProductvariant(json, product_count));
  query = query.concat(queryvariantValue(json, product_count, [5, 3, 4, 3]));
  product_count = product_count + Array.from(json).length;

  fs.writeFile('query.sql', query, { flag: 'w+' }, (err) => {
    if (err) console.log(err);
  });
});

fs.readFile('./sofas/sofas-final.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let json = JSON.parse(data);
  let query = queryProduct(json, [7, 8, 9, 9], product_count, [9, 9, 9, 9]);
  query = query.concat(queryOption([7, 8, 9]));
  query = query.concat(queryProductvariant(json, product_count));
  query = query.concat(queryvariantValue(json, product_count, [7, 8, 9, 9]));
  product_count = product_count + Array.from(json).length;

  fs.writeFile('query.sql', query, { flag: 'a' }, (err) => {
    if (err) console.log(err);
  });
});

fs.readFile('./chairs/chairs-final.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let json = JSON.parse(data);
  let query = queryProduct(json, [16, 16, 16, 16], product_count, [2, 2, 2, 1]);
  query = query.concat(queryOption([16]));
  query = query.concat(queryProductvariant(json, product_count));
  query = query.concat(
    queryvariantValue(json, product_count, [16, 16, 16, 16])
  );
  product_count = product_count + Array.from(json).length;

  fs.writeFile('query.sql', query, { flag: 'a' }, (err) => {
    if (err) console.log(err);
  });
});

fs.readFile('./ottomans/ottomans-final.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let json = JSON.parse(data);
  let query = queryProduct(json, [11, 11, 11, 12], product_count, [1, 7, 2, 8]);
  query = query.concat(queryOption([11, 12]));
  query = query.concat(queryProductvariant(json, product_count));
  query = query.concat(
    queryvariantValue(json, product_count, [11, 11, 11, 12])
  );
  product_count = product_count + Array.from(json).length;

  fs.writeFile('query.sql', query, { flag: 'a' }, (err) => {
    if (err) console.log(err);
  });
});

fs.readFile('./benches/benches-final.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let json = JSON.parse(data);
  let query = queryProduct(json, [14, 14, 14, 14], product_count, [3, 4, 5, 6]);
  query = query.concat(queryOption([14]));
  query = query.concat(queryProductvariant(json, product_count));
  query = query.concat(
    queryvariantValue(json, product_count, [14, 14, 14, 14])
  );
  product_count = product_count + Array.from(json).length;

  fs.writeFile('query.sql', query, { flag: 'a' }, (err) => {
    if (err) console.log(err);
  });
});
