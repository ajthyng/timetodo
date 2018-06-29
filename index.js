import { YellowBox, AppRegistry } from 'react-native';
import App from './src/App'

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  "Warning: Can't call setState (or forceUpdate)",
  'You are setting the style', 'Module RCTImageLoader',
  'Class RCTCxxModule'
])

AppRegistry.registerComponent('timetodo', () => App);
