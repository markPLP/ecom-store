import { Form, Link, redirect, useNavigate } from 'react-router-dom';
import { FormInput, SubmitBtn } from '../components';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
// import { store } from '../store';
import { loginUser } from '../feature/user/userSlice';
import { useDispatch } from 'react-redux';

export const action =
  (store) =>
  async ({ request }) => {
    // formData is a method provide by 'request'
    const formData = await request.formData();
    const loginCredentials = Object.fromEntries(formData);
    try {
      const response = await customFetch.post('/auth/local', loginCredentials);
      console.log(response);

      // response.data / data here is from server not from formData
      store.dispatch(loginUser(response.data));
      toast.success('Successfully login');
      return redirect('/');
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        'Please check your credentials';
      toast.error(errorMessage);
      console.log(error, 'login');

      return null;
    }
  };
/////////////// ALTERNATIVE APPROACH
// export const action = async ({ request }) => {
//   const formData = await request.formData();
//   // const identifier = formData.get('identifier');
//   // const password = formData.get('password');
//   const data = Object.fromEntries(formData);
//   console.log(data, 'ob');
//   try {
//     const response = await customFetch.post('/auth/local', data);
//     // console.log(response);

//     store.dispatch(loginUser(response.data));
//     console.log(data);

//     //  console.log(response);
//     toast.success('huray');
//     return redirect('/');
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async () => {
    try {
      const response = await customFetch.post('auth/local', {
        identifier: 'test@test.com',
        password: 'secret',
      });

      dispatch(loginUser(response.data));
      toast.success('Successfully login');
      return navigate('/');
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        'Please check your credentials';
      toast.error(errorMessage);
      return null;
    }
  };

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput type="email" label="email" name="identifier" required />
        <FormInput type="password" label="password" name="password" required />
        <div className="mt-4">
          <SubmitBtn text="submit" />
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={loginAsGuestUser}
        >
          guest user
        </button>
        <p className="text-center">
          Not a member yet?{' '}
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
