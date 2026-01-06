import { Card } from "@/components/ui/card";

export const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <Card className="p-8">
          <div className="space-y-6 text-muted-foreground">
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using healthiswealth.live ("the Website"), you accept and agree to be 
                bound by the terms and provision of this agreement. If you do not agree to these terms, 
                please do not use the Website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Use of the Website</h2>
              <p>
                You agree to use the Website only for lawful purposes and in a way that does not infringe 
                the rights of, restrict, or inhibit anyone else's use and enjoyment of the Website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Intellectual Property</h2>
              <p>
                The content, organization, graphics, design, and other matters related to the Website are 
                protected under applicable copyrights and other proprietary laws. Copying, redistribution, 
                or publication of any such matters or any part of the Website is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Product Information</h2>
              <p>
                We strive to provide accurate product information. However, we do not warrant that product 
                descriptions, pricing, or other content is accurate, complete, reliable, current, or 
                error-free. We reserve the right to correct any errors or omissions at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Health Disclaimer</h2>
              <p>
                The information provided on this Website is for educational and informational purposes only. 
                It is not intended as medical advice or a substitute for the medical advice of a physician. 
                Always consult with a healthcare professional before starting any diet, exercise program, 
                or supplement regimen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Affiliate Links</h2>
              <p>
                This Website may contain affiliate links to products. If you purchase through these links, 
                we may earn a commission at no additional cost to you. We only recommend products we believe 
                will provide value to our community.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Third-Party Links</h2>
              <p>
                The Website may contain links to third-party websites. These links are provided solely as a 
                convenience. We do not endorse or assume responsibility for the content of third-party sites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Health Is Wealth shall not be liable for any 
                indirect, incidental, special, consequential, or punitive damages, or any loss of profits 
                or revenues, whether incurred directly or indirectly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Health Is Wealth and its affiliates from any 
                claims, losses, damages, liabilities, and expenses arising out of your use of the Website 
                or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective 
                immediately upon posting. Your continued use of the Website constitutes acceptance of 
                the modified Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State 
                of California, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contact Information</h2>
              <p>
                For any questions regarding these Terms of Service, please contact us at:
              </p>
              <div className="mt-2 space-y-1">
                <p>Email: healthiswealth@healthiswealth.live</p>
                <p>Phone: 1-310-303-4808</p>
                <p>Location: 1078 Princeton Dr, Marina Del Rey, CA 90292</p>
              </div>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
};
