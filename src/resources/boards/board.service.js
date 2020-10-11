const boardsRepo = require('./board.memory.repository');
const taskService = require('../tasks/task.service');

const create = board => boardsRepo.create(board);

const get = id => boardsRepo.get(id);

const getAll = () => boardsRepo.getAll();

const remove = async id => {
  const board = await boardsRepo.remove(id);
  const tasks = await taskService.getAll();

  tasks
    .filter(task => task.boardId === board.id)
    .forEach(task => {
      taskService.remove(task.id);
    });

  return board;
};

const update = (id, data) => boardsRepo.update(id, data);

module.exports = { create, getAll, get, remove, update };
