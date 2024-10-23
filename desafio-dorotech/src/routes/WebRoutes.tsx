import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from '../pages/home'

export default function WebRoutes(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </Router>
    )
}