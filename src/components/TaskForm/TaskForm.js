import "./TaskForm.css";
import { useEffect } from "react";
import FormInput from "../FormInput/FormInput";
import Button from "../Button/Button";
import { EMPTY_TASK_FORM } from "../../App";

/**
 * Renderiza um formulário para adicionar novas tarefas.
 *
 * @param {function} onAddTask - Função chamada quando o formulário é submetido.
 * @return {JSX.Element} O formulário de adição de tarefas.
 */
const TaskForm = ({
  onAddTask,
  onEditTask,
  taskToEdit,
  taskForm,
  setTaskForm,
}) => {

  // Atualiza o estado do formulário com os valores da tarefa a ser editada
  useEffect(() => {
    if (taskToEdit) {
      setTaskForm(taskToEdit);
    }
  }, [taskToEdit]);

  /**
   * Lida com a mudança nos campos de entrada do formulário.
   *
   * @param {Event} event - O evento de mudança do campo de entrada.
   * @return {void} Essa função não retorna nada.
   */
  const handleChange = (event) => {
    // Extrai o nome e o valor do campo de entrada
    const { name, value, type, checked } = event.target;
    // Atualiza o estado do formulário com os novos valores
    setTaskForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /**
   * Lida com a submissão de um novo formulário de tarefa.
   *
   * @param {Event} event - O evento de submissão do formulário.
   * @return {void} Essa função não retorna nada.
   */
  const handleAddTask = (event) => {
    // Previne o comportamento padrão do formulário
    event.preventDefault();
    // Verifica se o campo de tarefa está preenchido
    if (taskForm.title.trim()) {
      // Verifica se a tarefa a ser editada existe
      if (taskToEdit) {
        // Chama a função de edição de tarefa passando o valor do campo de tarefa
        onEditTask(taskForm);
      } else {
        // Chama a função de adição de tarefa passando o valor do campo de tarefa
        onAddTask(taskForm);
      }
      setTaskForm(EMPTY_TASK_FORM); // Reseta o formulário
      event.target.elements.title.focus(); // Foca no campo de title
    }
  };

  return (
    <form action="post" onSubmit={handleAddTask}>
      {taskToEdit && (
        <FormInput
          type="text"
          inputName="id"
          label="ID"
          disabled={true}
          value={taskForm.id}
        />
      )}
      <FormInput
        type="text"
        inputName="title"
        label="Title"
        placeholder={taskToEdit ? "Edit your task" : "Add a new task"}
        required={true}
        value={taskForm.title}
        onChange={handleChange}
      />
      <FormInput
        type="checkbox"
        inputName="completed"
        label="Completed"
        checked={taskForm.completed}
        onChange={handleChange}
      />
      <Button
        className="add-button"
        type="submit"
        text={taskToEdit ? "Edit Task" : "Add Task"}
        icon={taskToEdit ? "fa-regular fa-pen-to-square" : "fa-regular fa-square-plus"}
      />
    </form>
  );
};

// Exporta como padrão o componente TaskForm
export default TaskForm;
