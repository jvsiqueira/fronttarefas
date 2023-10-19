import { useEffect, useState } from "react";
import "./App.css";
import CadastrarTask from "./CadastrarTask";
import ListarTask from "./ListarTask";
function App() {
  const [tarefas, setTarefas] = useState([]);

  const tarefa = {
    id: 0,
    titulo: "",
    descricao: "",
    prazo: "",
    priorodade: 0,
  };

  const [objTarefa, setObjTarefa] = useState(tarefa);

  useEffect(() => {
    fetch("http://localhost:8080/tarefas")
      .then((retorno) => retorno.json())
      .then((retornoConvertidoEmJson) => setTarefas(retornoConvertidoEmJson));
  }, []);

  const preencherDados = (e) => {
    setObjTarefa({ ...objTarefa, [e.target.name]: e.target.value });
    console.log(tarefa);
  };

  return (
    <div className="App">
      <p>{JSON.stringify(tarefa)}</p>
      <CadastrarTask inserirDados={preencherDados}></CadastrarTask>
      <ListarTask lista={tarefas}></ListarTask>
    </div>
  );
}

export default App;
