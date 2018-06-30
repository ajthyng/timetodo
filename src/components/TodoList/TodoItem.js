import React, { Component } from 'react'
import { TouchableWithoutFeedback, Animated, UIManager, LayoutAnimation } from 'react-native'
import Swipeout from 'react-native-swipeout'
import { connect } from 'react-redux'
import DeleteTodo from './DeleteTodo'
import styled from 'styled-components'
import { removeTodo } from '../../redux/actions/todo'

UIManager.setLayoutAnimationEnabledExperimental(true)

const Container = styled(Animated.View)`
  align-items: flex-start;
  justify-content: center;
  background-color: white;
`

const TodoTitle = styled.Text`
  font-size: 20px;
  color: #363534;
  padding-left: 16px;
`

class TodoItem extends Component {
  state = {
    todoStyle: { height: 56 }
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

  render () {
    const {todo} = this.props
    const deleteButton = {
      component: <DeleteTodo onPress={this.removeSelf}/>
    }
    return (
      <Swipeout
        backgroundColor='white'
        right={[deleteButton]}
      >
        <Container style={[this.state.todoStyle]}>
          <TodoTitle>{todo.title}</TodoTitle>
        </Container>
      </Swipeout>
    )
  }
}

TodoItem.defaultProps = {
  title: 'Edit to add a Title'
}

const mapDispatchToProps = dispatch => ({
  removeTodo: todo => {
    dispatch(removeTodo(todo))
  }
})

export default connect(null, mapDispatchToProps)(TodoItem)
