import React, { Component } from 'react'
import { Image, Animated } from 'react-native'
import styled from 'styled-components'
import dayjs from 'dayjs'

const Container = styled(Animated.View)`
  height: 150px;
  width: 100%;
  background-color: #5f4178;
  align-items: center;
  justify-content: center;
`

const HeaderTitle = styled(Animated.Text)`
  font-size: 22px;
  color: #f5f0ec;
`

const HeaderDate = styled(Animated.Text)`
  font-size: 16px;
  color: #f5f0ec;
`

const HeaderSummary = styled(Animated.View)`
  align-items: flex-start;
  justify-content: flex-start;
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 16px;
`

const ImageOverlay = styled(Animated.View)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #422e55;
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
  state = {
    titleLayout: null,
    dateLayout: null,
    headerLayout: null
  }

  render () {

    if (this.state.titleLayout && this.state.dateLayout && this.props.iconCenter) {
      console.log(this.state, this.props.iconCenter)
    }

    const today = dayjs()

    const translateHeaderY = this.animationRange.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 63 - 150]
    })

    const translateTitleX = this.animationRange.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 40]
    })

    const {titleLayout, headerLayout, dateLayout} = this.state
    let newTitleCenter = null
    let newDateX = null
    if (!!titleLayout && !!headerLayout && !!this.props.iconCenter && !!dateLayout) {
      const titleCenter = titleLayout.y + titleLayout.height / 2
      const headerTop = headerLayout.y - headerLayout.height
      newTitleCenter = headerTop - titleCenter + 2

      newDateX = dateLayout.width * 2
    }

    const translateTitleY = this.animationRange.interpolate({
      inputRange: [0, 1],
      outputRange: [0, +newTitleCenter]
    })

    const translateDateX = this.animationRange.interpolate({
      inputRange: [0, 0.5],
      outputRange: [0, -newDateX],
      extrapolate: 'clamp'
    })

    const opacity = this.animationRange.interpolate({
      inputRange: [0, 1],
      outputRange: [0.6, 1]
    })

    return (
      <Container style={[this.props.style, {transform: [{translateY: translateHeaderY}]}]}>
        <Image
          blurRadius={3}
          style={{opacity: 1, width: '100%', height: '100%'}}
          resizeMode='cover' source={require('../../../../media/img/sunrise_buildings.jpg')} />
        <ImageOverlay style={{opacity}} />
        <HeaderSummary onLayout={({nativeEvent: {layout}}) => this.setState({headerLayout: layout})}>
          <HeaderTitle
            style={{transform: [{translateX: translateTitleX}, {translateY: translateTitleY}]}}
            onLayout={({nativeEvent: {layout}}) => this.setState({titleLayout: layout})}
          >
            My Day
          </HeaderTitle>
          <HeaderDate
            style={{transform: [{translateX: translateDateX}]}}
            onLayout={({nativeEvent: {layout}}) => this.setState({dateLayout: layout})}
          >
            {today.format('dddd - MMMM D') + getOrdinal(today.date())}
          </HeaderDate>
        </HeaderSummary>
      </Container>
    )
  }
}

TodoListHeader.defaultProps = {
  iconCenter: 0
}

export default TodoListHeader
