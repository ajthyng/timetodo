import React, { Component } from 'react'
import { Platform, TouchableHighlight, Animated } from 'react-native'
import Ripple from 'react-native-material-ripple'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import IOSIcon from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components'

const Touchable = Platform.select({
  ios: (props) => (
    <TouchableHighlight {...props}>
      <Container>
        {props.children}
      </Container>
    </TouchableHighlight>
  ),
  android: (props) => (
    <StyledRipple rippleOpacity={0.1} rippleContainerBorderRadius={28} {...props}>{props.children}</StyledRipple>
  )
})

const Icon = Platform.select({
  ios: (props) => <IOSIcon {...props} />,
  android: (props) => <MaterialIcon {...props} />
})

const Container = styled.View`
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  elevation: 4;
  background-color: tomato;
  bottom: 32px;
  right: 32px;
`

const StyledRipple = styled(Ripple)`
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  elevation: 4;
  background-color: tomato;
  bottom: 32px;
  right: 32px;
`

class AddTodoFAB extends Component {
  constructor (props) {
    super(props)
    this.animation = new Animated.Value(0)
  }

  render () {
    const {onLongPress, onPress, visible} = this.props

    return (
      <Touchable style={{opacity: visible ? 1 : 0}} onLongPress={() => onLongPress({title: Math.floor(Math.random()*1000).toString(10)})} onPress={onPress}>
        <Icon name="plus" size={36} color='white'/>
      </Touchable>
    )
  }
}

AddTodoFAB.defaultProps = {
  onPress: () => {}
}

export default AddTodoFAB
