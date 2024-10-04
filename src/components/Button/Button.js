import "./Button.css";

/**
 * Um componente de botão reutilizável que aceita várias props para personalização.
 *
 * @param {object} props - Um objeto contendo props para o componente de botão.
 * @param {string} props.type - O tipo de botão (ex.: "button", "submit", etc.).
 * @param {string} props.className - O nome da classe CSS para o botão.
 * @param {boolean} props.disabled - Se o campo de entrada está desabilitado.
 * @param {function} props.onClick - O manipulador de eventos para o evento de clique do botão.
 * @param {string} props.icon - O nome da classe CSS para o ícone.
 * @param {string} props.text - O conteúdo de texto do botão.
 * @return {JSX.Element} O componente de botão renderizado.
 */
const Button = ({ ...props }) => {
  return (
    <button
      type={props.type || "button"}
      className={props.className}
      onClick={props.onClick}
      disabled={props.disabled}
      title={props.text}
    >
      <i className={props.icon}></i>
      <span className="button-text">{props.text}</span>
    </button>
  );
};

// Exporta como padrão o componente Button
export default Button;
