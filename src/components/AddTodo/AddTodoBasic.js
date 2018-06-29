import React, { Component } from 'react'
import { TextInput, Animated, Dimensions, Keyboard } from 'react-native'
import { addTodo } from '../../redux/actions/todo'
import { connect } from 'react-redux'
import styled from 'styled-components'

const Container = styled.View`
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
`

const AddTodoInput = styled(TextInput)`
  width: 100%;
  height: 100%;
`

const TodoInputContainer = styled(Animated.View)`
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0;
  background-color: white;
`

class AddTodoBasic extends Component {
  constructor (props) {
    super(props)
    this.state = {
      animationRange: new Animated.Value(0),
      height: Dimensions.get('window').height,
      text: ''
    }
  }

  animateIn = () => {
    Animated.timing(this.state.animationRange, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start()
    this.input.focus()
  }

  animateOut = () => {
    this.input.blur()
    Animated.timing(this.state.animationRange, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start()
  }

  clearText = () => {
    this.setState({text: ''})
  }

  componentDidMount () {
    Keyboard.addListener('keyboardDidShow', this.animateIn)
    Keyboard.addListener('keyboardDidHide', this.animateOut)
  }

  componentWillUnmount () {
    Keyboard.removeAllListeners('keyboardWillShow')
  }

  render () {
    const translateY = this.state.animationRange.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0]
    })
    const opacity = this.state.animationRange.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    })
    const { onBlur, onSubmitEditing } = this.props
    return (
      <Container>
        <TodoInputContainer style={{opacity, transform: [{translateY}]}}>
          <AddTodoInput
            innerRef={c => this.input = c}
            blurOnSubmit={true}
            onChangeText={text => this.setState({text})}
            value={this.state.text}
            onBlur={onBlur}
            onSubmitEditing={() => onSubmitEditing(this.state.text)}
            underlineColorAndroid="transparent"
            placeholder="Add your to-do"
          />
        </TodoInputContainer>
      </Container>
    )
  }
}

AddTodoBasic.defaultProps = {
  onBlur: () => {}
}
export default AddTodoBasic
