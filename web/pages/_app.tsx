import { ChakraProvider, Container, Flex, Image, Text } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Poppins, Shadows_Into_Light } from "@next/font/google";
import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import Link from "next/link";

const font = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const titleFont = Shadows_Into_Light({
  weight: ["400"],
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
        <Box
          backgroundImage="url('/background.png')"
          backgroundRepeat="repeat-y"
          minHeight="100vh"
        >
          {/* NAVBAR  */}
          <Box bg="teal.500" w="100vw">
            <Flex justifyContent="space-between" alignItems="center" h="60px">
              <Box
                top="15px"
                left="20px"
                position="fixed"
                transition="all 150ms"
                opacity={0.85}
                cursor="pointer"
                _hover={{
                  transform: "scale(1.1) rotate(20deg)",
                  opacity: 1,
                }}
              >
                <Link href="/">
                  <Image src="/favicon.ico" alt="Logo" maxH="60px" />
                </Link>
              </Box>

              <Container maxW="container.md" mx="auto">
                <Flex justifyContent="center" alignItems="center">
                  <Text
                    className={titleFont.className}
                    color="white"
                    fontSize="35px"
                  >
                    Cats are liquid!
                  </Text>
                </Flex>
              </Container>
            </Flex>
          </Box>

          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </div>
  );
}
