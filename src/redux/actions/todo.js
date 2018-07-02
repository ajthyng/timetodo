export const actions = {
  ADD_TODO: 'add_todo',
  REMOVE_TODO: 'remove_todo',
  SET_STATUS: 'set_status'
}

export const addTodo = (todo) => ({
  type: actions.ADD_TODO,
  todo
})

export const removeTodo = (todo) => ({
  type: actions.REMOVE_TODO,
  todo
})

export const setTodoStatus = (todo) => {
  return {
    type: actions.SET_STATUS,
    todo
  }
}


