import React, { useState } from "react";
import "../assets/css/style.css";
import { ToastContainer, toast } from "react-toastify";
import axiosinstance from "../utils/axiosinstance";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [Email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const GetCode = async () => {
    try {
      const response = await axiosinstance.post("auth/GetCode", { Email });
      toast(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      toast("Network error! Check your connection.");
    }
  };

  const RegisterSignUp = async () => {
    try {
      const response = await axiosinstance.post("auth/Register", {
        Email: Email,
        OTP: OTP,
        Password: Password,
      });
      if (response.data.Valid) {
        toast(response.data.message);
        setEmail("");
        setOTP("");
        setPassword("");
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const SignIn = async () => {
    try {
      const response = await axiosinstance.post("auth/Login", {
        Email: Email,
        Password: Password,
      });
      if (response.data.Valid) {
        toast(response.data.message);
        setEmail("");
        setPassword("");
        navigate("/client");
      } else {
        toast(response.data.message);
        setPassword("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="ftco-section">
      <div className="container">
        <ToastContainer />
        <div className="row justify-content-center">
          {isSignIn ? (
            <div className="col-md-12 col-lg-10">
              <div className="wrap d-md-flex">
                <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
                  <div className="text w-100">
                    <h2>Welcome to login</h2>
                    <p>Don't have an account?</p>
                    <button
                      className="btn btn-white btn-outline-white"
                      onClick={() => setIsSignIn(false)}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
                <div className="login-wrap p-4 p-lg-5">
                  <div className="d-flex">
                    <div className="w-100">
                      <h3 className="mb-4">Sign In</h3>
                    </div>
                  </div>
                  <form action="#" className="signin-form">
                    <div className="form-group mb-3">
                      <label className="label" htmlFor="name">
                        EMAIL
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="txtEmail"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email"
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" htmlFor="password">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="txtSignInPassword"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <button
                        type="button"
                        className="form-control btn btn-primary submit px-3"
                        onClick={SignIn}
                      >
                        Sign In
                      </button>
                    </div>
                    <div className="form-group d-md-flex">
                      <div className="w-50 text-md-start">
                        <a href="#">&nbsp;</a>
                      </div>
                      <div className="w-50 text-md-right">
                        <button
                          type="button"
                          onClick={() => {
                            setIsForgotPassword(true);
                            setIsSignIn(false);
                          }}
                          style={{ color: "#ce1212", border: "none" }}
                        >
                          Forgot Password ?
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : isForgotPassword ? (
            <div className="col-md-12 col-lg-10">
              <div className="wrap d-md-flex">
                <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
                  <div className="text w-100">
                    <h2>Password Reset</h2>
                  </div>
                </div>
                <div className="login-wrap p-4 p-lg-5">
                  <div className="d-flex">
                    <div className="w-100">
                      <h3 className="mb-4">Forgot Password</h3>
                    </div>
                  </div>
                  <form action="#" className="signin-form">
                    <div className="form-group mb-1">
                      <label className="label" htmlFor="name">
                        EMAIL
                      </label>
                    </div>
                    <div className="form-group d-md-flex">
                      <div className="w-75 text-left">
                        <input
                          type="text"
                          className="form-control"
                          id="txtStudent_IDForgot"
                          value={Email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter Email"
                        />
                      </div>
                      <div className="w-25 text-md-right">
                        <button
                          type="button"
                          className="btn btn-white btn-outline-white"
                          style={{
                            background: "#ce1212",
                            padding: "10px 10px",
                          }}
                          onClick={GetCode}
                        >
                          Get Code
                        </button>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" htmlFor="name">
                        Verification Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="txtCodeForgot"
                        value={OTP}
                        onChange={(e) => setOTP(e.target.value)}
                        placeholder="Verification Code"
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" htmlFor="password">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="txtSignUpPasswordForgot"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <button
                        type="button"
                        className="form-control btn btn-primary submit px-3"
                        onClick={RegisterSignUp}
                      >
                        Reset Password
                      </button>
                    </div>
                    <div className="form-group d-md-flex">
                      <div className="w-50 text-md-start">
                        <a href="#">&nbsp;</a>
                      </div>
                      <div className="w-50 text-md-right">
                        <button
                          type="button"
                          style={{ color: "#ce1212", border: "none" }}
                          onClick={() => {
                            setIsForgotPassword(false);
                            setIsSignIn(true);
                          }}
                        >
                          Back to SignIn
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-md-12 col-lg-10">
              <div className="wrap d-md-flex">
                <div className="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
                  <div className="text w-100">
                    <h2>Welcome to Registration</h2>
                    <p>Already have an account?</p>
                    <button
                      className="btn btn-white btn-outline-white"
                      onClick={() => setIsSignIn(true)}
                    >
                      Sign In
                    </button>
                  </div>
                </div>
                <div className="login-wrap p-4 p-lg-5">
                  <div className="d-flex">
                    <div className="w-100">
                      <h3 className="mb-4">Sign Up</h3>
                    </div>
                  </div>
                  <form action="#" className="signin-form">
                    <div className="form-group mb-1">
                      <label className="label" htmlFor="name">
                        EMAIL
                      </label>
                    </div>
                    <div className="form-group d-md-flex">
                      <div className="w-70 text-left">
                        <input
                          type="text"
                          className="form-control"
                          id="txtEmailSignUp"
                          value={Email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter Email"
                        />
                      </div>
                      <div className="w-30 text-md-right">
                        <button
                          type="button"
                          className="btn btn-white btn-outline-white"
                          style={{
                            background: "#ce1212",
                            padding: "10px 10px",
                          }}
                          onClick={GetCode}
                        >
                          Get Code
                        </button>
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" htmlFor="name">
                        Verification Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="txtCode"
                        value={OTP}
                        onChange={(e) => setOTP(e.target.value)}
                        placeholder="Verification Code"
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" htmlFor="password">
                        Create Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="txtSignUpPassword"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <button
                        type="button"
                        className="form-control btn btn-primary submit px-3"
                        onClick={RegisterSignUp}
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SignIn;
