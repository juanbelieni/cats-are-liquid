import {
  Input,
  Button,
  Container,
  Text,
  Box,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import Head from "next/head";
import { api } from "../config/api";
import { GetStaticProps } from "next";
import { IDocumentModel } from "../models/document";
import Link from "next/link";

interface IDocumentPageProps {
  documents: Array<IDocumentModel>;
}

export default function DocumentPage({ documents }: IDocumentPageProps) {
  return (
    <>
      <Head>
        <title>Textos | Cats are liquid!</title>
      </Head>

      <Container p={4} maxW="container.md">
        <Flex mb={4} justifyContent="space-between" alignItems="center">
          <Text fontSize="2xl">Textos</Text>
          <Link href="/documents/new">
            <Button colorScheme="teal">
              Novo texto
            </Button>
          </Link>
        </Flex>

        <Flex direction="column" mb={4} alignItems="stretch">
          {documents.map((document) => (
            <Link href={`/documents/${document.id}`} key={document.id}>
              <Box
                bg="gray.100"
                mb={2}
                px={6}
                py={4}
                borderRadius="md"
                w="full"
                _hover={{ bg: "gray.200" }}
                transition="background-color 100ms"
              >
                <Flex direction="column" alignItems="start" w="full">
                  <Text>{document.title}</Text>

                  <Text noOfLines={2} fontSize="sm" color="gray.500">
                    {document.content}
                  </Text>
                </Flex>
              </Box>
            </Link>
          ))}
        </Flex>
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await api.get("/documents");
  const documents = response.data as Record<string, unknown>[];

  return {
    props: {
      documents: documents.map((document) => ({
        id: document.id,
        title: document.title,
        content: document.content,
      })),
    },
    revalidate: 1,
  };
};
