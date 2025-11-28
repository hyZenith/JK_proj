import React from "react";
import "./PrivacyPage.scss";

const PrivacyPage = () => {
    return (
        <div className="privacy">
            <div className="privacy__container">
                <h1 className="privacy__title">Privacy Policy</h1>
                <p className="privacy__updated">Last Updated: November 23, 2024</p>

                <section className="privacy__section">
                    <h2>1. Information We Collect</h2>
                    <p>
                        We collect information that you provide directly to us, including:
                    </p>
                    <ul>
                        <li>Name, email address, phone number, and company information</li>
                        <li>Business details and product information</li>
                        <li>Payment and billing information</li>
                        <li>Communications with us and other users</li>
                        <li>Usage data and analytics</li>
                    </ul>
                </section>

                <section className="privacy__section">
                    <h2>2. How We Use Your Information</h2>
                    <p>We use the information we collect to:</p>
                    <ul>
                        <li>Provide, maintain, and improve our services</li>
                        <li>Process transactions and send related information</li>
                        <li>Send you technical notices and support messages</li>
                        <li>Respond to your comments and questions</li>
                        <li>Monitor and analyze trends, usage, and activities</li>
                        <li>Detect, prevent, and address fraud and security issues</li>
                    </ul>
                </section>

                <section className="privacy__section">
                    <h2>3. Information Sharing</h2>
                    <p>
                        We may share your information in the following circumstances:
                    </p>
                    <ul>
                        <li>With other users when you use our platform to connect with them</li>
                        <li>With service providers who perform services on our behalf</li>
                        <li>In response to legal requests or to prevent harm</li>
                        <li>In connection with a merger, sale, or acquisition</li>
                    </ul>
                    <p>
                        We do not sell your personal information to third parties.
                    </p>
                </section>

                <section className="privacy__section">
                    <h2>4. Data Security</h2>
                    <p>
                        We take reasonable measures to help protect your personal information
                        from loss, theft, misuse, unauthorized access, disclosure, alteration,
                        and destruction. However, no internet or email transmission is ever
                        fully secure or error-free.
                    </p>
                </section>

                <section className="privacy__section">
                    <h2>5. Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul>
                        <li>Access and receive a copy of your personal data</li>
                        <li>Rectify inaccurate or incomplete data</li>
                        <li>Request deletion of your personal data</li>
                        <li>Object to or restrict processing of your data</li>
                        <li>Data portability</li>
                        <li>Withdraw consent at any time</li>
                    </ul>
                </section>

                <section className="privacy__section">
                    <h2>6. Cookies and Tracking</h2>
                    <p>
                        We use cookies and similar tracking technologies to track activity on
                        our Service and hold certain information. You can instruct your browser
                        to refuse all cookies or to indicate when a cookie is being sent.
                    </p>
                </section>

                <section className="privacy__section">
                    <h2>7. International Data Transfers</h2>
                    <p>
                        Your information may be transferred to and maintained on computers
                        located outside of your state, province, country, or other governmental
                        jurisdiction where data protection laws may differ.
                    </p>
                </section>

                <section className="privacy__section">
                    <h2>8. Children's Privacy</h2>
                    <p>
                        Our Service is not intended for children under 18 years of age. We do
                        not knowingly collect personal information from children under 18.
                    </p>
                </section>

                <section className="privacy__section">
                    <h2>9. Changes to This Policy</h2>
                    <p>
                        We may update our Privacy Policy from time to time. We will notify you
                        of any changes by posting the new Privacy Policy on this page and
                        updating the "Last Updated" date.
                    </p>
                </section>

                <section className="privacy__section">
                    <h2>10. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at{" "}
                        <a href="mailto:privacy@gotradetürkiye.com">privacy@gotradetürkiye.com</a>
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPage;
