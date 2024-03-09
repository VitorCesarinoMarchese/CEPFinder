import { useState } from "react";
import { textMarshal } from "text-marshal";
import "../styles/formcep.sass";

function FormCep() {
  const [cep, setCep] = useState("");
  const [hidden, setHidden] = useState("hidden");
  const [res, setRes] = useState({
    cep: "",
    logradouro: "",
    complemento: "",
    bairro: "",
    localidade: "",
    uf: "",
    ibge: "",
    gia: "",
    ddd: "",
    siafi: "",
  });

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      setRes(data);
      setHidden("");
    } catch (e) {
      console.error(e);
    }
  };
  const format = (e: any) => {
    let data = textMarshal({
      input: e.target.value,
      template: "xxxxx-xxx",
      disallowCharacters: [/[a-z]/],
    });
    e.target.value = data.marshaltext;
    setCep(data.marshaltext);
  };

  return (
    <>
      <h2>Consultar Cep</h2>
      <form className="formcep" onSubmit={submit}>
        <input
          type="text"
          name="cep"
          id="cep"
          value={cep}
          placeholder="00000-000"
          data-pattern="xxxxx-xxx"
          onChange={format}
        />
        <button type="submit">Consultar</button>
        <div className={`${hidden} resultados`}>
          <p>Localidade: {res.localidade}</p>
          <p>Bairro: {res.bairro}</p>
          <p>Logradouro: {res.logradouro}</p>
          <p>CEP: {res.cep}</p>
        </div>
      </form>
    </>
  );
}
export default FormCep;
