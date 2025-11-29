import React from "react";
import InfoPagesLayout from "../components/InfoPagesLayout";
import "./HelpSupportPage.scss";

const HelpSupportPage = () => {
  return (
    <InfoPagesLayout activePage="help-support">
      <div className="help-support__container">
        <h1 className="help-support__title">Help & Support</h1>
        <p className="help-support__subtitle">
          Need assistance? Our support team is here to ensure your experience on
          Go Trade Türkiye is seamless and productive. Reach out directly for
          personalized help, whether you're a buyer or supplier.
        </p>

        <div className="help-support__contact-support">
          <h2 className="help-support__section-title">Contact Support</h2>
            <p className="help-support__section-text">
                Need help fast? Our support team is ready to assist and is available to address any specific needs, from setting
up your profile to optimizing search results, so you can focus on building valuable business connections..
Reach out via our <a href="#" className="help-support__contact">contact form</a>.
            </p>
        </div>

      </div>
    </InfoPagesLayout>
  );
};

export default HelpSupportPage;
