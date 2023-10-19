function CadastrarTask({ inserirDados }) {
  return (
    <form>
      <input
        type="text"
        name="titulo"
        placeholder="Titulo"
        className="form-control"
        onChange={inserirDados}
      />
      <input
        type="text"
        name="descricao"
        placeholder="Descrição"
        className="form-control"
        onChange={inserirDados}
      />
      <input
        type="text"
        name="prazo"
        placeholder="Prazo"
        className="form-control"
        onChange={inserirDados}
      />
      <input
        type="number"
        name="prioridade"
        placeholder="Prioridade"
        className="form-control"
        onChange={inserirDados}
      />
      <input type="button" value="Salvar" className="btn btn-success" />
    </form>
  );
}

export default CadastrarTask;
