import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import TodoState from './redux/configureStore'
import RootNavigator from './components/Scenes'

const {store, persistor} = TodoState()

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigator/>
        </PersistGate>
      </Provider>
    )
  }
}
