/**
 * taskService.js
 *
 * Módulo responsável por lidar com as requisições à API de tarefas.
 */

// Dados de mock
import tasksMock from "../data/taskMock";

// URL da API
const API_URL = process.env.REACT_APP_API_URL;

/**
 * Busca todas as tarefas.
 * @returns {Array} - Lista de tarefas.
 */
const findAllTasks = async (order = "asc") => {
  // Realiza a requisição de busca de todas as tarefas
  const response = await fetch(`${API_URL}/tasks`);

  // Verifica se a resposta não está OK
  if (!response.ok) {
    throw new Error(`Erro ao buscar tarefas: ${response.statusText}`);
  }

  // Converte a resposta em JSON
  const tasks = await response.json();

  // Ordena as tarefas de acordo com o parâmetro order
  const sortedTasks = tasks.sort((a, b) => {
    return order === "desc" ? b.id - a.id : a.id - b.id;
  });

  return sortedTasks; // Retorna a lista de tarefas
};

/**
 * Adiciona uma nova tarefa.
 * @param {Object} task - A tarefa a ser adicionada.
 * @returns {Object} - A tarefa adicionada.
 */
const addTask = async (task) => {
  // Realiza a requisição de adição da tarefa
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  // Verifica se a resposta não está OK
  if (!response.ok) {
    throw new Error(`Erro ao adicionar tarefa: ${response.statusText}`);
  }

  return response.json(); // Retorna a tarefa adicionada
};

/**
 * Busca uma tarefa pelo ID.
 * @param {number} id - ID da tarefa a ser encontrada.
 * @returns {Object} - A tarefa encontrada.
 */
const findTaskById = async (id) => {
  // Realiza a requisição de busca da tarefa
  const response = await fetch(`${API_URL}/tasks/${id}`);

  // Verifica se a resposta não está OK
  if (!response.ok) {
    throw new Error(`Erro ao buscar tarefa: ${response.statusText}`);
  }

  return response.json(); // Retorna a tarefa encontrada
};

/**
 * Atualiza uma tarefa pelo ID.
 * @param {number} id - ID da tarefa a ser atualizada.
 * @param {Object} updates - Atualizações a serem feitas na tarefa.
 * @returns {Object} - A tarefa atualizada.
 */
const updateTaskById = async (id, updates, method = "PUT") => {
  const updateTask = await findTaskById(id); // Verifica se a tarefa existe
  // Se a tarefa não existir, lança um erro
  if (!updateTask) {
    throw new Error(`Tarefa com ID ${id} não encontrada`);
  }

  // Realiza a requisição de atualização da tarefa
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  // Verifica se a resposta não está OK
  if (!response.ok) {
    throw new Error(`Erro ao atualizar tarefa: ${response.statusText}`);
  }

  return response.json(); // Retorna a tarefa atualizada
};

/**
 * Remove uma tarefa pelo ID.
 * @param {number} id - ID da tarefa a ser removida.
 * @returns {response} - A resposta da requisição.
 */
const deleteTaskById = async (id) => {
  const updateTask = await findTaskById(id); // Verifica se a tarefa existe
  // Se a tarefa não existir, lança um erro
  if (!updateTask) {
    throw new Error(`Tarefa com ID ${id} não encontrada`);
  }

  // Realiza a requisição de remoção da tarefa
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
  });

  // Verifica se a resposta não está OK
  if (!response.ok) {
    throw new Error(`Erro ao remover tarefa: ${response.statusText}`);
  }

  return response; // Retorna a resposta da requisição
};

/**
 * Remove todas as tarefas.
 * @returns {response} - A resposta da requisição.
 */
const deleteAllTasks = async () => {
  const tasks = await findAllTasks(); // Busca todas as tarefas

  // Cria um array de promessas de remoção de tarefas
  const deletePromises = tasks.map((task) => deleteTaskById(task.id));

  // Realiza todas as requisições de remoção em paralelo
  const responses = await Promise.all(deletePromises);

  // Verifica se alguma das respostas não está OK
  const failedResponses = responses.filter((res) => !res.ok);
  if (failedResponses.length > 0) {
    const error = new Error("Erro ao remover tarefas");
    error.responses = failedResponses;
    throw error;
  }

  return responses; // Retorna as respostas das requisições
};

/**
 * Reinicia a lista de tarefas para o seu estado inicial e retorna a lista atualizada de tarefas.
 * @return {Promise<Array>} A lista atualizada de tarefas.
 */
const resetTaskList = async () => {
  await deleteAllTasks(); // Limpa a lista atual de tarefas

  // Realiza a adição de todas as tarefas mockadas em paralelo
  const addedTasks = await Promise.all(tasksMock.map((task) => addTask(task)));

  return addedTasks; // Retorna as tarefas adicionadas à lista
};

/**
 * Retorna o maior ID presente na lista de tarefas.
 * @returns {number} - O maior ID encontrado ou 0 se a lista estiver vazia.
 */
const getMaxTaskId = async () => {
  const tasks = await findAllTasks(); // Busca todas as tarefas

  // Retorna o maior ID encontrado ou 0 se a lista estiver vazia
  return tasks.length > 0
    ? (Math.max(...tasks.map((task) => Number(task.id))) + 1).toString()
    : "1";
};

// Exporta as funções do serviço de tarefas para serem usadas em outros arquivos
export {
  findAllTasks,
  addTask,
  findTaskById,
  updateTaskById,
  deleteTaskById,
  deleteAllTasks,
  resetTaskList,
  getMaxTaskId,
};
