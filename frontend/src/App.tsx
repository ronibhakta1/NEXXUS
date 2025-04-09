import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signin } from './pages/signin'
import { NexxusHome }from './pages/nexxusHome'
import { Signup } from './pages/signup'
import { Nexxus } from './pages/mainpage/nexxus'


function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<NexxusHome />} />
                    <Route path="/signup" element={<Signup/>} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/nexxus" element={<Nexxus />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App