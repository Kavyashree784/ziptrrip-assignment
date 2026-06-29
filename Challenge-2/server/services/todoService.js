const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataFile = path.join(__dirname, '../data/todos.json');

const readTodos = async () => {
  try {
    const data = await fs.readFile(dataFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(dataFile, JSON.stringify([]));
      return [];
    }
    throw error;
  }
};

const writeTodos = async (todos) => {
  await fs.writeFile(dataFile, JSON.stringify(todos, null, 2));
};

const getTodos = async () => {
  return await readTodos();
};

const getTodoById = async (id) => {
  const todos = await readTodos();
  return todos.find(todo => todo.id === id);
};

const createTodo = async (todoData) => {
  const todos = await readTodos();
  const newTodo = {
    id: uuidv4(),
    ...todoData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  todos.push(newTodo);
  await writeTodos(todos);
  return newTodo;
};

const updateTodo = async (id, updateData) => {
  const todos = await readTodos();
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) return null;
  
  const updatedTodo = {
    ...todos[index],
    ...updateData,
    id, // Ensure ID isn't changed
    createdAt: todos[index].createdAt, // Keep original creation date
    updatedAt: new Date().toISOString()
  };
  
  todos[index] = updatedTodo;
  await writeTodos(todos);
  return updatedTodo;
};

const deleteTodo = async (id) => {
  const todos = await readTodos();
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) return false;
  
  todos.splice(index, 1);
  await writeTodos(todos);
  return true;
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
};
