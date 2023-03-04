import { Navigate, Route, Routes } from 'react-router-dom'
import { ProductCategoryPage } from '../pages/ProductCategoryPage'
import { QuoterPage } from '../pages/QuoterPage'

export const QuoterRoutes = () => {
 
  return (
    <Routes>
       <Route path='quoter' element={<QuoterPage />}/>
       <Route path='products' element={<ProductCategoryPage />}/>   
       <Route path='/*' element={<Navigate to="/quoter"/>}/>  
   </Routes>
  )
}

