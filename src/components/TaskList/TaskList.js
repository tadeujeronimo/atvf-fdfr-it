import "./TaskList.css";
import Button from "../Button/Button";
import TaskCounter from "../TaskCounter/TaskCounter";

/**
 * Um componente funcional que renderiza uma lista de tarefas e botões para limpar e resetar a lista.
 *
 * @param {function} onResetTaskList - Uma função de callback para lidar com o evento de clique no botão de limpar lista.
 * @param {function} onClearTaskList - Uma função de callback para lidar com o evento de clique no botão de resetar lista.
 * @param {number} taskLength - O número de tarefas na lista.
 * @param {ReactNode} children - A lista de tarefas a ser renderizada.
 * @return {JSX.Element} O elemento JSX que representa a lista de tarefas e o botão de limpar lista.
 */
const TaskList = ({ onClearTaskList, onResetTaskList, tasksLength, children }) => {
  return (
    <div className="task-list">
      <ul>{children}</ul>
      <div className="button-container">
        <TaskCounter counter={tasksLength} />
        <div className="button-group">
          <Button
            className="clear-button"
            text="Clear List"
            icon="fa-regular fa-trash-can"
            onClick={onClearTaskList}
          />
          <Button
            className="reset-button"
            text="Reset List"
            icon="fa fa-list-check"
            onClick={onResetTaskList}
          />
        </div>
      </div>
    </div>
  );
};

// Exporta como padrão o componente TaskList
export default TaskList;
