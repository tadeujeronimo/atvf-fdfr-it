import "./TaskCounter.css";

/**
 * Um componente funcional que renderiza o contador de tarefas.
 * 
 * @param {number} counter - O número de tarefas.
 * @return {JSX.Element} O elemento JSX que representa o contador de tarefas.
 */
const TaskCounter = ({ counter }) => {
  return <div className="task-counter">Total: {counter}</div>;
};

// Exporta como padrão o componente TaskCounter
export default TaskCounter;
