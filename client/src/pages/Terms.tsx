import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-32 pb-20">
        <div className="container max-w-3xl">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-invert max-w-none text-foreground">
            <p className="text-lg mb-6">
              <strong>Last Updated: March 8, 2026</strong>
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Agreement to Terms</h2>
            <p className="mb-4">
              By accessing and using Adros AI ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use License</h2>
            <p className="mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on Adros AI's Service for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on the Service</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
              <li>Using automated tools to access, monitor, or copy the Service</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Disclaimer</h2>
            <p className="mb-4">
              The materials on Adros AI's Service are provided on an 'as is' basis. Adros AI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Limitations</h2>
            <p className="mb-4">
              In no event shall Adros AI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Adros AI's Service, even if Adros AI or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Accuracy of Materials</h2>
            <p className="mb-4">
              The materials appearing on Adros AI's Service could include technical, typographical, or photographic errors. Adros AI does not warrant that any of the materials on the Service are accurate, complete, or current. Adros AI may make changes to the materials contained on the Service at any time without notice.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Links</h2>
            <p className="mb-4">
              Adros AI has not reviewed all of the sites linked to its Service and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Adros AI of the site. Use of any such linked website is at the user's own risk.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Modifications</h2>
            <p className="mb-4">
              Adros AI may revise these terms of service for the Service at any time without notice. By using this Service, you are agreeing to be bound by the then current version of these terms of service.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Governing Law</h2>
            <p className="mb-4">
              These terms and conditions are governed by and construed in accordance with the laws of Singapore, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">9. User Accounts</h2>
            <p className="mb-4">
              If you create an account on Adros AI, you are responsible for maintaining the confidentiality of your account information and password. You agree to accept responsibility for all activities that occur under your account. You must notify Adros AI immediately of any unauthorized use of your account.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Meta/Facebook Integration</h2>
            <p className="mb-4">
              By connecting your Meta Ads account to Adros AI, you authorize us to access your ad account data as permitted by Meta's Platform Policies. You agree to comply with Meta's Terms of Service and Data Use Restrictions. Adros AI is not affiliated with Meta Platforms, Inc.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">11. Limitation of Liability</h2>
            <p className="mb-4">
              In no event shall Adros AI, its directors, employees, or agents be liable to you for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">12. Termination</h2>
            <p className="mb-4">
              Adros AI may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including if you breach the Terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">13. Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms of Service, please contact us at:
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
