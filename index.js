import React from 'react'
import { YellowBox, AppRegistry, StyleSheet, Text } from 'react-native';
import App from './src/App'

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  "Warning: Can't call setState (or forceUpdate)",
  'You are setting the style', 'Module RCTImageLoader',
  'Class RCTCxxModule'
])

const textFixStyle = StyleSheet.create({
  defaultFontFamily: {
    fontFamily: 'lucida grande',
  }
});

const oldRender = Text.prototype.render;


Text.prototype.render = function (...args) {
  const origin = oldRender.call(this, ...args);
  return React.cloneElement(origin, {
    style: [textFixStyle.defaultFontFamily, origin.props.style]
  });
};

AppRegistry.registerComponent('timetodo', () => App);
