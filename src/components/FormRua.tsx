import { useState } from "react";
import "../styles/FormRua.sass";

function FormRua() {
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
  const [Estado, SetEstado] = useState("");
  const [Cidade, SetCidade] = useState("");
  const [Rua, SetRua] = useState("");
  const [Res, SetRes] = useState<IResult[]>([
    {
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
    },
  ]);
  const [hidden, setHidden] = useState("hidden");
  const submit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${Estado}/${Cidade.replace(
          /\s/g,
          "%20"
        )}/${Rua.replace(/\s/g, "+")}/json/`
      );
      const data = await response.json();
      SetRes(data);
      setHidden("");
    } catch (e: any) {
      window.alert(e);
    }
  };
  return (
    <>
      <h2>Descobrir Cep</h2>
      <form onSubmit={submit}>
        <select
          id="estado"
          name="estado"
          required
          onChange={(e) => SetEstado(e.target.value)}
        >
          <option value="AC">Acre</option>
          <option value="AL">Alagoas</option>
          <option value="AP">Amapá</option>
          <option value="AM">Amazonas</option>
          <option value="BA">Bahia</option>
          <option value="CE">Ceará</option>
          <option value="DF">Distrito Federal</option>
          <option value="ES">Espírito Santo</option>
          <option value="GO">Goiás</option>
          <option value="MA">Maranhão</option>
          <option value="MT">Mato Grosso</option>
          <option value="MS">Mato Grosso do Sul</option>
          <option value="MG">Minas Gerais</option>
          <option value="PA">Pará</option>
          <option value="PB">Paraíba</option>
          <option value="PR">Paraná</option>
          <option value="PE">Pernambuco</option>
          <option value="PI">Piauí</option>
          <option value="RJ">Rio de Janeiro</option>
          <option value="RN">Rio Grande do Norte</option>
          <option value="RS">Rio Grande do Sul</option>
          <option value="RO">Rondônia</option>
          <option value="RR">Roraima</option>
          <option value="SC">Santa Catarina</option>
          <option value="SP">São Paulo</option>
          <option value="SE">Sergipe</option>
          <option value="TO">Tocantins</option>
        </select>
        <input
          type="text"
          name="cidade"
          id="cidade"
          placeholder="São Paulo"
          required
          onChange={(e) => SetCidade(e.target.value)}
        />
        <input
          type="text"
          name="Rua"
          id="Rua"
          placeholder="Av Paulista"
          required
          onChange={(e) => SetRua(e.target.value)}
        />
        <button type="submit">Descobrir</button>
        <div className={`${hidden} resultados`}>
          <div className="space-between">
            <b>Cidade:</b> <p>{Res[0].localidade}</p>
          </div>
          <div className="space-between">
            <b>Bairro:</b> <p>{Res[0].bairro}</p>
          </div>
          <div className="space-between">
            <b>Logradouro:</b> <p>{Res[0].logradouro}</p>
          </div>
          <div className="space-between">
            <b>CEP:</b> <p>{Res[0].cep}</p>
          </div>
        </div>
      </form>
    </>
  );
}
export default FormRua;
