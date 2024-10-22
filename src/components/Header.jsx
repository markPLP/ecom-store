import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../feature/user/userSlice';
import { clearItem } from '../feature/cart/cartSlice';
import { useQueryClient } from '@tanstack/react-query';
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);
  const queryClient = useQueryClient();

  const handleLogout = () => {
    navigate('/');
    dispatch(logoutUser());
    dispatch(clearItem());
    queryClient.removeQueries(); // Remove all queries after logout - REACT-QUERY
  };

  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center sm:justify-end">
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-xs sm:text-sm">Hello, {user.username}</p>
            <button
              className="btn btn-xs btn-outline btn-primary"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link to="/login" className="link link:hover text-xs sm:text-sm">
              Sign in / Guest
            </Link>
            <Link to="/register" className="link link:hover text-xs sm:text-sm">
              Create an account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
