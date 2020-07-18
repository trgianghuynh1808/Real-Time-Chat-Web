import React, { useState, Fragment, useEffect } from "react";
import { isEmpty } from "lodash/fp";

import Images from "constants/images";
import { showInfoToast } from "libs/toast-libs";

const ProfileInfo = ({ userProfile, handleUpdateNickName }) => {
  const [curNickName, setCurNickname] = useState("");

  const handleCopyButton = () => {
    let copyText = document.getElementById("copy-btn");

    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    document.execCommand("copy");
    showInfoToast("Hãy gửi mã này cho bạn bè ^^~");
  };

  useEffect(() => {
    setCurNickname(userProfile.nick_name || "");
  }, [userProfile]);

  if (isEmpty(userProfile)) return <Fragment />;

  const {
    add_friend_code: addFriendCode,
    username,
    email,
    nick_name: nickName,
  } = userProfile;

  return (
    <div className="profile-wrp">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="avatar-wrp cursor-pointer position-relative">
            <img src={Images.AVATAR_DEF} alt="avatar" className="avatar " />
            <i className="fas fa-camera-retro avatar-icon fs-24"></i>
          </div>
        </div>
        <div className="row justify-content-center mt-3">
          <div className="input-group col-3">
            <input
              type="text"
              className="form-control text-center py-2 border-right-0 border"
              defaultValue={addFriendCode}
              id="copy-btn"
              readOnly
            />

            <span className="input-group-append">
              <button
                className="btn btn-outline-secondary border-left-0 border"
                type="button"
                onClick={handleCopyButton}
              >
                <i className="fas fa-user-plus"></i>
              </button>
            </span>
          </div>
        </div>
        <div className="container">
          <div className="row info-user-wrp row justify-content-center">
            <div className="col-4 border-right ">
              <h6 className="font-weight-bold text-capitalize text-center">
                Thông tin tài khoản
              </h6>
              <div className="form-group mt-3">
                <label htmlFor="username">Nickname:</label>
                <div className="input-group ">
                  <input
                    type="text"
                    className="form-control text-center py-2 border-right-0 border"
                    value={curNickName}
                    onChange={(event) => {
                      setCurNickname(event.target.value);
                    }}
                  />

                  <span className="input-group-append">
                    <button
                      className="btn btn-outline-secondary border-left-0 border"
                      type="button"
                      onClick={() => {
                        if (curNickName && curNickName !== nickName)
                          handleUpdateNickName(curNickName);
                      }}
                    >
                      <i className="fas fa-user-edit"></i>
                    </button>
                  </span>
                </div>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="username">Tài khoản:</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  defaultValue={username}
                  disabled
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  defaultValue={email}
                  disabled
                />
              </div>
            </div>
            <div className="col-4">
              <h6 className="font-weight-bold text-capitalize text-center">
                Đổi mật khẩu
              </h6>
              <div className="form-group mt-3">
                <label htmlFor="password">Mật khẩu mới:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  autoComplete="new-password"
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="confirmPass">Nhập lại mật khẩu mới:</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPass"
                />
              </div>
              <div className="row justify-content-center mt-2">
                <button type="button" className="btn btn-success mr-2">
                  Xác Nhận
                </button>
                <button type="button" className="btn btn-danger ml-2">
                  Trở Lại
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
