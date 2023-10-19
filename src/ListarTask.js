function ListarTask({ lista }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <td>Id</td>
          <td>Titulo</td>
          <td>Descricao</td>
          <td>Prazo</td>
          <td>Opcoes</td>
        </tr>
      </thead>
      <tbody>
        {lista.map((obj, indice) => (
          <tr key={indice}>
            <td>{obj.id}</td>
            <td>{obj.titulo}</td>
            <td>{obj.descricao}</td>
            <td>{obj.prazo}</td>
            <input
              type="button"
              value="editar"
              className="btn btn-secondary"
            ></input>
            <input
              type="button"
              value="remover"
              className="btn btn-danger"
            ></input>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default ListarTask;
