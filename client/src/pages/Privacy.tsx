import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0c1220] text-white">
      <Navigation />

      <section className="pt-32 pb-24">
        <div className="container max-w-3xl">
          <h1
            className="text-4xl font-bold mb-2"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mb-12">Last updated: 9 March 2026</p>

          <div className="space-y-8 text-sm text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>1. Introduction</h2>
              <p className="mb-3">
                Adros AI ("Adros", "we", "us", or "our") is operated by Matrix AI Solution(s) Pte. Ltd., a company registered in Singapore (UEN: pending registration), with its registered address at 22 Sin Ming Lane #06-76 Midview City, Singapore 573969.
              </p>
              <p className="mb-3">
                This Privacy Policy explains how we collect, use, disclose, and protect your personal data in accordance with the <strong>Personal Data Protection Act 2012 (PDPA)</strong> of Singapore and other applicable data protection laws.
              </p>
              <p>
                By using our services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>2. Data We Collect</h2>
              <p className="mb-3">We collect the following categories of personal data:</p>
              <p className="mb-2"><strong className="text-white">Account Information:</strong> Name, email address, and authentication credentials when you create an account.</p>
              <p className="mb-2"><strong className="text-white">Ad Platform Data:</strong> When you connect your Meta Ads or Google Ads accounts via OAuth, we access campaign data, ad performance metrics, audience data, and creative assets. We do not store your ad platform passwords.</p>
              <p className="mb-2"><strong className="text-white">Usage Data:</strong> Information about how you interact with our services, including queries made, features used, and session duration.</p>
              <p className="mb-2"><strong className="text-white">Payment Information:</strong> If you subscribe to a paid plan, payment processing is handled by third-party payment processors. We do not store your credit card details.</p>
              <p><strong className="text-white">Technical Data:</strong> IP address, browser type, device information, and cookies for service functionality and analytics.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>3. How We Use Your Data</h2>
              <p className="mb-3">We use your personal data for the following purposes:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-400">
                <li>To provide, maintain, and improve our AI marketing services</li>
                <li>To analyse your ad campaigns and generate marketing insights</li>
                <li>To generate ad creatives and campaign strategies</li>
                <li>To process payments and manage your subscription</li>
                <li>To communicate with you about your account, updates, and support</li>
                <li>To comply with legal obligations under Singapore law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>4. Third-Party Services & OpenClaw</h2>
              <p className="mb-3">
                Adros integrates with third-party services including but not limited to Meta Ads API, Google Ads API, OpenClaw, and AI model providers (e.g., Anthropic, OpenAI). When you use these integrations:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-400 mb-3">
                <li>Data is transmitted to these third-party services as necessary to provide the requested functionality</li>
                <li>Each third-party service has its own privacy policy and terms of service</li>
                <li>We are not responsible for the data practices of these third-party services</li>
              </ul>
              <p>
                <strong className="text-white">OpenClaw Integration:</strong> If you choose to use the OpenClaw integration (including the Done-For-You setup), OpenClaw runs on your own infrastructure (VPS or local machine). Adros does not host, manage, or have access to your OpenClaw instance after setup is complete. You are solely responsible for the security and maintenance of your OpenClaw installation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>5. Data Retention</h2>
              <p>
                We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by applicable Singapore law. When you delete your account, we will delete or anonymise your personal data within 30 days, except where retention is required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>6. Data Security</h2>
              <p className="mb-3">
                We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These measures include encryption in transit (TLS/SSL), secure authentication (OAuth 2.0), and access controls.
              </p>
              <p>
                However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your personal data, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>7. Your Rights Under PDPA</h2>
              <p className="mb-3">Under the Singapore Personal Data Protection Act 2012, you have the right to:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-400">
                <li><strong className="text-gray-300">Access:</strong> Request access to your personal data that we hold</li>
                <li><strong className="text-gray-300">Correction:</strong> Request correction of inaccurate or incomplete personal data</li>
                <li><strong className="text-gray-300">Withdrawal of Consent:</strong> Withdraw your consent for the collection, use, or disclosure of your personal data at any time</li>
                <li><strong className="text-gray-300">Data Portability:</strong> Request a copy of your data in a structured, machine-readable format</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please contact us at <a href="mailto:privacy@adros.ai" className="text-purple-400 hover:text-purple-300">privacy@adros.ai</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>8. International Data Transfers</h2>
              <p>
                Your data may be transferred to and processed in countries outside of Singapore. Where we transfer personal data internationally, we ensure that appropriate safeguards are in place in accordance with the PDPA.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>9. Cookies</h2>
              <p>
                We use essential cookies for authentication and service functionality, and analytics cookies to understand how our services are used. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on our website and updating the "Last updated" date. Your continued use of our services after such changes constitutes your acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>11. Contact Us</h2>
              <p className="mb-3">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <p className="text-gray-400">
                <strong className="text-white">Data Protection Officer</strong><br />
                Matrix AI Solution(s) Pte. Ltd.<br />
                22 Sin Ming Lane #06-76 Midview City, Singapore 573969<br />
                Email: <a href="mailto:privacy@adros.ai" className="text-purple-400 hover:text-purple-300">privacy@adros.ai</a>
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
