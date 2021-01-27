import React from "react";

// React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Error from "./pages/Error";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";

// comopnents
import Header from "./components/Header";
import Alert from "./components/Alert";
import PrivateRoute from "./components/PrivateRoute";
import ScrollTop from "./components/ScrollTop";

const App = () => {
	return (
		<Router>
			<Header />
			<Alert />
			<ScrollTop />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/about">
					<About />
				</Route>
				<Route exact path="/products">
					<Products />
				</Route>
				<Route path="/products/:id" children={<ProductDetails />}></Route>
				<Route path="/cart">
					<Cart />
				</Route>
				<PrivateRoute path="/checkout">
					<Checkout />
				</PrivateRoute>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="*">
					<Error />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
