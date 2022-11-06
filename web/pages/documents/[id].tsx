import { useRouter } from "next/router";
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
import { api } from "../../config/api";
import { FiSave, FiEdit } from "react-icons/fi";
import { GetStaticPaths, GetStaticProps } from "next";
import { IDocumentModel } from "../../models/document";
import { useState } from "react";

interface IDocumentPageProps {
  document: IDocumentModel;
}

enum EQuestionStatus {
  editing = "editing",
  saved = "saved",
}

interface IQuestion {
  id: number;
  text: string;
  status: EQuestionStatus;
}

export default function DocumentPage({ document }: IDocumentPageProps) {
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const questionsBeingEdited = questions.filter(
    (question) => question.status === EQuestionStatus.editing
  );

  const savedQuestions = questions.filter(
    (question) => question.status === EQuestionStatus.saved
  );

  async function onGenerateQuestions() {
    const response = await api.get(`/documents/${document.id}/questions`);
    setQuestions(
      response.data.map((text: string, i: number) => ({
        id: i,
        text,
        status: EQuestionStatus.editing,
      }))
    );
  }

  async function onSaveQuestion(id: number) {
    setQuestions(
      questions.map((question) =>
        question.id === id
          ? { ...question, status: EQuestionStatus.saved }
          : question
      )
    );
  }

  return (
    <>
      <Head>
        <title>{document.title} | Cats are liquid!</title>
      </Head>

      <Container p={4} maxW="container.md">
        <Text fontSize="2xl" mb={4}>
          {document.title}
        </Text>

        <Box
          mb={8}
          bg="gray.100"
          px={6}
          py={4}
          borderRadius="md"
          maxH="lg"
          overflowY="auto"
        >
          <Text>{document.content}</Text>
        </Box>



        <Box px={2}>
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Text fontSize="2xl">Perguntas geradas</Text>
            <Button colorScheme="teal" size="sm" onClick={onGenerateQuestions}>
              Gerar
            </Button>
          </Flex>

          {questions.length == 0 ? (
            <Text color="gray.500" fontSize="lg" textAlign="center">
              Nenhuma questão encontrada
            </Text>
          ) : (
            questionsBeingEdited.map((question) => (
              <Box
                key={question.id}
                bg="gray.100"
                px={4}
                py={2}
                mb={2}
                borderRadius="md"
              >
                <Flex>
                  <Input
                    defaultValue={question.text}
                    size="sm"
                    variant="flushed"
                    borderColor="transparent"
                    focusBorderColor="teal.500"
                  />

                  <IconButton
                    ml={4}
                    size="sm"
                    colorScheme="teal"
                    variant="ghost"
                    aria-label="Editar pergunta"
                    icon={<FiSave />}
                    onClick={() => onSaveQuestion(question.id)}
                  />
                </Flex>
              </Box>
            ))
          )}
        </Box>
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await api.get("/documents");
  const documents = response.data as Record<string, unknown>[];

  return {
    paths: documents.map((document) => ({
      params: { id: String(document.id) },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const response = await api.get(`/documents/${id}`);

  const document: IDocumentModel = {
    id: response.data.id,
    title: response.data.title,
    content: response.data.content,
  };

  console.log(document);

  return {
    props: { document },
    revalidate: 10,
  };
};
