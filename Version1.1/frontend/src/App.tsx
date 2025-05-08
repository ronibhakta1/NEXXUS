import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signin } from './pages/signin'
import { NexxusHome }from './pages/nexxusHome'
import { Signup } from './pages/signup'
import { Nexxus } from './pages/mainpage/nexxus'
import SignupLatest from './components/auth/SignupLatest'
import PasswordPage from './components/auth/PasswordPage'
import Picture from './components/auth/Picture'
import Username from './components/auth/Username'
import Notification from './components/auth/Notification'
import Languages from './components/auth/Languages'
import SigninPage from './components/auth/SigninLatest'
function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<NexxusHome />} />
                    <Route path="/signup" element={<Signup/>} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/nexxus" element={<Nexxus />} />
                    <Route path="/signupLatest" element={<SignupLatest />} />
                    <Route path="/password" element={<PasswordPage />} />
                    <Route path="/picture" element={<Picture />} />
                    <Route path="/username" element={<Username />} />
                    <Route path="/notification" element={<Notification />} />
                    <Route path="/languages" element={<Languages />} />
                    <Route path="/signinLatest" element={<SigninPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App