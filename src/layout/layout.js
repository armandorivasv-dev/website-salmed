import Footer from '@/layout/footer';
import TopNav from '@/layout/top-nav';
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getCustomTheme from '@/styles/get-custom-theme';
import CssBaseline from '@mui/material/CssBaseline';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function Layout({ children }) {
  const customTheme = createTheme(getCustomTheme('light'));

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <TopNav mode={'light'} />
        <main>{children}</main>
        <SpeedInsights />
        <Footer />
      </ThemeProvider>
    </>
  );
}
