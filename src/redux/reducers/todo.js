import {actions} from '../actions/todo'
import uuidv1 from 'uuid/v1'

export const initialState = {
  todoList: [
    {title: "Link todo app to Alexa", id: uuidv1()},
    {title: "Run 5km", id: uuidv1()},
    {title: "Read to Kaden", id: uuidv1()},
    {title: "Put bulky pickup items out July 18th", id: uuidv1()}
  ]
}

const addTodo = (state, action) => {
  let newTodo = {
    ...action.todo,
    id: uuidv1()
  }

  return {
    ...state,
    todoList: [...state.todoList, newTodo]
  }
}

const removeTodo = (state, action) => {
  let id = action.todo.id
  let todos = state.todoList.filter(item => item.id !== id)
  return {
    ...state,
    todoList: todos
  }
}

export function todoReducer (state = initialState, action) {
  switch (action.type) {
    case actions.ADD_TODO: return addTodo(state, action);
    case actions.REMOVE_TODO: return removeTodo(state, action);
    default: return state
  }
}