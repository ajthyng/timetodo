import React, { Component } from 'react'
import { FlatList, Animated, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import TodoListMenu from './TodoListHeader/TodoListMenu'
import TodoListHeader from './TodoListHeader/TodoListHeader'
import { addTodo } from '../../redux/actions/todo'
import AddTodoBasic from '../AddTodo/AddTodoBasic'
import TodoItem from './TodoItem'
import AddTodoFAB from './AddTodoFAB'
import styled from 'styled-components'

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`

const Menu = styled(TodoListMenu)`
  position: absolute;
  left: 16px;
  top: 16px;
  z-index: 100;
`

const TodoScrollList = styled(Animated.createAnimatedComponent(FlatList))`
  flex: 1;
  width: 100%;
`

const Header = styled(TodoListHeader)`
  position: absolute;
  left: 0;
  top: 0;
`

const Separator = styled.View`
  width: 100%;
  height: ${StyleSheet.hairlineWidth};
  background-color: #36353440;
`

const HeaderSpacer = styled.View`
  width: 100%;
  height: 150px;
`

class TodoList extends Component {
  static navigationOptions = {
    title: 'My Day'
  }

  constructor (props) {
    super(props)
    this.state = {
      inputVisible: false,
      iconCenter: 0,
      activeRow: null
    }
  }

  toggleAddTodo = () => {
    if (this.state.inputVisible) {
      this.setState({
        inputVisible: false
      }, this.addTodo.animateOut)
    } else {
      this.setState({
        inputVisible: true
      }, this.addTodo.animateIn)
    }
  }

  saveTodo = (text) => {
    if ((text || '').length > 0) {
      this.props.saveTodo({title: text})
      this.addTodo.clearText()
    }
  }

  renderItem = ({item}) => <TodoItem todo={item} />
  scrollY = new Animated.Value(0)

  render () {
    const {todos} = this.props
    const {inputVisible} = this.state

    return (
      <Container>
        <Menu onLayout={({nativeEvent: {layout}}) => {
          this.setState({iconCenter: layout.y + layout.height / 2})
        }}
        />
        <TodoScrollList
          data={todos}
          onScroll={Animated.event([{
            nativeEvent: {contentOffset: {y: this.scrollY}}
          }], {useNativeDriver: true})}
          ItemSeparatorComponent={Separator}
          ListHeaderComponent={<HeaderSpacer />}
          keyExtractor={({id}) => id}
          renderItem={this.renderItem}
        />
        <Header
          animationRange={this.scrollY.interpolate({
            inputRange: [0, 150 - 63],
            outputRange: [0, 1],
            extrapolate: 'clamp'
          })}
          iconCenter={this.state.iconCenter}
        />
        <AddTodoFAB visible={!inputVisible} onPress={this.toggleAddTodo} onLongPress={this.props.saveTodo} />
        <AddTodoBasic
          ref={c => this.addTodo = c}
          onBlur={this.toggleAddTodo}
          onSubmitEditing={this.saveTodo}
        />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  todos: state.todo.todoList
})

const mapDispatchToProps = dispatch => ({
  saveTodo: todo => dispatch(addTodo(todo))
})
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
