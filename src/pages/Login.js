import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import loginUser from '../strapi/loginUser';
import registerUser from '../strapi/registerUser';
import { UserContext } from '../context/user';

const Login = () => {
  const history = useHistory();
  const { userLogin, alert, showAlert } = React.useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('default');
  const [isMember, setIsMember] = useState(true);

  let isEmpty = !email || !password || !username || alert.show;
  const toggleMember = () => {
    setIsMember((prevMember) => {
      let isMember = !prevMember;
      isMember ? setUsername('default') : setUsername('');
      return isMember;
    })
  }
  const handleSubmit = async (e) => {
    showAlert({
      msg: 'accessing user data... please wait...'
    })
    e.preventDefault();
    let response;
    if (isMember) {
      response = await loginUser({ email, password });
    } else {
      response = await registerUser({ email, password, username });
    }
    if (response) {
      const { jwt: token, user: { username } } = response.data;
      const newUser = { token, username };
      userLogin(newUser);
      showAlert({
        msg: `you are logged in: ${username}. happy shopping!`
      });
      history.push('/products');
    } else {
      showAlert({
        msg: `email or password incorrect.`,
        type: 'danger'
      })
    }
  }

  return (
    <section className="form section">
      <h2 className="section-title">{isMember ? "Sign In" : "register"}</h2>
      <form className="login-form">
        <div className="form-control">
          <label htmlFor="email">email</label>
          <input type="email" value={email} id="email" onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-control">
          <label htmlFor="password">password</label>
          <input type="password" value={password} id="password" onChange={e => setPassword(e.target.value)} />
        </div>
        {!isMember && (
          <div className="form-control">
            <label htmlFor="username">username</label>
            <input type="username" value={username} id="username" onChange={e => setUsername(e.target.value)} />
          </div>
        )}

        {/* Empty Form text */}
        {isEmpty && <p className="form-empty">Please enter all feilds</p>}
        {/* Submit button */}
        {!isEmpty && (
          <button className="btn btn-block btn-primary" onClick={handleSubmit}>Submit</button>
        )}
        {/* Register Link */}
        <p className="register-link">
          {isMember ? "Need to register" : "Already a member"}
          <button type="button" onClick={toggleMember}>Click here</button>
        </p>
      </form>
    </section>
  )
}

export default Login
