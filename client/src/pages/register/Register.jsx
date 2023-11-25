import React from "react";
import "./register.scss";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div className="register">
      <div className="card">
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Password" />

            <input type="text" placeholder="Name" />
            <button>Register</button>
          </form>
        </div>
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            doloribus consectetur sapiente architecto dolores ratione porro
            quisquam ut minima dignissimos. Autem sint officia aliquid rerum
            odit aspernatur ea vel nulla.
          </p>
          <span>Did you have an account ? </span>
          <Link to={"/login"}>
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
