export const actions = {
  ADD_TODO: 'add_todo'
}

export const addTodo = (todo) => ({
  type: actions.ADD_TODO,
  todo
})

