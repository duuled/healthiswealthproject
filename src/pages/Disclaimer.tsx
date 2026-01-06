import { Card } from "@/components/ui/card";

export const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8">Disclaimer</h1>
        <Card className="p-8">
          <div className="space-y-6 text-muted-foreground">
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Medical Disclaimer</h2>
              <p>
                The information provided on healthiswealth.live is for educational and informational 
                purposes only and is not intended as medical advice. The content is not intended to be 
                a substitute for professional medical advice, diagnosis, or treatment.
              </p>
              <p className="mt-4">
                <strong>Always seek the advice of your physician or other qualified health provider</strong> 
                {" "}with any questions you may have regarding a medical condition. Never disregard professional 
                medical advice or delay in seeking it because of something you have read on this Website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Supplement Information</h2>
              <p>
                The statements regarding dietary supplements have not been evaluated by the Food and Drug 
                Administration (FDA). These products are not intended to diagnose, treat, cure, or prevent 
                any disease.
              </p>
              <p className="mt-4">
                Results may vary from person to person. Consult with a healthcare professional before 
                using any dietary supplement, especially if you are pregnant, nursing, have a medical 
                condition, or are taking any medications.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Affiliate Disclosure</h2>
              <p>
                Health Is Wealth participates in affiliate programs. This means that we may earn a 
                commission when you click on links to products and make a purchase. This comes at no 
                additional cost to you.
              </p>
              <p className="mt-4">
                We only recommend products and services that we believe will add value to our community. 
                Our recommendations are based on research, reviews, and our commitment to health and wellness.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Professional Advice</h2>
              <p>
                Nothing contained on this Website should be construed as professional advice, including but 
                not limited to medical, legal, or financial advice. The information provided is based on 
                general knowledge and research.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Fitness and Exercise</h2>
              <p>
                Before beginning any fitness or exercise program, consult with your physician or healthcare 
                provider. Exercise programs may be strenuous and may cause injury if not performed correctly.
              </p>
              <p className="mt-4">
                Stop exercising and seek medical attention if you experience any pain, dizziness, or 
                discomfort. Health Is Wealth is not responsible for any injuries sustained while following 
                our exercise recommendations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Results May Vary</h2>
              <p>
                Individual results may vary. Factors such as age, gender, genetics, diet, exercise, and 
                medical conditions can affect outcomes. We cannot guarantee specific results from using 
                the information or products recommended on this Website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">External Links</h2>
              <p>
                Our Website may contain links to external websites. We are not responsible for the content, 
                accuracy, or practices of these external sites. Visiting linked sites is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
              <p>
                Health Is Wealth and its operators will not be liable for any damages arising from the use 
                or inability to use this Website or its content, including but not limited to direct, 
                indirect, incidental, punitive, and consequential damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to Disclaimer</h2>
              <p>
                We reserve the right to update or modify this Disclaimer at any time without prior notice. 
                Changes will be effective immediately upon posting to the Website. Please review this 
                Disclaimer periodically for updates.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Disclaimer, please contact us at:
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
