import SignIn from './SignIn';
import Game from './Game';
import {auth} from '../lib/firebase'

const Auth = () => {

  return(
    auth.currentUser !== null ? <Game /> : <SignIn />
  )

}

export default Auth;