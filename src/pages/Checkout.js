import React from 'react';
import { CartContext } from '../context/cart';
import { UserContext } from '../context/user';
import { useHistory } from 'react-router-dom';
import EmptyCart from '../components/Cart/EmptyCart';
// Stripe Elements
import { CardElement, StripeProvider, Elements, injectStripe } from 'react-stripe-elements';
import submitOrder from '../strapi/submitOrder';

const Checkout = (props) => {
  const { cart, total, clearCart } = React.useContext(CartContext);
  const { user, alert, showAlert, hideAlert } = React.useContext(UserContext);
  const history = useHistory();

  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const isEmpty = !name || alert.show;

  const handleSubmit = async (e) => {
    showAlert({ msg: 'submitting order...' });
    e.preventDefault();
    const response = await props.stripe
      .createToken()
      .catch(e => console.log(e));
    const { token } = response;
    if (token) {
      console.log(token);
    } else {
      hideAlert();
      setError(response.error.message);
    }
  }
  if (cart.length < 1) return <EmptyCart />

  return (
    <section className="section form">
      <h2 className="section-title">checkout</h2>
      <form className="checkout-form">
        <h3>order total: <span>${total}</span></h3>
        {/* Name Input */}
        <div className="form-control">
          <label htmlFor="name">name</label>
          <input type="text" value={name} id="name" onChange={(e) => setName(e.target.value)} />
        </div>

        {/* Cart Input (Stripe) */}
        <div className="stripe-input">
          <label htmlFor="card">credit or debit card</label>
          <p className="stripe-info">
            test using this info: <span>4242 4242 4242 4242</span><br />
            enter any 5 digits number for zip code <br />
            enter any 3 digits number for CVC
          </p>
        </div>

        {/* Stripe Elements */}
        <CardElement id="card" className="card-element"></CardElement>
        {/* Errors and others */}
        {error && <p className="form-empty">{error}</p>}
        {
          isEmpty
            ? <p className="form-empty">please fill out name fields</p>
            : <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block">Submit</button>
        }
      </form>
    </section>
  )
}
const CardForm = injectStripe(Checkout);
const StripeWrapper = () => {
  return (
    <StripeProvider
      apiKey={process.env.REACT_APP_P_KEY}
    >
      <Elements>
        <CardForm />
      </Elements>
    </StripeProvider>
  );
}

export default StripeWrapper;