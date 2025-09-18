import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/50 to-background"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMjkuNSIgY3k9IjI5LjUiIHI9IjEuNSIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
      
      <div className="container relative z-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Badge className="bg-medical-primary/10 text-medical-primary border-medical-primary/20 px-4 py-1">
              FHIR R4 Compliant • ICD-11 TM2 • India EHR Standards 2016
            </Badge>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-medical-primary to-medical-secondary bg-clip-text text-transparent leading-tight">
            NAMASTE & ICD-11 Integration API
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Seamlessly integrate India's NAMASTE terminologies with WHO ICD-11 Traditional Medicine Module 2 (TM2) 
            for interoperable EMR systems. Enable dual-coding for Ayurveda, Siddha, and Unani diagnoses.
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-12">
            <Button size="lg" className="bg-medical-primary hover:bg-medical-primary/90">
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              View Documentation
            </Button>
          </div>
          
          <Card className="border border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-medical-primary mb-2">4,500+</div>
                  <div className="text-sm text-muted-foreground">NAMASTE Standardized Terms</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-medical-secondary mb-2">529</div>
                  <div className="text-sm text-muted-foreground">ICD-11 TM2 Disorder Categories</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-medical-success mb-2">196</div>
                  <div className="text-sm text-muted-foreground">Pattern Codes</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;