import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Categories from './pages/categories/Categories'
import Single from './pages/singleProduct/Single'
import Like from './pages/wishlist/Like'
import Cart from './pages/cart/Cart'
import Allproducts from './pages/allproduct/Allproducts'
import Admin from './pages/admin/Admin'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import Register from './pages/register/Register'
import Login from './pages/login/Login'

function App() {
  const { pathname } = useLocation()
  const token = useSelector((state: any) => state.auth.token)


  return (
    <>
      <ToastContainer />
      {pathname.startsWith("/login") || pathname.startsWith("/admin") || pathname.startsWith("/register") ? <></> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={< Categories />} />
        <Route path="/singleproduct/:id" element={<Single />} />
        <Route path="/wishlist" element={<Like />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/allproducts" element={<Allproducts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {token && <Route path="/admin" element={<Admin />} />}
      </Routes>
      {pathname.startsWith("/login") || pathname.startsWith("/admin") || pathname.startsWith("/register") ? <></> : <Footer />}
    </>
  )
}

export default App
