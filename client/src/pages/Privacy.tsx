import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-32 pb-20">
        <div className="container max-w-3xl">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose prose-invert max-w-none text-foreground">
            <p className="text-lg mb-6">
              <strong>Last Updated: March 8, 2026</strong>
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p className="mb-4">
              Adros AI ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, application, and services (collectively, the "Service").
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
            <p className="mb-4">We may collect information about you in a variety of ways:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Information You Provide:</strong> Email address, name, company information, and other details you voluntarily provide when signing up for our waitlist or services.</li>
              <li><strong>Facebook/Meta Data:</strong> When you connect your Meta Ads account to Adros AI, we access your ad account data, including campaign performance metrics, audience information, and ad creative details. This access is limited to what is necessary to provide our services.</li>
              <li><strong>Usage Information:</strong> We automatically collect information about how you interact with our Service, including IP address, browser type, pages visited, and time spent on pages.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect for the following purposes:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>To provide, maintain, and improve our Service</li>
              <li>To process your requests and send you related information</li>
              <li>To send you marketing and promotional communications (with your consent)</li>
              <li>To analyze usage patterns and improve user experience</li>
              <li>To comply with legal obligations</li>
              <li>To detect and prevent fraud or security issues</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Facebook/Meta Data Handling</h2>
            <p className="mb-4">
              When you authorize Adros AI to access your Meta Ads account:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>We only access data necessary to provide our ad optimization services</li>
              <li>We do not share your Meta data with third parties</li>
              <li>You can revoke access at any time through your Meta account settings</li>
              <li>We comply with Meta's Platform Policies and Data Use Restrictions</li>
              <li>Your data is encrypted and stored securely</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Data Retention</h2>
            <p className="mb-4">
              We retain your personal information for as long as necessary to provide our Service and comply with legal obligations. You may request deletion of your data at any time by contacting us.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Your Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Data portability</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Third-Party Links</h2>
            <p className="mb-4">
              Our Service may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Us</h2>
            <p className="mb-4">
              If you have questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <p className="mb-2">
              <strong>Adros AI</strong><br />
              22 Sin Ming Lane #06-76 Midview City<br />
              Singapore 573969<br />
              Email: <a href="mailto:hello@adros.ai" className="text-primary hover:underline">hello@adros.ai</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
