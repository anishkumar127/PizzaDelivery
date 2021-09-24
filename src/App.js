import React, { useEffect,useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './Index.css';
import Home from './pages/Home';
// import About from './pages/About';
import Navigation from './components/Navigation';
import Products from './pages/ProductsPage';
import Cart from './pages/Cart';
import SingleProduct from './components/SingleProduct';
import {CartContext} from './CartContext';
import { getCart,storeCart } from './helpers';
const App = () => {
    const [cart,setCart] =useState({});
    //fetch cart from local storage
    useEffect(()=>{
        getCart().then(cart=>{
            setCart(JSON.parse(cart))
        })
            // console.log(JSON.parse(cart));
    },[])
    useEffect(()=>{
        storeCart(JSON.stringify(cart));
    },[cart])
    return (
        
        <>
            <Router >
                <CartContext.Provider value={{cart:cart,setCart:setCart}}>

                <Navigation />
                <Switch>
                         <Route exact path="/" component={Home}></Route>
                    {/* <Route path ="/about" component={About}></Route> */}
                    <Route path="/products" exact component={Products}></Route>
                    <Route path="/products/:_id" component={SingleProduct}></Route>
                    <Route path="/cart" component={Cart} ></Route>
                </Switch>
                </CartContext.Provider>
            </Router>
        </>
    )

}

export default App;