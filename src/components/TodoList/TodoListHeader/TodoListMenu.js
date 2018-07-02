import React, { Component } from 'react'
import { Platform, TouchableHighlight, View } from 'react-native'
import { MenuTrigger, Menu, MenuOption, MenuOptions } from 'react-native-popup-menu'
import IonIcon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components'

const Icon = Platform.select({
  android: MaterialIcon,
  ios: IonIcon
})

const Container = styled.View`
  align-items: center;
  justify-content: center;
  background-color: transparent;
`

const MenuIcon = styled(Icon)`
  font-size: 27px;
  color: #f5f0ec;
`

const Touchable = styled(TouchableHighlight)`
  position: absolute;
  align-items: center;
  justify-content: center;
`

class TodoListMenu extends Component {
  render () {
    return (
      <Container style={this.props.style}>
        <Menu>
          <MenuTrigger>
            <MenuIcon name='menu' />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => alert('Test')} text='Test' />
          </MenuOptions>
        </Menu>
      </Container>
    )
  }
}

export default TodoListMenu
