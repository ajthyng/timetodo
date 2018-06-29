import { createStackNavigator } from 'react-navigation'
import TodoList from './TodoList/TodoList'

const RootNavigator = createStackNavigator({
  TodoList: TodoList
})

export default RootNavigator