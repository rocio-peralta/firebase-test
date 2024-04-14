import { useState } from 'react'
import { auth, googleProvider  } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  console.log(auth?.currentUser?.displayName)

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.log(error)
    }
  }
  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.log(error)
    }
  }

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      <input
        placeholder="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign In</button>

      <button onClick={signInWithGoogle}>Sign in with Gmail</button>
      <button onClick={logout}>Sign Out</button>
      <div>Hola {auth?.currentUser?.displayName}</div>
    </div>
  )
}
export default Auth
