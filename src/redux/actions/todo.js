export const actions = {
  ADD_TODO: 'add_todo',
  REMOVE_TODO: 'remove_todo',
  MARK_AS_DONE: 'mark_as_done'
}

export const addTodo = (todo) => ({
  type: actions.ADD_TODO,
  todo
})

export const removeTodo = (todo) => ({
  type: actions.REMOVE_TODO,
  todo
})

export const markAsDone = (todo) => ({
  type: actions.MARK_AS_DONE
})


