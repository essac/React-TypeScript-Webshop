import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Pages/Home/Home';
import NotFound from './Pages/NotFound/NotFound';
import CartContext from './context/Cart';
import { IMovie } from './components/Products/Products';
import ShowCart from './Pages/ShowCart/ShowCart';
import Admin from './Pages/Admin/Admin';


function App() {
  const defaultShopValue: IMovie[] = [];
  const [shopCart, updateShopCart] = useState(defaultShopValue);

  const setShopCart = (item: IMovie) => {
    updateShopCart(shopCart.concat(item));
  }

  const removeShopCartItem = (removeItem: any) => {
    updateShopCart(removeItem);
  }

  return (
    <CartContext.Provider value={{ shopCart, setShopCart, removeShopCartItem }}>
      <div className="App">
        <Router>
          <nav>
            <ul className='AppList'>
              <li><Link to='/'><i className='fa fa-home'></i> Home</Link></li>
              <li className='CartLink'><Link to='/showcart'><i className='fa fa-shopping-cart'></i> Cart({shopCart.length})</Link></li>
              <li className='CartLink'><Link to='/admin'><i className='fa fa-cogs'></i> Admin</Link></li>
            </ul>
          </nav>

          <Switch>
            <Route path='/' exact={true}>
              <Home />
            </Route>

            <Route path='/showcart'>
              <ShowCart />
            </Route>

            <Route path='/admin'>
              <Admin />
            </Route>

            <Route path='*/'>
              <NotFound />
            </Route>

          </Switch>
        </Router>
      </div>
    </CartContext.Provider>
  );
}

export default App;
