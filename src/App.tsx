import React, { useState, useEffect, createContext, useContext, useRef } from "react";
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
  User,
  Upload,
  Zap
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
<header
  className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all ${
    isScrolled ? "shadow-md" : ""
  }`}
>
  <div className="flex h-20 items-center justify-between px-4">
  {/* Left Section: Logo + Title */}
  <div className="flex items-center gap-4">
    <Link to="/" className="flex items-center gap-2">
      <img
        src="/logo.png"
        alt="Logo"
        className="h-14 w-14 object-contain"
      />
      <h1 className="text-2xl font-bold italic text-[#1e88e5]">
        Ayush Bandhan API Documentation
      </h1>
    </Link>
  </div>

    {/* Right Section: Theme Toggle */}
    <nav className="flex items-center gap-4">
      <Badge variant="secondary" className="hidden sm:flex">
        v1.0.0
      </Badge>
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
      title: "Siddha API",
      href: "/siddha",
      icon: <Database className="h-4 w-4" />
    },
    {
      title: "Unani API",
      href: "/unani",
      icon: <Database className="h-4 w-4" />
    },
    {
      title: "ICD-11 API",
      href: "/icd11",
      icon: <Database className="h-4 w-4" />
    },
    {
      title: "Mappings & Testing",
      href: "/mappings-testing",
      icon: <Code className="h-4 w-4" />
    },
    {
      title: "Upload CSV",
      href: "/upload",
      icon: <Upload className="h-4 w-4" />
    },
    {
      title: "Autocomplete",
      href: "/autocomplete",
      icon: <Zap className="h-4 w-4" />
    },
    {
      title: "All Endpoints",
      href: "/all-endpoints",
      icon: <Database className="h-4 w-4" />
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
interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  hasMore?: boolean;
  fullData?: any;
  system?: string;
  query?: string;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: any[];
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your API documentation assistant. I can help you understand endpoints, response formats, and how to use the APIs. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [cache, setCache] = useState<Record<string, ApiResponse>>({});
  const [context, setContext] = useState<{ lastSystem: string | null }>({ lastSystem: null });
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
    "Search for fever in Ayurveda",
    "Find diabetes in ICD-11",
    "Show me mappings for headache",
    "What are the common search parameters?",
  ];

  // Function to fetch data from API endpoints
  const fetchData = async (url: string): Promise<ApiResponse | null> => {
    // Check cache first
    if (cache[url]) {
      return cache[url];
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Cache the response
      setCache(prevCache => ({
        ...prevCache,
        [url]: data
      }));
      
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  // Function to format API response for display with pagination
  const formatApiResponse = (data: ApiResponse | null, system: string, query: string, showAll = false): { content: string; hasMore: boolean; fullData: ApiResponse | null } => {
    if (!data || !data.results || data.results.length === 0) {
      return {
        content: `No results found for "${query}" in ${system}.`,
        hasMore: false,
        fullData: null
      };
    }

    let response = `Found ${data.count} result(s) for "${query}" in ${system}:\n\n`;
    const itemsToShow = showAll ? data.results : data.results.slice(0, 5);
    
    itemsToShow.forEach((item, index) => {
      response += `${index + 1}. `;
      
      if (system === 'ayurveda') {
        response += `Code: ${item.code || 'N/A'}, English: ${item.english_name || 'N/A'}, Hindi: ${item.hindi_name || 'N/A'}\n`;
      } else if (system === 'siddha') {
        response += `Code: ${item.code || 'N/A'}, English: ${item.english_name || 'N/A'}, Tamil: ${item.tamil_name || 'N/A'}\n`;
      } else if (system === 'unani') {
        response += `Code: ${item.code || 'N/A'}, English: ${item.english_name || 'N/A'}, Arabic: ${item.arabic_name || 'N/A'}\n`;
      } else if (system === 'icd11') {
        response += `Code: ${item.code || 'N/A'}, Title: ${item.title || 'N/A'}\n`;
      } else if (system === 'mappings') {
        if (item.source_term && item.icd_mapping) {
          response += `Term: ${item.source_term.english_name || 'N/A'} (${item.source_term.code || 'N/A'}) → ICD-11: ${item.icd_mapping.code || 'N/A'} (${item.icd_mapping.title || 'N/A'}), Confidence: ${(item.confidence_score * 100).toFixed(1)}%\n`;
        }
      }
    });

    const hasMore = data.count > 5 && !showAll;
    
    if (hasMore) {
      response += `\n...and ${data.count - 5} more results.`;
    }

    return {
      content: response,
      hasMore,
      fullData: data
    };
  };

  const handleSeeMore = (messageId: string, fullData: ApiResponse, system: string, query: string) => {
    const formattedResponse = formatApiResponse(fullData, system, query, true);
    
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, content: formattedResponse.content, hasMore: false }
        : msg
    ));
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Determine which API to call based on user input
    let apiUrl = '';
    let system = '';
    const lowercaseInput = inputValue.toLowerCase();

    // Update context based on user input
    if (lowercaseInput.includes('ayurveda') || lowercaseInput.includes('ayurved')) {
      setContext({ lastSystem: 'ayurveda' });
      system = 'ayurveda';
      const query = inputValue.replace(/ayurveda|ayurved/gi, '').trim() || 'disease';
      apiUrl = `${API_BASE_URL}/terminologies/ayurveda/search/?q=${encodeURIComponent(query)}`;
    } else if (lowercaseInput.includes('siddha')) {
      setContext({ lastSystem: 'siddha' });
      system = 'siddha';
      const query = inputValue.replace(/siddha/gi, '').trim() || 'disease';
      apiUrl = `${API_BASE_URL}/terminologies/siddha/search/?q=${encodeURIComponent(query)}`;
    } else if (lowercaseInput.includes('unani')) {
      setContext({ lastSystem: 'unani' });
      system = 'unani';
      const query = inputValue.replace(/unani/gi, '').trim() || 'disease';
      apiUrl = `${API_BASE_URL}/terminologies/unani/search/?q=${encodeURIComponent(query)}`;
    } else if (lowercaseInput.includes('icd') || lowercaseInput.includes('icd-11')) {
      setContext({ lastSystem: 'icd11' });
      system = 'icd11';
      const query = inputValue.replace(/icd|icd-11/gi, '').trim() || 'disease';
      apiUrl = `${API_BASE_URL}/terminologies/icd11/search/?q=${encodeURIComponent(query)}&fuzzy=true&threshold=0.3`;
    } else if (lowercaseInput.includes('mapping') || lowercaseInput.includes('map')) {
      system = 'mappings';
      let medicalSystem = context.lastSystem || 'ayurveda';
      if (lowercaseInput.includes('siddha')) medicalSystem = 'siddha';
      if (lowercaseInput.includes('unani')) medicalSystem = 'unani';
      
      const query = inputValue.replace(/mapping|map|siddha|unani|ayurveda/gi, '').trim() || 'fever';
      apiUrl = `${API_BASE_URL}/terminologies/mappings/?system=${medicalSystem}&q=${encodeURIComponent(query)}&min_confidence=0.1`;
    } else if (context.lastSystem) {
      // Use context if no specific system mentioned
      system = context.lastSystem;
      const query = inputValue.trim() || 'disease';
      apiUrl = `${API_BASE_URL}/terminologies/${system}/search/?q=${encodeURIComponent(query)}`;
    }

    // If a specific API call is identified
    if (apiUrl) {
      const loadingMessage: Message = {
        id: Date.now().toString() + '-loading',
        content: "Searching for information...",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, loadingMessage]);

      const data = await fetchData(apiUrl);
      
      // Remove loading message
      setMessages(prev => prev.filter(msg => msg.id !== (Date.now().toString() + '-loading')));
      
      if (data) {
        const formattedResponse = formatApiResponse(data, system, inputValue);
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: formattedResponse.content,
          sender: "bot",
          timestamp: new Date(),
          hasMore: formattedResponse.hasMore,
          fullData: formattedResponse.fullData,
          system: system,
          query: inputValue
        };
        setMessages(prev => [...prev, botResponse]);
      } else {
        const errorResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: "Sorry, I couldn't retrieve the information at this time. Please try again later.",
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorResponse]);
      }
    } else {
      // General question - use the existing knowledge base
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: getBotResponse(inputValue),
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }

    setInputValue("");
  };

  const getBotResponse = (input: string): string => {
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
    const responses: Record<string, string> = {
      "hello": "Hello! How can I help you with the API documentation today?",
      "hi": "Hi there! What would you like to know about our APIs?",
      "thanks": "You're welcome! Is there anything else I can help you with?",
      "thank you": "You're welcome! Let me know if you need more assistance.",
      "what can you do": "I can help you understand API endpoints, response formats, search parameters, and how to integrate our traditional medicine APIs into your applications. I can also search for specific disease codes in Ayurveda, Siddha, Unani, and ICD-11 systems.",
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
    return "I can help you understand the API endpoints, response formats, and how to use the search parameters. Try asking about specific APIs like Ayurveda, Siddha, Unani, ICD-11, or Mappings. You can also ask about authentication, rate limits, or code examples. To search for specific diseases, try phrases like 'search for fever in Ayurveda' or 'find diabetes in ICD-11'.";
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
                  {message.hasMore && message.fullData && message.system && message.query && (
                    <Button
                      variant="link"
                      className="p-0 h-auto text-blue-500"
                      onClick={() => handleSeeMore(message.id, message.fullData, message.system!, message.query!)}
                    >
                      See more
                    </Button>
                  )}
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
            placeholder="Ask about API endpoints or search for diseases..."
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
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMorgLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMjkuNSIgY3k9IjI5LjUiIHI9IjEuNSIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
      
      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
            
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-6"
          >
        
            <Badge className="bg-blue-500/10 text-white-500 border-blue-500/20 px-4 py-1">
              FHIR R4 Compliant • ICD-11 TM2 • India EHR Standards 2016
            </Badge>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-bold mb-6 colors-primary text-[#1e88e5] italic"
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
                    <div className="text-2xl font-bold mb-2">4,500+</div>
                    <div className="text-sm text-muted-foreground">Ayurveda Terms</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-2">1,200+</div>
                    <div className="text-sm text-muted-foreground">Siddha Terms</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-2">1,800+</div>
                    <div className="text-sm text-muted-foreground">Unani Terms</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-2">529</div>
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

// Copy to clipboard function
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    // You can add a toast notification here if needed
    console.log('Text copied to clipboard');
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
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
      <div className="flex justify-between items-center mb-2">
        <span className="text-white text-sm font-medium">Response</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyToClipboard(JSON.stringify(data, null, 2))}
          className="h-8 w-8 p-0 text-white hover:bg-white/10"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
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
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-2 h-8 w-8 p-0"
                  onClick={() => copyToClipboard(`${endpoint}${query}`)}
                >
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

// Upload Page Component
const UploadPage = () => {
  const [selectedSystem, setSelectedSystem] = useState("ayurveda");
  const [file, setFile] = useState(null);
  const [updateSearchVector, setUpdateSearchVector] = useState(true);
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('update_search_vector', updateSearchVector.toString());

      const url = `${API_BASE_URL}/terminologies/${selectedSystem}/csv/upload/`;
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setResponseData(data);
    } catch (err) {
      setError(err.message);
      console.error("Error uploading file:", err);
    } finally {
      setLoading(false);
    }
  };

  const systemInfo = {
    ayurveda: {
      columns: "code, english_name, description, hindi_name, diacritical_name",
      description: "Upload CSV file to populate Ayurveda terms database. Updates existing records by code or creates new ones."
    },
    siddha: {
      columns: "code, english_name, description, tamil_name, romanized_name, reference",
      description: "Upload CSV file to populate Siddha terms database. Updates existing records by code or creates new ones."
    },
    unani: {
      columns: "code, english_name, description, arabic_name, romanized_name, reference",
      description: "Upload CSV file to populate Unani terms database. Updates existing records by code or creates new ones."
    }
  };

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">CSV Upload API</h2>
        <p className="text-muted-foreground">
          Upload CSV files to populate traditional medicine terminology databases. Updates existing records by code or creates new ones.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Upload CSV File</CardTitle>
              <p className="text-muted-foreground">{systemInfo[selectedSystem].description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select System</label>
                  <Select value={selectedSystem} onValueChange={setSelectedSystem}>
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
                
                <div>
                  <label className="text-sm font-medium mb-2 block">CSV File</label>
                  <Input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Required columns: {systemInfo[selectedSystem].columns}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="updateSearchVector"
                    checked={updateSearchVector}
                    onChange={(e) => setUpdateSearchVector(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="updateSearchVector" className="text-sm font-medium">
                    Update search vectors after import
                  </label>
                </div>
                
                <Button onClick={handleUpload} disabled={loading} className="w-full">
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Upload className="h-4 w-4 mr-2" />
                  )}
                  Upload CSV
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-500" />
                Endpoint Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-1">Method</h4>
                  <Badge variant="outline" className="mb-2">POST</Badge>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-1">URL</h4>
                  <div className="bg-muted p-2 rounded text-sm">
                    <code>{`${API_BASE_URL}/terminologies/{system}/csv/upload/`}</code>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-1">Parameters</h4>
                  <ul className="text-sm space-y-2">
                    <li><span className="font-medium">file</span> - CSV file with required columns</li>
                    <li><span className="font-medium">update_search_vector</span> - Whether to update search vectors after import (default: true)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-1">Responses</h4>
                  <ul className="text-sm space-y-2">
                    <li><span className="font-medium">200</span> - CSV processed successfully</li>
                    <li><span className="font-medium">400</span> - Bad request - invalid file or format</li>
                    <li><span className="font-medium">413</span> - File too large</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <ApiResponseDisplay data={responseData} loading={loading} error={error} />
          
          {responseData && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Upload Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{responseData.created || 0}</div>
                    <div className="text-sm text-green-800">Created</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{responseData.updated || 0}</div>
                    <div className="text-sm text-blue-800">Updated</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{responseData.skipped || 0}</div>
                    <div className="text-sm text-yellow-800">Skipped</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-600">{responseData.total_processed || 0}</div>
                    <div className="text-sm text-gray-800">Total Processed</div>
                  </div>
                </div>
                
                {responseData.errors && responseData.errors.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Errors</h4>
                    <div className="bg-red-50 p-3 rounded text-sm">
                      <ul className="list-disc list-inside">
                        {responseData.errors.map((error, index) => (
                          <li key={index} className="text-red-700">{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

// Autocomplete Page Component
const AutocompletePage = () => {
  const [selectedSystem, setSelectedSystem] = useState("ayurveda");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(10);
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const systemInfo = {
    ayurveda: {
      description: "Fast autocomplete for Ayurveda terms - returns only English name titles for optimal performance",
      searchFields: "English, Hindi, and diacritical names"
    },
    siddha: {
      description: "Fast autocomplete for Siddha terms - returns only English name titles for optimal performance",
      searchFields: "English, Tamil, and romanized names"
    },
    unani: {
      description: "Fast autocomplete for Unani terms - returns only English name titles for optimal performance",
      searchFields: "English, Arabic, and romanized names"
    },
    icd11: {
      description: "Fast autocomplete for ICD-11 terms - returns only matching titles for optimal performance",
      searchFields: "Title, code, and definition"
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const url = `${API_BASE_URL}/terminologies/${selectedSystem}/autocomplete/?q=${encodeURIComponent(query)}&limit=${limit}`;
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
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Autocomplete API</h2>
        <p className="text-muted-foreground">
          Fast autocomplete endpoints for traditional medicine terminologies - returns only matching titles for optimal performance.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Autocomplete Search</CardTitle>
              <p className="text-muted-foreground">{systemInfo[selectedSystem].description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select System</label>
                  <Select value={selectedSystem} onValueChange={setSelectedSystem}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select system" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ayurveda">Ayurveda</SelectItem>
                      <SelectItem value="siddha">Siddha</SelectItem>
                      <SelectItem value="unani">Unani</SelectItem>
                      <SelectItem value="icd11">ICD-11</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Search Term</label>
                  <Input
                    placeholder="Enter search term..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Searches across: {systemInfo[selectedSystem].searchFields}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Limit</label>
                  <Input
                    type="number"
                    min="1"
                    max="20"
                    value={limit}
                    onChange={(e) => setLimit(parseInt(e.target.value) || 10)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Maximum results to return (default: 10, max: 20)
                  </p>
                </div>
                
                <Button onClick={handleSearch} disabled={loading} className="w-full">
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Zap className="h-4 w-4 mr-2" />
                  )}
                  Autocomplete Search
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-500" />
                Endpoint Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-1">Method</h4>
                  <Badge variant="outline" className="mb-2">GET</Badge>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-1">URL</h4>
                  <div className="bg-muted p-2 rounded text-sm">
                    <code>{`${API_BASE_URL}/terminologies/{system}/autocomplete/`}</code>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-1">Parameters</h4>
                  <ul className="text-sm space-y-2">
                    <li><span className="font-medium">q</span> - Search term for autocomplete</li>
                    <li><span className="font-medium">limit</span> - Maximum results to return (default: 10, max: 20)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-1">Response</h4>
                  <p className="text-sm">Array of matching title names only</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <ApiResponseDisplay data={responseData} loading={loading} error={error} />
          
          {responseData && Array.isArray(responseData) && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Autocomplete Results</CardTitle>
                <p className="text-muted-foreground">Found {responseData.length} matching terms</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {responseData.map((term, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="font-medium">{term}</span>
                      <Badge variant="outline">#{index + 1}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

// Ayurveda Page Component (Combined with About Ayurveda)
const AyurvedaPage = () => {
  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Ayurveda Terminology API</h2>
        <p className="text-muted-foreground">
          Search and explore Ayurveda medical terminologies with detailed information including English names, Hindi names, and diacritical representations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ApiTestingComponent
            endpoint={`${API_BASE_URL}/terminologies/ayurveda/search/?q=`}
            title="Search Ayurveda Terms"
            description="Search Ayurveda terminologies by disease names, symptoms, or conditions."
          />
          
          <Card className="mb-8">
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
        
        <div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>About Ayurveda Medicine</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Ayurveda is one of the world's oldest holistic healing systems, developed more than 3,000 years ago in India.
                It's based on the belief that health and wellness depend on a delicate balance between the mind, body, and spirit.
              </p>
              
              <div className="grid grid-cols-1 gap-6 mt-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-md">Key Principles</CardTitle>
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
                  <CardHeader className="pb-3">
                    <CardTitle className="text-md">Common Treatments</CardTitle>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Siddha Page Component (Combined with About Siddha)
const SiddhaPage = () => {
  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Siddha Terminology API</h2>
        <p className="text-muted-foreground">
          Explore Siddha medical terminologies with English names, Tamil names, and romanized representations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ApiTestingComponent
            endpoint={`${API_BASE_URL}/terminologies/siddha/search/?q=`}
            title="Search Siddha Terms"
            description="Search Siddha terminologies by disease names, symptoms, or conditions."
          />
          
          <Card className="mb-8">
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
        
        <div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>About Siddha Medicine</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Siddha medicine is one of the oldest medical systems in India, originating from Tamil Nadu.
                It emphasizes the importance of physical, mental, and spiritual well-being.
              </p>
              
              <div className="grid grid-cols-1 gap-6 mt-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-md">Key Principles</CardTitle>
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
                  <CardHeader className="pb-3">
                    <CardTitle className="text-md">Common Treatments</CardTitle>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Unani Page Component (Combined with About Unani)
const UnaniPage = () => {
  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Unani Terminology API</h2>
        <p className="text-muted-foreground">
          Explore Unani medical terminologies with English names, Arabic names, and romanized representations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ApiTestingComponent
            endpoint={`${API_BASE_URL}/terminologies/unani/search/?q=`}
            title="Search Unani Terms"
            description="Search Unani terminologies by disease names, symptoms, or conditions."
          />
          
          <Card className="mb-8">
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
        
        <div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>About Unani Medicine</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Unani medicine is a traditional system of medicine that originated in Greece and was developed further by Arab and Persian physicians.
                It is based on the concept of the four humors: blood, phlegm, yellow bile, and black bile.
              </p>
              
              <div className="grid grid-cols-1 gap-6 mt-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-md">Key Principles</CardTitle>
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
                  <CardHeader className="pb-3">
                    <CardTitle className="text-md">Common Treatments</CardTitle>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// ICD-11 Page Component (Combined with About ICD-11)
const ICD11Page = () => {
  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">ICD-11 Terminology API</h2>
        <p className="text-muted-foreground">
          Search ICD-11 medical codes and terminologies with detailed information.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ApiTestingComponent
            endpoint={`${API_BASE_URL}/terminologies/icd11/search/?q=`}
            title="Search ICD-11 Terms"
            description="Search ICD-11 terminologies by disease names, symptoms, or conditions."
            defaultQuery="Diabet"
          />
          
          <Card className="mb-8">
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
        
        <div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>About ICD-11</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                The International Classification of Diseases (ICD) is the global standard for diagnostic health information.
                ICD-11 is the eleventh revision, which includes a chapter on traditional medicine.
              </p>
              
              <div className="grid grid-cols-1 gap-6 mt-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-md">Key Features</CardTitle>
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
                  <CardHeader className="pb-3">
                    <CardTitle className="text-md">Traditional Medicine Module</CardTitle>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Mappings & Testing Page Component
const MappingsTestingPage = () => {
  const [system, setSystem] = useState("ayurveda");
  const [query, setQuery] = useState("fever");
  const [minConfidence, setMinConfidence] = useState(0.1);
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState("mappings");
  const [testQuery, setTestQuery] = useState("");

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

  const handleTest = async () => {
    if (!testQuery.trim() && selectedEndpoint !== "mappings") return;
    
    setLoading(true);
    setError(null);
    
    try {
      let url = '';
      
      if (selectedEndpoint === "mappings") {
        url = `${API_BASE_URL}/terminologies/mappings/?system=ayurveda&q=${testQuery || "fever"}&min_confidence=0.1`;
      } else {
        const endpoints = {
          ayurveda: `${API_BASE_URL}/terminologies/ayurveda/search/?q=`,
          siddha: `${API_BASE_URL}/terminologies/siddha/search/?q=`,
          unani: `${API_BASE_URL}/terminologies/unani/search/?q=`,
          icd11: `${API_BASE_URL}/terminologies/icd11/search/?q=`
        };
        url = endpoints[selectedEndpoint] + testQuery;
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
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Mappings & Testing API</h2>
        <p className="text-muted-foreground">
          Find mappings between traditional medicine terminologies and ICD-11 codes with confidence scores, and test all API endpoints.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
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
        </div>
        
        <div>
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
                    value={testQuery}
                    onChange={(e) => setTestQuery(e.target.value)}
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
                  Endpoint: <code className="bg-muted px-2 py-1 rounded">
                    {selectedEndpoint === "mappings" 
                      ? `${API_BASE_URL}/terminologies/mappings/?system=ayurveda&q=${testQuery || "fever"}&min_confidence=0.1`
                      : `${API_BASE_URL}/terminologies/${selectedEndpoint}/search/?q=${testQuery}`
                    }
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <ApiResponseDisplay data={responseData} loading={loading} error={error} />
      
      {responseData && responseData.results && responseData.results.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Mapping Results</h3>
          
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
        </div>
      )}
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
    },
    {
      name: "Ayurveda Autocomplete",
      method: "GET",
      endpoint: `${API_BASE_URL}/terminologies/ayurveda/autocomplete/?q=query&limit=10`,
      description: "Fast autocomplete for Ayurveda terms - returns only English name titles",
      sample: [
        "fever",
        "fever with headache",
        "febrile condition"
      ]
    },
    {
      name: "Siddha Autocomplete",
      method: "GET",
      endpoint: `${API_BASE_URL}/terminologies/siddha/autocomplete/?q=query&limit=10`,
      description: "Fast autocomplete for Siddha terms - returns only English name titles",
      sample: [
        "fever",
        "fever with headache",
        "febrile condition"
      ]
    },
    {
      name: "Unani Autocomplete",
      method: "GET",
      endpoint: `${API_BASE_URL}/terminologies/unani/autocomplete/?q=query&limit=10`,
      description: "Fast autocomplete for Unani terms - returns only English name titles",
      sample: [
        "fever",
        "fever with headache",
        "febrile condition"
      ]
    },
    {
      name: "ICD-11 Autocomplete",
      method: "GET",
      endpoint: `${API_BASE_URL}/terminologies/icd11/autocomplete/?q=query&limit=10`,
      description: "Fast autocomplete for ICD-11 terms - returns only matching titles",
      sample: [
        "diabetes mellitus",
        "diabetes type 1",
        "diabetic nephropathy"
      ]
    },
    {
      name: "Ayurveda CSV Upload",
      method: "POST",
      endpoint: `${API_BASE_URL}/terminologies/ayurveda/csv/upload/`,
      description: "Upload CSV file to populate Ayurveda terms database",
      sample: {
        created: 5,
        updated: 3,
        skipped: 2,
        total_processed: 10,
        errors: [],
        summary: "CSV processed successfully"
      }
    },
    {
      name: "Siddha CSV Upload",
      method: "POST",
      endpoint: `${API_BASE_URL}/terminologies/siddha/csv/upload/`,
      description: "Upload CSV file to populate Siddha terms database",
      sample: {
        created: 5,
        updated: 3,
        skipped: 2,
        total_processed: 10,
        errors: [],
        summary: "CSV processed successfully"
      }
    },
    {
      name: "Unani CSV Upload",
      method: "POST",
      endpoint: `${API_BASE_URL}/terminologies/unani/csv/upload/`,
      description: "Upload CSV file to populate Unani terms database",
      sample: {
        created: 5,
        updated: 3,
        skipped: 2,
        total_processed: 10,
        errors: [],
        summary: "CSV processed successfully"
      }
    }
  ];

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
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
                <div className="flex justify-between items-center">
                  <code className="text-sm break-all">{endpoint.endpoint}</code>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => copyToClipboard(endpoint.endpoint)}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <h4 className="font-medium mb-3">Sample Response</h4>
              <div className="bg-[#1E1E1E] rounded-lg p-4 overflow-auto max-h-96">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white text-sm font-medium">Response</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(JSON.stringify(endpoint.sample, null, 2))}
                    className="h-8 w-8 p-0 text-white hover:bg-white/10"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
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
    <div className="px-4 py-8 max-w-6xl mx-auto">
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
      
      <div className="px-4 py-12 max-w-6xl mx-auto">
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
                  <Upload className="h-5 w-5 mr-2 text-red-500" />
                  Upload CSV API
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Upload CSV files to populate traditional medicine terminology databases. Updates existing records by code or creates new ones.
                </p>
                <div className="bg-muted p-3 rounded text-sm mb-4">
                  <code>POST /terminologies/{`{system}`}/csv/upload/</code>
                </div>
                <Button asChild variant="outline">
                  <Link to="/upload">Explore Upload API</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  Autocomplete API
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Fast autocomplete endpoints for traditional medicine terminologies - returns only matching titles for optimal performance.
                </p>
                <div className="bg-muted p-3 rounded text-sm mb-4">
                  <code>GET /terminologies/{`{system}`}/autocomplete/?q=query</code>
                </div>
                <Button asChild variant="outline">
                  <Link to="/autocomplete">Explore Autocomplete API</Link>
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
            <Route path="/siddha" element={<SiddhaPage />} />
            <Route path="/unani" element={<UnaniPage />} />
            <Route path="/icd11" element={<ICD11Page />} />
            <Route path="/mappings-testing" element={<MappingsTestingPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/autocomplete" element={<AutocompletePage />} />
            <Route path="/all-endpoints" element={<AllEndpointsPage />} />
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