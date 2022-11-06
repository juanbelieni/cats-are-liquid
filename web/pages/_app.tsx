import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Poppins } from "@next/font/google";
import { useEffect } from "react";

const font = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.style.setProperty("color-scheme", "light");
  });

  return (
    <div className={font.className}>
      <ChakraProvider resetCSS>
        <Component {...pageProps} />
      </ChakraProvider>
    </div>
  );
}
