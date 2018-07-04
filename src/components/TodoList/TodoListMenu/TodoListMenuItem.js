import React, { Component } from 'react'
import styled from 'styled-components'
import { MenuOption } from 'react-native-popup-menu'

const MenuContainer = styled.View`
  height: 24px;
  width: 100%;
  padding-left: 8px;
`

const MenuLabel = styled.Text`
  color: #363534;
  font-size: 18px;
`

class TodoListMenuItem extends Component {
  render () {
    const {label, style} = this.props
    return (
      <MenuOption style={style} onSelect={() => alert('Test')}>
        <MenuContainer>
          <MenuLabel>{label.toUpperCase()}</MenuLabel>
        </MenuContainer>
      </MenuOption>
    )
  }
}

export default TodoListMenuItem
