import React, { Component } from 'react'
import { FlatList, ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import TodoListHeader from './TodoListHeader/TodoListHeader'
import { addTodo } from '../../redux/actions/todo'
import AddTodoBasic from '../AddTodo/AddTodoBasic'
import TodoItem from './TodoItem'
import AddTodoFAB from './AddTodoFAB'
import styled from 'styled-components'

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const TodoScrollList = styled(FlatList)`
  flex: 1;
  width: 100%;
`

const Separator = styled.View`
  width: 100%;
  height: ${StyleSheet.hairlineWidth};
  background-color: #36353440;
`

class TodoList extends Component {
  static navigationOptions = {
    title: 'My Day'
  }

  constructor (props) {
    super(props)
    this.state = {
      inputVisible: false,
      activeRow: null
    }
  }

  toggleAddTodo = () => {
    if (this.state.inputVisible) {
      this.setState({
        inputVisible: false
      }, this.addTodo.animateOut)
    } else {
      this.setState({
        inputVisible: true
      }, this.addTodo.animateIn)
    }
  }

  saveTodo = (text) => {
    if ((text || '').length > 0) {
      this.props.saveTodo({title: text})
      this.addTodo.clearText()
    }
  }

  renderItem = ({item}) => <TodoItem todo={item}/>

  render () {
    const {todos} = this.props
    const {inputVisible} = this.state

    return (
      <Container>
        <TodoListHeader />
        <TodoScrollList
          data={todos}
          ItemSeparatorComponent={Separator}
          keyExtractor={({id}) => id}
          renderItem={this.renderItem}
        />
        <AddTodoFAB visible={!inputVisible} onPress={this.toggleAddTodo} onLongPress={this.props.saveTodo}/>
        <AddTodoBasic
          ref={c => this.addTodo = c}
          onBlur={this.toggleAddTodo}
          onSubmitEditing={this.saveTodo}
        />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  todos: state.todo.todoList
})

const mapDispatchToProps = dispatch => ({
  saveTodo: todo => dispatch(addTodo(todo))
})
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
