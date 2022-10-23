import './App.css';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/registerForm/RegisterForm';
import {  Routes, Route } from "react-router-dom";
import Products from './components/products/Products';
import Product from './components/product/Product';
import {useSelector} from 'react-redux'
import NoPage from './components/No page/NoPage';
import AddProduct from './components/addproduct/AddProduct';
import ResponsiveAppBar from './components/navBar/NavBar';
import MyProduct from './components/myProduct/MyProduct';
import MyBids from './components/myBids/MyBids';

function App() {
  const user= useSelector((state)=> state.user.value)

  return (
    <div className="App">
      {
        user.email?
        <ResponsiveAppBar user={user.first_name} className="navBar"></ResponsiveAppBar>
        :console.log("not loged")
      }


           <Routes>
           <Route path='/' element={ <LoginForm/>} />
           <Route path='RegisterForm' element={ <RegisterForm/>} />
           <Route path='*' element={ <NoPage/>} />
           {user.email?     
             <Route path='Products/*' element={ <Products/>} />
             
             :<Route path='Products' element={ <LoginForm/>} />
            }
            {user.email?     
             <Route path='Product' element={ <Product/>} />
             
             :<Route path='Product' element={ <LoginForm/>} />
            }
            {user.email?     
           <Route path='AddP' element={ <AddProduct/>} />
             :<Route path='AddP' element={ <LoginForm/>} />
            }
            {user.email?     
           <Route path='MyProduct' element={ <MyProduct/>} />
             :<Route path='MyProduct' element={ <LoginForm/>} />
            }
            {user.email?     
           <Route path='MyBids' element={ <MyBids/>} />
             :<Route path='MyBids' element={ <LoginForm/>} />
            }
             
            
            
      
      </Routes>

    </div>
  )
}

export default App;
