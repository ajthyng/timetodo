import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { connect } from 'react-redux'
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

const TodoFlatList = styled(FlatList)`
  flex: 1;
  width: 100%;
`

class TodoList extends Component {
  constructor (props) {
    super(props)
    this.contentMargin = 8
    this.state = {
      inputVisible: false
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

  render () {
    const {todos} = this.props
    const {inputVisible} = this.state
    console.log(this.state)
    return (
      <Container>
        <TodoFlatList
          data={todos}
          contentContainerStyle={{marginTop: this.contentMargin}}
          keyExtractor={(item, index) => index.toString(10)}
          renderItem={({item}) => <TodoItem contentMargin={this.contentMargin} title={item.title}/>}
        />
        <AddTodoFAB visible={!inputVisible} onPress={this.toggleAddTodo}/>
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
