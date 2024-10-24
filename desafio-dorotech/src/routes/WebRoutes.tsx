import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from '../pages/home'
import PaginaDescricao from '../pages/descricao'

export default function WebRoutes(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/personagem/:id' element={<PaginaDescricao />} />
            </Routes>
        </Router>
    )
}