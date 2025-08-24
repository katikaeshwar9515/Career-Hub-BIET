import React, { useContext } from "react";
import { Context } from "../../main";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div className="text-align: center">&copy; All Rights Reserved</div>
    </footer>
  );
};

export default Footer;
