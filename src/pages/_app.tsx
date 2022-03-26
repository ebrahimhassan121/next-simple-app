import { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import theme from '@/utiles/theme';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
