//import './App.css';
import {HashRouter, Routes, Route} from 'react-router-dom';
import {Header} from './components/partials/Header';
import {Footer} from './components/partials/Footer';
import {Home} from './components/home/Home';
import {Profile} from './components/profile/Profile';
import {DetailProduct} from './components/product/detailProduct/DetailProduct';
import { CreateProduct } from './components/product/createProduct/CreateProduct';
import { EditProduct } from './components/product/editProduct/EditProduct';
import { Category } from './components/categories/Category';
import {SearchedProducts} from './components/categories/SearchedProducts';
import { useEffect, useState } from 'react';

function App() {

  const [lastCartUpdate, setLastCartUpdate] = useState([])
  const [cartSource, setCartSource] = useState([])

  useEffect(()=>{
    setLastCartUpdate(cartSource);
  }, [cartSource]);

  const updateCart = (contenido) => {
    setCartSource('update from '+ contenido)
  }

  return (
    <>
      <HashRouter>
        <Header
          updateCart={updateCart}
          lastCartUpdate={lastCartUpdate}
        />

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/profile/:id' element={<Profile/>}/>
          <Route path='/product/:id' element={<DetailProduct
            updateCart={updateCart}
            lastCartUpdate={lastCartUpdate}
          />}/>
          <Route path='/create-product' element={<CreateProduct/>}/>
          <Route path='/edit-product/:id' element={<EditProduct/>}/>
          <Route path='/category/:id' element={<Category/>}/>
          <Route path='/search/:value' element={<SearchedProducts/>}/>
        </Routes>

        <Footer/>
      </HashRouter>
    </>
    
  );
}

export default App;
