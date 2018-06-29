import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.View`
  height: 80px;
  align-items: flex-start;
  justify-content: center;
  background-color: white;
  margin: 0 ${props => `${props.contentMargin}px ${props.contentMargin}px ${props.contentMargin}px`};
`

const TodoTitle = styled.Text`
  font-size: 20px;
  color: #363534;
  padding-left: 16px;
`

const TodoItem = (props) => {
  const {title, contentMargin} = props
  return (
    <Container contentMargin={contentMargin}>
      <TodoTitle>{title}</TodoTitle>
    </Container>
  )
}

TodoItem.defaultProps = {
  title: 'Edit to add a Title',
  contentMargin: 0
}

export default TodoItem
