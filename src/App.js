import "./App.css";
import { useState, useEffect } from "react";
import AppHeader from "./components/AppHeader/AppHeader";
import AppFooter from "./components/AppFooter/AppFooter";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import ItensList from "./components/ItensList/ItensList";
import {
  addTask,
  findAllTasks,
  updateTaskById,
  deleteTaskById,
  deleteAllTasks,
  getMaxTaskId,
  resetTaskList,
} from "./services/taskService";

// Constante vazia para o estado do formulário
export const EMPTY_TASK_FORM = {
  id: 0,
  title: "",
  completed: false,
};

/**
 * O componente principal da aplicação, responsável por renderizar a lista de tarefas e gerenciar as interações do usuário.
 *
 * @return {JSX.Element} O elemento JSX que representa a aplicação.
 */
function App() {
  const [tasks, setTasks] = useState([]); // Inicializa a lista de tarefas com um estado vazio
  const [taskForm, setTaskForm] = useState(EMPTY_TASK_FORM); // Inicializa o estado do formulário com um objeto vazio
  const [taskToEdit, setTaskToEdit] = useState(null); // Inicializa o estado da tarefa a ser editada com null

  // Busca as tarefas do servidor quando o componente for montado
  useEffect(() => {
    getTasks();
  }, []);

  /**
   * Busca as tarefas do servidor e atualiza o estado da lista de tarefas.
   *
   * @return {void} Essa função não retorna nada.
   */
  const getTasks = async () => {
    try {
      const data = await findAllTasks("desc"); // Busca as tarefas do servidor em ordem decrescente
      setTasks(data); // Atualiza o estado da lista de tarefas
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  /**
   * Adiciona uma nova tarefa à lista de tarefas e atualiza a visualização.
   *
   * @param {Object} task - A nova tarefa a ser adicionada.
   * @return {void} Essa função não retorna nada.
   */
  const handleAddTask = async (task) => {
    try {
      // Adiciona a nova tarefa ao servidor
      const newTask = await addTask({
        ...task,
        id: await getMaxTaskId(),
      });
      setTasks((prevTasks) => [...prevTasks, newTask]); // Adiciona a nova tarefa na lista de tarefas
      getTasks(); // Consulta e atualiza a lista de tarefas
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  /**
   * Define a tarefa a ser editada com os dados fornecidos.
   *
   * @param {Object} task - A tarefa a ser editada.
   * @return {void} Esta função não retorna nenhum valor.
   */
  const handleEditButtonClick = (task) => {
    setTaskToEdit(task);
  };

  /**
   * Edita uma tarefa na lista de tarefas com os novos dados fornecidos e atualiza a visualização da lista de tarefas.
   *
   * @param {Object} taskEdit - A tarefa editada com os novos dados.
   * @return {void} Esta função não retorna nenhum valor.
   */
  const handleEditTask = async (taskEdit) => {
    try {
      // Edita a tarefa no servidor
      const updatedTask = await updateTaskById(taskEdit.id, taskEdit);
      // Atualiza a lista de tarefas com a tarefa editada
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskEdit.id ? updatedTask : task))
      );
      setTaskToEdit(null); // Reseta a tarefa a ser editada
      getTasks(); // Consulta e atualiza a lista de tarefas
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
    }
  };

  /**
   * Alterna o estado de conclusão de uma tarefa no índice fornecido e atualiza a lista de tarefas.
   *
   * @param {Object} taskEdit - A tarefa a ser alternada.
   * @return {void} Esta função não retorna nada.
   */
  const handleToggleTaskCompletion = async (taskEdit) => {
    try {
      // Alterna o estado de conclusão da tarefa no servidor
      const updatedTask = await updateTaskById(
        taskEdit.id,
        { completed: !taskEdit.completed },
        "PATCH"
      );
      // Atualiza a lista de tarefas com a tarefa alternada
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskEdit.id ? updatedTask : task))
      );
      getTasks(); // Consulta e atualiza a lista de tarefas
    } catch (error) {
      console.error("Erro ao alternar conclusão da tarefa:", error);
    }
  };

  /**
   * Remove uma tarefa da lista de tarefas no índice especificado e atualiza a visualização da lista de tarefas.
   *
   * @param {Object} taskRemove - A tarefa a ser removida.
   * @return {void} Esta função não retorna nenhum valor.
   */
  const handleRemoveTask = async (taskRemove) => {
    try {
      await deleteTaskById(taskRemove.id); // Remove a tarefa do servidor
      // Filtra a lista de tarefas para remover a tarefa com o ID fornecido
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskRemove.id)
      );
      getTasks(); // Consulta e atualiza a lista de tarefas
    } catch (error) {
      console.error("Erro ao remover tarefa:", error);
    }
  };

  /**
   * Limpa a lista de tarefas e atualiza a visualização da lista de tarefas.
   *
   * @return {void} Essa função não retorna nada.
   */
  const handleClearTaskList = async () => {
    // Verifica se a lista de tarefas está vazia
    if (tasks.length === 0) {
      alert("The list is already empty!");
      return;
    }

    try {
      await deleteAllTasks(); // Limpa a lista de tarefas no servidor
      setTasks([]); // Limpa o estado da lista de tarefas
      getTasks(); // Consulta e atualiza a lista de tarefas
      resetForm(); // Reseta o formulário
    } catch (error) {
      console.error("Erro ao limpar lista de tarefas:", error);
      // Verifica se houve erro nas respostas
      /*if (error.responses) {
        error.responses.forEach((response) => {
          console.error(
            `Erro na tarefa com status ${response.status}: ${response.statusText}`
          );
        });
      }*/
    }
  };

  /**
   * Reinicia a lista de tarefas para o seu estado inicial e atualiza a visualização da lista de tarefas.
   *
   * @return {void} Essa função não retorna nada.
   */
  const handleResetTaskList = async () => {
    try {
      const updatedTasks = await resetTaskList();
      setTasks(updatedTasks); // Atualiza o estado da lista de tarefas
      getTasks(); // Consulta e atualiza a lista de tarefas
      resetForm(); // Reseta o formulário
    } catch (error) {
      console.error("Erro ao reiniciar lista de tarefas:", error);
    }
  };

  /**
   * Reseta o formulário de adição de tarefas.
   * @returns {void}
   * */
  const resetForm = () => {
    setTaskForm(EMPTY_TASK_FORM); // Reseta o formulário
    setTaskToEdit(null); // Reseta a tarefa a ser editada
  };

  return (
    <div className="App">
      <AppHeader
        appName={process.env.REACT_APP_NAME}
        appVersion={process.env.REACT_APP_VERSION}
      />
      <main className="App-main">
        <TaskForm
          onAddTask={handleAddTask}
          onEditTask={handleEditTask}
          taskForm={taskForm}
          setTaskForm={setTaskForm}
          taskToEdit={taskToEdit}
        />
        <TaskList
          onClearTaskList={handleClearTaskList}
          onResetTaskList={handleResetTaskList}
          tasksLength={tasks.length || 0}
        >
          <ItensList
            tasks={tasks}
            onToggleTaskCompletion={handleToggleTaskCompletion}
            onEditTask={handleEditButtonClick}
            onRemoveTask={handleRemoveTask}
            taskToEdit={taskToEdit}
          />
        </TaskList>
      </main>
      <AppFooter appAuthor="Tadeu Jerônimo" />
    </div>
  );
}

export default App;
