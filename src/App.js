import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalComp from "./components/ModalComp";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    fetch("http://localhost:8080/tarefas")
      .then((retorno) => retorno.json())
      .then((retornoConvertidoEmJson) => setData(retornoConvertidoEmJson));

    //setData(db_costumer);
  }, [setData]);

  const handleRemove = (id) => {
    //const newArray = data.filter((item) => item.email !== email);

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "aplication/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        "Acess-Control-Allow-Methods": [
          "GET",
          "OPTIONS",
          "POST",
          "PUT",
          "PATCH",
          "DELETE",
        ],
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
    };

    try {
      fetch("http://localhost:8080/tarefas/" + id, options)
        .then((retorno) => retorno.status)
        .then((retornoS) => {
          if (retornoS !== 200) {
            alert("Falha ao Excluir!!");
          } else {
            alert("Cadastro removido com Sucesso!!");
            fetch("http://localhost:8080/tarefas")
              .then((retorno) => retorno.json())
              .then((retornoConvertidoEmJson) =>
                setData(retornoConvertidoEmJson)
              );
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="poppins"
    >
      <Box maxW={800} w="100%" h="100vh" py={10} px={2}>
        <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
          NOVO CADASTRO
        </Button>

        <Box overflowY="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  ID
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Titulo
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Descricao
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Prazo
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Prioridade
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(
                ({ id, titulo, descricao, prazo, prioridade }, index) => (
                  <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                    <Td maxW={isMobile ? 5 : 100}>{id}</Td>
                    <Td maxW={isMobile ? 5 : 100}>{titulo}</Td>
                    <Td maxW={isMobile ? 5 : 100}>{descricao}</Td>
                    <Td maxW={isMobile ? 5 : 100}>{prazo}</Td>
                    <Td maxW={isMobile ? 5 : 100}>{prioridade}</Td>
                    <Td p={0}>
                      <EditIcon
                        fontSize={20}
                        onClick={() => [
                          setDataEdit({
                            id,
                            titulo,
                            descricao,
                            prazo,
                            prioridade,
                          }),
                          onOpen(),
                        ]}
                      />
                    </Td>
                    <Td p={0}>
                      <DeleteIcon
                        fontSize={20}
                        onClick={() => handleRemove(id)}
                      />
                    </Td>
                  </Tr>
                )
              )}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <ModalComp
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}
    </Flex>
  );
};

export default App;
