import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

//setup the themes from daisyui
const themes = {
  winter: 'winter',
  dracula: 'dracula',
};

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('user')) || null;
};

const getThemeFromLocalStorge = () => {
  const theme = localStorage.getItem('theme') || themes.winter;
  document.documentElement.setAttribute('data-theme', theme);
  return theme;
};

const initialState = {
  user: getUserFromLocalStorage(),
  theme: getThemeFromLocalStorge(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      // make a payload on a single object, user object and jwt object
      const user = { ...action.payload.user, token: action.payload.jwt };
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    logoutUser: (state, action) => {
      state.user = null;
      localStorage.removeItem('user');
      toast.success('Successful logout');
    },
    toogleTheme: (state) => {
      const { winter, dracula } = themes;
      //toogle takes place here
      state.theme = state.theme === dracula ? winter : dracula;
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('theme', state.theme);
    },
  },
});

export const { loginUser, logoutUser, toogleTheme } = userSlice.actions;

export default userSlice.reducer;
