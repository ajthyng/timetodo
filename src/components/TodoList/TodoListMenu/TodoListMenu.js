import React, { Component } from 'react'
import { Platform } from 'react-native'
import { MenuTrigger, Menu, MenuOptions } from 'react-native-popup-menu'
import IonIcon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import TodoListHeader from '../TodoListHeader/TodoListHeader'
import styled from 'styled-components'
import TodoListMenuRenderer from './TodoListMenuRenderer'
import TodoListMenuItem from './TodoListMenuItem'

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
const TodoListMenuHeader = styled.View`
  height: ${TodoListHeader.HEIGHT - 1}px;
  justify-content: center;
  align-items: center;
  background-color: white;
`

const TodoListMenuSeparator = styled.View`
  height: 1px;
  width: 100%;
  background-color: #363534;
`

class TodoListMenu extends Component {
  render () {
    return (
      <Container style={this.props.style}>
        <Menu renderer={TodoListMenuRenderer}>
          <MenuTrigger>
            <MenuIcon name='menu' onLayout={this.props.onLayout} />
          </MenuTrigger>
          <MenuOptions customStyles={optionStyles}>
            <TodoListMenuHeader />
            <TodoListMenuSeparator />
            <TodoListMenuItem style={{paddingTop: 8}} label='my day' />
            <TodoListMenuItem label='completed' />
          </MenuOptions>
        </Menu>
      </Container>
    )
  }
}

const optionStyles = {
  optionsContainer: {
    backgroundColor: 'white'
  }
}

export default TodoListMenu
