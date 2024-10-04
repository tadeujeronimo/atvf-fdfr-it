import "./FormInput.css";

/**
 * Um componente de entrada de formulário reutilizável que renderiza um rótulo e um campo de entrada.
 *
 * @param {object} props - As props do componente.
 * @param {string} props.inputName - O nome e id do campo de entrada.
 * @param {string} props.label - O texto a ser exibido como rótulo.
 * @param {string} props.type - O tipo do campo de entrada.
 * @param {string} props.placeholder - O texto de placeholder para o campo de entrada.
 * @param {boolean} props.required - Se o campo de entrada é obrigatório.
 * @param {boolean} props.disabled - Se o campo de entrada está desabilitado.
 * @param {string} props.value - O valor do campo de entrada.
 * @param {boolean} props.checked - Se o campo de entrada está marcado (para checkboxes).
 * @param {function} props.onChange - Função chamada quando o valor do campo de entrada muda.
 * @return {JSX.Element} O elemento JSX que representa o componente de entrada de formulário.
 */
const FormInput = ({ ...props }) => {
  return (
    <div className="form-input">
      <label htmlFor={props.inputName}>{props.label}</label>
      {props.type === "checkbox" ? (
        <input
          type={props.type}
          name={props.inputName}
          id={props.inputName}
          checked={props.checked}
          onChange={props.onChange}
        />
      ) : (
        <input
          type={props.type}
          name={props.inputName}
          placeholder={props.placeholder}
          id={props.inputName}
          required={props.required}
          disabled={props.disabled}
          value={props.value}
          onChange={props.onChange}
        />
      )}
    </div>
  );
};

// Exporta como padrão o componente FormInput
export default FormInput;
