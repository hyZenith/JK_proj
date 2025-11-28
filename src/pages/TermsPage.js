import React from "react";
import "./TermsPage.scss";

const TermsPage = () => {
    return (
        <div className="terms">
            <div className="terms__container">
                <h1 className="terms__title">Terms of Use</h1>
                <p className="terms__updated">Last Updated: November 23, 2024</p>

                <section className="terms__section">
                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using Go Trade Türkiye's platform, you accept and agree
                        to be bound by the terms and provision of this agreement. If you do not
                        agree to these terms, please do not use our services.
                    </p>
                </section>

                <section className="terms__section">
                    <h2>2. Use of Service</h2>
                    <p>
                        Our platform is designed to connect buyers and suppliers. You agree to
                        use the service only for lawful purposes and in accordance with these
                        Terms of Use.
                    </p>
                    <ul>
                        <li>You must be at least 18 years old to use this service</li>
                        <li>You must provide accurate and complete information</li>
                        <li>You are responsible for maintaining the confidentiality of your account</li>
                        <li>You must not use the service for any illegal or unauthorized purpose</li>
                    </ul>
                </section>

                <section className="terms__section">
                    <h2>3. User Accounts</h2>
                    <p>
                        When you create an account with us, you must provide information that is
                        accurate, complete, and current at all times. Failure to do so constitutes
                        a breach of the Terms, which may result in immediate termination of your
                        account on our Service.
                    </p>
                </section>

                <section className="terms__section">
                    <h2>4. Intellectual Property</h2>
                    <p>
                        The Service and its original content, features, and functionality are and
                        will remain the exclusive property of Go Trade Türkiye and its licensors.
                        The Service is protected by copyright, trademark, and other laws.
                    </p>
                </section>

                <section className="terms__section">
                    <h2>5. Prohibited Activities</h2>
                    <p>You may not access or use the Service for any purpose other than that for which we make the Service available. Prohibited activities include:</p>
                    <ul>
                        <li>Posting false, inaccurate, misleading, or fraudulent content</li>
                        <li>Impersonating another person or entity</li>
                        <li>Harassing, threatening, or intimidating other users</li>
                        <li>Attempting to gain unauthorized access to the Service</li>
                        <li>Engaging in any automated use of the system</li>
                    </ul>
                </section>

                <section className="terms__section">
                    <h2>6. Limitation of Liability</h2>
                    <p>
                        In no event shall Go Trade Türkiye, nor its directors, employees, partners,
                        agents, suppliers, or affiliates, be liable for any indirect, incidental,
                        special, consequential or punitive damages, including without limitation,
                        loss of profits, data, use, goodwill, or other intangible losses.
                    </p>
                </section>

                <section className="terms__section">
                    <h2>7. Governing Law</h2>
                    <p>
                        These Terms shall be governed and construed in accordance with the laws
                        of Turkey, without regard to its conflict of law provisions.
                    </p>
                </section>

                <section className="terms__section">
                    <h2>8. Changes to Terms</h2>
                    <p>
                        We reserve the right, at our sole discretion, to modify or replace these
                        Terms at any time. We will provide notice of any significant changes by
                        posting the new Terms on this page.
                    </p>
                </section>

                <section className="terms__section">
                    <h2>9. Contact Us</h2>
                    <p>
                        If you have any questions about these Terms, please contact us at{" "}
                        <a href="mailto:legal@gotradetürkiye.com">legal@gotradetürkiye.com</a>
                    </p>
                </section>
            </div>
        </div>
    );
};

export default TermsPage;
