import { useState } from "react";
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

  const quickActions = [
    "How do I authenticate?",
    "Show me NAMASTE endpoints",
    "Explain dual coding",
    "FHIR Bundle examples",
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
    
    return "I can help you with API endpoints, authentication, FHIR resources, and code examples. Try asking about specific topics like 'NAMASTE codes', 'authentication', or 'dual coding'.";
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
    handleSendMessage();
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-medical-primary hover:bg-medical-primary/90 z-50"
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
            <Bot className="h-5 w-5 text-medical-primary" />
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
              className="cursor-pointer hover:bg-medical-primary/10 text-xs"
              onClick={() => handleQuickAction(action)}
            >
              {action}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-3 pt-0">
        <ScrollArea className="flex-1 pr-3">
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "bot" && (
                  <div className="h-6 w-6 rounded-full bg-medical-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-3 w-3 text-medical-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[250px] rounded-lg p-2 text-sm ${
                    message.sender === "user"
                      ? "bg-medical-primary text-white"
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
          </div>
        </ScrollArea>

        <div className="flex gap-2 mt-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about API endpoints..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            size="sm"
            className="bg-medical-primary hover:bg-medical-primary/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatbot;