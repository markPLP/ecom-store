import { Form, redirect } from 'react-router-dom';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { customFetch, formatPrice } from '../utils';
import { toast } from 'react-toastify';
import { clearItem } from '../feature/cart/cartSlice';

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);
    // user to get the auth token
    const user = store.getState().userState.user;
    const { cartItems, numItemsInCart, orderTotal } =
      store.getState().cartState;
    // create object from destructured data above to match the API
    // IMPORTANT: data type needs to match on the server
    const info = {
      address,
      cartItems,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal), // need format or u'll get an error
      name,
      numItemsInCart,
    };
    try {
      const response = await customFetch.post(
        '/orders',
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      queryClient.removeQueries(['orders']); // REACT QUERY clear ALL orders query after successful order placed
      store.dispatch(clearItem());
      toast.success('Successfully place an order');
      return redirect('/orders');
    } catch (error) {
      // console.log(error, 'error');
      const errorMessage =
        error?.response?.data?.error?.message ||
        'Please check your credentials';
      toast.error(errorMessage);
      // 401 error or unauthorized login
      if (error.response.status === 401) return redirect('/login');
      return null;
    }
  };
const CheckoutForm = () => {
  return (
    <>
      <Form method="post" className="flex flex-col gap-y-4">
        <h4 className="font-medium text-xl capitalize">shipping information</h4>
        <FormInput label="First Name" type="text" name="name" />
        <FormInput label="address" type="text" name="address" />
        <div className="mt-4">
          <SubmitBtn
            type="submit"
            text="place your order"
            extendClass="uppercase"
          />
          {/* <button
            type="submit"
            className="btn btn-primary btn-block uppercase"
          ></button> */}
        </div>
      </Form>
    </>
  );
};

export default CheckoutForm;
