const todoService = require('../services/todoService');

const validateTodoBody = (body) => {
  const { title } = body;
  if (!title || typeof title !== 'string' || !title.trim()) {
    return 'Title is required';
  }
  return null;
};

const getTodos = async (req, res) => {
  try {
    const todos = await todoService.getTodos();
    res.json(todos);
  } catch {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

const getTodoById = async (req, res) => {
  try {
    const todo = await todoService.getTodoById(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch {
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
};

const createTodo = async (req, res) => {
  const validationError = validateTodoBody(req.body);
  if (validationError) return res.status(400).json({ error: validationError });

  try {
    const newTodo = await todoService.createTodo(req.body);
    res.status(201).json(newTodo);
  } catch {
    res.status(500).json({ error: 'Failed to create todo' });
  }
};

const updateTodo = async (req, res) => {
  const validationError = validateTodoBody(req.body);
  if (validationError) return res.status(400).json({ error: validationError });

  try {
    const updatedTodo = await todoService.updateTodo(req.params.id, req.body);
    if (!updatedTodo) return res.status(404).json({ error: 'Todo not found' });
    res.json(updatedTodo);
  } catch {
    res.status(500).json({ error: 'Failed to update todo' });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const success = await todoService.deleteTodo(req.params.id);
    if (!success) return res.status(404).json({ error: 'Todo not found' });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};

module.exports = { getTodos, getTodoById, createTodo, updateTodo, deleteTodo };
