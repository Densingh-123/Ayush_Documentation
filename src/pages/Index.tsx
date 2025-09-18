import ApiHeader from "@/components/ApiHeader";
import HeroSection from "@/components/HeroSection";
import Sidebar from "@/components/Sidebar";
import ApiEndpoint from "@/components/ApiEndpoint";
import AIChatbot from "@/components/AIChatbot";
import { ThemeProvider } from "@/components/theme-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Code, Database, Shield } from "lucide-react";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="api-docs-theme">
      <div className="min-h-screen bg-background">
        <ApiHeader />
        
        <div className="flex">
          <Sidebar className="fixed left-0 top-16 z-40" />
          
          <div className="flex-1 ml-64">
            <HeroSection />
            
            <main>
              <div className="container px-6 py-12 max-w-4xl">
            
            {/* Introduction Section */}
            <section id="introduction" className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Introduction</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-6">
                  The NAMASTE & ICD-11 Integration API enables seamless integration of India's National AYUSH Morbidity 
                  & Standardized Terminologies Electronic (NAMASTE) codes with WHO's ICD-11 Traditional Medicine Module 2 (TM2) 
                  for Electronic Medical Record (EMR) systems.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Database className="h-8 w-8 mx-auto mb-2 text-medical-primary" />
                      <h3 className="font-semibold mb-1">FHIR R4</h3>
                      <p className="text-sm text-muted-foreground">Compliant</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Shield className="h-8 w-8 mx-auto mb-2 text-medical-secondary" />
                      <h3 className="font-semibold mb-1">OAuth 2.0</h3>
                      <p className="text-sm text-muted-foreground">ABHA Ready</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Code className="h-8 w-8 mx-auto mb-2 text-medical-success" />
                      <h3 className="font-semibold mb-1">Dual Coding</h3>
                      <p className="text-sm text-muted-foreground">TM + Biomedicine</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <CheckCircle className="h-8 w-8 mx-auto mb-2 text-medical-warning" />
                      <h3 className="font-semibold mb-1">EHR 2016</h3>
                      <p className="text-sm text-muted-foreground">Standards</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Authentication Section */}
            <section id="authentication" className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Authentication</h2>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    OAuth 2.0 with ABHA Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    All API requests must be authenticated using OAuth 2.0 Bearer tokens integrated with India's ABHA (Ayushman Bharat Health Account) system.
                  </p>
                  <div className="bg-code-bg text-code-foreground p-4 rounded-lg">
                    <pre className="text-sm">
                      <code>{`Authorization: Bearer YOUR_ABHA_TOKEN
Content-Type: application/fhir+json
Accept: application/fhir+json`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* API Endpoints Section */}
            <section id="endpoints" className="mb-16">
              <h2 className="text-3xl font-bold mb-6">API Reference</h2>
              
              <ApiEndpoint
                method="GET"
                endpoint="/fhir/CodeSystem/namaste"
                title="Get NAMASTE CodeSystem"
                description="Retrieve the complete NAMASTE CodeSystem with all 4,500+ standardized terms for Ayurveda, Siddha, and Unani disorders."
                codeExample={`curl -X GET "https://api.namaste-icd11.health.gov.in/fhir/CodeSystem/namaste" \\
  -H "Authorization: Bearer YOUR_ABHA_TOKEN" \\
  -H "Accept: application/fhir+json"`}
                responseExample={`{
  "resourceType": "CodeSystem",
  "id": "namaste",
  "url": "http://terminology.health.gov.in/CodeSystem/namaste",
  "version": "1.0.0",
  "name": "NAMASTE",
  "title": "National AYUSH Morbidity & Standardized Terminologies Electronic",
  "status": "active",
  "concept": [
    {
      "code": "NAM001",
      "display": "Vata Dosha Imbalance",
      "definition": "Primary constitutional imbalance affecting Vata dosha"
    }
  ]
}`}
              />

              <ApiEndpoint
                method="GET"
                endpoint="/fhir/ValueSet/$expand"
                title="Auto-complete Value Set Lookup"
                description="Search and auto-complete NAMASTE and ICD-11 TM2 terms with real-time suggestions for clinical documentation."
                codeExample={`curl -X GET "https://api.namaste-icd11.health.gov.in/fhir/ValueSet/\\$expand?filter=diabetes&system=namaste" \\
  -H "Authorization: Bearer YOUR_ABHA_TOKEN" \\
  -H "Accept: application/fhir+json"`}
                responseExample={`{
  "resourceType": "ValueSet",
  "expansion": {
    "total": 15,
    "contains": [
      {
        "system": "http://terminology.health.gov.in/CodeSystem/namaste",
        "code": "NAM247",
        "display": "Madhumeha (Diabetes Mellitus - Ayurveda)"
      },
      {
        "system": "http://id.who.int/icd/release/11/mms",
        "code": "TM24.1",
        "display": "Diabetes mellitus pattern in traditional medicine"
      }
    ]
  }
}`}
              />

              <ApiEndpoint
                method="POST"
                endpoint="/fhir/ConceptMap/$translate"
                title="NAMASTE ↔ ICD-11 Translation"
                description="Translate between NAMASTE codes and ICD-11 TM2/Biomedicine codes for dual-coding compliance."
                codeExample={`curl -X POST "https://api.namaste-icd11.health.gov.in/fhir/ConceptMap/\\$translate" \\
  -H "Authorization: Bearer YOUR_ABHA_TOKEN" \\
  -H "Content-Type: application/fhir+json" \\
  -d '{
    "resourceType": "Parameters",
    "parameter": [
      {
        "name": "system",
        "valueUri": "http://terminology.health.gov.in/CodeSystem/namaste"
      },
      {
        "name": "code",
        "valueCode": "NAM247"
      },
      {
        "name": "target",
        "valueUri": "http://id.who.int/icd/release/11/mms"
      }
    ]
  }'`}
                responseExample={`{
  "resourceType": "Parameters",
  "parameter": [
    {
      "name": "result",
      "valueBoolean": true
    },
    {
      "name": "match",
      "part": [
        {
          "name": "equivalence",
          "valueCode": "equivalent"
        },
        {
          "name": "concept",
          "valueCoding": {
            "system": "http://id.who.int/icd/release/11/mms",
            "code": "TM24.1",
            "display": "Diabetes mellitus pattern in traditional medicine"
          }
        }
      ]
    }
  ]
}`}
              />

              <ApiEndpoint
                method="POST"
                endpoint="/fhir/Bundle"
                title="Upload FHIR Bundle with Dual Coding"
                description="Submit patient encounters with both NAMASTE and ICD-11 codes for comprehensive EMR integration."
                codeExample={`curl -X POST "https://api.namaste-icd11.health.gov.in/fhir/Bundle" \\
  -H "Authorization: Bearer YOUR_ABHA_TOKEN" \\
  -H "Content-Type: application/fhir+json" \\
  -d '{
    "resourceType": "Bundle",
    "type": "collection",
    "entry": [
      {
        "resource": {
          "resourceType": "Condition",
          "subject": {
            "reference": "Patient/example"
          },
          "code": {
            "coding": [
              {
                "system": "http://terminology.health.gov.in/CodeSystem/namaste",
                "code": "NAM247",
                "display": "Madhumeha (Diabetes Mellitus - Ayurveda)"
              },
              {
                "system": "http://id.who.int/icd/release/11/mms",
                "code": "TM24.1",
                "display": "Diabetes mellitus pattern in traditional medicine"
              }
            ]
          }
        }
      }
    ]
  }'`}
              />
            </section>

            {/* Integration Guide */}
            <section id="emr-integration" className="mb-16">
              <h2 className="text-3xl font-bold mb-6">EMR Integration Guide</h2>
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Step 1: Initialize FHIR Client</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-code-bg text-code-foreground p-4 rounded-lg">
                      <pre className="text-sm">
                        <code>{`const client = new FHIRClient({
  baseUrl: 'https://api.namaste-icd11.health.gov.in/fhir',
  auth: {
    type: 'bearer',
    token: abhaToken
  }
});`}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Step 2: Implement Auto-complete Widget</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-code-bg text-code-foreground p-4 rounded-lg">
                      <pre className="text-sm">
                        <code>{`async function searchTerminologies(query) {
  const response = await client.search({
    resourceType: 'ValueSet',
    searchParams: {
      filter: query,
      system: 'namaste,icd-11-tm2'
    }
  });
  return response.entry;
}`}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
      
      <AIChatbot />
    </div>
  </ThemeProvider>
  );
};

export default Index;