import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import { useFormState } from 'react-dom';
import { setTheme } from '@/app/actions';

// const useColorMode = () => {
//   const [colorMode, setColorMode] = useLocalStorage('color-theme', 'light');

//   useEffect(() => {
//     const dark = 'dark';
//     const bodyClass = window.document.body.classList;

//     colorMode === dark ? bodyClass.add(dark) : bodyClass.remove(dark);
//   }, [colorMode, setColorMode]);

//   return [colorMode, setColorMode];
// };

const initialState = {
  theme: 'light',
};

const useColorMode = () => {
  const [state, setThemeAction] = useFormState(setTheme, initialState);
  const theme = state.theme;

  useEffect(() => {
    const bodyClass = window.document.body.classList;
    theme === 'dark' ? bodyClass.add('dark') : bodyClass.remove('dark');
  }, [theme, setThemeAction]);

  return [theme, setThemeAction];
};

export default useColorMode;
