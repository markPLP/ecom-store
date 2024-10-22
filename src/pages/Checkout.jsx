import { useSelector } from 'react-redux';
import SectionTitle from '../components/SectionTitle';
import { CartTotals } from '../components';
import CheckoutForm from '../components/CheckoutForm';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

export const loader = (store) => () => {
  const user = store.getState().userState.user;
  if (!user) {
    toast.warning('You must be logged in login to checkout');
    return redirect('/login');
  }
  return null;
};

const Checkout = () => {
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  if (numItemsInCart === 0) {
    return <SectionTitle title="your cart is empty..." />;
  }

  return (
    <>
      <SectionTitle title="Place you oder" />
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        <CheckoutForm />
        <div className="card bg-base-200">
          <CartTotals />
        </div>
      </div>
    </>
  );
};

export default Checkout;
