function getTaskIndexFromArrayTasks(tasks, id) {
  const index = tasks.findIndex((task) => task.id === Number(id));

  return index 
}

  
module.exports = {
   getTaskIndexFromArrayTasks
};