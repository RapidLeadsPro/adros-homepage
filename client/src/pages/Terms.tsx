import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#0c1220] text-white">
      <Navigation />

      <section className="pt-32 pb-24">
        <div className="container max-w-3xl">
          <h1
            className="text-4xl font-bold mb-2"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500 mb-12">Last updated: 9 March 2026</p>

          <div className="space-y-8 text-sm text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>1. Agreement to Terms</h2>
              <p className="mb-3">
                These Terms of Service ("Terms") constitute a legally binding agreement between you ("User", "you", or "your") and Matrix AI Solution(s) Pte. Ltd. ("Company", "we", "us", or "our"), operating as Adros AI, a company registered in Singapore with its registered address at 22 Sin Ming Lane #06-76 Midview City, Singapore 573969.
              </p>
              <p className="mb-3">
                By accessing or using our website, application, and services (collectively, the "Service"), you agree to be bound by these Terms. If you do not agree to these Terms, you must not use the Service.
              </p>
              <p>
                These Terms shall be governed by and construed in accordance with the <strong className="text-white">laws of the Republic of Singapore</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>2. Description of Service</h2>
              <p className="mb-3">
                Adros AI is an AI-powered marketing automation tool that provides market research, campaign strategy, ad creative generation, campaign deployment, and performance analysis capabilities. The Service operates through the Model Context Protocol (MCP) and integrates with third-party advertising platforms including Meta Ads and Google Ads.
              </p>
              <p className="mb-3">
                <strong className="text-white">Adros AI is a tool, not a service provider.</strong> We provide software tools and AI capabilities that assist you in managing your marketing activities. We do not guarantee any specific marketing outcomes, return on ad spend (ROAS), conversion rates, or business results.
              </p>
              <p>
                All marketing decisions, campaign deployments, budget allocations, and creative approvals remain your sole responsibility. You acknowledge that AI-generated recommendations and creatives should be reviewed before deployment.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>3. Account Registration &amp; Security</h2>
              <p className="mb-3">
                To use the Service, you must create an account and provide accurate, complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
              <p>
                You must immediately notify us of any unauthorised use of your account or any other breach of security. We will not be liable for any loss or damage arising from your failure to comply with this section.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>4. Subscription &amp; Payment</h2>
              <p className="mb-3">
                The Service offers free and paid subscription plans. Paid plans are billed on a monthly basis. All fees are quoted in United States Dollars (USD) unless otherwise stated.
              </p>
              <p className="mb-3">
                You may cancel your subscription at any time. Cancellation will take effect at the end of the current billing period. No refunds will be provided for partial months of service.
              </p>
              <p>
                We reserve the right to change our pricing at any time. We will provide at least 30 days' notice of any price changes to existing subscribers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>5. Third-Party Platform Integration</h2>
              <p className="mb-3">
                The Service integrates with third-party advertising platforms (Meta Ads, Google Ads) and AI model providers. By using these integrations, you agree to:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-400 mb-3">
                <li>Comply with the terms of service and policies of each third-party platform</li>
                <li>Authorise Adros AI to access your ad accounts via OAuth on your behalf</li>
                <li>Accept that third-party platform availability, API changes, or policy updates may affect the Service</li>
              </ul>
              <p>
                We are not responsible for any actions taken by third-party platforms, including but not limited to account suspensions, ad disapprovals, or policy violations resulting from your use of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>6. OpenClaw Integration &amp; Done-For-You Setup</h2>
              <p className="mb-3">
                The Service offers optional integration with OpenClaw, an open-source AI automation framework, and an optional Done-For-You setup service (priced at SGD 997).
              </p>
              <p className="mb-3">
                <strong className="text-white">By using the OpenClaw integration or the Done-For-You setup service, you acknowledge and agree that:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-400 mb-3">
                <li><strong className="text-gray-300">Self-Hosted Infrastructure:</strong> OpenClaw runs on your own infrastructure (VPS or local machine). After the initial setup is complete, you are solely responsible for the maintenance, security, updates, and operation of your OpenClaw installation.</li>
                <li><strong className="text-gray-300">Security Responsibility:</strong> You are solely responsible for securing your OpenClaw installation, including but not limited to firewall configuration, access controls, software updates, and data encryption. We provide initial security configuration during the Done-For-You setup but do not guarantee ongoing security.</li>
                <li><strong className="text-gray-300">Data Loss &amp; Breaches:</strong> We shall not be liable for any data loss, data breaches, unauthorised access, hacking, or any other security incidents that occur on your OpenClaw installation or any connected systems. You assume all risk associated with hosting and operating AI automation software on your infrastructure.</li>
                <li><strong className="text-gray-300">Sensitive Information:</strong> You are responsible for determining what data and information is processed through your OpenClaw installation. We strongly recommend against processing highly sensitive personal data, financial data, or confidential business information without appropriate security measures in place.</li>
                <li><strong className="text-gray-300">Third-Party Add-Ons:</strong> Any third-party add-ons, plugins, or integrations installed on your OpenClaw instance are your sole responsibility. We do not warrant the security, functionality, or compatibility of third-party software.</li>
                <li><strong className="text-gray-300">No Ongoing Obligation:</strong> The Done-For-You setup includes 30 days of post-setup support. After this period, ongoing maintenance and support are not included unless separately agreed upon.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>7. Limitation of Liability</h2>
              <p className="mb-3">
                <strong className="text-white">TO THE MAXIMUM EXTENT PERMITTED BY THE LAWS OF SINGAPORE:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-400 mb-3">
                <li>The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</li>
                <li>We do not warrant that the Service will be uninterrupted, error-free, secure, or that any defects will be corrected.</li>
                <li>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, business opportunities, or goodwill, arising out of or in connection with your use of the Service.</li>
                <li>Our total aggregate liability to you for all claims arising out of or relating to these Terms or the Service shall not exceed the total amount paid by you to us in the twelve (12) months preceding the claim.</li>
                <li>We shall not be liable for any loss, damage, or liability arising from your use of the OpenClaw integration, Done-For-You setup, or any self-hosted infrastructure, including but not limited to data breaches, hacking, data loss, system failures, or unauthorised access.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>8. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless the Company, its directors, officers, employees, agents, and affiliates from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising out of or relating to: (a) your use of the Service; (b) your violation of these Terms; (c) your violation of any third-party rights; (d) your use of the OpenClaw integration or Done-For-You setup; (e) any data breach, security incident, or unauthorised access occurring on your infrastructure; or (f) any marketing campaigns, ad creatives, or business decisions made using the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>9. Intellectual Property</h2>
              <p className="mb-3">
                The Service, including its software, algorithms, design, and content, is owned by Matrix AI Solution(s) Pte. Ltd. and is protected by intellectual property laws of Singapore and international treaties.
              </p>
              <p>
                Ad creatives, copy, and marketing materials generated by the Service using your data and inputs are owned by you. However, we retain the right to use anonymised, aggregated data to improve our AI models and services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>10. Acceptable Use</h2>
              <p className="mb-3">You agree not to:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-400">
                <li>Use the Service for any unlawful purpose or in violation of any applicable laws</li>
                <li>Attempt to reverse engineer, decompile, or disassemble the Service</li>
                <li>Use the Service to create misleading, deceptive, or fraudulent advertisements</li>
                <li>Interfere with or disrupt the Service or its infrastructure</li>
                <li>Share your account credentials with unauthorised third parties</li>
                <li>Use the Service to process data in violation of data protection laws</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>11. Termination</h2>
              <p className="mb-3">
                We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms.
              </p>
              <p>
                Upon termination, your right to use the Service will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnification, and limitations of liability.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>12. Governing Law &amp; Dispute Resolution</h2>
              <p className="mb-3">
                These Terms shall be governed by and construed in accordance with the laws of the Republic of Singapore, without regard to its conflict of law provisions.
              </p>
              <p className="mb-3">
                Any dispute arising out of or in connection with these Terms, including any question regarding its existence, validity, or termination, shall be referred to and finally resolved by arbitration administered by the Singapore International Arbitration Centre ("SIAC") in accordance with the Arbitration Rules of the SIAC for the time being in force.
              </p>
              <p>
                The seat of arbitration shall be Singapore. The language of the arbitration shall be English. The arbitral tribunal shall consist of one (1) arbitrator.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>13. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will provide at least 30 days' notice of any material changes. Your continued use of the Service after such changes constitutes your acceptance of the modified Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>14. Severability</h2>
              <p>
                If any provision of these Terms is held to be invalid or unenforceable by a court of competent jurisdiction in Singapore, the remaining provisions shall continue in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>15. Contact Us</h2>
              <p className="mb-3">
                If you have any questions about these Terms, please contact us:
              </p>
              <p className="text-gray-400">
                <strong className="text-white">Matrix AI Solution(s) Pte. Ltd.</strong><br />
                22 Sin Ming Lane #06-76 Midview City, Singapore 573969<br />
                Email: <a href="mailto:legal@adros.ai" className="text-purple-400 hover:text-purple-300">legal@adros.ai</a>
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
