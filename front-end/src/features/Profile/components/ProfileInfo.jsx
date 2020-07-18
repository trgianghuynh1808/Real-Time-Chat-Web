import React from "react";

import Images from "constants/images";

const ProfileInfo = () => {
  const handleCopyButton = () => {
    let copyText = document.getElementById("copy-btn");

    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    document.execCommand("copy");
  };

  return (
    <div className="profile-wrp">
      <div className="container-fluid">
        <div className="row justify-content-center position-relative">
          <div className="avatar-wrp cursor-pointer">
            <img src={Images.AVATAR_DEF} alt="avatar" className="avatar " />
            <i className="fas fa-camera-retro avatar-icon"></i>
          </div>
        </div>
        <div className="row justify-content-center mt-3">
          <div className="col-3">
            <div className="input-group mt-3">
              <input
                type="text"
                className="form-control text-center"
                value={"hihi"}
                id="copy-btn"
                readOnly
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={handleCopyButton}
                >
                  Mã kết bạn
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
