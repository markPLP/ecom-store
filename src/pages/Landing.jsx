import { Hero } from '../components';
import { customFetch } from '../utils';
import FeaturedProducts from '../components/FeaturedProducts';
import { useLoaderData } from 'react-router-dom';
const url = 'products?featured=true';

// no need to wrap in useQuery({})
// queryClient is passed from loaders in App.jsx
const featuredProductsQuery = {
  queryKey: ['featuredProducts'],
  queryFn: () => {
    return customFetch.get(url);
  },
};

export const loader = (queryClient) => async () => {
  // ##### ensureQueryData
  // check if data is in the cache and no need to refetch
  // if data is not there then refetch
  const response = await queryClient.ensureQueryData(featuredProductsQuery);
  const products = response.data.data;
  return { products };
};

// OLD CODE WITHOUT REACT QUERY FOR CACHING
// export const loader = (queryClient) => async () => {
//   const response = await customFetch.get(url);
//   const products = response.data.data;
//   return { products };
// };

const Landing = () => {
  const { products } = useLoaderData();
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};

export default Landing;
