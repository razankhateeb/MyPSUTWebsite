import React from "react";
import "../CSS/404.css";
import "../index.css";

import { Modal } from "react-bootstrap";

export default function TermsOfUse(props) {
  return (
    <Modal
      show={props.show}
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h5>Terms Of Use</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className="popups-headers">Terms Of Use</h5>
        <p>
          Please read these terms of use carefully before using this website.
          Access to and use of this website is governed strictly by these Terms
          of Use. If you do not agree with any of these terms you should
          discontinue use of this website.
        </p>
        <h5 className="popups-headers">Terms of Website Use</h5>
        <p>
          This website provides brief information and an overview about MyPSUT
          Website (defined below). Access to MyPSUT Website is provided by
          MyPSUT. For the purposes of this agreement, The "Website" shall mean
          the Website of MyPSUT available to the general public and located at
          http://MyPSUT.com/ and selected other domains. Please read these terms
          of use carefully before you start to use MyPSUT Website, as these
          terms of use will apply to your use of and access to the Website. Each
          time you use MyPSUT Website, you confirm you accept these terms of use
          and you agree to comply fully with them. If you do not agree to these
          terms of use, you should not use or access MyPSUT Website. These terms
          of use may be revised by us at any time by amending this page. Please
          check this webpage from time to time to note any changes made as they
          are binding on you as soon as you access MyPSUT Website.
        </p>
        <h5 className="popups-headers">Monitoring by MyPSUT</h5>
        <p>
          Your use of the information, products and services on this Website may
          be monitored by MyPSUT and that the resultant information may be used
          by MyPSUT for its internal business purposes or in accordance with the
          rules of any applicable regulatory or self-regulatory organization.
        </p>
        <h5 className="popups-headers">
          Information Made Available Through this Service
        </h5>
        <p>
          You are permitted to store, display, analyze, modify, reformat and
          print the information made available to you via these services only
          for your own use. You are not permitted to publish, transmit, or
          otherwise reproduce this information, in whole or in part, in any
          format to any third party without the express written consent of
          MyPSUT. In addition, you are not permitted to alter, obscure, or
          remove any copyright, trademark or any other notices that are provided
          to you in connection with the information. MyPSUT reserves the right,
          at any time and from time to time, in the interests of its own
          editorial discretion and business judgment to add, modify, or remove
          any of the information. These Terms and Conditions of Use are not
          intended to, and will not, transfer or grant any rights in or to the
          information other than those which are specifically described herein,
          and all rights not expressly granted herein are reserved by MyPSUT or
          the third party providers from whom MyPSUT has obtained the
          information. You are required to read and abide by any additional
          terms and conditions that may be posted on this service from time to
          time concerning information obtained from specific third party
          providers. Such third party providers shall have no liability to you
          for monetary damages on account of the information provided to you via
          this service.
        </p>
        <h5 className="popups-headers">
          No warranties made as to content; no responsibilities to update
        </h5>
        <p>
          MyPSUT makes no warranty, express or implied, concerning this service.
          The services provided by us and our third party providers are on an
          "as is" basis at your sole risk. MyPSUT expressly disclaims any
          implied warranty of merchantability or fitness for a particular
          purpose, including any warranty for the use or the results of the use
          of the services with respect to their correctness, quality, accuracy,
          completeness, reliability, performance, timeliness, or continued
          availability. Neither MyPSUT or any of its third party providers shall
          have any responsibility to maintain the data and services made
          available on this Website or to supply any corrections, updates, or
          releases in connection therewith. Availability of data and services
          are subject to change without notice.
        </p>
        <h5 className="popups-headers">
          No liability for content; no liability arising from use{" "}
        </h5>
        <p>
          MyPSUT shall have no liability, contingent or otherwise, to you or to
          third parties, or any responsibility whatsoever, for the failure of
          any connection or communication service to provide or maintain your
          access to this service, or for any interruption or disruption of such
          access or any erroneous communication between MyPSUT and you,
          regardless of whether the connection or communication service is
          provided by MyPSUT or a third party service provider. MyPSUT shall
          have no liability, contingent or otherwise, to you or to third
          parties, for the correctness, quality, accuracy, timeliness,
          reliability, performance, continued availability, completeness or
          delays, omissions, or interruptions in the delivery of the data and
          services available on this Website or for any other aspect of the
          performance of this service or for any failure or delay in the
          execution of any transactions through this service. In no event will
          MyPSUT be liable for any special, indirect, incidental, or
          consequential damages which may be incurred or experienced on account
          of you using the data or services made available on this Website, even
          if MyPSUT has been advised of the possibility of such damages. MyPSUT
          will have no responsibility to inform you of any difficulties
          experienced by MyPSUT or third parties with respect to the use of the
          services or to take any action in connection therewith.
        </p>
        <h5 className="popups-headers">No warranties made as to security</h5>
        <p>
          MyPSUT makes no warranty whatsoever to you, express or implied,
          regarding the security of the Website, including with respect to the
          ability of unauthorized persons to intercept or access information
          transmitted by you through this service.
        </p>
        <h5 className="popups-headers">
          No liability for content; no liability arising from use
        </h5>{" "}
        <p>
          Content not to be construed as a solicitation or recommendation This
          material has been prepared for informational purposes only without
          regard to any particular user's objectives, financial situation, or
          means, and MyPSUT is not soliciting any action based upon it. This
          material is not to be construed as a recommendation; or an offer to
          buy or sell; or the solicitation of an offer to buy or sell any
          security, financial product, or instrument; or to participate in any
          particular trading strategy in any jurisdiction in which such an offer
          or solicitation, or trading strategy would be illegal. Certain
          transactions, including those involving futures, options, and
          high-yield securities, give rise to substantial risk and are not
          suitable for all investors. Although this material is based upon
          information that MyPSUT considers reliable and endeavors to keep
          current, MyPSUT has not verified this information and does not
          represent that this material is accurate, current, or complete and it
          should not be relied upon as such. No determination of suitability has
          been made; not all risks are disclosed; private advisors should be
          consulted: The fact that MyPSUT has made the data and services
          provided on this Website available to you constitutes neither a
          recommendation that you enter into a particular transaction nor a
          representation that any product described on this Website is suitable
          or appropriate for you. Many of the products described on this Website
          may involve risk and you should not enter into any transactions unless
          you have fully understood all such risks and have independently
          determined that such transactions are appropriate for you. Any
          discussion of the risks contained herein with respect to any product
          should not be considered to be a disclosure of all risks or complete
          discussion of the risks which are mentioned. You should neither
          construe any of the material contained herein as business, financial,
          investment, hedging, trading, legal, regulatory, tax, or accounting
          advice nor make this service the primary basis for any investment
          decisions made by or on behalf of you, your accountants, or your
          managed or fiduciary accounts, and you may want to consult your
          business advisor, attorney, and tax and accounting advisors concerning
          any contemplated transactions. Date of policy: September 8, 2022
        </p>
      </Modal.Body>
    </Modal>
  );
}
