import Head from "next/head";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormHelperText,
  Button,
  Container,
} from "@chakra-ui/react";

export default function NewDocumentPage() {
  return (
    <>
      <Head>
        <title>Documentos | Cats are liquid!</title>
      </Head>

      <Container p={4} maxW="container.md">
        <form>
          <FormControl id="title" mb={4} isRequired>
            <FormLabel>Título</FormLabel>
            <Input type="text" />
            <FormHelperText>Escreva o título do documento</FormHelperText>
          </FormControl>
          <FormControl id="content" mb={4} isRequired>
            <FormLabel>Conteúdo</FormLabel>
            <Textarea />
            <FormHelperText>Escreva o conteúdo do documento</FormHelperText>
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">
            Salvar
          </Button>
        </form>
      </Container>
    </>
  );
}
