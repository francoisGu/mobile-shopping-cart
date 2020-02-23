import { Product } from 'types';

/**
 * Util function to get a nested value in the object
 * @param item object with nested structure
 * @param path field path
 * @param defaultValue default value
 */
export function get(item: any, path: string, defaultValue: any): any {
  if (!item) {
    return defaultValue;
  }

  const fields = path.split('.');
  const key = fields[0];
  if (fields.length === 1) {
    return item[key] || defaultValue;
  } else {
    return get(item[key], fields.slice(1).join('.'), defaultValue);
  }
}

/**
 * Parse a json data to product type object
 * @param item json product data
 */
export function parseProduct(item: {
  isPublished: string;
  productName: string;
  productImage: string;
  price: string;
}): Product {
  return {
    isPublished: item.isPublished === 'true',
    productName: item.productName,
    productImage: item.productImage,
    price: +item.price || 0
  };
}
