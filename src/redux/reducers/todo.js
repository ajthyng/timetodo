import {actions} from '../actions/todo'

export const initialState = {
  todoList: [
    {title: "Link todo app to Alexa"},
    {title: "Run 5km"},
    {title: "Read to Kaden"},
    {title: "Put bulky pickup items out July 18th"}
  ]
}

const todo = (state, action) => ({
  ...state,
  todoList: [...state.todoList, action.todo]
})

export function todoReducer (state = initialState, action) {
  switch (action.type) {
    case actions.ADD_TODO: return todo(state, action);
    default: return state
  }
}