import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your API documentation assistant. I can help you find endpoints, understand authentication, or explain FHIR resources. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current && scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const quickActions = [
    "How do I authenticate?",
    "Show me NAMASTE endpoints",
    "Explain dual coding",
    "FHIR Bundle examples",
    "ABHA integration",
    "ICD-11 mapping",
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputValue("");
  };

  const getBotResponse = (input: string): string => {
    const lowercaseInput = input.toLowerCase();
    
    if (lowercaseInput.includes("authenticate") || lowercaseInput.includes("auth")) {
      return "For authentication, you'll need to use OAuth 2.0 with ABHA tokens. Include the Bearer token in your Authorization header: `Authorization: Bearer YOUR_ABHA_TOKEN`. Check the Authentication section for full details.";
    }
    
    if (lowercaseInput.includes("namaste") || lowercaseInput.includes("endpoint")) {
      return "Here are the key NAMASTE endpoints:\n• GET /fhir/CodeSystem/namaste - Retrieve NAMASTE codes\n• GET /fhir/ValueSet/$expand - Auto-complete search\n• POST /fhir/ConceptMap/$translate - Translate between code systems\n• POST /fhir/Bundle - Upload patient data";
    }
    
    if (lowercaseInput.includes("dual") || lowercaseInput.includes("coding")) {
      return "Dual coding allows you to record both traditional medicine (NAMASTE) and biomedical (ICD-11) codes for the same condition. This ensures compatibility with insurance systems while preserving traditional medicine terminology.";
    }
    
    if (lowercaseInput.includes("fhir") || lowercaseInput.includes("bundle")) {
      return "FHIR Bundles let you submit multiple resources together. Include both NAMASTE and ICD-11 codes in the Condition resource's coding array. Check the Bundle Upload section for complete examples.";
    }

    // NEW FHIR RESPONSES
    if (lowercaseInput.includes("fhir") || lowercaseInput.includes("fast healthcare")) {
      return "The API is fully FHIR R4 compliant and supports these resources: Condition, Patient, Observation, Procedure, Medication, and MedicationRequest. It features dual coding (ICD-11 + traditional medicine), ABHA integration, and follows India EHR Standards 2016.";
    }
    
    if (lowercaseInput.includes("abha") || lowercaseInput.includes("health account")) {
      return "ABHA (Ayushman Bharat Health Account) integration is supported through the Patient resource. Each patient can have an ABHA identifier for unified health records across systems. Use the identifier system: 'https://healthid.ndhm.gov.in'";
    }
    
    if (lowercaseInput.includes("dual coding") || lowercaseInput.includes("multiple codes")) {
      return "The FHIR API supports dual coding - each condition can include both ICD-11 codes and traditional medicine codes (Ayurveda, Siddha, Unani). This allows comprehensive health records that respect both modern and traditional medical systems. Example: A condition can have both ICD-11 code '1A72.4' and Ayurveda code 'EC-3.19'.";
    }

    if (lowercaseInput.includes("icd") || lowercaseInput.includes("mapping")) {
      return "ICD-11 mappings are automatically handled through the ConceptMap resource. Use POST /fhir/ConceptMap/$translate to map between NAMASTE codes and ICD-11 codes. The system maintains confidence scores for each mapping.";
    }

    if (lowercaseInput.includes("patient") || lowercaseInput.includes("demographic")) {
      return "The Patient resource supports ABHA identifiers, demographic data, and contact information. All patient data follows India EHR Standards 2016 and can be linked to traditional medicine conditions.";
    }

    if (lowercaseInput.includes("condition") || lowercaseInput.includes("diagnosis")) {
      return "Condition resources support dual coding with both ICD-11 and traditional medicine codes. Each condition includes clinical status, verification status, and can reference both modern and traditional diagnostic patterns.";
    }

    if (lowercaseInput.includes("observation") || lowercaseInput.includes("symptom")) {
      return "Observation resources can record traditional medicine assessments like pulse diagnosis (Nadi Pariksha), tongue examination, and other Ayurvedic/Siddha/Unani diagnostic methods alongside standard clinical observations.";
    }

    if (lowercaseInput.includes("medication") || lowercaseInput.includes("treatment")) {
      return "Medication and MedicationRequest resources support traditional medicine formulations. You can specify herbal preparations, dosage forms, and administration methods specific to Ayurveda, Siddha, and Unani systems.";
    }

    if (lowercaseInput.includes("procedure") || lowercaseInput.includes("therapy")) {
      return "Procedure resources can document traditional therapies like Panchakarma, Vasti, Nasya, and other Ayurvedic procedures, as well as Siddha and Unani therapeutic interventions.";
    }

    if (lowercaseInput.includes("codesystem") || lowercaseInput.includes("valueset")) {
      return "The API provides CodeSystem resources for:\n• NAMASTE Ayurveda codes\n• NAMASTE Siddha codes  \n• NAMASTE Unani codes\n• ICD-11 TM2 codes\nUse ValueSet/$expand for auto-complete functionality.";
    }

    if (lowercaseInput.includes("conceptmap") || lowercaseInput.includes("translate")) {
      return "ConceptMap resources enable translation between:\n• NAMASTE → ICD-11\n• ICD-11 → NAMASTE\n• Cross-system mappings (Ayurveda→Siddha, etc.)\nUse $translate operation with source and target code systems.";
    }

    if (lowercaseInput.includes("bundle") || lowercaseInput.includes("batch")) {
      return "Bundle resources allow batch operations for:\n• Patient registration with conditions\n• Multiple observations in one request\n• Complete encounter documentation\n• Bulk code system updates";
    }

    if (lowercaseInput.includes("search") || lowercaseInput.includes("query")) {
      return "FHIR search supports:\n• _include for related resources\n• _revinclude for reverse references\n• Code-based searches on conditions\n• Date ranges for observations\n• Patient demographic filters";
    }

    if (lowercaseInput.includes("security") || lowercaseInput.includes("privacy")) {
      return "Security features include:\n• OAuth 2.0 with ABHA integration\n• SMART on FHIR app launch\n• Audit logging for all accesses\n• Data encryption at rest and in transit\n• Consent management integration";
    }

    if (lowercaseInput.includes("implementation") || lowercaseInput.includes("guide")) {
      return "Check the Implementation Guide for:\n• Complete FHIR profiles\n• Extension definitions\n• Terminology binding\n• Use case examples\n• Integration patterns with EMR systems";
    }

    // Default responses for common questions
    const responses: Record<string, string> = {
      "hello": "Hello! How can I help you with the FHIR API today?",
      "hi": "Hi there! What would you like to know about our FHIR implementation?",
      "thanks": "You're welcome! Is there anything else I can help you with?",
      "thank you": "You're welcome! Let me know if you need more assistance.",
      "what can you do": "I can help you understand FHIR resources, NAMASTE endpoints, authentication, dual coding, ABHA integration, and API implementation details.",
      "who are you": "I'm an AI assistant for the NAMASTE & ICD-11 FHIR API documentation.",
    };
    
    // Check for simple greetings
    for (const [question, answer] of Object.entries(responses)) {
      if (lowercaseInput.includes(question)) {
        return answer;
      }
    }
    
    return "I can help you with FHIR resources, API endpoints, authentication, dual coding, and implementation details. Try asking about specific topics like 'FHIR Condition resources', 'ABHA integration', 'dual coding examples', or 'NAMASTE endpoints'.";
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
    handleSendMessage();
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-blue-500 hover:bg-blue-600 z-50"
        size="sm"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-xl z-50 flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bot className="h-5 w-5 text-blue-500" />
            API Assistant
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-1">
          {quickActions.map((action, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="cursor-pointer hover:bg-blue-500/10 text-xs"
              onClick={() => handleQuickAction(action)}
            >
              {action}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-3 pt-0 overflow-hidden">
        <ScrollArea className="flex-1 pr-3" ref={scrollAreaRef}>
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "bot" && (
                  <div className="h-6 w-6 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-3 w-3 text-blue-500" />
                  </div>
                )}
                <div
                  className={`max-w-[250px] rounded-lg p-2 text-sm ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-muted"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.sender === "user" && (
                  <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="h-3 w-3" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="flex gap-2 mt-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about FHIR resources, endpoints, or integration..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            size="sm"
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatbot;