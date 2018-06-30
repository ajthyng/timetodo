export const actions = {
  ADD_TODO: 'add_todo',
  REMOVE_TODO: 'remove_todo'
}

export const addTodo = (todo) => ({
  type: actions.ADD_TODO,
  todo
})

export const removeTodo = (todo) => ({
  type: actions.REMOVE_TODO,
  todo
})

