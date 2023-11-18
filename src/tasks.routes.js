const express = require("express");
const router = express.Router();
const { getTaskIndexFromArrayTasks } = require("./utils")
const errorMessage = { error: "Invalid task id" }

// Arreglo de tareas
const tasks = [
  { id: 1, task: 'Hacer ejercicio en las mañanas', completed: true },
  { id: 2, task: 'Tomar proteinas', completed: false },
  { id: 3, task: 'Tomar creatina', completed: true }
];

router.get("/", function (req, res) {
  const completedFilter = req.query.completed
  if (completedFilter) {
    const tasksFiltered = tasks.filter(task => String(task.completed) === completedFilter)
    return res.json({ tasks: tasksFiltered });
  }
  res.json({ tasks });
});

router.get("/:id", function (req, res) {
  const id = req.params.id;

  const index = getTaskIndexFromArrayTasks(tasks, id)

  if (index === -1) {
    return res.status(401).send(errorMessage);
  }

  res.status(200).json({ task: tasks[index] });
});

router.post("/", function (req, res) {
  const data = req.body;
  tasks.push(data);
  res.status(201).json({ createdTask: data });
});

router.put("/:id", function (req, res) {
  const id = req.params.id;
  const data = req.body;

  const index = getTaskIndexFromArrayTasks(tasks, id)

  if (index === -1) {
    return res.status(401).send(errorMessage);
  }

  tasks[index] = data;
  res.status(200).json({ updatedTask: tasks[index] });
});

router.delete("/:id", function (req, res) {
  const id = req.params.id;

  const index = getTaskIndexFromArrayTasks(tasks, id)

  if (index === -1) {
    return res.status(401).send(errorMessage);
  }

  const data = tasks.splice(index, 1);
  res.status(200).json({ deletedTask: data });
});
  
module.exports = router;