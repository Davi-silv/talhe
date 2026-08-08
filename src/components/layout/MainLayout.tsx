import { Outlet } from 'react-router-dom'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { Header } from './Header'
import { Footer } from './Footer'

export function MainLayout() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
