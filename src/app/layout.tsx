'use client';
import 'jsvectormap/dist/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import '@/css/satoshi.css';
import '@/css/style.css';
import AuthProvider from '@/components/Common/AuthProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loading = false;

  return (
    <AuthProvider>
      <html lang='en'>
        <body suppressHydrationWarning={true}>
          <div className='dark:bg-boxdark-2 dark:text-bodydark'>
            {loading ? <div>Loading...</div> : children}
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
