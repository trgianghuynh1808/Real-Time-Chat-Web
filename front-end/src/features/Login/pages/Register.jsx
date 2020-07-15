import React from "react";
import { FastField, Form, Formik } from "formik";
import { useHistory } from "react-router-dom";

import InputField from "components/FormFields/InputField";
import userApi from "api/userApi";
import { showInfoToast } from "libs/toast-libs";

const Register = () => {
  const initialValues = {
    username: "",
    email: "",
    pass: "",
    confirmPass: "",
  };
  const history = useHistory();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        const { username, email, pass: password, confirmPass } = values;

        if (password !== confirmPass) {
          showInfoToast("Xác nhận mật khẩu sai! Hãy thử lại.");

          return resetForm();
        }

        const fetchRegister = async () => {
          try {
            await userApi.register({ username, email, password });
            return history.push("/account/login");
          } catch (err) {
            resetForm();
          }
        };

        fetchRegister();
      }}
    >
      {(formik) => {
        return (
          <div className="limiter">
            <div className="container-login100">
              <div className="wrap-login100">
                <div className="login100-form-title">
                  <span className="login100-form-title-1">Đăng Ký</span>
                </div>
                <Form className="login100-form validate-form">
                  <FastField
                    component={InputField}
                    label={"Tài Khoản"}
                    name={"username"}
                    placeholder={"Nhập tài khoản"}
                    required
                  />
                  <FastField
                    component={InputField}
                    label={"Email"}
                    name={"email"}
                    placeholder={"Nhập email"}
                    type={"email"}
                  />
                  <FastField
                    component={InputField}
                    label={"Mật Khẩu"}
                    name={"pass"}
                    placeholder={"Nhập mật khẩu"}
                    type={"password"}
                    autoComplete={"new-password"}
                    subTitle={
                      "* Mật khẩu cần có ít nhất 8 ký tự. Có ít nhất một chữ hoa, một chứ thường, một số."
                    }
                    pattern={"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"}
                  />
                  <div className="mt-2 w-100">
                    <FastField
                      component={InputField}
                      label={"Nhập Lại Mật Khẩu"}
                      name={"confirmPass"}
                      placeholder={"Nhập lại mật khẩu"}
                      type={"password"}
                      autoComplete={"new-password"}
                    />
                  </div>
                  <div className="flex-sb-m w-full p-b-30">
                    <div className="contact100-form-checkbox">
                      <a href="/account/login" className="txt1">
                        Đã có tài khoản?
                      </a>
                    </div>
                    <div>
                      <a href="/account/forgot-password" className="txt1">
                        Quên mật khẩu?
                      </a>
                    </div>
                  </div>
                  <div className="container-login100-form-btn">
                    <button
                      className="login100-form-btn"
                      type="submit"
                      disabled={!(formik.isValid && formik.dirty)}
                    >
                      Đăng ký
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default Register;
