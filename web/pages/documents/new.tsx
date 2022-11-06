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
import { api } from "../../config/api";
import { useRouter } from "next/router";

export default function NewDocumentPage() {
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    console.log(data);

    const response = await api.post("/documents", data);

    if (response.status === 201) {
      console.log(response.data);
      const document = response.data;
      router.push(`/documents/${document.id}`);
    }
  }

  return (
    <>
      <Head>
        <title>Novo texto | Cats are liquid!</title>
      </Head>

      <Container p={4} maxW="container.md">
        <form onSubmit={onSubmit}>
          <FormControl mb={4} isRequired>
            <FormLabel>Título</FormLabel>
            <Input type="text" name="title" />
            <FormHelperText>Escreva o título</FormHelperText>
          </FormControl>
          <FormControl mb={4} isRequired>
            <FormLabel>Conteúdo</FormLabel>
            <Textarea name="content" />
            <FormHelperText>Escreva o conteúdo</FormHelperText>
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">
            Salvar
          </Button>
        </form>
      </Container>
    </>
  );
}
