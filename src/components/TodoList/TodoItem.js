import React, { Component } from 'react'
import { TouchableOpacity, Animated } from 'react-native'
import { connect } from 'react-redux'
import Swipeout from 'react-native-swipeout'
import DeleteTodo from './DeleteTodo'
import styled from 'styled-components'
import { removeTodo } from '../../redux/actions/todo'

const Container = styled.View`
  height: 80px;
  align-items: flex-start;
  justify-content: center;
  background-color: white;
`

const TodoTitle = styled.Text`
  font-size: 20px;
  color: #363534;
  padding-left: 16px;
`

const AnimatedSwipeout = styled(Animated.createAnimatedComponent(Swipeout))`
  background-color: white;
`

class TodoItem extends Component {

  render () {
    const {todo, removeTodo, onOpen, onClose, activeRow} = this.props
    const deleteButton = {
      component: <DeleteTodo onPress={() => removeTodo(todo)} />
    }
    return (
      <AnimatedSwipeout
        autoClose={true}
        close={todo.id !== activeRow}
        right={[deleteButton]}
        rowId={todo.id}
        onClose={onClose}
        onOpen={onOpen}
      >
        <Container>
          <TodoTitle>{todo.title}</TodoTitle>
        </Container>
      </AnimatedSwipeout>
    )
  }
}

TodoItem.defaultProps = {
  title: 'Edit to add a Title',
  onOpen: () => {},
  onClose: () => {}
}

const mapDispatchToProps = dispatch => ({
  removeTodo: todo => dispatch(removeTodo(todo))
})

export default connect(null, mapDispatchToProps)(TodoItem)
