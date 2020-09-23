/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainStack from './Stacks/MainStack';
import LoginStack from './Stacks/LoginStack';

//const LoginApp = createAppContainer(LoginStack);
//const MainApp = createAppContainer(MainStack);

const App = createAppContainer(createSwitchNavigator({
    LoginStackApp: LoginStack,
    MainStackApp: MainStack
},{
    initialRouteName : "LoginStackApp"
}
))

export default App