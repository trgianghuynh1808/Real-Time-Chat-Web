import React from "react";
import { FastField, Form, Formik } from "formik";
import { useHistory } from "react-router-dom";

import InputField from "components/FormFields/InputField";
import userApi from "api/userApi";
import { saveToken, saveRefreshToken } from "libs/token-libs";

const Login = () => {
  const initialValues = {
    username: "",
    password: "",
  };
  const history = useHistory();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        const { username, password } = values;

        const fetchLogin = async () => {
          try {
            const resp = await userApi.login({ username, password });
            const { token, refresh_token } = resp.data;
            saveToken(token);
            saveRefreshToken(refresh_token);
            history.push("/chat");
          } catch (error) {
            resetForm();
          }
        };

        fetchLogin();
      }}
    >
      {(formikProps) => {
        return (
          <div className="limiter">
            <div className="container-login100">
              <div className="wrap-login100">
                <div className="login100-form-title">
                  <span className="login100-form-title-1">Đăng Nhập</span>
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
                    label={"Mật Khẩu"}
                    name={"password"}
                    placeholder={"Nhập mật khẩu"}
                    type={"password"}
                    autoComplete={"new-password"}
                    pattern={"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"}
                  />
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
                    <button
                      className="login100-form-btn"
                      type="submit"
                      disabled={!(formikProps.isValid && formikProps.dirty)}
                    >
                      Đăng nhập
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

export default Login;
