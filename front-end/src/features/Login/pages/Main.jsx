import React from "react";

const Login = () => {
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-form-title">
            <span className="login100-form-title-1">Đăng Nhập</span>
          </div>
          <form className="login100-form validate-form">
            <div className="wrap-input100 validate-input m-b-26">
              <span className="label-input100">Tài Khoản</span>
              <input
                className="input100"
                type="text"
                name="username"
                placeholder="Nhập tài khoản"
              />
              <span className="focus-input100" />
            </div>
            <div className="wrap-input100 validate-input m-b-18">
              <span className="label-input100">Mật Khẩu</span>
              <input
                className="input100"
                type="password"
                name="pass"
                placeholder="Nhập mật khẩu"
                autoComplete="new-password"
              />
              <span className="focus-input100" />
            </div>
            <div className="flex-sb-m w-full p-b-30">
              <div className="contact100-form-checkbox">
                <a href="/account/register" className="txt1">
                  Đăng ký tài khoản
                </a>
              </div>
              <div>
                <a href="/account/forgot-password" className="txt1">
                  Quên mật khẩu?
                </a>
              </div>
            </div>
            <div className="container-login100-form-btn">
              <button className="login100-form-btn">Đăng nhập</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
