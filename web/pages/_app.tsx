import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Poppins } from "@next/font/google";
import { Box } from "@chakra-ui/react"
const font = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={font.className}>

      <ChakraProvider>

        <Box
        backgroundImage="/backgroud.png"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        >
              <Component {...pageProps} />

        </Box>

      </ChakraProvider>


    </div>
  );
}
