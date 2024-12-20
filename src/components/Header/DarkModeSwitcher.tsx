'use client';
import useColorMode from '@/hooks/useColorMode';
import Icon from '../Common/Icon';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

import { setTheme } from '@/app/actions';

import { useFormState } from 'react-dom';
import { useEffect } from 'react';

const initialState = {
  theme: 'light',
};

const DarkModeSwitcher = () => {
  const [theme, setThemeAction] = useColorMode();

  const [state, formAction] = useFormState(setTheme, initialState);

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  // const cookieStore = await cookies();
  // const theme = cookieStore.get('theme');

  // if (!theme) {
  //   setTheme();
  // }

  // console.log('THEME');
  // console.log(theme);

  return (
    <label
      className={`relative m-0 block h-7.5 w-14 rounded-full ${
        theme === 'dark' ? 'bg-primary' : 'bg-stroke'
      }`}
    >
      <input
        type='checkbox'
        onChange={() => {
          if (typeof setThemeAction === 'function') {
            setThemeAction();
          }
        }}
        className='dur absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0'
      />
      <span
        className={`absolute left-[3px] top-1/2 flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher duration-75 ease-linear ${
          theme === 'dark' && '!right-[3px] !translate-x-full'
        }`}
      >
        <span className='dark:hidden'>
          <Icon icon={faSun} />
        </span>
        <span className='hidden dark:inline-block'>
          <Icon icon={faMoon} />
        </span>
      </span>
    </label>
  );
};

export default DarkModeSwitcher;
