import "./AppHeader.css";

/**
 * Um componente funcional que renderiza o cabeçalho da aplicação.
 *
 * @param {string} appName - O nome da aplicação (padrão é 'App').
 * @param {string} appVersion - A versão da aplicação (padrão é '1.0.0').
 * @return {JSX.Element} O elemento JSX que representa o cabeçalho da aplicação.
 */
const AppHeader = ({ appName = 'App', appVersion = '1.0.0' }) => {
  return (
    <header className="App-header">
      <h1>{appName}</h1>
      <p>{appVersion}</p>
    </header>
  );
};

// Exporta como padrão o componente AppHeader
export default AppHeader;
