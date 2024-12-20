'use server';

import { cookies } from 'next/headers';

export async function setTheme() {
  const cookieStore = cookies();

  const currentTheme = cookieStore.has('theme')
    ? cookieStore.get('theme')?.value
    : 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  await cookieStore.set({
    name: 'theme',
    path: '/',
    value: newTheme,
  });

  return {
    theme: newTheme,
  };
}
