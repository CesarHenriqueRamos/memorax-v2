import { BrowserRouter,Routes,Route } from 'react-router-dom';

import { Login } from '../pages/Login'
import { Home } from '../pages/Home';
import { PrivateRoutes } from '.';
import { Create } from '../pages/Create';

export const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/" element={<PrivateRoutes/>}>
                    <Route path="/home" element={<Home/>} />
                    <Route path="/create" element={<Create/>} />
                </Route>
                
            </Routes>
        </BrowserRouter>
    )
  }