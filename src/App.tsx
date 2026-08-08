import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from '@/context/CartProvider'
import { MainLayout } from '@/components/layout/MainLayout'
import { HomePage } from '@/pages/HomePage'
import { CollectionPage } from '@/pages/CollectionPage'
import { ProductPage } from '@/pages/ProductPage'
import { CartPage } from '@/pages/CartPage'

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="colecao" element={<CollectionPage />} />
            <Route path="produto/:slug" element={<ProductPage />} />
            <Route path="carrinho" element={<CartPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}
