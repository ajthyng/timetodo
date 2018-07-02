import React, { Component } from 'react'
import TodoListMenu from './TodoListMenu'
import styled from 'styled-components'
import dayjs from 'dayjs'

const Container = styled.View`
  height: 150px;
  width: 100%;
  background-color: #9970c8;
  elevation: 5;
  align-items: center;
  justify-content: center;
`

const Menu = styled(TodoListMenu)`
  position: absolute;
  left: 16px;
  top: 16px;
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
  render () {
    const today = dayjs()
    return (
      <Container>
        <Menu />
        <HeaderSummary>
          <HeaderTitle>My Day</HeaderTitle>
          <HeaderDate>{today.format(`dddd,  MMMM D`) + getOrdinal(today.date())}</HeaderDate>
        </HeaderSummary>
      </Container>
    )
  }
}

export default TodoListHeader
