import { Product } from '../types/index';
import { parseProduct } from 'utils/extension';
import mockProducts from './mock-products.json';

/**
 * This is a mock api call to get data from @see mock-products.json
 */
export default (): Promise<Product[]> => {
  return Promise.resolve(mockProducts.map(p => parseProduct(p)));
};