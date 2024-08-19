
//import './App.css';
import './FormLogin.css';
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [listOfPosts, setListOfPosts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/basic").then((response) => {
      setListOfPosts(response.data);
      console.log(response.data)
    });
  }, []);
  return (
    <div className="App">
      {listOfPosts.map((value, key) => {
        return (
          <div className="container">
            <div className="form_area">
              <p className="title">SIGN UP</p>
              <form action="">
                <div className="form_group">
                  <label className="sub_title" htmlFor="name">Name</label>
                  <input placeholder="Enter your full name" className="form_style" type="text" />
                </div>
                <div className="form_group">
                  <label className="sub_title" htmlFor="email">Email</label>
                  <input placeholder="Enter your email" id="email" className="form_style" type="email" />
                </div>
                <div className="form_group">
                  <label className="sub_title" htmlFor="password">Password</label>
                  <input placeholder="Enter your password" id="password" className="form_style" type="password" />
                </div>
                <div>
                  <button className="btn">SIGN UP</button>
                  <p>Have an Account? <a className="link" href="#">Login Here!</a></p>
                </div>
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
