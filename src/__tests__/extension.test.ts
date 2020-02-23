import { get, parseProduct } from 'utils/extension';

describe('Extension functions', () => {
  test('should able to get a field from a nested object', () => {
    const item = { a: { b: [{ c: 'VALUE' }] } };
    const result = get(item, 'a.b.0.c', null);
    expect(result).toEqual('VALUE');
  });

  test('should able to return a default value', () => {
    const result = get(undefined, 'a.b.0.c', 'DEFAULT');
    expect(result).toEqual('DEFAULT');
  });

  test('should able to parse json to product type', () => {
    const item = {
      isPublished: 'true',
      productName: 'Apple iPhone X',
      productImage: 'imagePath',
      price: '299'
    };
    const product = parseProduct(item);
    expect(product.isPublished).toEqual(true);
    expect(product.productName).toEqual(item.productName);
    expect(product.productImage).toEqual(item.productImage);
    expect(product.price).toEqual(299);
  });
});
