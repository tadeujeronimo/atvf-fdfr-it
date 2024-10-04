# atvf-fdfr-it

Atividade Final do curso Fundamentos de Desenvolvimento Front end com React do Bootcamp Front-end Development da iTalents.

## Projeto Final do Módulo

Desenvolver um projeto em React utilizando os conceitos apresentados durante o módulo.

- Este projeto demonstra a aplicação prática dos conceitos de React apresentados durante o módulo, incluindo a criação de componentes, gerenciamento de estado, integração com APIs e uso de hooks.

### Requisitos do Projeto

#### - No mínimo 7 componentes estilizados e funcionais:
Foram criados 8 componentes: AppFooter, AppHeader, Button, FormInput, ItensList, TaskForm, TaskList e TaskCounter.

#### - Trabalhar com props e children:
Todos os componentes utilizam props para comunicação entre si, compartilhando dados e/ou funções. Como os conceitos de Context API e Redux não foram abordados, seu uso foi evitado. O componente TaskList foi implementado com o atributo children.

#### - Realizar integração com API com pelo menos 2 métodos HTTP (GET, POST, PUT/PATCH e DELETE):
Foi realizada a integração com json-server, permitindo o uso de todos os principais métodos HTTP (GET, POST, PUT/PATCH e DELETE).

#### - Trabalhar com Listas e formulários componentizados:
TaskList é uma listagem que utiliza o componente ItensList como children. TaskForm é um formulário composto pelos componentes FormInput e Button.

#### - Trabalhar com Estados (useState):
O componente principal da aplicação, App.js, faz uso do hook useState para controlar o estado da variável tasks.

#### - Usar o Hook useEffect para o controle do ciclo de vida dos componentes:
O componente App faz uso do hook useEffect para inicializar a listagem de tasks. O componente TaskForm controla a edição de uma task utilizando esse recurso.

#### - Trabalhar com funções assíncronas (Promises/Async/Await):
O uso de funções assíncronas foi amplamente explorado tanto no serviço taskService quanto no componente App, que consome os serviços addTask, findAllTasks, updateTaskById, deleteTaskById, deleteAllTasks, getMaxTaskId e resetTaskList.

## Scripts Disponíveis

No diretório do projeto, você pode executar:

#### - npm start:
Inicia o aplicativo em modo de desenvolvimento.

#### - npm build:
Compila o aplicativo para produção na pasta build.

#### - npm run json-server:
Inicia a simulação de API da aplicação.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (versão 6 ou superior)

## Instalação

#### 1. Clone o repositório:

   git clone https://github.com/seu-usuario/atvf-fdfr-it.git
   cd atvf-fdfr-it

#### 2. Instale as dependências:

npm install

## Configuração

#### 1. Copie o arquivo .env.example para .env:

cp .env.example .env

#### 2. Abra o arquivo .env e ajuste a URL da API conforme necessário. Por exemplo:

REACT_APP_API_URL=http://localhost:3001

## Executando o Servidor JSON

#### 1. Inicie o json-server para simular a API (back-end):

npm run json-server

## Executando o Aplicativo React

#### 1. Em uma nova janela do terminal, inicie o aplicativo React (front-end):

npm start

#### 2. Abra o navegador e acesse http://localhost:3000 para ver o aplicativo em execução.

## Créditos

- Este projeto faz uso da [JSONPlaceholder](https://jsonplaceholder.typicode.com/) para simular dados de tarefas;
- Ícones utilizados neste projeto são do [Font Awesome 6](https://fontawesome.com/) através do [cdnjs](https://cdnjs.com/).

## Licença

[MIT](https://choosealicense.com/licenses/mit/)