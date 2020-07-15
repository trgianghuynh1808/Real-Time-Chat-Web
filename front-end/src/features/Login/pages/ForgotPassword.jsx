import React from "react";
import { FastField, Form, Formik } from "formik";
import { useHistory } from "react-router-dom";

import InputField from "components/FormFields/InputField";
import userApi from "api/userApi";

const ForgotPassword = () => {
  const initialValues = { email: "" };
  const history = useHistory();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        const { email } = values;

        const fetchForgotPassword = async () => {
          try {
            await userApi.forgotPassword(email);
            history.push("/account/login");
          } catch (error) {
            resetForm();
          }
        };

        fetchForgotPassword();
      }}
    >
      {(formikProps) => {
        return (
          <div className="limiter">
            <div className="container-login100">
              <div className="wrap-login100">
                <div className="login100-form-title">
                  <span className="login100-form-title-1">Quên Mật Khẩu</span>
                </div>
                <Form className="login100-form validate-form">
                  <FastField
                    component={InputField}
                    label={"Email"}
                    name={"email"}
                    placeholder={"Nhập email"}
                    type={"email"}
                  />
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
                    <button
                      className="login100-form-btn"
                      type="submit"
                      disabled={!(formikProps.isValid && formikProps.dirty)}
                    >
                      Xác nhận
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

export default ForgotPassword;
