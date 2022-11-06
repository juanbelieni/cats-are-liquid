// import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Roboto } from "@next/font/google";
import { Box } from "@chakra-ui/react"

const font = Roboto({
  weight: ["400", "500", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={font.className}>

      <ChakraProvider>
        <Component {...pageProps} />
        <Box
              backgroundImage="/backgroud.png"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
        />

      </ChakraProvider>


    </div>
  );
}
