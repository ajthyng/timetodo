import React, { Component } from 'react'
import Ripple from 'react-native-material-ripple'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/FontAwesome'

const Container = styled(Ripple)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #df312e
`

const DeleteIcon = styled(Icon)`
  font-size: 28px;
  color: white;
`
const DeleteText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: white;
  text-align: center;
`
class DeleteTodo extends Component {
  render () {
    const { onPress } = this.props
    return (
      <Container onPress={onPress}>
        <DeleteIcon name='trash-o' />
        <DeleteText>DELETE</DeleteText>
      </Container>
    )
  }
}

DeleteTodo.defaultProps = {
  onPress: () => {}
}

export default DeleteTodo
