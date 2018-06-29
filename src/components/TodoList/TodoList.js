import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { connect } from 'react-redux'
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
  }
  render () {
    const {todos} = this.props
    return (
      <Container>
        <TodoFlatList
          data={todos}
          contentContainerStyle={{marginTop: this.contentMargin}}
          keyExtractor={(item, index) => index.toString(10)}
          renderItem={({item}) => <TodoItem contentMargin={this.contentMargin} title={item.title}/>}
        />
        <AddTodoFAB />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  todos: state.todo.todoList
})

export default connect(mapStateToProps, null)(TodoList)
