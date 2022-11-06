import {
  Input,
  Button,
  Container,
  Text,
  Box,
  Flex,
  IconButton,
  keyframes,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import Head from "next/head";
import { api } from "../../config/api";
import { FiSave, FiLoader, FiAlertTriangle } from "react-icons/fi";
import { GetStaticPaths, GetStaticProps } from "next";
import { IDocumentModel } from "../../models/document";
import { useState } from "react";

interface IDocumentPageProps {
  document: IDocumentModel;
}

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export default function DocumentPage({ document }: IDocumentPageProps) {
  const [generated, setGenerated] = useState<{ id: number; text: string }[]>(
    []
  );

  const [saving, setSaving] = useState<Number[]>([]);
  const [failed, setFailed] = useState<Number[]>([]);
  const [saved, setSaved] = useState<String[]>(
    document.questions?.map((q) => q.text).reverse() || []
  );

  async function onGenerateQuestions() {
    const response = await api.get(`/documents/${document.id}/questions`);
    setGenerated(
      response.data.map((text: string) => {
        return {
          id: Math.random(),
          text,
        };
      })
    );
  }

  async function onSaveQuestion(id: Number) {
    setSaving([...saving, id]);

    try {
      const text = generated.find((q) => q.id === id)!.text;

      await api.post(`/documents/${document.id}/questions`, {
        text: text,
      });

      setGenerated(generated.filter((question) => question.id !== id));
      setSaved([text, ...saved]);
    } catch (error) {
      setFailed([...failed, id]);
    } finally {
      setSaving(saving.filter((questionId) => questionId !== id));
    }
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

          {generated.length == 0 ? (
            <Text color="gray.500" fontSize="lg" textAlign="center">
              Nenhuma questão encontrada
            </Text>
          ) : (
            generated.map((question, index) => {
              const isSaving = saving.includes(index);
              const hasError = failed.includes(index);

              return (
                <Box
                  key={index}
                  bg="gray.100"
                  px={4}
                  py={2}
                  mb={2}
                  borderRadius="md"
                >
                  <Flex>
                    <Input
                      value={question.text}
                      onChange={(event) => {
                        setGenerated(
                          generated.map((q) => {
                            if (q.id === question.id) {
                              return {
                                ...q,
                                text: event.target.value,
                              };
                            }

                            return q;
                          })
                        );
                      }}
                      defaultValue={question.text}
                      size="sm"
                      variant="flushed"
                      borderColor="transparent"
                      focusBorderColor="teal.500"
                    />

                    {!hasError ? (
                      <IconButton
                        ml={4}
                        size="sm"
                        colorScheme="teal"
                        variant="ghost"
                        aria-label="Editar pergunta"
                        icon={
                          isSaving ? (
                            <Box
                              as={FiLoader}
                              animation={`${spin} infinite 20s linear`}
                            />
                          ) : (
                            <FiSave />
                          )
                        }
                        onClick={
                          !isSaving
                            ? () => onSaveQuestion(question.id)
                            : undefined
                        }
                      />
                    ) : (
                      <Popover
                        onClose={() =>
                          setFailed(
                            failed.filter((questionId) => questionId !== index)
                          )
                        }
                      >
                        <PopoverTrigger>
                          <IconButton
                            ml={4}
                            size="sm"
                            colorScheme="red"
                            variant="ghost"
                            aria-label="Erro ao salvar pergunta"
                            icon={<FiAlertTriangle />}
                          />
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverHeader>Erro ao salvar pergunta</PopoverHeader>

                          <PopoverBody>
                            <Text fontSize="sm">
                              Ocorreu um erro ao salvar a pergunta. Tente
                              novamente mais tarde.
                            </Text>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                    )}
                  </Flex>
                </Box>
              );
            })
          )}

          <Text fontSize="2xl" mt={8} mb={4}>
            Perguntas salvas
          </Text>

          {saved.length == 0 ? (
            <Text color="gray.500" fontSize="lg" textAlign="center">
              Nenhuma questão encontrada
            </Text>
          ) : (
            saved.map((question, index) => {
              return (
                <Box
                  key={index}
                  bg="gray.100"
                  px={4}
                  py={2}
                  mb={2}
                  borderRadius="md"
                >
                  <Text>{question}</Text>
                </Box>
              );
            })
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
    questions: response.data.questions,
  };

  return {
    props: { document },
    revalidate: 10,
  };
};
