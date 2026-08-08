import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthProvider'
import { CartProvider } from '@/context/CartProvider'
import { RequireAuth } from '@/components/auth/RequireAuth'
import { MainLayout } from '@/components/layout/MainLayout'
import { HomePage } from '@/pages/HomePage'
import { CollectionPage } from '@/pages/CollectionPage'
import { ProductPage } from '@/pages/ProductPage'
import { CartPage } from '@/pages/CartPage'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { AccountPage } from '@/pages/AccountPage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="colecao" element={<CollectionPage />} />
              <Route path="produto/:slug" element={<ProductPage />} />
              <Route path="carrinho" element={<CartPage />} />
              <Route path="entrar" element={<LoginPage />} />
              <Route path="criar-conta" element={<RegisterPage />} />
              <Route element={<RequireAuth />}>
                <Route path="conta" element={<AccountPage />} />
              </Route>
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
