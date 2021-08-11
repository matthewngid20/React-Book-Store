import logo from './logo.svg';
import './App.css';
import { Header } from './Components/Header';
import { Content } from './Components/Content';
import { Footer } from './Components/Footer';

import {useState} from 'react';

const Nav = [
  {name: "Home", link: "/"},
  {name: "About", link: "/about"},
  {name: "Register", link: "/Register"},
  {name: "Login", link: "/login"},
  {name: "Add data", link: "/add"},
]

const AuthNav = [
  {name: "Home", link: "/"},
  {name: "About", link: "/about"},
  {name: "Logout", link: "/logout"},
  {name: "Add data", link: "/add"},
]

function App() {
  const [auth, setAuth] = useState(false)

  return (
    <div className="App">
      <Header name="Bookworm Den" navigation={ (auth) ? AuthNav : Nav } auth={auth} />
      <Content authHandler = { setAuth } />
      <Footer />
    </div>
  );
}

export default App;
