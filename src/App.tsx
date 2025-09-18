import React, { useState, useEffect, createContext, useContext,useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { 
  Badge 
} from "@/components/ui/badge";
import { 
  Button 
} from "@/components/ui/button";
import { 
  Input 
} from "@/components/ui/input";
import { 
  ScrollArea 
} from "@/components/ui/scroll-area";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  ThemeProvider as NextThemesProvider,
  useTheme
} from "next-themes";
import { 
  Moon, 
  Sun, 
  Search, 
  Code, 
  Database, 
  FileText, 
  ChevronRight,
  Copy,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  BarChart3,
  PieChart,
  MessageCircle,
  X,
  Send,
  Bot,
  User
} from "lucide-react";

// Theme Context
const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

// Custom hooks
const useThemeContext = () => useContext(ThemeContext);

// API base URL
const API_BASE_URL = "http://localhost:8000";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

// Header Component
const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all ${isScrolled ? "shadow-md" : ""}`}>
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Code className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">Ayush Bandhan API Documentation</h1>
          </Link>
          <Badge variant="secondary" className="hidden sm:flex">
            v1.0.0
          </Badge>
        </div>
        
        <nav className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9 px-0"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
  
        </nav>
      </div>
    </header>
  );
};

// Sidebar Component
const Sidebar = () => {
  const { theme } = useTheme();
  const [activeItem, setActiveItem] = useState("");

  const sidebarItems = [
    {
      title: "Introduction",
      href: "/",
      icon: <FileText className="h-4 w-4" />
    },
    {
      title: "Ayurveda API",
      href: "/ayurveda",
      icon: <Database className="h-4 w-4" />
    },
    {
      title: "About Ayurveda",
      href: "/about-ayurveda",
      icon: <FileText className="h-4 w-4" />
    },
    {
      title: "Siddha API",
      href: "/siddha",
      icon: <Database className="h-4 w-4" />
    },
    {
      title: "About Siddha",
      href: "/about-siddha",
      icon: <FileText className="h-4 w-4" />
    },
    {
      title: "Unani API",
      href: "/unani",
      icon: <Database className="h-4 w-4" />
    },
    {
      title: "About Unani",
      href: "/about-unani",
      icon: <FileText className="h-4 w-4" />
    },
    {
      title: "ICD-11 API",
      href: "/icd11",
      icon: <Database className="h-4 w-4" />
    },
    {
      title: "About ICD-11",
      href: "/about-icd11",
      icon: <FileText className="h-4 w-4" />
    },
    {
      title: "Mappings API",
      href: "/mappings",
      icon: <Database className="h-4 w-4" />
    },
    {
      title: "All Endpoints",
      href: "/all-endpoints",
      icon: <Database className="h-4 w-4" />
    },
    {
      title: "Testing Playground",
      href: "/playground",
      icon: <Code className="h-4 w-4" />
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: <BarChart3 className="h-4 w-4" />
    }
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-64 border-r bg-card/50 backdrop-blur mt-16 hidden md:block">
      <ScrollArea className="h-full p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Documentation</h3>
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${activeItem === item.href ? "bg-muted" : ""}`}
                    onClick={() => setActiveItem(item.href)}
                  >
                    {item.icon}
                    {item.title}
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};

// AI Chatbot Component
const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "1",
      content: "Hello! I'm your API documentation assistant. I can help you understand endpoints, response formats, and how to use the APIs. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const scrollAreaRef = useRef(null);

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
    "How do I search Ayurveda terms?",
    "What is the structure of ICD-11 responses?",
    "How to use the mappings API?",
    "What are the common search parameters?",
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputValue("");
  };

  // ... (keep the existing getBotResponse function as is)
  const getBotResponse = (input) => {
    const lowercaseInput = input.toLowerCase();
    
    // API Endpoints
    if (lowercaseInput.includes("ayurved") || lowercaseInput.includes("ayurveda")) {
      return "The Ayurveda API allows you to search Ayurvedic medical terminologies. Use the endpoint: GET /terminologies/ayurveda/search/?q=query. Responses include English names, Hindi names, and diacritical representations.";
    }
    
    if (lowercaseInput.includes("siddha")) {
      return "The Siddha API provides access to Siddha medical terminologies. Use the endpoint: GET /terminologies/siddha/search/?q=query. Responses include English names, Tamil names, and romanized representations.";
    }
    
    if (lowercaseInput.includes("unani")) {
      return "The Unani API offers Unani medical terminologies. Use the endpoint: GET /terminologies/unani/search/?q=query. Responses include English names, Arabic names, and romanized representations.";
    }
    
    if (lowercaseInput.includes("icd") || lowercaseInput.includes("icd-11")) {
      return "The ICD-11 API provides access to WHO's International Classification of Diseases. Use the endpoint: GET /terminologies/icd11/search/?q=query. Responses include foundation URIs, codes, and titles.";
    }
    
    if (lowercaseInput.includes("mapping") || lowercaseInput.includes("map")) {
      return "The Mappings API finds connections between traditional medicine terminologies and ICD-11 codes. Use the endpoint: GET /terminologies/mappings/?system=system&q=query&min_confidence=0.1. Responses include confidence scores and matched terms.";
    }
    
    // Search parameters
    if (lowercaseInput.includes("search") || lowercaseInput.includes("query") || lowercaseInput.includes("parameter")) {
      return "All search APIs accept a 'q' parameter for the search query. The mappings API also accepts 'system' (ayurveda, siddha, or unani) and 'min_confidence' (0.1 to 1.0) parameters.";
    }
    
    // Response format
    if (lowercaseInput.includes("response") || lowercaseInput.includes("format") || lowercaseInput.includes("structure")) {
      return "API responses follow a consistent structure with 'count', 'next', 'previous', and 'results' fields. Each result object contains system-specific fields like codes, names in different languages, and metadata.";
    }
    
    // Examples
    if (lowercaseInput.includes("example") || lowercaseInput.includes("sample")) {
      return "You can view sample responses for each API on their respective documentation pages. The Testing Playground also allows you to try live queries and see real responses.";
    }
    
    // Authentication
    if (lowercaseInput.includes("auth") || lowercaseInput.includes("authentication") || lowercaseInput.includes("key") || lowercaseInput.includes("token")) {
      return "The API currently doesn't require authentication for search endpoints. However, for production use, we recommend implementing rate limiting and API keys for tracking usage.";
    }
    
    // Rate limits
    if (lowercaseInput.includes("rate limit") || lowercaseInput.includes("throttling") || lowercaseInput.includes("quota")) {
      return "The API has a rate limit of 100 requests per minute per IP address. If you need higher limits for your application, please contact our support team.";
    }
    
    // Error handling
    if (lowercaseInput.includes("error") || lowercaseInput.includes("status code") || lowercaseInput.includes("failure")) {
      return "The API uses standard HTTP status codes: 200 for success, 400 for bad requests, 404 for not found, and 500 for server errors. Error responses include a message explaining what went wrong.";
    }
    
    // Pagination
    if (lowercaseInput.includes("page") || lowercaseInput.includes("pagination") || lowercaseInput.includes("next") || lowercaseInput.includes("previous")) {
      return "API responses include pagination information with 'next' and 'previous' fields containing URLs to the next and previous pages of results. Use the 'page' parameter to navigate through results.";
    }
    
    // Data sources
    if (lowercaseInput.includes("data source") || lowercaseInput.includes("where does the data come from") || lowercaseInput.includes("accuracy")) {
      return "The data comes from official sources including the Ministry of AYUSH, WHO ICD-11 Traditional Medicine Module, and validated academic resources. All terminologies have been verified by domain experts.";
    }
    
    // Languages supported
    if (lowercaseInput.includes("language") || lowercaseInput.includes("hindi") || lowercaseInput.includes("tamil") || lowercaseInput.includes("arabic")) {
      return "The API supports multiple languages: Ayurveda terms include Hindi names, Siddha terms include Tamil names, and Unani terms include Arabic names. All responses also include English translations.";
    }
    
    // ICD-11 integration
    if (lowercaseInput.includes("integrat") || lowercaseInput.includes("icd-11") || lowercaseInput.includes("who")) {
      return "The API integrates with WHO's ICD-11 Traditional Medicine Module 2 (TM2), allowing mapping between traditional medicine terminologies and modern medical classification systems.";
    }
    
    // Usage examples
    if (lowercaseInput.includes("how to use") || lowercaseInput.includes("implementation") || lowercaseInput.includes("code example")) {
      return "You can use the API by making HTTP GET requests to the endpoints. For example, to search Ayurveda terms: `fetch('http://localhost:8000/terminologies/ayurveda/search/?q=fever')`. Check the documentation for more examples.";
    }
    
    // Response time
    if (lowercaseInput.includes("response time") || lowercaseInput.includes("performance") || lowercaseInput.includes("speed")) {
      return "The API typically responds within 100-300ms for most queries. Complex searches or those with many results may take slightly longer. We continuously optimize for performance.";
    }
    
    // Filters
    if (lowercaseInput.includes("filter") || lowercaseInput.includes("sort") || lowercaseInput.includes("order")) {
      return "You can filter results using query parameters. For example, add `&system=ayurveda` to the mappings endpoint to filter by system. Sorting is currently not supported but planned for future releases.";
    }
    
    // Data volume
    if (lowercaseInput.includes("how many") || lowercaseInput.includes("data points") || lowercaseInput.includes("records")) {
      return "The API contains over 4,500 Ayurveda terms, 1,200+ Siddha terms, 1,800+ Unani terms, and 529 ICD-11 TM2 codes, with mappings between these systems.";
    }
    
    // FHIR compliance
    if (lowercaseInput.includes("fhir") || lowercaseInput.includes("standard") || lowercaseInput.includes("compliance")) {
      return "The API is FHIR R4 compliant and follows India EHR Standards 2016, ensuring interoperability with healthcare systems and electronic medical records.";
    }
    
    // Future features
    if (lowercaseInput.includes("future") || lowercaseInput.includes("roadmap") || lowercaseInput.includes("upcoming")) {
      return "Upcoming features include: advanced search filters, more language support, bulk download options, user accounts for saving searches, and expanded traditional medicine systems.";
    }
    
    // Support
    if (lowercaseInput.includes("support") || lowercaseInput.includes("help") || lowercaseInput.includes("contact")) {
      return "For support, please email support@tradmedapi.com or visit our documentation portal. We typically respond within 24 hours for technical inquiries.";
    }
    
    // Open source
    if (lowercaseInput.includes("open source") || lowercaseInput.includes("github") || lowercaseInput.includes("contribute")) {
      return "The API is not currently open source, but we're considering open-sourcing components in the future. Please contact us if you're interested in contributing.";
    }
    
    // Commercial use
    if (lowercaseInput.includes("commercial") || lowercaseInput.includes("license") || lowercaseInput.includes("cost") || lowercaseInput.includes("price")) {
      return "The API is free for research and non-commercial use. For commercial applications, please contact us for licensing information and pricing details.";
    }
    
    // Data updates
    if (lowercaseInput.includes("update") || lowercaseInput.includes("refresh") || lowercaseInput.includes("how often")) {
      return "The data is updated quarterly with new terms and corrections. ICD-11 mappings are updated annually to align with WHO releases. You can subscribe to our newsletter for update notifications.";
    }
    
    // API versioning
    if (lowercaseInput.includes("version") || lowercaseInput.includes("v1") || lowercaseInput.includes("backward compatibility")) {
      return "The current API version is v1.0.0. We maintain backward compatibility for at least 12 months after releasing new versions. Deprecated endpoints will be announced 6 months in advance.";
    }
    
    // Code examples
    if (lowercaseInput.includes("curl") || lowercaseInput.includes("python") || lowercaseInput.includes("javascript")) {
      return "You can find code examples in multiple programming languages (Python, JavaScript, cURL) in the 'All Endpoints' section of the documentation. Each endpoint includes example requests and responses.";
    }
    
    // Healthcare integration
    if (lowercaseInput.includes("ehr") || lowercaseInput.includes("electronic health record") || lowercaseInput.includes("emr")) {
      return "The API is designed for easy integration with EHR/EMR systems. It supports FHIR standards and can be used to map traditional medicine diagnoses to ICD-11 codes for billing and records.";
    }
    
    // Traditional medicine concepts
    if (lowercaseInput.includes("dosha") || lowercaseInput.includes("vata") || lowercaseInput.includes("pitta") || lowercaseInput.includes("kapha")) {
      return "The API includes information about Ayurvedic doshas (Vata, Pitta, Kapha) and their related conditions. Search for specific dosha-related terms to find associated conditions and treatments.";
    }
    
    // Siddha concepts
    if (lowercaseInput.includes("vatham") || lowercaseInput.includes("pitham") || lowercaseInput.includes("kapham") || lowercaseInput.includes("mukkutram")) {
      return "The Siddha API includes information about the three humors (Vatham, Pitham, Kapham) and their role in Siddha medicine. Search for these terms to learn more about Siddha concepts.";
    }
    
    // Unani concepts
    if (lowercaseInput.includes("mizaj") || lowercaseInput.includes("akhlat") || lowercaseInput.includes("arz") || lowercaseInput.includes("nafs")) {
      return "The Unani API includes information about Mizaj (temperament), Akhlat (humors), Arz (disease), and Nafs (psyche) concepts. Search for these terms to explore Unani medicine principles.";
    }
    
    // Confidence scores
    if (lowercaseInput.includes("confidence") || lowercaseInput.includes("accuracy") || lowercaseInput.includes("score")) {
      return "Mappings include confidence scores from 0.1 to 1.0, indicating the strength of the match between traditional medicine terms and ICD-11 codes. Higher scores indicate stronger matches.";
    }
    
    // Fuzzy matching
    if (lowercaseInput.includes("fuzzy") || lowercaseInput.includes("similar") || lowercaseInput.includes("approximate")) {
      return "The API uses fuzzy matching algorithms to find similar terms even with spelling variations. Results include a similarity score showing how close the match is to your query.";
    }
    
    // Default responses for common questions
    const responses = {
      "hello": "Hello! How can I help you with the API documentation today?",
      "hi": "Hi there! What would you like to know about our APIs?",
      "thanks": "You're welcome! Is there anything else I can help you with?",
      "thank you": "You're welcome! Let me know if you need more assistance.",
      "what can you do": "I can help you understand API endpoints, response formats, search parameters, and how to integrate our traditional medicine APIs into your applications.",
      "who are you": "I'm an AI assistant for the Traditional Medicine API documentation. I can answer questions about our APIs and help you get started.",
      "how are you": "I'm functioning well, thank you! Ready to help you with any API questions you might have.",
    };
    
    // Check for simple greetings
    for (const [question, answer] of Object.entries(responses)) {
      if (lowercaseInput.includes(question)) {
        return answer;
      }
    }
    
    // Default response for unrecognized queries
    return "I can help you understand the API endpoints, response formats, and how to use the search parameters. Try asking about specific APIs like Ayurveda, Siddha, Unani, ICD-11, or Mappings. You can also ask about authentication, rate limits, or code examples.";
  };
  const handleQuickAction = (action) => {
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
            placeholder="Ask about API endpoints..."
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
// Hero Section Component
const HeroSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/50 to-background"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMjkuNSIgY3k9IjI5LjUiIHI9IjEuNSIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
      
      <div className="container relative z-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-6"
          >
            <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 px-4 py-1">
              FHIR R4 Compliant • ICD-11 TM2 • India EHR Standards 2016
            </Badge>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight"
          >
            NAMASTE & ICD-11 Integration API
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Comprehensive documentation for India's traditional medicine terminologies integrated with WHO ICD-11 TM2. Explore endpoints, test APIs, and understand responses.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center justify-center gap-4 mb-12 flex-wrap"
          >
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              Get Started
            </Button>
 <a href="http://localhost:8080/all-endpoints">
      <Button variant="outline" size="lg">
        View API Reference
      </Button>
    </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card className="border border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-500 mb-2">4,500+</div>
                    <div className="text-sm text-muted-foreground">Ayurveda Terms</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-500 mb-2">1,200+</div>
                    <div className="text-sm text-muted-foreground">Siddha Terms</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-500 mb-2">1,800+</div>
                    <div className="text-sm text-muted-foreground">Unani Terms</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-500 mb-2">529</div>
                    <div className="text-sm text-muted-foreground">ICD-11 TM2 Codes</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// API Response Display Component
const ApiResponseDisplay = ({ data, loading, error }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2">Loading data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
        <div>
          <h4 className="text-red-800 font-medium">Error fetching data</h4>
          <p className="text-red-700 text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-muted rounded-lg p-8 text-center">
        <Code className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">No data to display</h3>
        <p className="text-muted-foreground">Make a request to see the API response here.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1E1E1E] rounded-lg p-4 overflow-auto max-h-96">
      <pre className="text-sm text-white overflow-auto">
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
};

// API Testing Component
const ApiTestingComponent = ({ endpoint, title, description, defaultQuery = "" }) => {
  const [query, setQuery] = useState(defaultQuery);
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const url = `${endpoint}${query}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setResponseData(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="Enter search term..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Search className="h-4 w-4 mr-2" />
            )}
            Search
          </Button>
        </div>
        
        <ApiResponseDisplay data={responseData} loading={loading} error={error} />
        
        {responseData && (
          <div className="mt-6">
            <h4 className="font-medium mb-3">Endpoint Information</h4>
            <div className="bg-muted rounded-lg p-4 text-sm">
              <div className="flex items-center mb-2">
                <span className="font-medium mr-2">URL:</span>
                <code className="bg-muted-foreground/10 px-2 py-1 rounded">
                  {endpoint}{query}
                </code>
                <Button variant="ghost" size="sm" className="ml-2 h-8 w-8 p-0">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-2">Method:</span>
                <Badge variant="outline">GET</Badge>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// About Ayurveda Page Component
const AboutAyurvedaPage = () => {
  return (
    <div className="container px-6 py-8 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">About Ayurveda Medicine</h2>
        <p className="text-muted-foreground">
          Ayurveda is one of the world's oldest holistic healing systems, developed more than 3,000 years ago in India.
          It's based on the belief that health and wellness depend on a delicate balance between the mind, body, and spirit.
        </p>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Ayurveda API Endpoint</CardTitle>
          <p className="text-muted-foreground">Access Ayurveda medical terminologies through our API</p>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg mb-6">
            <code className="text-sm">GET {API_BASE_URL}/terminologies/ayurveda/search/?q=query</code>
          </div>
          
          <h4 className="font-medium mb-3">Sample Response Data</h4>
          <div className="bg-[#1E1E1E] rounded-lg p-4 overflow-auto max-h-96">
            <pre className="text-sm text-white">
              <code>
{`{
  "count": 283,
  "next": "http://localhost:8000/terminologies/ayurveda/search/?page=2&q=diseane",
  "previous": null,
  "results": [
    {
      "id": 2,
      "code": "DIS",
      "english_name": "disease/disorder",
      "hindi_name": "विकारः",
      "diacritical_name": "vikāraḥ"
    },
    {
      "id": 1792,
      "code": "J",
      "english_name": "ear diseases",
      "hindi_name": "कर्णरोगः",
      "diacritical_name": ""
    },
    {
      "id": 1746,
      "code": "I",
      "english_name": "nose diseases",
      "hindi_name": "नासारोगः",
      "diacritical_name": ""
    }
  ]
}`}
              </code>
            </pre>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Principles</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>• Based on five fundamental elements: space, air, fire, water, and earth</li>
              <li>• Three doshas: Vata, Pitta, and Kapha</li>
              <li>• Focus on preventive healthcare</li>
              <li>• Holistic approach to treatment</li>
              <li>• Use of natural herbs and minerals</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Common Treatments</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>• Herbal medicines</li>
              <li>• Dietary changes</li>
              <li>• Yoga and meditation</li>
              <li>• Panchakarma detoxification</li>
              <li>• Massage therapies</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// About Siddha Page Component
const AboutSiddhaPage = () => {
  return (
    <div className="container px-6 py-8 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">About Siddha Medicine</h2>
        <p className="text-muted-foreground">
          Siddha medicine is one of the oldest medical systems in India, originating from Tamil Nadu.
          It emphasizes the importance of physical, mental, and spiritual well-being.
        </p>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Siddha API Endpoint</CardTitle>
          <p className="text-muted-foreground">Access Siddha medical terminologies through our API</p>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg mb-6">
            <code className="text-sm">GET {API_BASE_URL}/terminologies/siddha/search/?q=query</code>
          </div>
          
          <h4 className="font-medium mb-3">Sample Response Data</h4>
          <div className="bg-[#1E1E1E] rounded-lg p-4 overflow-auto max-h-96">
            <pre className="text-sm text-white">
              <code>
{`{
  "count": 138,
  "next": "http://localhost:8000/terminologies/siddha/search/?page=2&q=diseane",
  "previous": null,
  "results": [
    {
      "id": 2,
      "code": "DIS",
      "english_name": "Disorder",
      "tamil_name": "நோய்",
      "romanized_name": "Disorder"
    },
    {
      "id": 1503,
      "code": "UB",
      "english_name": "Gum disease",
      "tamil_name": "பல்லடி நோய்கள்",
      "romanized_name": "PallaṭI Nōykaḷ"
    },
    {
      "id": 761,
      "code": "N",
      "english_name": "Eye diseases",
      "tamil_name": "கண் நோய்கள்",
      "romanized_name": "Kaṇ Nōykaḷ"
    }
  ]
}`}
              </code>
            </pre>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Principles</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>• Based on five elements: earth, water, fire, air, and ether</li>
              <li>• Three humors: Vatham, Pitham, and Kapham</li>
              <li>• Focus on eight diagnostic methods</li>
              <li>• Use of metals and minerals in medicine</li>
              <li>• Spiritual practices for healing</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Common Treatments</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>• Herbal preparations</li>
              <li>• Mineral-based medicines</li>
              <li>• Yoga and meditation</li>
              <li>• Dietary regulations</li>
              <li>• Spiritual practices</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// About Unani Page Component
const AboutUnaniPage = () => {
  return (
    <div className="container px-6 py-8 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">About Unani Medicine</h2>
        <p className="text-muted-foreground">
          Unani medicine is a traditional system of medicine that originated in Greece and was developed further by Arab and Persian physicians.
          It is based on the concept of the four humors: blood, phlegm, yellow bile, and black bile.
        </p>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Unani API Endpoint</CardTitle>
          <p className="text-muted-foreground">Access Unani medical terminologies through our API</p>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg mb-6">
            <code className="text-sm">GET {API_BASE_URL}/terminologies/unani/search/?q=query</code>
          </div>
          
          <h4 className="font-medium mb-3">Sample Response Data</h4>
          <div className="bg-[#1E1E1E] rounded-lg p-4 overflow-auto max-h-96">
            <pre className="text-sm text-white">
              <code>
{`{
  "count": 139,
  "next": "http://localhost:8000/terminologies/unani/search/?page=2&q=diseane",
  "previous": null,
  "results": [
    {
      "id": 3,
      "code": "UM-DIS",
      "english_name": "Disorders",
      "arabic_name": "-",
      "romanized_name": "-"
    },
    {
      "id": 2045,
      "code": "DB",
      "english_name": "Diseases of lungs",
      "arabic_name": "امراض ریہ",
      "romanized_name": "Amrāḍ-i-Ri’a"
    },
    {
      "id": 1378,
      "code": "O-16",
      "english_name": "simple disease",
      "arabic_name": "المرض المفرد",
      "romanized_name": "Al-Maraḍ al-Mufrad"
    }
  ]
}`}
              </code>
            </pre>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Principles</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>• Based on four humors: blood, phlegm, yellow bile, black bile</li>
              <li>• Seven physiological principles</li>
              <li>• Focus on temperament assessment</li>
              <li>• Use of natural substances</li>
              <li>• Regimental therapy</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Common Treatments</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>• Herbal medicines</li>
              <li>• Dietotherapy</li>
              <li>• Regimental therapy (Ilaj-bil-Tadbir)</li>
              <li>• Surgery (Ilaj-bil-Yad)</li>
              <li>• Pharmacotherapy (Ilaj-bil-Dawa)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// About ICD-11 Page Component
const AboutICD11Page = () => {
  return (
    <div className="container px-6 py-8 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">About ICD-11</h2>
        <p className="text-muted-foreground">
          The International Classification of Diseases (ICD) is the global standard for diagnostic health information.
          ICD-11 is the eleventh revision, which includes a chapter on traditional medicine.
        </p>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>ICD-11 API Endpoint</CardTitle>
          <p className="text-muted-foreground">Access ICD-11 medical codes through our API</p>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg mb-6">
            <code className="text-sm">GET {API_BASE_URL}/terminologies/icd11/search/?q=query</code>
          </div>
          
          <h4 className="font-medium mb-3">Sample Response Data</h4>
          <div className="bg-[#1E1E1E] rounded-lg p-4 overflow-auto max-h-96">
            <pre className="text-sm text-white">
              <code>
{`{
  "count": 6,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 13557,
      "foundation_uri": "http://id.who.int/icd/entity/1907420475",
      "code": "MG24.0",
      "title": "Fear of cancer"
    },
    {
      "id": 17170,
      "foundation_uri": "http://id.who.int/icd/entity/998223002",
      "code": "QB20",
      "title": "Blood donor"
    },
    {
      "id": 19514,
      "foundation_uri": "http://id.who.int/icd/entity/2062516965",
      "code": "XA8EC5",
      "title": "Blood"
    }
  ]
}`}
              </code>
            </pre>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>• Global standard for health information</li>
              <li>• Digital-ready design</li>
              <li>• Multilingual support</li>
              <li>• Traditional medicine chapter</li>
              <li>• Regular updates</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Traditional Medicine Module</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>• Chapter 26: Traditional Medicine</li>
              <li>• Conditions originating from traditional medicine</li>
              <li>• Pattern-based diagnostics</li>
              <li>• Integration with modern medicine</li>
              <li>• Global applicability</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// All Endpoints Page Component
const AllEndpointsPage = () => {
  const endpoints = [
    {
      name: "Ayurveda Search",
      method: "GET",
      endpoint: `${API_BASE_URL}/terminologies/ayurveda/search/?q=query`,
      description: "Search Ayurveda medical terminologies",
      sample: {
        count: 283,
        next: `${API_BASE_URL}/terminologies/ayurveda/search/?page=2&q=diseane`,
        previous: null,
        results: [
          {
            id: 2,
            code: "DIS",
            english_name: "disease/disorder",
            hindi_name: "विकारः",
            diacritical_name: "vikāraḥ"
          }
        ]
      }
    },
    {
      name: "Siddha Search",
      method: "GET",
      endpoint: `${API_BASE_URL}/terminologies/siddha/search/?q=query`,
      description: "Search Siddha medical terminologies",
      sample: {
        count: 138,
        next: `${API_BASE_URL}/terminologies/siddha/search/?page=2&q=diseane`,
        previous: null,
        results: [
          {
            id: 2,
            code: "DIS",
            english_name: "Disorder",
            tamil_name: "நோய்",
            romanized_name: "Disorder"
          }
        ]
      }
    },
    {
      name: "Unani Search",
      method: "GET",
      endpoint: `${API_BASE_URL}/terminologies/unani/search/?q=query`,
      description: "Search Unani medical terminologies",
      sample: {
        count: 139,
        next: `${API_BASE_URL}/terminologies/unani/search/?page=2&q=diseane`,
        previous: null,
        results: [
          {
            id: 3,
            code: "UM-DIS",
            english_name: "Disorders",
            arabic_name: "-",
            romanized_name: "-"
          }
        ]
      }
    },
    {
      name: "ICD-11 Search",
      method: "GET",
      endpoint: `${API_BASE_URL}/terminologies/icd11/search/?q=query`,
      description: "Search ICD-11 medical codes",
      sample: {
        count: 6,
        next: null,
        previous: null,
        results: [
          {
            id: 13557,
            foundation_uri: "http://id.who.int/icd/entity/1907420475",
            code: "MG24.0",
            title: "Fear of cancer"
          }
        ]
      }
    },
    {
      name: "Mappings Search",
      method: "GET",
      endpoint: `${API_BASE_URL}/terminologies/mappings/?system=ayurveda&q=query&min_confidence=0.1`,
      description: "Find mappings between traditional medicine and ICD-11",
      sample: {
        search_params: {
          system: "ayurveda",
          query: "fever",
          min_confidence: 0.1
        },
        pagination: {
          page: 1,
          page_size: 20,
          total_pages: 1,
          total_results: 20,
          has_next: false,
          has_previous: false
        },
        fuzzy_matches_without_mappings: [
          {
            term_id: 775,
            code: "EC-3.19",
            english_name: "chronic fever",
            similarity: 0.429,
            has_mapping: false,
            message: "Term found but no ICD mapping exists yet"
          }
        ],
        results: []
      }
    }
  ];

  return (
    <div className="container px-6 py-8 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">All API Endpoints</h2>
        <p className="text-muted-foreground">
          Explore all available API endpoints with detailed information and sample responses.
        </p>
      </div>
      
      <div className="space-y-8">
        {endpoints.map((endpoint, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{endpoint.name}</CardTitle>
                  <p className="text-muted-foreground">{endpoint.description}</p>
                </div>
                <Badge variant="outline">{endpoint.method}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg mb-6">
                <code className="text-sm break-all">{endpoint.endpoint}</code>
              </div>
              
              <h4 className="font-medium mb-3">Sample Response</h4>
              <div className="bg-[#1E1E1E] rounded-lg p-4 overflow-auto max-h-96">
                <pre className="text-sm text-white">
                  <code>{JSON.stringify(endpoint.sample, null, 2)}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Ayurveda Page Component
const AyurvedaPage = () => {
  return (
    <div className="container px-6 py-8 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Ayurveda Terminology API</h2>
        <p className="text-muted-foreground">
          Search and explore Ayurveda medical terminologies with detailed information including English names, Hindi names, and diacritical representations.
        </p>
      </div>
      
      <ApiTestingComponent
        endpoint={`${API_BASE_URL}/terminologies/ayurveda/search/?q=`}
        title="Search Ayurveda Terms"
        description="Search Ayurveda terminologies by disease names, symptoms, or conditions."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Database className="h-5 w-5 mr-2 text-blue-500" />
              Response Structure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm mb-1">Success Response</h4>
                <div className="bg-muted p-3 rounded text-sm">
                  <code>
                    {`{
  "count": 283,
  "next": "http://localhost:8000/terminologies/ayurveda/search/?page=2&q=diseane",
  "previous": null,
  "results": [
    {
      "id": 2,
      "code": "DIS",
      "english_name": "disease/disorder",
      "hindi_name": "विकारः",
      "diacritical_name": "vikāraḥ"
    },
    ...
  ]
}`}
                  </code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-500" />
              Field Descriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm mb-1">Response Fields</h4>
                <ul className="text-sm space-y-2">
                  <li><span className="font-medium">count</span> - Total number of results</li>
                  <li><span className="font-medium">next</span> - URL for next page of results</li>
                  <li><span className="font-medium">previous</span> - URL for previous page of results</li>
                  <li><span className="font-medium">results</span> - Array of terminology objects</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-1">Terminology Fields</h4>
                <ul className="text-sm space-y-2">
                  <li><span className="font-medium">id</span> - Unique identifier</li>
                  <li><span className="font-medium">code</span> - Terminology code</li>
                  <li><span className="font-medium">english_name</span> - English name</li>
                  <li><span className="font-medium">hindi_name</span> - Hindi name</li>
                  <li><span className="font-medium">diacritical_name</span> - Diacritical representation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Siddha Page Component
const SiddhaPage = () => {
  return (
    <div className="container px-6 py-8 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Siddha Terminology API</h2>
        <p className="text-muted-foreground">
          Explore Siddha medical terminologies with English names, Tamil names, and romanized representations.
        </p>
      </div>
      
      <ApiTestingComponent
        endpoint={`${API_BASE_URL}/terminologies/siddha/search/?q=`}
        title="Search Siddha Terms"
        description="Search Siddha terminologies by disease names, symptoms, or conditions."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Database className="h-5 w-5 mr-2 text-purple-500" />
              Response Structure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm mb-1">Success Response</h4>
                <div className="bg-muted p-3 rounded text-sm">
                  <code>
                    {`{
  "count": 138,
  "next": "http://localhost:8000/terminologies/siddha/search/?page=2&q=diseane",
  "previous": null,
  "results": [
    {
      "id": 2,
      "code": "DIS",
      "english_name": "Disorder",
      "tamil_name": "நோய்",
      "romanized_name": "Disorder"
    },
    ...
  ]
}`}
                  </code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <FileText className="h-5 w-5 mr-2 text-purple-500" />
              Field Descriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm mb-1">Response Fields</h4>
                <ul className="text-sm space-y-2">
                  <li><span className="font-medium">count</span> - Total number of results</li>
                  <li><span className="font-medium">next</span> - URL for next page of results</li>
                  <li><span className="font-medium">previous</span> - URL for previous page of results</li>
                  <li><span className="font-medium">results</span> - Array of terminology objects</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-1">Terminology Fields</h4>
                <ul className="text-sm space-y-2">
                  <li><span className="font-medium">id</span> - Unique identifier</li>
                  <li><span className="font-medium">code</span> - Terminology code</li>
                  <li><span className="font-medium">english_name</span> - English name</li>
                  <li><span className="font-medium">tamil_name</span> - Tamil name</li>
                  <li><span className="font-medium">romanized_name</span> - Romanized representation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Unani Page Component
const UnaniPage = () => {
  return (
    <div className="container px-6 py-8 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Unani Terminology API</h2>
        <p className="text-muted-foreground">
          Explore Unani medical terminologies with English names, Arabic names, and romanized representations.
        </p>
      </div>
      
      <ApiTestingComponent
        endpoint={`${API_BASE_URL}/terminologies/unani/search/?q=`}
        title="Search Unani Terms"
        description="Search Unani terminologies by disease names, symptoms, or conditions."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Database className="h-5 w-5 mr-2 text-green-500" />
              Response Structure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm mb-1">Success Response</h4>
                <div className="bg-muted p-3 rounded text-sm">
                  <code>
                    {`{
  "count": 139,
  "next": "http://localhost:8000/terminologies/unani/search/?page=2&q=diseane",
  "previous": null,
  "results": [
    {
      "id": 3,
      "code": "UM-DIS",
      "english_name": "Disorders",
      "arabic_name": "-",
      "romanized_name": "-"
    },
    ...
  ]
}`}
                  </code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <FileText className="h-5 w-5 mr-2 text-green-500" />
              Field Descriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm mb-1">Response Fields</h4>
                <ul className="text-sm space-y-2">
                  <li><span className="font-medium">count</span> - Total number of results</li>
                  <li><span className="font-medium">next</span> - URL for next page of results</li>
                  <li><span className="font-medium">previous</span> - URL for previous page of results</li>
                  <li><span className="font-medium">results</span> - Array of terminology objects</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-1">Terminology Fields</h4>
                <ul className="text-sm space-y-2">
                  <li><span className="font-medium">id</span> - Unique identifier</li>
                  <li><span className="font-medium">code</span> - Terminology code</li>
                  <li><span className="font-medium">english_name</span> - English name</li>
                  <li><span className="font-medium">arabic_name</span> - Arabic name</li>
                  <li><span className="font-medium">romanized_name</span> - Romanized representation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// ICD-11 Page Component
const ICD11Page = () => {
  return (
    <div className="container px-6 py-8 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">ICD-11 Terminology API</h2>
        <p className="text-muted-foreground">
          Search ICD-11 medical codes and terminologies with detailed information.
        </p>
      </div>
      
      <ApiTestingComponent
        endpoint={`${API_BASE_URL}/terminologies/icd11/search/?q=`}
        title="Search ICD-11 Terms"
        description="Search ICD-11 terminologies by disease names, symptoms, or conditions."
        defaultQuery="Diabet"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Database className="h-5 w-5 mr-2 text-orange-500" />
              Response Structure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm mb-1">Success Response</h4>
                <div className="bg-muted p-3 rounded text-sm">
                  <code>
                    {`{
  "count": 6,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 13557,
      "foundation_uri": "http://id.who.int/icd/entity/1907420475",
      "code": "MG24.0",
      "title": "Fear of cancer"
    },
    ...
  ]
}`}
                  </code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <FileText className="h-5 w-5 mr-2 text-orange-500" />
              Field Descriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm mb-1">Response Fields</h4>
                <ul className="text-sm space-y-2">
                  <li><span className="font-medium">count</span> - Total number of results</li>
                  <li><span className="font-medium">next</span> - URL for next page of results</li>
                  <li><span className="font-medium">previous</span> - URL for previous page of results</li>
                  <li><span className="font-medium">results</span> - Array of terminology objects</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-1">Terminology Fields</h4>
                <ul className="text-sm space-y-2">
                  <li><span className="font-medium">id</span> - Unique identifier</li>
                  <li><span className="font-medium">foundation_uri</span> - Foundation URI</li>
                  <li><span className="font-medium">code</span> - ICD-11 code</li>
                  <li><span className="font-medium">title</span> - Code title/description</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Mappings Page Component
const MappingsPage = () => {
  const [system, setSystem] = useState("ayurveda");
  const [query, setQuery] = useState("fever");
  const [minConfidence, setMinConfidence] = useState(0.1);
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const url = `${API_BASE_URL}/terminologies/mappings/?system=${system}&q=${query}&min_confidence=${minConfidence}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setResponseData(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container px-6 py-8 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Mappings API</h2>
        <p className="text-muted-foreground">
          Find mappings between traditional medicine terminologies and ICD-11 codes with confidence scores.
        </p>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search Mappings</CardTitle>
          <p className="text-muted-foreground">Find mappings between traditional medicine systems and ICD-11</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">System</label>
              <Select value={system} onValueChange={setSystem}>
                <SelectTrigger>
                  <SelectValue placeholder="Select system" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ayurveda">Ayurveda</SelectItem>
                  <SelectItem value="siddha">Siddha</SelectItem>
                  <SelectItem value="unani">Unani</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Search Query</label>
              <Input
                placeholder="Enter search term..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Min Confidence</label>
              <Input
                type="number"
                step="0.1"
                min="0.1"
                max="1.0"
                value={minConfidence}
                onChange={(e) => setMinConfidence(parseFloat(e.target.value))}
              />
            </div>
          </div>
          
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Search className="h-4 w-4 mr-2" />
            )}
            Search Mappings
          </Button>
        </CardContent>
      </Card>
      
      <ApiResponseDisplay data={responseData} loading={loading} error={error} />
      
      {responseData && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Mapping Results</h3>
          
          {responseData.results && responseData.results.length > 0 ? (
            <div className="space-y-4">
              {responseData.results.map((mapping, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{mapping.source_term.english_name}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{mapping.source_term.code}</Badge>
                      <Badge variant="secondary">Confidence: {(mapping.confidence_score * 100).toFixed(1)}%</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Source Term</h4>
                        <div className="bg-muted p-3 rounded text-sm">
                          <p><span className="font-medium">Code:</span> {mapping.source_term.code}</p>
                          <p><span className="font-medium">Name:</span> {mapping.source_term.english_name}</p>
                          {mapping.source_term.hindi_name && (
                            <p><span className="font-medium">Hindi:</span> {mapping.source_term.hindi_name}</p>
                          )}
                          {mapping.source_term.diacritical_name && (
                            <p><span className="font-medium">Diacritical:</span> {mapping.source_term.diacritical_name}</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">ICD-11 Mapping</h4>
                        {mapping.icd_mapping ? (
                          <div className="bg-muted p-3 rounded text-sm">
                            <p><span className="font-medium">Code:</span> {mapping.icd_mapping.code}</p>
                            <p><span className="font-medium">Title:</span> {mapping.icd_mapping.title}</p>
                            <p><span className="font-medium">Similarity:</span> {(mapping.icd_mapping.similarity_score * 100).toFixed(1)}%</p>
                          </div>
                        ) : (
                          <div className="bg-muted p-3 rounded text-sm">
                            <p className="text-muted-foreground">No ICD-11 mapping available</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : responseData.fuzzy_matches_without_mappings && responseData.fuzzy_matches_without_mappings.length > 0 ? (
            <div>
              <h4 className="font-medium mb-3">Fuzzy Matches (No Mappings)</h4>
              <div className="space-y-3">
                {responseData.fuzzy_matches_without_mappings.map((match, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{match.english_name}</p>
                          <p className="text-sm text-muted-foreground">Code: {match.code}</p>
                          <p className="text-sm">Similarity: {(match.similarity * 100).toFixed(1)}%</p>
                        </div>
                        <Badge variant="outline">{match.message}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-muted rounded-lg p-8 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No mappings found</h3>
              <p className="text-muted-foreground">Try a different search term or adjust the confidence threshold.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Testing Playground Component
const TestingPlayground = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState("ayurveda");
  const [query, setQuery] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const endpoints = {
    ayurveda: `${API_BASE_URL}/terminologies/ayurveda/search/?q=`,
    siddha: `${API_BASE_URL}/terminologies/siddha/search/?q=`,
    unani: `${API_BASE_URL}/terminologies/unani/search/?q=`,
    icd11: `${API_BASE_URL}/terminologies/icd11/search/?q=`,
    mappings: `${API_BASE_URL}/terminologies/mappings/?system=ayurveda&q=`
  };

  const handleTest = async () => {
    if (!query.trim() && selectedEndpoint !== "mappings") return;
    
    setLoading(true);
    setError(null);
    
    try {
      let url = endpoints[selectedEndpoint];
      
      if (selectedEndpoint === "mappings") {
        url = `${API_BASE_URL}/terminologies/mappings/?system=ayurveda&q=${query || "fever"}&min_confidence=0.1`;
      } else {
        url += query;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setResponseData(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container px-6 py-8 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">API Testing Playground</h2>
        <p className="text-muted-foreground">
          Test all API endpoints in one place. Select an endpoint, enter parameters, and see the response.
        </p>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Test Endpoints</CardTitle>
          <p className="text-muted-foreground">Select an endpoint and enter parameters to test</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Endpoint</label>
              <Select value={selectedEndpoint} onValueChange={setSelectedEndpoint}>
                <SelectTrigger>
                  <SelectValue placeholder="Select endpoint" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ayurveda">Ayurveda Search</SelectItem>
                  <SelectItem value="siddha">Siddha Search</SelectItem>
                  <SelectItem value="unani">Unani Search</SelectItem>
                  <SelectItem value="icd11">ICD-11 Search</SelectItem>
                  <SelectItem value="mappings">Mappings</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {selectedEndpoint === "mappings" ? "Search Query (optional)" : "Search Query"}
              </label>
              <Input
                placeholder={
                  selectedEndpoint === "mappings" 
                    ? "Enter search term (default: fever)" 
                    : "Enter search term"
                }
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleTest()}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button onClick={handleTest} disabled={loading}>
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Code className="h-4 w-4 mr-2" />
              )}
              Test Endpoint
            </Button>
            
            <div className="text-sm text-muted-foreground">
              Endpoint: <code className="bg-muted px-2 py-1 rounded">{endpoints[selectedEndpoint]}</code>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <ApiResponseDisplay data={responseData} loading={loading} error={error} />
    </div>
  );
};

// Analytics Page Component
const AnalyticsPage = () => {
  // Mock data for charts
  const usageData = {
    ayurveda: 1250,
    siddha: 850,
    unani: 920,
    icd11: 1560,
    mappings: 2100
  };
  
  const successRates = {
    ayurveda: 98,
    siddha: 95,
    unani: 96,
    icd11: 99,
    mappings: 92
  };
  
  const popularSearches = [
    { term: "fever", count: 342 },
    { term: "diabetes", count: 287 },
    { term: "headache", count: 231 },
    { term: "cough", count: 198 },
    { term: "asthma", count: 176 }
  ];

  return (
    <div className="container px-6 py-8 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">API Analytics</h2>
        <p className="text-muted-foreground">
          View usage statistics, success rates, and popular searches across all API endpoints.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
              API Usage Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(usageData).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="capitalize">{key}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-muted rounded-full h-2.5">
                      <div 
                        className="bg-blue-500 h-2.5 rounded-full" 
                        style={{ width: `${(value / 2500) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-green-500" />
              Success Rates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(successRates).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="capitalize">{key}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-muted rounded-full h-2.5">
                      <div 
                        className="bg-green-500 h-2.5 rounded-full" 
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Popular Searches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {popularSearches.map((search, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="font-medium">{search.term}</span>
                <Badge variant="secondary">{search.count} searches</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Home Page Component
const HomePage = () => {
  return (
    <div>
      <HeroSection />
      
      <div className="container px-6 py-12 max-w-4xl">
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6">Introduction</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="mb-6">
              Welcome to the comprehensive documentation for the NAMASTE & ICD-11 Integration API. 
              This platform enables seamless integration of India's traditional medicine terminologies 
              (Ayurveda, Siddha, and Unani) with WHO's ICD-11 Traditional Medicine Module 2 (TM2) 
              for Electronic Medical Record (EMR) systems.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <Database className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <h3 className="font-semibold mb-1">FHIR R4</h3>
                  <p className="text-sm text-muted-foreground">Compliant</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <h3 className="font-semibold mb-1">OAuth 2.0</h3>
                  <p className="text-sm text-muted-foreground">ABHA Ready</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Code className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <h3 className="font-semibold mb-1">Dual Coding</h3>
                  <p className="text-sm text-muted-foreground">TM + Biomedicine</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                  <h3 className="font-semibold mb-1">EHR 2016</h3>
                  <p className="text-sm text-muted-foreground">Standards</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6">Available Endpoints</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-blue-500" />
                  Ayurveda API
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Search Ayurveda medical terminologies with English names, Hindi names, and diacritical representations.
                </p>
                <div className="bg-muted p-3 rounded text-sm mb-4">
                  <code>GET /terminologies/ayurveda/search/?q=query</code>
                </div>
                <Button asChild variant="outline">
                  <Link to="/ayurveda">Explore Ayurveda API</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-purple-500" />
                  Siddha API
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Search Siddha medical terminologies with English names, Tamil names, and romanized representations.
                </p>
                <div className="bg-muted p-3 rounded text-sm mb-4">
                  <code>GET /terminologies/siddha/search/?q=query</code>
                </div>
                <Button asChild variant="outline">
                  <Link to="/siddha">Explore Siddha API</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-green-500" />
                  Unani API
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Search Unani medical terminologies with English names, Arabic names, and romanized representations.
                </p>
                <div className="bg-muted p-3 rounded text-sm mb-4">
                  <code>GET /terminologies/unani/search/?q=query</code>
                </div>
                <Button asChild variant="outline">
                  <Link to="/unani">Explore Unani API</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-orange-500" />
                  ICD-11 API
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Search ICD-11 medical codes and terminologies with detailed information.
                </p>
                <div className="bg-muted p-3 rounded text-sm mb-4">
                  <code>GET /terminologies/icd11/search/?q=query</code>
                </div>
                <Button asChild variant="outline">
                  <Link to="/icd11">Explore ICD-11 API</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-red-500" />
                  Mappings API
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Find mappings between traditional medicine terminologies and ICD-11 codes with confidence scores.
                </p>
                <div className="bg-muted p-3 rounded text-sm mb-4">
                  <code>GET /terminologies/mappings/?system=system&q=query&min_confidence=0.1</code>
                </div>
                <Button asChild variant="outline">
                  <Link to="/mappings">Explore Mappings API</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6">Getting Started</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>1. Explore Endpoints</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Browse through the available API endpoints to understand what data is available and how to access it.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>2. Test APIs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Use the testing playground to experiment with different endpoints and parameters.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>3. Integrate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Use the API endpoints in your applications to integrate traditional medicine data.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 md:ml-64">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ayurveda" element={<AyurvedaPage />} />
            <Route path="/about-ayurveda" element={<AboutAyurvedaPage />} />
            <Route path="/siddha" element={<SiddhaPage />} />
            <Route path="/about-siddha" element={<AboutSiddhaPage />} />
            <Route path="/unani" element={<UnaniPage />} />
            <Route path="/about-unani" element={<AboutUnaniPage />} />
            <Route path="/icd11" element={<ICD11Page />} />
            <Route path="/about-icd11" element={<AboutICD11Page />} />
            <Route path="/mappings" element={<MappingsPage />} />
            <Route path="/all-endpoints" element={<AllEndpointsPage />} />
            <Route path="/playground" element={<TestingPlayground />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Routes>
        </div>
      </div>
      
      <AIChatbot />
    </div>
  );
}

// Wrap the app with the theme provider
const ThemedApp = () => {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <Router>
        <App />
      </Router>
    </NextThemesProvider>
  );
};

export default ThemedApp;  