import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from '../pages/home'
import Descricao from '../components/descricao'

export default function WebRoutes(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/personagem/:id' element={<Descricao />} />
            </Routes>
        </Router>
    )
}