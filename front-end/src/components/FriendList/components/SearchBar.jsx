import React from "react";

const SearchBar = () => {
  return (
    <div className="row justify-content-center">
      <div className="col-12">
        <div className="form-group friend-list__has-search">
          <span className="fa fa-search form-control-feedback" />
          <input type="text" className="form-control" placeholder="Tìm bạn" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
