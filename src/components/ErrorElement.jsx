import { useRouteError } from 'react-router-dom';

const ErrorElement = () => {
  const error = useRouteError();
  console.log(error);
  if (error.status === 400) {
    return <h4 className='font-bold text-4xl'>404 error</h4>;
  }

  return <h4 className='font-bold text-4xl'>there was an error...</h4>;
};

export default ErrorElement;
