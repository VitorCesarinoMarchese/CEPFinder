import Header from "./components/Header";
import FormCep from "./components/FormCep";
import FormRua from "./components/FormRua";
import "./styles/App.sass";

function App() {
  return (
    <>
      <Header></Header>
      <FormRua></FormRua>
      <FormCep></FormCep>
    </>
  );
}

export default App;
