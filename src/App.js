import React from 'react'
import './App.css'
import Footer from './components/UI/Footer/Footer'
import Header from './components/UI/Header/Header'
import Faculty from './containers/Faculty/Faculty'
import Support from './containers/Support/Support'
import Contact from './containers/Contact/Contact'
import Recruit from './containers/Recruit/Recruit'
import Books from './containers/Books/Books'
import Bookmarks from './containers/BookmarksHistory/Bookmarks'
import History from './containers/BookmarksHistory/History'
import Payment from './containers/Payment/Payment'
import Verification from './components/UI/SignupVerification/Verification/Verification'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import ResponsiveLogin from './containers/ResponsiveLogin/ResponsiveLogin'
import NoMatchPage from './containers/NoMatchPage/NoMatchPage'
import FuelAddress from './containers/FuelAddressPage/FuelAddress'
import ConfirmingPayment from './containers/ConfirmingPayment/ConfirmingPayment'
import About from './containers/About/About'
import Setting from './containers/Setting/Setting'
import NotesView from './components/UI/SubjectPage/NotesView/NotesView'
import Account from './containers/Account/Account'
import ScrollToTop from './containers/ScrollToTop/ScrollToTop'
import './theme.css'
import {
  makeStyles,
  MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core'
import { light, dark } from './theme'
import ProtectedRoute from './helpers/routes'
import { useDarkMode } from './Services/Utils'
import Purchases from './containers/Purchases/Purchases'
import GlobalAuthenticationPrompt from './components/ServiceComponent/GlobalAuthenticationPrompt'
import QuizStartMobile from './containers/Quiz/QuizStartPage/QuizStartMobile'
import GlobalSnackbar from './components/ServiceComponent/GlobalSnackbar'
import FallbackLoader from './components/UI/Loader/FallbackLoader'
import Home from './containers/Home/Home'
import TermsOfUse from './containers/StaticPages/TermsOfuse'
import PrivacyPolicy from './containers/StaticPages/PrivacyPolicy'
import UserFuelHandler from './containers/NesoFuel/UserFuelHandler'
import GlobalShareDialog from './components/UI/Share/GlobalShareDialog'
import AppPage from './containers/AppPage/AppPage'
//import QuizMainPageHolder from './containers/Quiz/QuizStartPage/QuizMainPageHolder'
import UserManagement from './containers/AuthPage/UserManagement'
import NotificationWrapper from './containers/Notification/NotificationWrapper'
import UserSessionDialog from './components/ServiceComponent/UserSessionDialog'
import RegisterationComplete from './components/UI/Login-SignupDialog/Signup/Feedback/RegisterationComplete'

const useAppStyles = makeStyles(theme => ({
  headerSpace: {
    height: 60,
    [theme.breakpoints.down('xs')]: {
      height: 56,
    }
  },
}))

const App = () => {
  const { darkMode, toggleDarkMode } = useDarkMode()

  const classes = useAppStyles()

  //lazy components
  //const Home = React.lazy(() => import(/* webpackChunkName: 'Home'*/'./containers/Home/Home'))
  const QuizMainPageHolder = React.lazy(() => import(/* webpackChunkName: 'quiz'*/'./containers/Quiz/QuizStartPage/QuizMainPageHolder'))
  const Subject = React.lazy(() => import(/* webpackChunkName: 'subject'*/'./containers/Subject/Subject'))
  const ResultPage = React.lazy(() => import(/* webpackChunkName: 'Result'*/'./containers/Quiz/QuizResultsPage/ResultMainPage'))
  const ChatSupport = React.lazy(() => import(/* webpackChunkName: 'chatSupport'*/'./containers/ChatSupport/ChatSupport'))
  //const UserFuelHandler = React.lazy(() => import(/* webpackChunkName: 'fuel handler'*/'./containers/NesoFuel/UserFuelHandler'))
  const PPTView = React.lazy(() => import(/* webpackChunkName: 'Ppt'*/'./components/UI/SubjectPage/PPTView/PPTView'))
  const Search = React.lazy(() => import(/* webpackChunkName: 'search'*/'./containers/Search/Search'))
  const Player = React.lazy(() => import(/* webpackChunkName: 'player'*/'./containers/Player/Player'))

  return (
    //injecting theme here
    <React.Suspense fallback={<FallbackLoader />}>
      <MuiThemeProvider theme={darkMode ? dark : light}>
        <StylesProvider injectFirst>
          <Router>
            <GlobalAuthenticationPrompt />
            <GlobalSnackbar />
            <GlobalShareDialog />
            <UserSessionDialog />
            <Header darkMode={{ enabled: darkMode, handle: toggleDarkMode }} />
            <div key='spacer' className={classes.headerSpace} />
            <ScrollToTop />
            <Switch>
              <Route exact path="/app" component={AppPage} />

              {/* quiz params */}
              <ProtectedRoute exact path='/:sub_id/:course_id/result/:chapter_id' component={ResultPage} />
              <ProtectedRoute exact path='/result' component={ResultPage} />
              <ProtectedRoute exact path='/result/:chap_name' component={ResultPage} />
              <ProtectedRoute exact path='/questions' component={QuizMainPageHolder} />
              <ProtectedRoute exact path='/questions/:chap_name' component={QuizMainPageHolder} />
              <ProtectedRoute exact path='/quiz/:name' component={QuizStartMobile} />

              {/* NoAuth routes */}
              <Route exact path='/' component={Home} />
              <Route exact path='/home' component={Home} />
              <Route exact path='/home/:params' component={Home} />
              <Route exact path='/faculty/:name' component={Faculty} />

              {/* Subject params */}
              <Route exact path='/:sub_id/:course_id/quiz' component={Subject} />
              <Route exact path='/:sub_id/:course_id/ppts/:chapter_id' component={PPTView} />
              {/* <Route exact path='/:sub_id/:course_id/notes/:notes_id' component={NotesView} /> */}
              <Route exact path='/:sub_id/:course_id/ppts' component={Subject} />
              <Route exact path='/:sub_id/:course_id/notes' component={Subject} />
              <Route exact path='/:sub_id/:course_id' component={Subject} />
              <Route exact path='/:sub_id/:course_id/quiz/:chapter_id' component={Subject} />

              {/*Player  params*/}
              <Route exact path='/:sub_id/:course_id/:chapter_id/:lecture_id' component={Player} />
              {/* <Route path='/ppts' exact component={PPTView} /> */}
              <Route path='/notes' exact component={NotesView} />
              <Route exact path='/donate' component={Support} />
              <Route exact path='/careers' component={Recruit} />
              <Route exact path='/terms-of-use' component={TermsOfUse} />
              <Route exact path='/privacy-policy' component={PrivacyPolicy} />
              <Route exact path='/about' component={About} />
              <Route exact path='/contact-us' component={Contact} />
              <Route exact path='/support' component={ChatSupport} />
              <Route exact path='/recommended-books' component={Books} />
              <Route exact path='/fuel' component={UserFuelHandler} />
              <Route exact path='/search' component={Search} />
              <Route exact path='/faculty' component={Faculty} />
              <Route exact path='/user-verification' component={Verification} />

              {/* Mobile specific routes */}
              <Route exact path='/login' component={ResponsiveLogin} />
              <Route exact path="/registeration-success" component={RegisterationComplete} />
              
              <Route exact path="/user-management" component={UserManagement} />

              {/* Authenticated routes */}

              <ProtectedRoute possibleFrom='/fuel' exact path='/address' component={FuelAddress} />
              <ProtectedRoute exact path='/purchases' component={Purchases} />
              <ProtectedRoute exact path='/confirmingpayment' component={ConfirmingPayment} />
              <ProtectedRoute exact path='/account' component={Account} />
              <ProtectedRoute exact path='/settings' call component={(props) => <Setting {...props} darkMode={{ enabled: darkMode, handle: toggleDarkMode }} />} />
              <ProtectedRoute exact path='/payment' component={Payment} />
              <ProtectedRoute exact path='/bookmarks' component={Bookmarks} />
              <ProtectedRoute exact path='/history' component={History} />
              <ProtectedRoute exact path='/notifications' component={NotificationWrapper} />

              <Route component={NoMatchPage} />


            </Switch>
            <Footer />
          </Router>
        </StylesProvider>
      </MuiThemeProvider>
    </React.Suspense>

  )
}
export default App
