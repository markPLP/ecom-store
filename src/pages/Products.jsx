import { customFetch } from '../utils';
import { Filters, PaginationContainer, ProductsContainer } from '../components';
const url = '/products';

const allProductsQuery = (queryParams) => {
  const { search, category, company, sort, price, shipping, page } =
    queryParams;
  return {
    // ##### nullish coalescing operator ??
    //?? === This operator is known as the nullish coalescing operator in JavaScript. It is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.
    // In simpler terms, the ?? operator is used to provide a default value for potentially null or undefined variables.

    queryKey: [
      'products',
      search ?? '',
      category ?? 'all',
      company ?? 'all',
      sort ?? 'a-z',
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () => {
      return customFetch.get(url, { params: queryParams });
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    // 1. new URL(request.url).searchParams: This extracts the query parameters from the URL.
    // 2. .entries(): This returns an iterator of all the search parameter key-value pairs.
    // 3. [...searchParams.entries()]: Converts the iterator into an array of arrays, where each inner array is a key-value pair.
    // 4. Object.fromEntries(...): Converts this array of key-value pairs into an object,
    //where the keys are the parameter names, and the values are the parameter values.

    // params here is used for pagination
    // new URL is a full URL (e.g., "http://example.com?search=jayu&type=tv").
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    /// MANUAL APPROACH for referrence
    // const urlReq = new URL(request.url);
    // const searchParams = urlReq.searchParams; // ex. search=searchTerm, category=Tables, price=10000 etc

    // const search = searchParams.get('search');
    // const category = searchParams.get('category');
    // const company = searchParams.get('company');
    // const order = searchParams.get('order');
    // const price = searchParams.get('price');
    // const shipping = searchParams.get('shipping');

    // const params = {
    //   search,
    //   category,
    //   company,
    //   order,
    //   price,
    //   shipping,
    // };

    const response = await queryClient.ensureQueryData(
      allProductsQuery(params)
    );
    // OLD CODE WITHOUT REACT QUERY FOR CACHING
    // const response = await customFetch.get(url, { params });

    const products = response.data.data;
    const meta = response.data.meta;

    return { products, meta, params };
  };

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};

export default Products;
