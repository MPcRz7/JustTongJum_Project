import { createStackNavigator } from 'react-navigation-stack';
import MainScreenPage from '../pages/MainScreenPage'
import GroupListPage from '../pages/GroupListPage'
import VocabListPage from '../pages/VocabListPage'
import NewVocabPage from '../pages/NewVocabPage'
import SelectModePage from '../pages/SelectModePage'
import ExercisePage from '../pages/ExercisePage'
import ReportPage from '../pages/ReportPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'

const LoginStack = createStackNavigator({
  MainScreen: {
    screen: MainScreenPage
  },
  VocabList: {
    screen: VocabListPage
  },
  NewVocab: {
    screen: NewVocabPage
  },
  SelectMode: {
    screen: SelectModePage
  },
  Exercise: {
    screen: ExercisePage
  },
  Report: {
    screen: ReportPage
  },
  Login: {
    screen: LoginPage
  },
  Register: {
    screen: RegisterPage
  },
}, {
  initialRouteName: 'Login',
  headerMode: 'none',
  // navigationOptions: {
  //   header: null
  // }
}
)

export default LoginStack