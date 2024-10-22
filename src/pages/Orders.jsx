import { toast } from 'react-toastify';
import {
  ComplexPaginationContainer,
  OrderList,
  SectionTitle,
} from '../components';
import { customFetch } from '../utils';
import { redirect, useLoaderData } from 'react-router-dom';

const ordersQuery = (params, user) => {
  return {
    // parseInt because query params is a string (e.g. '?page=21' )
    queryKey: [
      'orders',
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () => {
      return customFetch.get('/orders', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    },
  };
};

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    if (!user) {
      toast.warn('You must logged in to view orders');
      return redirect('/login');
    }

    // params for navigation
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    console.log(params, 'params');

    try {
      const response = await queryClient.ensureQueryData(
        ordersQuery(params, user)
      );

      const orders = response.data.data;
      const meta = response.data.meta;

      return { orders, meta, params };
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        'there was an error placing your order';
      toast.error(errorMessage);
      if (error?.response?.status === 401) return redirect('/login');
      return null;
    }
  };

const Orders = () => {
  const { meta } = useLoaderData();

  if (meta.pagination.total < 1) {
    return <SectionTitle title="please make an order" />;
  }
  return (
    <>
      <SectionTitle title="Your orders" />
      <OrderList />
      <ComplexPaginationContainer />
    </>
  );
};

export default Orders;
