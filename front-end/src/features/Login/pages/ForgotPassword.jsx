import React from "react";

const ForgotPassword = () => {
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-form-title">
            <span className="login100-form-title-1">Quên Mật Khẩu</span>
          </div>
          <form className="login100-form validate-form">
            <div className="wrap-input100 validate-input m-b-26">
              <span className="label-input100">Email</span>
              <input
                className="input100"
                type="text"
                name="username"
                placeholder="Nhập email"
              />
              <span className="focus-input100" />
            </div>
            <div className="flex-sb-m w-full p-b-30">
              <div className="contact100-form-checkbox">
                <a href="/account/login" className="txt1">
                  Đã có tài khoản?
                </a>
              </div>
              <div>
                <a href="/account/register" className="txt1">
                  Đăng ký tài khoản
                </a>
              </div>
            </div>
            <div className="container-login100-form-btn">
              <button className="login100-form-btn">Xác nhận</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
