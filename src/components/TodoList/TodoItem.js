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
    todoStyle: {height: 56},
    animationRange: new Animated.Value(0),
    done: this.props.done,
    checkBoxIsAnimating: false
  }

  removeSelf = () => {
    LayoutAnimation.configureNext(LayoutAnimation.create(
      200,
      LayoutAnimation.Types.easeInEaseOut,
      LayoutAnimation.Properties.opacity
    ))
    this.setState({
      height: 0
    }, () => this.props.removeTodo(this.props.todo))
  }

  animateOut = () => {
    Animated.delay(200).start(() => {
      LayoutAnimation.configureNext(LayoutAnimation.create(
        200,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity
      ))
      this.setState({
        height: 0
      }, () => {
        this.props.setStatus({...this.props.todo, status: TODO.FINISHED})
      })
    })
  }

  setStatus = () => {
    let {todo} = this.props
    todo.status = this.state.done ? TODO.UNFINISHED : TODO.FINISHED

    if (todo.status === TODO.FINISHED) {
      this.setState({done: true, checkBoxIsAnimating: true})
    } else if (todo.status === TODO.UNFINISHED) {
      this.setState({done: false, checkBoxIsAnimating: true})
      this.props.setStatus(todo)
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const didAnimate = !this.state.checkBoxIsAnimating && this.state.checkBoxIsAnimating !== prevState.checkBoxIsAnimating
    if (didAnimate && this.state.done) {
      this.animateOut()
    }
  }

  render () {
    const {todo} = this.props
    const deleteButton = {
      component: <DeleteTodo onPress={this.removeSelf} />
    }
    const transform = [{
      translateX: this.state.animationRange.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -470]
      })
    }]

    const opacity = this.state.animationRange.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    })

    return (
      <Swipeout
        style={{opacity}}
        backgroundColor='white'
        right={[deleteButton]}
      >
        <TouchableWithoutFeedback onPress={this.setStatus}>
          <Container style={[this.state.todoStyle, {transform}]}>
            <CheckBox onDoneAnimating={() => this.setState({checkBoxIsAnimating: false})} done={this.state.done} />
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

const mapStateToProps = (state, props) => {
  const todo = state.todo.todoList.find(item => item.id === props.todo.id)
  return {
    done: todo.status === TODO.FINISHED
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem)
