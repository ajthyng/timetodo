import React, { Component } from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components'
import dayjs from 'dayjs'

const Container = styled(Animated.View)`
  height: 150px;
  width: 100%;
  background-color: #5f4178;
  align-items: center;
  justify-content: center;
`

const HeaderTitle = styled.Text`
  font-size: 22px;
  color: #f5f0ec;
`

const HeaderDate = styled.Text`
  font-size: 16px;
  color: #f5f0ec;
`

const HeaderSummary = styled.View`
  align-items: flex-start;
  justify-content: flex-start;
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 16px;
`

const getOrdinal = (dayNum) => {
  const num = dayNum.toString(10).split('')
  switch (parseInt(num[num.length - 1])) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

class TodoListHeader extends Component {
  animationRange = this.props.animationRange

  render () {
    const today = dayjs()
    const transform = [{
      translateY: this.animationRange.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 63-150]
      })
    }]

    return (
      <Container style={[this.props.style, {transform}]}>
        <HeaderSummary>
          <HeaderTitle>My Day</HeaderTitle>
          <HeaderDate>{today.format('dddd - MMMM D') + getOrdinal(today.date())}</HeaderDate>
        </HeaderSummary>
      </Container>
    )
  }
}

export default TodoListHeader
