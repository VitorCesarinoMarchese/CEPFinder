//https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/
import { useState } from "react";
import { textMarshal } from "text-marshal";
function FormCep() {
  const [cep, SetCep] = useState("");
  const [res, SetRes] = useState();
  const submit = (e: any) => {
    e.preventDefault();
    const fetcher = (url: string) =>
      fetch(`https://viacep.com.br/ws/${url}/json/`)
        .then((r) => r.json())
        .then((data) => SetRes(data));
    console.log(cep);
    console.log(fetcher(String(cep)), res);
  };
  const format = (e: any) => {
    SetCep(e.target.value);
    let data = textMarshal({
      input: e.target.value,
      template: "xxxxx-xxx",
      disallowCharacters: [/[a-z]/],
    });
    e.target.value = data.marshaltext;
    SetCep(data.marshaltext);
  };

  return (
    <>
      <h2>Consultar Cep</h2>
      <form onSubmit={(e) => submit(e)}>
        <input
          type="text"
          name="cep"
          id="cep"
          value={cep}
          placeholder="00000-000"
          data-pattern="xxxxx-xxx"
          onChange={(e) => format(e)}
        />
        <button type="submit">Consultar</button>
      </form>
    </>
  );
}
export default FormCep;
