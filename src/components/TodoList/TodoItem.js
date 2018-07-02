import React, { Component } from 'react'
import { TouchableWithoutFeedback, Animated, UIManager, LayoutAnimation } from 'react-native'
import Swipeout from 'react-native-swipeout'
import { connect } from 'react-redux'
import DeleteTodo from './DeleteTodo'
import CheckBox from './CheckBox'
import styled from 'styled-components'
import { removeTodo, setTodoStatus } from '../../redux/actions/todo'
import { TODO } from '../../util/constants'

UIManager.setLayoutAnimationEnabledExperimental(true)

const Container = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
  padding-left: 16px;
`

const TodoTitle = styled.Text`
  font-size: 20px;
  color: #363534;
  padding-left: 16px;
`

class TodoItem extends Component {
  state = {
    todoStyle: {height: 56}
  }

  layoutConfig = LayoutAnimation.create(
    200,
    LayoutAnimation.Types.easeInEaseOut,
    LayoutAnimation.Properties.opacity
  )

  removeSelf = () => {
    LayoutAnimation.configureNext(this.layoutConfig)
    this.setState({
      height: 0
    }, () => this.props.removeTodo(this.props.todo))
  }

  setStatus = () => {
    const { todo } = this.props

    //Toggle to-do status
    todo.status = this.props.done ? TODO.UNFINISHED : TODO.FINISHED
    this.props.setStatus(todo)
  }

  render () {
    const {todo, done} = this.props
    const deleteButton = {
      component: <DeleteTodo onPress={this.removeSelf}/>
    }
    return (
      <Swipeout
        backgroundColor='white'
        right={[deleteButton]}
      >
        <TouchableWithoutFeedback onPress={this.setStatus}>
          <Container style={[this.state.todoStyle]}>
            <CheckBox done={done}/>
            <TodoTitle>{todo.title}</TodoTitle>
          </Container>
        </TouchableWithoutFeedback>
      </Swipeout>

    )
  }
}

TodoItem.defaultProps = {
  title: 'Edit to add a Title',
  status: 'incomplete'
}

const mapDispatchToProps = dispatch => ({
  removeTodo: todo => {
    dispatch(removeTodo(todo))
  },
  setStatus: todo => {
    dispatch(setTodoStatus(todo))
  }
})

const mapStateToProps = (state, props)  => {
  const todo = state.todo.todoList.find(item => item.id === props.todo.id)
  return {
    done: todo.status === TODO.FINISHED
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem)
