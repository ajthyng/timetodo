export const actions = {
  ADD_TODO: 'add_todo'
}

export const todo = (todo) => ({
  type: actions.ADD_TODO,
  todo
})

