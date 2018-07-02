import { createStackNavigator } from 'react-navigation'
import TodoList from './TodoList/TodoList'

const RootNavigator = createStackNavigator({
  TodoList: TodoList
}, {
  initialRouteName: 'TodoList',
  navigationOptions: {
    header: null
  }
})

export default RootNavigator