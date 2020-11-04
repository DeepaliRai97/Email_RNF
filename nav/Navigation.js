import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home'
import SignIn from '../screens/SignIn'

const AppNavigator = createStackNavigator({
   
    SignIn:{
      screen:SignIn,
      navigationOptions:({headerShown:false})
    },
    SignUp:{
      screen:SignUp,
      navigationOptions:({headerShown:false})
    },
  Home: {
    screen: Home,
  },
});

export default createAppContainer(AppNavigator);