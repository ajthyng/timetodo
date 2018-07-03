import {Animated, Easing} from 'react-native'
import React, {Component} from 'react'

class TodoListMenuRenderer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slide: new Animated.Value(0)
    }
  }

  componentDidMount() {
    Animated.timing(this.state.slide, {
      duration: 200,
      toValue: 1,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true
    }).start()
  }

  close() {
    return new Promise(resolve => {
      Animated.timing(this.state.slide, {
        duration: 200,
        toValue: 0,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true
      }).start(resolve)
    })
  }

  render() {
    const {style, children, layouts, top, ...other} = this.props
    const width = layouts.windowLayout.width * 0.65
    const layout = {top: -top, left: 0, height: '100%', position: 'absolute', width}
    const animation = {
      transform: [{
        translateX: this.state.slide.interpolate({
          inputRange: [0, 1],
          outputRange: [-width, 0]
        })
      }]
    }

    return (
      <Animated.View {...other} style={[style, layout, animation]}>
        {children}
      </Animated.View>
    )
  }
}

export default TodoListMenuRenderer