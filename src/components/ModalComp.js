import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";

const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
  const [id] = useState(dataEdit.id || 0);
  const [titulo, setTitulo] = useState(dataEdit.titulo || "");
  const [descricao, setDesc] = useState(dataEdit.descricao || "");
  const [prazo, setPrazo] = useState(dataEdit.prazo || "");
  const [prioridade, setPriori] = useState(dataEdit.prioridade || "");

  const handleSave = () => {
    if (!titulo || !descricao || !prazo || !prioridade) return;

    if (Object.keys(dataEdit).length) {
      let dados = JSON.stringify({
        id: id,
        titulo: titulo,
        descricao: descricao,
        prazo: prazo,
        prioridade: prioridade,
      });
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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
        body: dados,
      };
      try {
        fetch("http://localhost:8080/tarefas", options)
          .then((retorno) => retorno.json())
          .then((retornoJson) => {
            if (retornoJson.mensagem !== undefined) {
              alert(retornoJson.mensagem);
            } else {
              fetch("http://localhost:8080/tarefas")
                .then((retorno) => retorno.json())
                .then((retornoConvertidoEmJson) =>
                  setData(retornoConvertidoEmJson)
                );
              alert("Cadastro Atualizado");
            }
          });
      } catch (error) {
        console.log(error);
      }
      // data[dataEdit.index] = { id, titulo, descricao, prazo, prioridade };
    } else {
      let dados = JSON.stringify({
        titulo: titulo,
        descricao: descricao,
        prazo: prazo,
        prioridade: prioridade,
      });
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        body: dados,
      };
      try {
        fetch("http://localhost:8080/tarefas", options)
          .then((retorno) => retorno.json())
          .then((retornoJson) => {
            if (retornoJson.mensagem !== undefined) {
              alert(retornoJson.mensagem);
            } else {
              fetch("http://localhost:8080/tarefas")
                .then((retorno) => retorno.json())
                .then((retornoConvertidoEmJson) =>
                  setData(retornoConvertidoEmJson)
                );
              alert("Cadastro Realizado");
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cadastro de Tarefas</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl display="flex" flexDir="column" gap={4}>
            <Box>
              <FormLabel>Titulo</FormLabel>
              <Input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              ></Input>
            </Box>
            <Box>
              <FormLabel>Descricao</FormLabel>
              <Input
                type="text"
                value={descricao}
                onChange={(e) => setDesc(e.target.value)}
              ></Input>
            </Box>
            <Box>
              <FormLabel>Prazo</FormLabel>
              <Input
                type="text"
                value={prazo}
                onChange={(e) => setPrazo(e.target.value)}
              ></Input>
            </Box>
            <Box>
              <FormLabel>Prioridade</FormLabel>
              <Input
                type="number"
                value={prioridade}
                onChange={(e) => setPriori(e.target.value)}
              ></Input>
            </Box>
          </FormControl>
        </ModalBody>
        <ModalFooter justifyContent="start">
          <Button colorScheme="green" mr={3} onClick={handleSave}>
            Salvar
          </Button>
          <Button colorScheme="red" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalComp;
