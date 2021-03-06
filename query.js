const fs = require("fs");
const linkCheck = require("link-check");

String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substring(0, index) +
    replacement +
    this.substring(index + replacement.length)
  );
};

function queryBrand() {
  let query = `INSERT INTO "brand"(brand_id, brand_name, brand_desc)\nVALUES`;
  const id = "nextval('brand_brand_id_seq'::regclass)";

  query = query.concat(
    `\n\t(${id}, 'Sloan', 'Crisp lines and subtle tapering create an approachable style that feels right in a variety of decors'),`
  );
  query = query.concat(
    `\n\t(${id}, 'Maxwell', 'Contoured arms and piping details make for a piece that''s both comfortable and approachable'),`
  );
  query = query.concat(
    `\n\t(${id}, 'Otto', 'A supremely comfortable collection that''s equal parts relaxed and modern.'),`
  );
  query = query.concat(
    `\n\t(${id}, 'Miller', 'A traditionally-inspired silhouette that instantly feels timeless.'),`
  );
  query = query.concat(
    `\n\t(${id}, 'Rowan', 'The Chesterfield''s signature tufting goes hand-in-hand with a lighter (and roomier) shape'),`
  );
  query = query.concat(
    `\n\t(${id}, 'Ines', 'Subtle curves and soft corners make for an effortlessly cool and comfortable silhouette'),`
  );
  query = query.concat(
    `\n\t(${id}, 'Tatum', 'A versatile, modular design that''s customized to adapt to how you live—today and tomorrow'),`
  );
  query = query.concat(
    `\n\t(${id}, 'Colten', 'A versatile, modular design that''s customized to adapt to how you live—today and tomorrow'),`
  );
  query = query.concat(
    `\n\t(${id}, 'Charly', 'A deep seat with supportive lumbar pillows make for a piece that fits the whole family (paws included)'),`
  );
  query = query.concat(
    `\n\t(${id}, 'Monte', 'A soft-but-structured silhouette that perfectly balances minimal design with traditional comfort'),`
  );
  query = query.concat(
    `\n\t(${id}, 'Hollis', 'A soft yet linear design that''s customizable with a reversible chaise for added functionality.'),`
  );
  query = query.concat(
    `\n\t(${id}, 'Rue', 'An adaptable modular collection that''s as design-forward as it is functional.'),`
  );
  query = query.concat(
    `\n\t(${id}, 'Jensen', 'The iconic exposed wood frame piece, reinvented for timeless modernity in today''s home'),`
  );

  query = query.replaceAt(query.lastIndexOf(","), ";\n");

  return query;
}

function queryCategory() {
  let query = `INSERT INTO "category"(category_id, category_name, category_desc, parent_id)\nVALUES`;
  const id = "nextval('category_category_id_seq'::regclass)";

  query = query.concat(`\n\t(${id}, 'Living', 'Living room', null),`);
  query = query.concat(
    `\n\t(${id}, 'Sectional', 'Made-to-order with your choice of fabric, legs, and sizes.', 1),`
  );
  query = query.concat(
    `\n\t(${id}, 'Left Chaise Sectional', 'Left Chaise Sectional', 2),`
  );
  query = query.concat(`\n\t(${id}, 'U-Sectional', 'U-Sectional', 2),`);
  query = query.concat(
    `\n\t(${id}, 'Sleeper Sectional', 'Sleeper Sectional', 2),`
  );
  query = query.concat(
    `\n\t(${id}, 'Custom Sofa', 'Made-to-order with your choice of fabric, legs, and sizes.', 1),`
  );
  query = query.concat(`\n\t(${id}, 'Sofa', 'Sofa', 6),`);
  query = query.concat(`\n\t(${id}, 'Loveseat', 'Loveseat', 6),`);
  query = query.concat(`\n\t(${id}, 'Sleeper Sofa', 'Sleeper Sofa', 6),`);
  query = query.concat(
    `\n\t(${id}, 'Ottoman', 'Made-to-order with your choice of fabric, legs, and sizes.', 1),`
  );
  query = query.concat(`\n\t(${id}, 'Accent Ottoman', 'Accent Ottoman', 10),`);
  query = query.concat(`\n\t(${id}, 'Stool Ottoman', 'Stool Ottoman', 10),`);
  query = query.concat(
    `\n\t(${id}, 'Bench', 'Perfect for entryways, living spaces, or just about anywhere.', 1),`
  );
  query = query.concat(`\n\t(${id}, 'Accent Bench', 'Accent Bench', 13),`);
  query = query.concat(
    `\n\t(${id}, 'Chair', 'Made-to-order with your choice of fabric, legs, and sizes.', 1),`
  );
  query = query.concat(`\n\t(${id}, 'Accent Chair', 'Accent Chair', 15),`);
  query = query.concat(`\n\t(${id}, 'Dining', 'Dining room', null),`);
  query = query.concat(
    `\n\t(${id}, 'Seating', 'Pull up a chair with our customizable collection of dining chairs, benches, and stools.', 17),`
  );
  query = query.concat(`\n\t(${id}, 'Dining Chairs', 'Dining Chairs', 18),`);
  query = query.concat(`\n\t(${id}, 'Counter Stools', 'Counter Stools', 18),`);
  query = query.concat(`\n\t(${id}, 'Dining Benches', 'Dining Benches', 18),`);
  query = query.concat(
    `\n\t(${id}, 'Dining Tables', 'Gather around with our collection of tables, designed to elevate any dining space.', 17),`
  );
  query = query.concat(`\n\t(${id}, 'Round Tables', 'Round Tables', 22),`);
  query = query.concat(
    `\n\t(${id}, 'Rectangle Tables', 'Rectangle Tables', 22),`
  );
  query = query.concat(
    `\n\t(${id}, 'Sideboards', 'Stylishly store all of your dining essentials with our collection of sideboards.', 17),`
  );
  query = query.concat(`\n\t(${id}, 'Office', 'Office room', null),`);
  query = query.concat(
    `\n\t(${id}, 'Office Desks', 'Define your WFH with our desk collection, available in a range of styles and finishes.', 26),`
  );
  query = query.concat(
    `\n\t(${id}, 'Office Chairs', 'Office chairs that don''t compromise on style.', 26),`
  );

  query = query.replaceAt(query.lastIndexOf(","), ";\n");

  return query;
}

function queryProduct(json, category_id_list, brand_id_list) {
  let query = `INSERT INTO "product"(product_id, product_name, product_desc, brand_id, category_id, image)\nVALUES`;
  const id = "nextval('product_product_id_seq'::regclass)";
  const list_product = Array.from(json);

  for (let index = 0; index < list_product.length; index++) {
    const element = list_product[index];

    query = query.concat(
      `\n\t(${id}, '${element["name"]}', '${element["product_desc"]}', ${brand_id_list[index]}, ${category_id_list[index]}, '${element["image_url"]}'),`
    );
  }

  query = query.replaceAt(query.lastIndexOf(","), ";\n");

  return query;
}

function queryOption(category_id_list, flag) {
  let query = `INSERT INTO "options"(option_id, category_id, option_name)\nVALUES`;
  const id = "nextval('options_option_id_seq'::regclass)";

  Array.from(category_id_list).map((e) => {
    query = query.concat(`\n\t(${id}, ${e}, 'Material Colors'),`);

    if (flag == true)
      query = query.concat(`\n\t(${id}, ${e}, 'Secondary Material Colors'),`);

    query = query.concat(`\n\t(${id}, ${e}, 'Legs'),`);
  });

  query = query.replaceAt(query.lastIndexOf(","), ";\n");

  return query;
}

function queryProductVariant(json, flag) {
  let query = `INSERT INTO "variant"(variant_id, product_id, image, price, quantity, sku)\nVALUES`;
  const id = "nextval('variant_variant_id_seq'::regclass)";

  for (let i = 0; i < json.length; i++) {
    const json_product = json[i];
    const material_type = Array.from(json_product["material_type"]).slice(0, 4);
    const legs_type = Array.from(json_product["legs_type"]).slice(0, 3);
    const image = json_product["image_url"];

    if (flag == true) {
      const material_type_secondary = Array.from(
        json_product["material_type_secondary"]
      );
      for (let k = 0; k < material_type.length; k++) {
        const material = material_type[k];
        for (let h = 0; h < material_type_secondary.length; h++) {
          const material_secondary = material_type_secondary[h];
          for (let j = 0; j < legs_type.length; j++) {
            const leg = legs_type[j];
            let image_url = image
              .replace("COLOR:BI-132", "COLOR:" + material["data_sku"])
              .replace("COLOR:2210A", "COLOR:" + material["data_sku"])
              .replace("LEG001-1", leg["data_sku"])
              .replace("LEG008-3", leg["data_sku"])
              .replace("COLOR:CW-006", "COLOR:" + material["data_sku"])
              .replace("LEG018-1", leg["data_sku"])
              .replace("LEG007-1", leg["data_sku"])
              .replace("COLOR:8519A", "COLOR:" + material["data_sku"])
              .replace("COLOR:AK-618-16", "COLOR:" + material["data_sku"])
              .replace("LEG014-3", leg["data_sku"])
              .replace("COLOR:SE-170", "COLOR:" + material["data_sku"])
              .replace("COLOR:CW-001", "COLOR:" + material["data_sku"])
              .replace("LEG016-1", leg["data_sku"])
              .replace("COLOR:SE-173", "COLOR:" + material["data_sku"])
              .replace("LEG039-2", leg["data_sku"])
              .replace("COLOR:ROY-001", "COLOR:" + material["data_sku"])
              .replace("LEG038-2", leg["data_sku"])
              .replace("LEG073-1", leg["data_sku"])
              .replace("LEG074-1", leg["data_sku"])
              .replace("LEG075-2", leg["data_sku"])
              .replace("LEG075-1", leg["data_sku"])
              .replace("COLOR:SE-166", "COLOR:" + material["data_sku"])
              .replace("COLOR:SE-167", "COLOR:" + material["data_sku"])
              .replace("COLOR:SE-179", "COLOR:" + material["data_sku"])
              .replace("COLOR:SE-170", "COLOR:" + material["data_sku"])
              .replace("COLOR:SE-166", "COLOR:" + material["data_sku"])
              .replace("COLOR:CU-155", "COLOR:" + material["data_sku"])
              .replace(
                "SECONDARY%20FABRIC:SE-161",
                "SECONDARY%20FABRIC:" + material_secondary["data_sku"]
              )
              .replace(
                "SECONDARY%20FABRIC:WH-004",
                "SECONDARY%20FABRIC:" + material_secondary["data_sku"]
              )
              .replace(
                "SECONDARY%20FABRIC:SE-178",
                "SECONDARY%20FABRIC:" + material_secondary["data_sku"]
              )
              .replace(
                "SECONDARY%20FABRIC:WH-003",
                "SECONDARY%20FABRIC:" + material_secondary["data_sku"]
              );

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
                json_product["product_price"] + material["data_price"]
              }, 10, '${
                json_product["product_sku"] +
                " - " +
                material["data_sku"] +
                " - " +
                leg["data_sku"]
              }'),`
            );
          }
        }
      }
    } else {
      if (legs_type.length == 0) {
        for (let k = 0; k < material_type.length; k++) {
          const material = material_type[k];
          let image_url = image
            .replace("BI-132", material["data_sku"])
            .replace("COLOR:2210A", "COLOR:" + material["data_sku"])
            .replace("CW-006", material["data_sku"])
            .replace("8519A", material["data_sku"])
            .replace("AK-618-16", material["data_sku"])
            .replace("SE-170", material["data_sku"])
            .replace("CW-001", material["data_sku"])
            .replace("SE-173", material["data_sku"])
            .replace("ROY-001", material["data_sku"])
            .replace("SE-166", material["data_sku"])
            .replace("CU-155", material["data_sku"]);

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
              json_product["product_price"] + material["data_price"]
            }, 10, '${
              json_product["product_sku"] + " - " + material["data_sku"]
            }'),`
          );
        }
      } else {
        for (let k = 0; k < material_type.length; k++) {
          const material = material_type[k];
          for (let j = 0; j < legs_type.length; j++) {
            const leg = legs_type[j];
            let image_url = image
              .replace("BI-132", material["data_sku"])
              .replace("COLOR:2210A", "COLOR:" + material["data_sku"])
              .replace("LEG001-1", leg["data_sku"])
              .replace("LEG008-3", leg["data_sku"])
              .replace("CW-006", material["data_sku"])
              .replace("LEG018-1", leg["data_sku"])
              .replace("LEG007-1", leg["data_sku"])
              .replace("8519A", material["data_sku"])
              .replace("AK-618-16", material["data_sku"])
              .replace("LEG014-3", leg["data_sku"])
              .replace("SE-170", material["data_sku"])
              .replace("CW-001", material["data_sku"])
              .replace("LEG016-1", leg["data_sku"])
              .replace("SE-173", material["data_sku"])
              .replace("LEG039-2", leg["data_sku"])
              .replace("ROY-001", material["data_sku"])
              .replace("LEG038-2", leg["data_sku"])
              .replace("SE-166", material["data_sku"])
              .replace("CU-155", material["data_sku"])
              .replace("LTHR-02", material["data_sku"])
              .replace("LEG045-2", leg["data_sku"])
              .replace("PW-004", material["data_sku"])
              .replace("LEG054-2", leg["data_sku"])
              .replace("LEG073-2", leg["data_sku"])
              .replace("LEG074-2", leg["data_sku"])
              .replace("LEG078-2", leg["data_sku"])
              .replace("HS-002", material["data_sku"])
              .replace("HRT-025", material["data_sku"]);

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
                json_product["product_price"] + material["data_price"]
              }, 10, '${
                json_product["product_sku"] +
                " - " +
                material["data_sku"] +
                " - " +
                leg["data_sku"]
              }'),`
            );
          }
        }
      }
    }
  }

  query = query.replaceAt(query.lastIndexOf(","), ";\n");

  return query;
}

function queryVariantValue(json, flag, option_list) {
  let query = `INSERT INTO "value"(option_id, variant_id, option_value, option_image)\nVALUES`;
  let list_product = Array.from(json);

  if (flag == true) {
    for (let i = 0; i < list_product.length; i++) {
      const product = list_product.at(i);
      const material_type = Array.from(product["material_type"]);
      const material_type_secondary = Array.from(
        product["material_type_secondary"]
      );
      const legs_type = Array.from(product["legs_type"]);

      for (let k = 0; k < material_type.length; k++) {
        for (let j = 0; j < material_type_secondary.length; j++) {
          for (let h = 0; h < legs_type.length; h++) {
            const material = material_type[k];
            const material_secondary = material_type_secondary[j];
            const leg = legs_type[h];

            query = query.concat(
              `\n\t(${option_list[i][0]}, ${variant_count + 1}, '${
                material["name"]
              }', '${material["data_imagesrc"]}'),`
            );
            query = query.concat(
              `\n\t(${option_list[i][1]}, ${variant_count + 1}, '${
                material_secondary["name"]
              }', '${material_secondary["data_imagesrc"]}'),`
            );
            query = query.concat(
              `\n\t(${option_list[i][2]}, ${variant_count + 1}, '${
                leg["name"]
              }', '${leg["data_imagesrc"]}'),`
            );
            variant_count = variant_count + 1;
          }
        }
      }
    }
    query = query.replaceAt(query.lastIndexOf(","), ";\n");
  } else {
    for (let i = 0; i < list_product.length; i++) {
      const product = list_product.at(i);
      const material_type = Array.from(product["material_type"]).slice(0, 4);
      const legs_type = Array.from(product["legs_type"]).slice(0, 3);

      if (legs_type.length == 0) {
        for (let k = 0; k < material_type.length; k++) {
          const material = material_type[k];

          query = query.concat(
            `\n\t(${option_list[i][0]}, ${variant_count + 1}, '${
              material["name"]
            }', '${material["data_imagesrc"]}'),`
          );
          query = query.concat(
            `\n\t(${option_list[i][1]}, ${variant_count + 1}, null, null),`
          );
          variant_count = variant_count + 1;
        }
      }

      for (let k = 0; k < material_type.length; k++) {
        for (let h = 0; h < legs_type.length; h++) {
          const material = material_type[k];
          const leg = legs_type[h];

          query = query.concat(
            `\n\t(${option_list[i][0]}, ${variant_count + 1}, '${
              material["name"]
            }', '${material["data_imagesrc"]}'),`
          );
          query = query.concat(
            `\n\t(${option_list[i][1]}, ${variant_count + 1}, '${
              leg["name"]
            }', '${leg["data_imagesrc"]}'),`
          );
          variant_count = variant_count + 1;
        }
      }
    }

    query = query.replaceAt(query.lastIndexOf(","), ";\n");
  }

  return query;
}

let product_count = 0;
var variant_count = 0;

(async () => {
  const data = fs.readFileSync("./sectionals/sectionals-final.json", "utf-8");
  let json = JSON.parse(data);

  let query = queryBrand();
  query = query.concat(queryCategory());
  query = query.concat(queryProduct(json, [5, 3, 4, 3], [1, 1, 1, 1]));
  query = query.concat(queryOption([3, 4, 5]));
  query = query.concat(queryProductVariant(json));
  query = query.concat(
    queryVariantValue(json, false, [
      [5, 6],
      [1, 2],
      [3, 4],
      [1, 2],
    ])
  );
  product_count = product_count + Array.from(json).length;

  fs.writeFileSync("query.sql", query, { flag: "a" });
})();

(async () => {
  const data = fs.readFileSync("./sofas/sofas-final.json", "utf-8");
  let json = JSON.parse(data);

  let query = queryProduct(json, [7, 8, 9, 9], [9, 9, 9, 9]);
  query = query.concat(queryOption([7, 8, 9]));
  query = query.concat(queryProductVariant(json));
  query = query.concat(
    queryVariantValue(json, false, [
      [7, 8],
      [9, 10],
      [11, 12],
      [11, 12],
    ])
  );

  product_count = product_count + Array.from(json).length;

  fs.writeFileSync("query.sql", query, { flag: "a" });
})();

(async () => {
  const data = fs.readFileSync("./ottomans/ottomans-final.json", "utf8");
  let json = JSON.parse(data);
  let query = queryProduct(json, [11, 11, 11, 12], [1, 7, 2, 8]);
  query = query.concat(queryOption([11, 12]));
  query = query.concat(queryProductVariant(json));
  query = query.concat(
    queryVariantValue(json, false, [
      [13, 14],
      [13, 14],
      [13, 14],
      [15, 16],
    ])
  );

  product_count = product_count + Array.from(json).length;
  fs.writeFileSync("query.sql", query, { flag: "a" });
})();

(async () => {
  const data = fs.readFileSync("./benches/benches-final.json", "utf8");
  let json = JSON.parse(data);
  let query = queryProduct(json, [14, 14, 14, 14], [3, 4, 5, 6]);
  query = query.concat(queryOption([14]));
  query = query.concat(queryProductVariant(json));
  query = query.concat(
    queryVariantValue(json, false, [
      [17, 18],
      [17, 18],
      [17, 18],
      [17, 18],
    ])
  );

  product_count = product_count + Array.from(json).length;

  fs.writeFileSync("query.sql", query, { flag: "a" });
})();

(async () => {
  const data = fs.readFileSync("./chairs/chairs-final.json", "utf8");
  let json = JSON.parse(data);
  let query = queryProduct(json, [16, 16, 16, 16], [2, 2, 2, 1]);
  query = query.concat(queryOption([16]));
  query = query.concat(queryProductVariant(json));
  query = query.concat(
    queryVariantValue(json, false, [
      [19, 20],
      [19, 20],
      [19, 20],
      [19, 20],
    ])
  );

  product_count = product_count + Array.from(json).length;

  fs.writeFileSync("query.sql", query, { flag: "a" });
})();

(async () => {
  const data = fs.readFileSync(
    "./dining-seating/dining-seating-final.json",
    "utf8"
  );
  let json = JSON.parse(data);

  let query = queryProduct(
    json,
    [19, 19, 20, 19, 19, 20],
    [10, 10, 10, 10, 10, 10]
  );
  query = query.concat(queryOption([19, 20], true));
  query = query.concat(queryProductVariant(json, true));
  query = query.concat(
    queryVariantValue(json, true, [
      [21, 22, 23],
      [21, 22, 23],
      [24, 25, 26],
      [21, 22, 23],
      [21, 22, 23],
      [24, 25, 26],
    ])
  );

  product_count = product_count + Array.from(json).length;

  fs.writeFileSync("query.sql", query, { flag: "a" });
})();

(async () => {
  const data = fs.readFileSync(
    "./office-chairs/office-chairs-final.json",
    "utf8"
  );
  let json = JSON.parse(data);

  let query = queryProduct(
    json,
    [28, 28, 28, 28, 28, 28],
    [11, 12, 10, 10, 10, 13]
  );
  query = query.concat(queryOption([28]));
  query = query.concat(queryProductVariant(json));
  query = query.concat(
    queryVariantValue(json, false, [
      [27, 28],
      [27, 28],
      [27, 28],
      [27, 28],
      [27, 28],
      [27, 28],
    ])
  );

  product_count = product_count + Array.from(json).length;

  fs.writeFileSync("query.sql", query, { flag: "a" });
})();
