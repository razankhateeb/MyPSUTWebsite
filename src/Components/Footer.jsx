import React from "react";
import { useState } from "react";
import PrivacyPolicy from "./Privacy";
import TermsOfUse from "./TermsOfUse";

function FooterComponent() {
  const [modalPrivacyPolicy, setModalPrivacyPolicyShow] = useState(false);
  const [modalTermsOfUse, setModalTermsOfUseShow] = useState(false);

  return (
    <footer className="border-top footer text-muted">
      <div className="container footer-container">
        <div>
          <a
            onClick={() => {
              setModalPrivacyPolicyShow(true);
            }}
          >
            Privacy Policy
          </a>
          <a
            onClick={() => {
              setModalTermsOfUseShow(true);
            }}
          >
            Terms of Use
          </a>
        </div>

        <a>Copyright © 2022 MyPSUT</a>
      </div>
      <PrivacyPolicy
        show={modalPrivacyPolicy}
        onHide={() => setModalPrivacyPolicyShow(false)}
      ></PrivacyPolicy>
      <TermsOfUse
        show={modalTermsOfUse}
        onHide={() => setModalTermsOfUseShow(false)}
      ></TermsOfUse>
    </footer>
  );
}
export default FooterComponent;
