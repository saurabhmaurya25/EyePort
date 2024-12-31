import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './pages/home/home.jsx';
import About from './components/about.jsx';
import Login from './components/loginSignup/login.jsx';
import Signup from './components/loginSignup/signup.jsx';
import ForgotPassword from './components/loginSignup/forgotPassword.jsx';
import Faq from './components/faq.jsx';
import Products from './components/products.jsx';
import Navigation from './components/Navigation.jsx';
import Cart from './components/cart.jsx';
import Checkout from './components/checkout/checkout.jsx';
import Layout from './components/account/Layout.jsx';
import Order from './components/account/order.jsx';
import Profile from './components/account/profile.jsx';
import ChangePassword from './components/account/changePassword.jsx';
import Address from './components/account/address.jsx';

import Wishlist from './components/wishlist.jsx';

import ScrollToTop from './pages/ScrollToTop.jsx';
import ProtectedRoute from './components/Auth/ProtectedRoute.jsx';
import PublicRoute from './components/Auth/PublicRoute.jsx'
import OpenRoute from './components/Auth/OpenRoute.jsx';
import AdminPanel from './pages/adminPanel/adminPanel.jsx';
import ProductDetails from './components/productDetails.jsx';
import ViewUser from './pages/adminPanel/viewUser.jsx';

const App = () => {

  return (
    <>
    <Router>
      <ScrollToTop/>
      <Navigation/>
      <Routes>
        <Route path = "/" element = {<OpenRoute> <Home/> </OpenRoute>  } exact />
        <Route path = "/products" element = {<OpenRoute> <Products/></OpenRoute>} />
        <Route path = "/about" element = {<OpenRoute> <About/> </OpenRoute>} exact />
        <Route path = "/login" element = {<PublicRoute> <Login/> </PublicRoute>}  />
        <Route path = "/signup" element = {<PublicRoute> <Signup/> </PublicRoute>} />
        <Route path = "/forgotPassword" element = {<PublicRoute> <ForgotPassword/> </PublicRoute>} />
        <Route path = "/faq" element = {<OpenRoute> <Faq/> </OpenRoute>} />
        <Route path = "cart" element = {<ProtectedRoute> <Cart/> </ProtectedRoute>} />
        <Route path = "/adminPanel" element = {<ProtectedRoute> <AdminPanel/> </ProtectedRoute>} />
        <Route path = "/viewUser/:userId" element = {<ProtectedRoute> <ViewUser/> </ProtectedRoute>} />
        <Route path = "/productDetails/:productId" element = {<OpenRoute> <ProductDetails/></OpenRoute>} />
        <Route path = "/checkout" element = {<ProtectedRoute> <Checkout/> </ProtectedRoute>} />

        <Route path = "/account" element = {<ProtectedRoute> <Layout/> </ProtectedRoute>}>
          <Route path = "profile" element = {<ProtectedRoute> <Profile/> </ProtectedRoute>} />
          <Route path = "order" element = {<ProtectedRoute> <Order/> </ProtectedRoute>} />
          <Route path = "change-password" element = {<ProtectedRoute> <ChangePassword/></ProtectedRoute>} />
          <Route path = "address" element = {<ProtectedRoute> <Address/> </ProtectedRoute>} />
        </Route>


        <Route path = "/wishlist" element = {<ProtectedRoute> <Wishlist/> </ProtectedRoute>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
