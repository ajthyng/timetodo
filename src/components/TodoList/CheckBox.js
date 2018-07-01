import React, { Component } from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components'

const SIZE = 20
const BORDER = 3

const Container = styled.View`
  align-items: center;
  justify-content: center;
  width: ${SIZE}px;
  height: ${SIZE}px;
  border-radius: ${SIZE / 2}px;
  background-color: #363534;
`

const Mask = styled.View`
  width: ${SIZE - BORDER}px;
  height: ${SIZE - BORDER}px;
  border-radius: ${(SIZE - BORDER) / 2}px;
  background-color: #ffffff;
`

const Checked = styled(Animated.View)`
  height: 100%;
  width: 100%;
  border-radius: ${(SIZE - 5) / 2}px;
  background-color: #3ac859;
`

class CheckBox extends Component {
  state = {
    animation: new Animated.Value(0)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.done !== this.props.done) {
      Animated.timing(this.state.animation, {
        toValue: this.props.done ? 1 : 0,
        duration: 200,
        useNativeDriver: true
      }).start()
    }
  }

  render () {
    const scale = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.01, 1]
    })
    const opacity = this.state.animation.interpolate({
      inputRange: [0, 0.01, 1],
      outputRange: [0, 1, 1]
    })

    return (
      <Container>
        <Mask>
          <Checked style={{opacity, transform: [{scale}]}} />
        </Mask>
      </Container>
    )
  }
}

CheckBox.defaultProps = {
  done: false
}

export default CheckBox
