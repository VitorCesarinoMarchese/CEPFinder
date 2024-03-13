import { useState } from "react";
import { textMarshal } from "text-marshal";
import "../styles/formcep.sass";

function FormCep() {
  type IResult = {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
  };
  const [cep, setCep] = useState("");
  const [hidden, setHidden] = useState("hidden");
  const [res, setRes] = useState<IResult>({
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
      window.alert(e);
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
          autoComplete="off"
          required
          onChange={format}
        />
        <button type="submit">Consultar</button>
        <div className={`${hidden} resultados`}>
          <div className="space-between">
            <b>Cidade:</b> <p>{res.localidade}</p>
          </div>
          <div className="space-between">
            <b>Bairro:</b> <p>{res.bairro}</p>
          </div>
          <div className="space-between">
            <b>Logradouro:</b> <p>{res.logradouro}</p>
          </div>
          <div className="space-between">
            <b>CEP:</b> <p>{res.cep}</p>
          </div>
        </div>
      </form>
    </>
  );
}
export default FormCep;
