import "./AppFooter.css";
import logo from "../../logo.svg"; // Importando imagem do logo utilizada no rodapé

/**
 * Um componente funcional do React que renderiza o rodapé da aplicação.
 *
 * @param {string} appAuthor - O nome do autor da aplicação.
 * @return {JSX.Element} O elemento JSX representando o rodapé da aplicação.
 */
const AppFooter = ({ appAuthor }) => {
  return (
    <footer className="App-footer">
      <p>
        Developed with
        <img src={logo} className="React-logo" alt="React" title="React" />
        <b>React</b> by {appAuthor}
      </p>
    </footer>
  );
};

// Exporta como padrão o componente AppFooter
export default AppFooter;
