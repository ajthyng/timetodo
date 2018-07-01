import { createStackNavigator } from 'react-navigation'
import TodoList from './TodoList/TodoList'

const RootNavigator = createStackNavigator({
  TodoList: TodoList
}, {
  initialRouteName: 'TodoList',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#fff',
      elevation: 4,
      shadowOpacity: 1
    },
    headerTintColor: '#363534'
  }
})

export default RootNavigator