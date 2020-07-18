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
        <div className="row justify-content-center">
          <div className="avatar-wrp cursor-pointer position-relative">
            <img src={Images.AVATAR_DEF} alt="avatar" className="avatar " />
            <i className="fas fa-camera-retro avatar-icon"></i>
          </div>
        </div>
        <div className="row justify-content-center mt-3">
          <div className="input-group col-3">
            <input
              type="text"
              className="form-control text-center py-2 border-right-0 border"
              value={"hihi"}
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
      </div>
    </div>
  );
};

export default ProfileInfo;
