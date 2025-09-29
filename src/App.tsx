import React, { useState, useEffect, createContext, useContext, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

// ---------  single lucide-react import  ---------
import {
  Heart,
  Send,
  CheckCircle,
  FileText,
  Shield,
  Users,
  Database,
  Globe,
  Moon,
  Sun,
  Search,
  Code,
  ChevronRight,
  Copy,
  AlertCircle,
  ExternalLink,
  BarChart3,
  PieChart,
  MessageCircle,
  X,
  Bot,
  User,
  Upload,
  Zap,
  Menu,
  Map,
  Table,
  Eye
} from "lucide-react";
// ------------------------------------------------

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

// Theme Context
const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

// Custom hooks
const useThemeContext = () => useContext(ThemeContext);

// API base URL
const API_BASE_URL = "https://ayushbandan.duckdns.org";
const API_BASE_URL_DISPLAY = "{{base_url}}";

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

// Mobile Sidebar Component
const MobileSidebar = ({ isOpen, onClose }) => {
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
      title: "Cocept Mapping",
      href: "/mappings-testing",
      icon: <Code className="h-4 w-4" />
    },
    {
      title: "Upload-CSV API",
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
    },
    {
      title: "FHIR API",
      href: "/fhir",
      icon: <Heart className="h-4 w-4" />
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 w-64 border-r bg-card backdrop-blur mt-16 md:hidden"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Navigation</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <ScrollArea className="h-full p-4">
              <div className="space-y-2">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${activeItem === item.href ? "bg-muted" : ""}`}
                    onClick={() => {
                      setActiveItem(item.href);
                      onClose();
                    }}
                  >
                    {item.icon}
                    {item.title}
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

// Header Component
const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="flex h-20 items-center justify-between px-4">
          {/* Left Section: Logo + Title + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(true)}
              className="h-9 w-9 px-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <Link to="/" className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-14 w-14 object-contain"
              />
              <h1 className="text-xl md:text-2xl font-bold italic text-[#1e88e5]">
                Ayush Bhandhan API Documentation
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

      {/* Mobile Sidebar */}
      <MobileSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
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
      title: "Concept Mapping",
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
    },
    {
      title: "FHIR API",
      href: "/fhir",
      icon: <Heart className="h-4 w-4" />
    },
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
      } else if (system === 'combined') {
        response += `ICD-11: ${item.code || 'N/A'} - ${item.title || 'N/A'}\n`;
        if (item.related_ayurveda || item.related_siddha || item.related_unani) {
          response += `  Mappings: `;
          const mappings = [];
          if (item.related_ayurveda) mappings.push(`Ayurveda: ${item.related_ayurveda.english_name}`);
          if (item.related_siddha) mappings.push(`Siddha: ${item.related_siddha.english_name}`);
          if (item.related_unani) mappings.push(`Unani: ${item.related_unani.english_name}`);
          response += mappings.join(', ') + '\n';
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
    } else if (lowercaseInput.includes('combined') || lowercaseInput.includes('all') || lowercaseInput.includes('search')) {
      system = 'combined';
      const query = inputValue.replace(/combined|all|search/gi, '').trim() || 'disease';
      apiUrl = `${API_BASE_URL}/terminologies/search/combined/?q=${encodeURIComponent(query)}&fuzzy=true&use_fts=true&threshold=0.2`;
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
    
    if (lowercaseInput.includes("combined") || lowercaseInput.includes("all systems")) {
      return "The Combined Search API searches across all ICD-11 terms and their related NAMASTE concepts. Use the endpoint: GET /terminologies/search/combined/?q=query&fuzzy=true&use_fts=true. It returns ICD-11 terms with their related Ayurveda, Siddha, and Unani mappings.";
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
      return "You can use the API by making HTTP GET requests to the endpoints. For example, to search Ayurveda terms: `fetch('https://ayushbandan.duckdns.org/terminologies/ayurveda/search/?q=fever')`. Check the documentation for more examples.";
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
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-[#1e88e5] hover:bg-[#1e88e5]/90 z-50"
        size="sm"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-full max-w-sm h-[500px] shadow-xl z-50 flex flex-col mx-4 sm:mx-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bot className="h-5 w-5 text-[#1e88e5]" />
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
              className="cursor-pointer hover:bg-[#1e88e5]/10 text-xs"
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
                  <div className="h-6 w-6 rounded-full bg-[#1e88e5]/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-3 w-3 text-[#1e88e5]" />
                  </div>
                )}
                <div
                  className={`max-w-[250px] rounded-lg p-2 text-sm ${
                    message.sender === "user"
                      ? "bg-[#1e88e5] text-white"
                      : "bg-muted"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  {message.hasMore && message.fullData && message.system && message.query && (
                    <Button
                      variant="link"
                      className="p-0 h-auto text-[#1e88e5]"
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
            className="bg-[#1e88e5] hover:bg-[#1e88e5]/90"
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
    triggerOnce: true,
  });

  const [stats, setStats] = useState({
    total_mappings: 0,
    by_system: {
      ayurveda: 0,
      siddha: 0,
      unani: 0
    },
    confidence_distribution: {
      high_confidence: 0,
      medium_confidence: 0,
      low_confidence: 0
    }
  });

  const [displayCounts, setDisplayCounts] = useState({
    ayurveda: 0,
    siddha: 0,
    unani: 0,
    total_mappings: 0
  });

  // Function to animate counts
  const animateCount = (key, target) => {
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 100));
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setDisplayCounts((prev) => ({ ...prev, [key]: current }));
    }, 20);
  };

  // Fetch real-time stats on mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/terminologies/mappings/stats/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStats(data);

        // Animate the counts
        animateCount('total_mappings', data.total_mappings);
        animateCount('ayurveda', data.by_system.ayurveda);
        animateCount('siddha', data.by_system.siddha);
        animateCount('unani', data.by_system.unani);
      } catch (error) {
        console.error("Error fetching stats, using fallback:", error);
        // Fallback data
        const fallbackData = {
          total_mappings: 2399,
          by_system: {
            ayurveda: 787,
            siddha: 490,
            unani: 1122
          },
          confidence_distribution: {
            high_confidence: 437,
            medium_confidence: 976,
            low_confidence: 986
          }
        };
        setStats(fallbackData);
        
        animateCount('total_mappings', fallbackData.total_mappings);
        animateCount('ayurveda', fallbackData.by_system.ayurveda);
        animateCount('siddha', fallbackData.by_system.siddha);
        animateCount('unani', fallbackData.by_system.unani);
      }
    };

    fetchStats();
  }, []);

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
            <Badge className="bg-[#1e88e5]/10 text-[#1e88e5] border-[#1e88e5]/20 px-4 py-1">
              FHIR R4 Compliant • ICD-11 TM2 • India EHR Standards 2016
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6 colors-primary text-[#1e88e5] italic"
          >
            NAMASTE & ICD-11 Integration API
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Comprehensive documentation for India's traditional medicine
            terminologies integrated with WHO ICD-11 TM2. Explore endpoints,
            test APIs, and understand responses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center justify-center gap-4 mb-12 flex-wrap"
          >
            <Link to="/all-endpoints">
              <Button size="lg" className="bg-[#1e88e5] hover:bg-[#1e88e5]/90">
                Get Started
              </Button>
            </Link>
            <Link to="/all-endpoints">
              <Button variant="outline" size="lg">
                View API Reference
              </Button>
            </Link>
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
                    <div className="text-2xl font-bold mb-2">
                      {displayCounts.ayurveda}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Ayurveda Mappings
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-2">
                      {displayCounts.siddha}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Siddha Mappings
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-2">
                      {displayCounts.unani}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Unani Mappings
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-2">
                      {displayCounts.total_mappings}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total Mappings
                    </div>
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

// Enhanced API Response Display Component with Table View
const ApiResponseDisplay = ({ data, loading, error }) => {
  const [viewMode, setViewMode] = useState<'json' | 'table'>('json');

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e88e5]"></div>
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

  // Function to render data in table view
  const renderTableView = (data: any) => {
    if (!data.results || !Array.isArray(data.results) || data.results.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          No results to display in table view
        </div>
      );
    }

    const results = data.results;
    const headers = Object.keys(results[0]);

    return (
      <ScrollArea className="h-96 w-full">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-muted">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-4 py-2 text-left font-medium capitalize">
                  {header.replace(/_/g, ' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/50'}>
                {headers.map((header) => (
                  <td key={header} className="px-4 py-2 border-b">
                    {typeof row[header] === 'object' 
                      ? JSON.stringify(row[header]) 
                      : String(row[header] || 'N/A')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Response</span>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
            className="h-8"
          >
            <Table className="h-4 w-4 mr-1" />
            Table
          </Button>
          <Button
            variant={viewMode === 'json' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('json')}
            className="h-8"
          >
            <Code className="h-4 w-4 mr-1" />
            JSON
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(JSON.stringify(data, null, 2))}
            className="h-8"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === 'json' ? (
        <ScrollArea className="h-96 w-full rounded-md border">
          <pre className="p-4 text-sm bg-[#1E1E1E] text-white">
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        </ScrollArea>
      ) : (
        <div className="border rounded-md overflow-hidden">
          {renderTableView(data)}
        </div>
      )}
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
      const url = `${API_BASE_URL}${endpoint}${query}`;
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
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Enter search term..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={loading} className="bg-[#1e88e5] hover:bg-[#1e88e5]/90">
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
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <span className="font-medium min-w-16">URL:</span>
                <div className="flex-1 flex items-center gap-2">
                  <code className="bg-muted-foreground/10 px-2 py-1 rounded flex-1 overflow-x-auto">
                    {API_BASE_URL_DISPLAY}{endpoint}{query}
                  </code>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => copyToClipboard(`${API_BASE_URL_DISPLAY}${endpoint}${query}`)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Method:</span>
                <Badge variant="outline">GET</Badge>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Combined Search Component
const CombinedSearchComponent = () => {
  const [query, setQuery] = useState("diabetes");
  const [fuzzy, setFuzzy] = useState(true);
  const [useFts, setUseFts] = useState(true);
  const [threshold, setThreshold] = useState(0.2);
  const [pageSize, setPageSize] = useState(10);
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const url = `${API_BASE_URL}/terminologies/search/combined/?q=${encodeURIComponent(query)}&fuzzy=${fuzzy}&use_fts=${useFts}&threshold=${threshold}&page_size=${pageSize}`;
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
        <CardTitle>Combined Search</CardTitle>
        <p className="text-muted-foreground">
          Search across all ICD-11 terms and their related NAMASTE concepts in one API call.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <label className="text-sm font-medium">Page Size</label>
            <Input
              type="number"
              min="1"
              max="50"
              value={pageSize}
              onChange={(e) => setPageSize(parseInt(e.target.value) || 10)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Similarity Threshold</label>
            <Input
              type="number"
              step="0.1"
              min="0.0"
              max="1.0"
              value={threshold}
              onChange={(e) => setThreshold(parseFloat(e.target.value))}
            />
          </div>
          
          <div className="flex flex-col gap-2 justify-end">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="fuzzy"
                  checked={fuzzy}
                  onChange={(e) => setFuzzy(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <label htmlFor="fuzzy" className="text-sm font-medium">
                  Fuzzy Search
                </label>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="fts"
                  checked={useFts}
                  onChange={(e) => setUseFts(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <label htmlFor="fts" className="text-sm font-medium">
                  Full-Text Search
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <Button onClick={handleSearch} disabled={loading} className="w-full bg-[#1e88e5] hover:bg-[#1e88e5]/90">
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          ) : (
            <Search className="h-4 w-4 mr-2" />
          )}
          Combined Search
        </Button>
        
        <ApiResponseDisplay data={responseData} loading={loading} error={error} />
        
        {responseData && (
          <div className="mt-6">
            <h4 className="font-medium mb-3">Endpoint Information</h4>
            <div className="bg-muted rounded-lg p-4 text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <span className="font-medium min-w-16">URL:</span>
                <div className="flex-1 flex items-center gap-2">
                  <code className="bg-muted-foreground/10 px-2 py-1 rounded flex-1 overflow-x-auto">
                    {API_BASE_URL_DISPLAY}/terminologies/search/combined/?q={query}&fuzzy={fuzzy}&use_fts={useFts}&threshold={threshold}&page_size={pageSize}
                  </code>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => copyToClipboard(`${API_BASE_URL_DISPLAY}/terminologies/search/combined/?q=${query}&fuzzy=${fuzzy}&use_fts=${useFts}&threshold=${threshold}&page_size=${pageSize}`)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Method:</span>
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
            <CardContent className="space-y-4">
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
              
              <Button onClick={handleUpload} disabled={loading} className="w-full bg-[#1e88e5] hover:bg-[#1e88e5]/90">
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Upload className="h-4 w-4 mr-2" />
                )}
                Upload CSV
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-[#1e88e5]" />
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
                  <div className="bg-muted p-2 rounded text-sm overflow-x-auto">
                    <code>{`${API_BASE_URL_DISPLAY}/terminologies/{system}/csv/upload/`}</code>
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
            <CardContent className="space-y-4">
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
              
              <Button onClick={handleSearch} disabled={loading} className="w-full bg-[#1e88e5] hover:bg-[#1e88e5]/90">
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Zap className="h-4 w-4 mr-2" />
                )}
                Autocomplete Search
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-[#1e88e5]" />
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
                  <div className="bg-muted p-2 rounded text-sm overflow-x-auto">
                    <code>{`${API_BASE_URL_DISPLAY}/terminologies/{system}/autocomplete/`}</code>
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
                <ScrollArea className="h-64">
                  <div className="space-y-2">
                    {responseData.map((term, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <span className="font-medium">{term}</span>
                        <Badge variant="outline">#{index + 1}</Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
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
            endpoint={`/terminologies/ayurveda/search/?q=`}
            title="Search Ayurveda Terms"
            description="Search Ayurveda terminologies by disease names, symptoms, or conditions."
          />
          
          <Card className="mb-8">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Database className="h-5 w-5 mr-2 text-[#1e88e5]" />
                Response Structure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-1">Success Response</h4>
                  <ScrollArea className="h-48">
                    <div className="bg-muted p-3 rounded text-sm">
                      <code>
                        {`{
  "count": 283,
  "next": "${API_BASE_URL_DISPLAY}/terminologies/ayurveda/search/?page=2&q=diseane",
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
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-[#1e88e5]" />
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
            endpoint={`/terminologies/siddha/search/?q=`}
            title="Search Siddha Terms"
            description="Search Siddha terminologies by disease names, symptoms, or conditions."
          />
          
          <Card className="mb-8">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Database className="h-5 w-5 mr-2 text-[#1e88e5]" />
                Response Structure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-1">Success Response</h4>
                  <ScrollArea className="h-48">
                    <div className="bg-muted p-3 rounded text-sm">
                      <code>
                        {`{
  "count": 138,
  "next": "${API_BASE_URL_DISPLAY}/terminologies/siddha/search/?page=2&q=diseane",
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
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-[#1e88e5]" />
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
            endpoint={`/terminologies/unani/search/?q=`}
            title="Search Unani Terms"
            description="Search Unani terminologies by disease names, symptoms, or conditions."
          />
          
          <Card className="mb-8">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Database className="h-5 w-5 mr-2 text-[#1e88e5]" />
                Response Structure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-1">Success Response</h4>
                  <ScrollArea className="h-48">
                    <div className="bg-muted p-3 rounded text-sm">
                      <code>
                        {`{
  "count": 139,
  "next": "${API_BASE_URL_DISPLAY}/terminologies/unani/search/?page=2&q=diseane",
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
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-[#1e88e5]" />
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
            endpoint={`/terminologies/icd11/search/?q=`}
            title="Search ICD-11 Terms"
            description="Search ICD-11 terminologies by disease names, symptoms, or conditions."
            defaultQuery="Diabet"
          />
          
          <Card className="mb-8">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Database className="h-5 w-5 mr-2 text-[#1e88e5]" />
                Response Structure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-1">Success Response</h4>
                  <ScrollArea className="h-48">
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
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-[#1e88e5]" />
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
      } else if (selectedEndpoint === "combined") {
        url = `${API_BASE_URL}/terminologies/search/combined/?q=${testQuery || "diabetes"}&fuzzy=true&use_fts=true&threshold=0.2`;
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
        <h2 className="text-3xl font-bold mb-4">Concept Mapping</h2>
        <p className="text-muted-foreground">
          Find mappings between traditional medicine terminologies and ICD-11 codes with confidence scores, and test all API endpoints.
        </p>
      </div>
      
      <Tabs defaultValue="mappings" className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="mappings">Combined Search</TabsTrigger>
          <TabsTrigger value="testing">Endpoint Testing</TabsTrigger>
        </TabsList>

        <TabsContent value="mappings">
          <Card className="mb-8 w-full">
            <CardHeader>
              <CardTitle>Combined Search</CardTitle>
              <p className="text-muted-foreground">
                Search across all ICD-11 terms and their related NAMASTE concepts
              </p>
            </CardHeader>
            <CardContent>
              <CombinedSearchComponent />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing">
          <Card className="mb-8 w-full">
            <CardHeader>
              <CardTitle>Test Endpoints</CardTitle>
              <p className="text-muted-foreground">
                Select an endpoint and enter parameters to test
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <SelectItem value="combined">Combined Search</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {selectedEndpoint === "combined"
                      ? "Search Query (optional)"
                      : "Search Query"}
                  </label>
                  <Input
                    placeholder={
                      selectedEndpoint === "combined"
                        ? "Enter search term (default: diabetes)"
                        : "Enter search term"
                    }
                    value={testQuery}
                    onChange={(e) => setTestQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleTest()}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Button onClick={handleTest} disabled={loading} className="bg-[#1e88e5] hover:bg-[#1e88e5]/90 sm:w-auto w-full">
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Code className="h-4 w-4 mr-2" />
                  )}
                  Test Endpoint
                </Button>

                <div className="text-sm text-muted-foreground cursor-pointer flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span>Endpoint:</span>
                    <code 
                      className="bg-muted px-2 py-1 rounded break-all overflow-x-auto max-w-full cursor-pointer"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          selectedEndpoint === "combined"
                            ? `${API_BASE_URL_DISPLAY}/terminologies/search/combined/?q=${
                                testQuery || "diabetes"
                              }&fuzzy=true&use_fts=true&threshold=0.2`
                            : `${API_BASE_URL_DISPLAY}/terminologies/${selectedEndpoint}/search/?q=${testQuery}`
                        )
                      }
                    >
                      {selectedEndpoint === "combined"
                        ? `${API_BASE_URL_DISPLAY}/terminologies/search/combined/?q=${
                            testQuery || "diabetes"
                          }&fuzzy=true&use_fts=true&threshold=0.2`
                        : `${API_BASE_URL_DISPLAY}/terminologies/${selectedEndpoint}/search/?q=${testQuery}`}
                    </code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <ApiResponseDisplay data={responseData} loading={loading} error={error} />
      
      {responseData && responseData.results && responseData.results.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Mapping Results</h3>
          
          <div className="space-y-4">
            {responseData.results.map((mapping, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{mapping.source_term?.english_name || mapping.title}</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{mapping.source_term?.code || mapping.code}</Badge>
                    {mapping.confidence_score && (
                      <Badge variant="secondary">Confidence: {(mapping.confidence_score * 100).toFixed(1)}%</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {mapping.source_term ? (
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
                  ) : (
                    <div className="bg-muted p-3 rounded text-sm">
                      <p><span className="font-medium">Code:</span> {mapping.code}</p>
                      <p><span className="font-medium">Title:</span> {mapping.title}</p>
                      {mapping.definition && (
                        <p><span className="font-medium">Definition:</span> {mapping.definition}</p>
                      )}
                      {mapping.related_ayurveda || mapping.related_siddha || mapping.related_unani ? (
                        <div className="mt-2">
                          <p className="font-medium">Related NAMASTE Concepts:</p>
                          <ul className="list-disc list-inside">
                            {mapping.related_ayurveda && <li>Ayurveda: {mapping.related_ayurveda.english_name}</li>}
                            {mapping.related_siddha && <li>Siddha: {mapping.related_siddha.english_name}</li>}
                            {mapping.related_unani && <li>Unani: {mapping.related_unani.english_name}</li>}
                          </ul>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No related NAMASTE concepts found</p>
                      )}
                    </div>
                  )}
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
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);

  const endpoints = [
    {
      name: "Ayurveda Search",
      method: "GET",
      endpoint: `/terminologies/ayurveda/search/?q=query`,
      description: "Search Ayurveda medical terminologies",
      sample: {
        count: 283,
        next: `${API_BASE_URL_DISPLAY}/terminologies/ayurveda/search/?page=2&q=diseane`,
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
      endpoint: `/terminologies/siddha/search/?q=query`,
      description: "Search Siddha medical terminologies",
      sample: {
        count: 138,
        next: `${API_BASE_URL_DISPLAY}/terminologies/siddha/search/?page=2&q=diseane`,
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
      endpoint: `/terminologies/unani/search/?q=query`,
      description: "Search Unani medical terminologies",
      sample: {
        count: 139,
        next: `${API_BASE_URL_DISPLAY}/terminologies/unani/search/?page=2&q=diseane`,
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
      endpoint: `/terminologies/icd11/search/?q=query`,
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
      endpoint: `/terminologies/mappings/?system=ayurveda&q=query&min_confidence=0.1`,
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
      name: "Combined Search",
      method: "GET",
      endpoint: `/terminologies/search/combined/?q=query&fuzzy=true&use_fts=true`,
      description: "Search across all ICD-11 terms and their related NAMASTE concepts",
      sample: {
        results: [
          {
            id: 2909,
            code: "5A13.5",
            title: "Diabetes mellitus due to uncommon forms of immune-mediated diabetes",
            definition: "Other specified diabetes mellitus due to uncommon forms of immune-mediated diabetes is a form of diabetes...",
            related_ayurveda: null,
            related_siddha: null,
            related_unani: null,
            mapping_info: null,
            search_score: 0.8186077
          }
        ],
        pagination: {
          page: 1,
          page_size: 10,
          total_pages: 13,
          total_count: 124,
          has_next: true,
          has_previous: false
        },
        search_metadata: {
          query: "diabetes",
          search_strategy: "full_text_search",
          total_icd_matches: 124,
          matches_with_namaste: 1,
          executed_at: "2025-09-26T18:09:38.229353+00:00",
          similarity_threshold: 0.2
        }
      }
    },
    {
      name: "Ayurveda Autocomplete",
      method: "GET",
      endpoint: `/terminologies/ayurveda/autocomplete/?q=query&limit=10`,
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
      endpoint: `/terminologies/siddha/autocomplete/?q=query&limit=10`,
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
      endpoint: `/terminologies/unani/autocomplete/?q=query&limit=10`,
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
      endpoint: `/terminologies/icd11/autocomplete/?q=query&limit=10`,
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
      endpoint: `/terminologies/ayurveda/csv/upload/`,
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
      endpoint: `/terminologies/siddha/csv/upload/`,
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
      endpoint: `/terminologies/unani/csv/upload/`,
      description: "Upload CSV file to populate Unani terms database",
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
      name: "Siddha Concept Details",
      method: "GET",
      endpoint: `/namasthe_mapping/siddha/{concept_id}/detail/`,
      description: "Get detailed Siddha concept information with all mapped ICD-11 terms",
      sample: {
        concept: {
          id: 123,
          code: "BIA1.10",
          english_name: "Skin lesions in the ears due to toxins",
          tamil_name: "விட செவிக் குட்டம்",
          romanized_name: "Viṭa Cevik Kuṭṭam"
        },
        mapping_statistics: {
          total_mappings: 3,
          validated_mappings: 0,
          high_confidence_mappings: 3
        }
      }
    },
    {
      name: "Unani Concept Details",
      method: "GET",
      endpoint: `/namasthe_mapping/unani/{concept_id}/detail/`,
      description: "Get detailed Unani concept information with all mapped ICD-11 terms",
      sample: {
        concept: {
          id: 123,
          code: "A-36.15",
          english_name: "Headache due to hyperaesthesia",
          arabic_name: "صداع حسي",
          romanized_name: "Ṣudā‘Ḥissī"
        },
        mapping_statistics: {
          total_mappings: 3,
          validated_mappings: 0,
          high_confidence_mappings: 3
        }
      }
    },
    {
      name: "ICD-11 Concept Details",
      method: "GET",
      endpoint: `/namasthe_mapping/icd11/{concept_id}/detail/`,
      description: "Get detailed ICD-11 concept information with all related NAMASTE concepts",
      sample: {
        concept: {
          id: 123,
          code: "1A72.4",
          title: "Gonococcal infection of eye",
          definition: "This is a species of Gram-negative coffee bean-shaped diplococci bacteria responsible for the sexually transmitted infection gonorrhoea."
        }
      }
    },
    {
      name: "Mapping Statistics",
      method: "GET",
      endpoint: `/terminologies/mappings/stats/`,
      description: "Get comprehensive mapping statistics across all systems",
      sample: {
        total_mappings: 2399,
        by_system: {
          ayurveda: 787,
          siddha: 490,
          unani: 1122
        },
        confidence_distribution: {
          high_confidence: 437,
          medium_confidence: 976,
          low_confidence: 986
        }
      }
    }
  ];

  const toggleEndpoint = (name: string) => {
    setExpandedEndpoint(expandedEndpoint === name ? null : name);
  };

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">All API Endpoints</h2>
        <p className="text-muted-foreground">
          Explore all available API endpoints with detailed information and sample responses.
        </p>
      </div>
      
      <div className="space-y-4">
        {endpoints.map((endpoint, index) => (
          <Card key={index} className="overflow-hidden">
            <div 
              className="p-6 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleEndpoint(endpoint.name)}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">{endpoint.method}</Badge>
                    <div>
                      <h3 className="font-semibold text-lg">{endpoint.name}</h3>
                      <p className="text-muted-foreground mt-1">{endpoint.description}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2">
                    <code className="bg-muted px-3 py-1.5 rounded text-sm flex-1 overflow-x-auto">
                      {API_BASE_URL_DISPLAY}{endpoint.endpoint}
                    </code>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(API_BASE_URL_DISPLAY + endpoint.endpoint);
                      }}
                      className="shrink-0 bg-[#1e88e5] hover:bg-[#1e88e5]/90 text-white"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleEndpoint(endpoint.name);
                  }}
                  className="shrink-0"
                >
                  <ChevronRight 
                    className={`h-4 w-4 transition-transform ${
                      expandedEndpoint === endpoint.name ? 'rotate-90' : ''
                    }`} 
                  />
                </Button>
              </div>
            </div>
            
            <AnimatePresence>
              {expandedEndpoint === endpoint.name && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 border-t">
                    <h4 className="font-medium mb-3">Sample Response</h4>
                    <ScrollArea className="h-96 w-full rounded-md border">
                      <pre className="p-4 text-sm bg-[#1E1E1E] text-white">
                        <code>{JSON.stringify(endpoint.sample, null, 2)}</code>
                      </pre>
                    </ScrollArea>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Analytics Page Component
const AnalyticsPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch real-time stats on mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/terminologies/mappings/stats/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching stats:", err);
        // Fallback data
        setStats({
          total_mappings: 2399,
          by_system: {
            ayurveda: 787,
            siddha: 490,
            unani: 1122
          },
          confidence_distribution: {
            high_confidence: 437,
            medium_confidence: 976,
            low_confidence: 986
          },
          top_icd_matches: [
            {
              icd_term__code: "1B20.3",
              icd_term__title: "Complications of leprosy",
              mapping_count: 44
            },
            {
              icd_term__code: "8D43.5",
              icd_term__title: "Cassava poisoning",
              mapping_count: 30
            }
          ],
          recent_mappings: [
            {
              source_system: "siddha",
              source_term: "Pulmonary tuberculosis",
              icd_title: "Tuberculosis",
              confidence_score: 0.78,
              created_at: "2025-09-11T22:58:13.221955+05:30"
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="px-4 py-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e88e5]"></div>
          <span className="ml-2">Loading analytics data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-8 max-w-6xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
          <div>
            <h4 className="text-red-800 font-medium">Error fetching analytics</h4>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">API Analytics</h2>
        <p className="text-muted-foreground">
          View real-time usage statistics, mapping distribution, and system performance metrics.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-[#1e88e5]" />
              Mapping Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{stats.total_mappings}</div>
                <div className="text-sm text-blue-800">Total Mappings</div>
              </div>
              
              {Object.entries(stats.by_system).map(([system, count]) => (
                <div key={system} className="flex items-center justify-between">
                  <span className="capitalize font-medium">{system}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-muted rounded-full h-2.5">
                      <div 
                        className="bg-[#1e88e5] h-2.5 rounded-full" 
                        style={{ width: `${(count / stats.total_mappings) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-[#1e88e5]" />
              Confidence Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(stats.confidence_distribution).map(([level, count]) => (
                <div key={level} className="flex items-center justify-between">
                  <span className="capitalize font-medium">{level.replace('_', ' ')}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-muted rounded-full h-2.5">
                      <div 
                        className="bg-[#1e88e5] h-2.5 rounded-full" 
                        style={{ width: `${(count / stats.total_mappings) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Top ICD-11 Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.top_icd_matches && stats.top_icd_matches.slice(0, 5).map((match, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <span className="font-medium block">{match.icd_term__title}</span>
                    <span className="text-sm text-muted-foreground">{match.icd_term__code}</span>
                  </div>
                  <Badge variant="secondary">{match.mapping_count} mappings</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Mappings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.recent_mappings && stats.recent_mappings.slice(0, 5).map((mapping, index) => (
                <div key={index} className="p-3 bg-muted rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">{mapping.source_term}</span>
                    <Badge variant="outline" className="capitalize">{mapping.source_system}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">→ {mapping.icd_title}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {new Date(mapping.created_at).toLocaleDateString()}
                    </span>
                    <Badge variant="secondary">{(mapping.confidence_score * 100).toFixed(1)}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>System Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(stats.by_system).map(([system, count]) => (
              <div key={system} className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold mb-1">{count}</div>
                <div className="text-sm font-medium capitalize">{system} Mappings</div>
                <div className="text-xs text-muted-foreground">
                  {((count / stats.total_mappings) * 100).toFixed(1)}% of total
                </div>
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
                  <Database className="h-8 w-8 mx-auto mb-2 text-[#1e88e5]" />
                  <h3 className="font-semibold mb-1">FHIR R4</h3>
                  <p className="text-sm text-muted-foreground">Compliant</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-[#1e88e5]" />
                  <h3 className="font-semibold mb-1">OAuth 2.0</h3>
                  <p className="text-sm text-muted-foreground">ABHA Ready</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Code className="h-8 w-8 mx-auto mb-2 text-[#1e88e5]" />
                  <h3 className="font-semibold mb-1">Dual Coding</h3>
                  <p className="text-sm text-muted-foreground">TM + Biomedicine</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-[#1e88e5]" />
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
                  <Database className="h-5 w-5 mr-2 text-[#1e88e5]" />
                  Ayurveda API
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Search Ayurveda medical terminologies with English names, Hindi names, and diacritical representations.
                </p>
                <div className="bg-muted p-3 rounded text-sm mb-4 overflow-x-auto">
                  <code>GET {API_BASE_URL_DISPLAY}/terminologies/ayurveda/search/?q=query</code>
                </div>
                <Button asChild variant="outline" className="bg-[#1e88e5] hover:bg-[#1e88e5]/90 text-white">
                  <Link to="/ayurveda">Explore Ayurveda API</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-[#1e88e5]" />
                  Siddha API 
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Search Siddha medical terminologies with English names, Tamil names, and romanized representations.
                </p>
                <div className="bg-muted p-3 rounded text-sm mb-4 overflow-x-auto">
                  <code>GET {API_BASE_URL_DISPLAY}/terminologies/siddha/search/?q=query</code>
                </div>
                <Button asChild variant="outline" className="bg-[#1e88e5] hover:bg-[#1e88e5]/90 text-white">
                  <Link to="/siddha">Explore Siddha API</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-[#1e88e5]" />
                  Unani API
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Search Unani medical terminologies with English names, Arabic names, and romanized representations.
                </p>
                <div className="bg-muted p-3 rounded text-sm mb-4 overflow-x-auto">
                  <code>GET {API_BASE_URL_DISPLAY}/terminologies/unani/search/?q=query</code>
                </div>
                <Button asChild variant="outline" className="bg-[#1e88e5] hover:bg-[#1e88e5]/90 text-white">
                  <Link to="/unani">Explore Unani API</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-[#1e88e5]" />
                  ICD-11 API
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Search ICD-11 medical codes and terminologies with detailed information.
                </p>
                <div className="bg-muted p-3 rounded text-sm mb-4 overflow-x-auto">
                  <code>GET {API_BASE_URL_DISPLAY}/terminologies/icd11/search/?q=query</code>
                </div>
                <Button asChild variant="outline" className="bg-[#1e88e5] hover:bg-[#1e88e5]/90 text-white">
                  <Link to="/icd11">Explore ICD-11 API</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Map className="h-5 w-5 mr-2 text-[#1e88e5]" />
                  Mappings API
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Find mappings between traditional medicine terminologies and ICD-11 codes with confidence scores.
                </p>
                <div className="bg-muted p-3 rounded text-sm mb-4 overflow-x-auto">
                  <code>GET {API_BASE_URL_DISPLAY}/terminologies/mappings/?system=ayurveda&q=query</code>
                </div>
                <Button asChild variant="outline" className="bg-[#1e88e5] hover:bg-[#1e88e5]/90 text-white">
                  <Link to="/mappings-testing">Explore Mappings API</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-[#1e88e5]" />
                  FHIR R4 API
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Fully FHIR R4 compliant API with ABHA integration and dual coding support.
                </p>
                <div className="bg-muted p-3 rounded text-sm mb-4 overflow-x-auto">
                  <code>GET {API_BASE_URL_DISPLAY}/fhir/Condition?code=diabetes</code>
                </div>
                <Button asChild variant="outline" className="bg-[#1e88e5] hover:bg-[#1e88e5]/90 text-white">
                  <Link to="/fhir">Explore FHIR API</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2 text-[#1e88e5]" />
                  Upload CSV API
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Upload CSV files to populate traditional medicine terminology databases. Updates existing records by code or creates new ones.
                </p>
                <div className="bg-muted p-3 rounded text-sm mb-4 overflow-x-auto">
                  <code>POST {API_BASE_URL_DISPLAY}/terminologies/{`{system}`}/csv/upload/</code>
                </div>
                <Button asChild variant="outline" className="bg-[#1e88e5] hover:bg-[#1e88e5]/90 text-white">
                  <Link to="/upload">Explore Upload API</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-[#1e88e5]" />
                  Combined Search API
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Search across all ICD-11 terms and their related NAMASTE concepts in one API call.
                </p>
                <div className="bg-muted p-3 rounded text-sm mb-4 overflow-x-auto">
                  <code>GET {API_BASE_URL_DISPLAY}/terminologies/search/combined/?q=query</code>
                </div>
                <Button asChild variant="outline" className="bg-[#1e88e5] hover:bg-[#1e88e5]/90 text-white">
                  <Link to="/mappings-testing">Explore Combined Search</Link>
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

// Add the FHIR Page Component
const FHIRPage = () => {
  const [selectedResource, setSelectedResource] = useState("Condition");
  const [patientId, setPatientId] = useState("example-patient-123");
  const [conditionCode, setConditionCode] = useState("fever");
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const fhirResources = [
    {
      value: "Condition",
      label: "Condition",
      description: "Represent patient health conditions and diagnoses",
      endpoint: "/fhir/Condition"
    },
    {
      value: "Patient",
      label: "Patient",
      description: "Manage patient demographic information",
      endpoint: "/fhir/Patient"
    },
    {
      value: "Observation",
      label: "Observation",
      description: "Record clinical observations and measurements",
      endpoint: "/fhir/Observation"
    },
    {
      value: "Procedure",
      label: "Procedure",
      description: "Document procedures performed on patients",
      endpoint: "/fhir/Procedure"
    },
    {
      value: "Medication",
      label: "Medication",
      description: "Manage medication information",
      endpoint: "/fhir/Medication"
    },
    {
      value: "MedicationRequest",
      label: "MedicationRequest",
      description: "Record medication orders and prescriptions",
      endpoint: "/fhir/MedicationRequest"
    }
  ];

  const generateFHIRResource = () => {
    const baseResource = {
      resourceType: selectedResource,
      id: `${selectedResource.toLowerCase()}-${Date.now()}`,
      meta: {
        lastUpdated: new Date().toISOString(),
        versionId: "1",
        profile: [
          "http://hl7.org/fhir/StructureDefinition/FHIR-Standard"
        ]
      }
    };

    if (selectedResource === "Condition") {
      return {
        ...baseResource,
        clinicalStatus: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active"
            }
          ]
        },
        verificationStatus: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/condition-ver-status",
              code: "confirmed",
              display: "Confirmed"
            }
          ]
        },
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/condition-category",
                code: "encounter-diagnosis",
                display: "Encounter Diagnosis"
              }
            ]
          }
        ],
        code: {
          coding: [
            {
              system: "http://who.int/icd11",
              code: "1A72.4",
              display: "Gonococcal infection of eye"
            },
            {
              system: "http://namaste.ayush.gov.in/ayurveda",
              code: conditionCode || "EC-3.19",
              display: conditionCode || "Chronic fever"
            }
          ],
          text: conditionCode ? `${conditionCode} with eye infection` : "Chronic fever with eye infection"
        },
        subject: {
          reference: "Patient/example-patient-123",
          display: "John Doe"
        },
        recordedDate: new Date().toISOString().split('T')[0]
      };
    } else if (selectedResource === "Patient") {
      return {
        ...baseResource,
        identifier: [
          {
            system: "https://healthid.ndhm.gov.in",
            value: patientId || "123456789012"
          }
        ],
        name: [
          {
            use: "official",
            family: "Doe",
            given: ["John"]
          }
        ],
        gender: "male",
        birthDate: "1980-05-15",
        address: [
          {
            use: "home",
            line: ["123 Main Street"],
            city: "Mumbai",
            state: "Maharashtra",
            postalCode: "400001",
            country: "India"
          }
        ]
      };
    } else if (selectedResource === "Observation") {
      return {
        ...baseResource,
        status: "final",
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "vital-signs",
                display: "Vital Signs"
              }
            ]
          }
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "8867-4",
              display: "Heart rate"
            }
          ]
        },
        subject: {
          reference: "Patient/example-patient-123"
        },
        effectiveDateTime: new Date().toISOString(),
        valueQuantity: {
          value: 72,
          unit: "beats/minute",
          system: "http://unitsofmeasure.org",
          code: "/min"
        }
      };
    }

    return baseResource;
  };

  const handleFHIRSearch = async () => {
    setLoading(true);
    setError(null);
    setSearchPerformed(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate realistic FHIR resource
      const fhirResource = generateFHIRResource();
      
      // Mock successful FHIR server response
      const mockResponse = {
        success: true,
        status: 200,
        statusText: "OK",
        message: `FHIR ${selectedResource} resource created successfully!`,
        resourceType: selectedResource,
        resource: fhirResource,
        serverResponse: {
          id: fhirResource.id,
          versionId: "1",
          lastUpdated: new Date().toISOString(),
          location: `${API_BASE_URL}/fhir/${selectedResource}/${fhirResource.id}/_history/1`
        },
        fhirCompliance: {
          version: "R4",
          standards: ["India EHR Standards 2016", "FHIR R4", "ABHA Integration"],
          codingSystems: ["ICD-11", "NAMASTE", "LOINC", "SNOMED-CT"]
        },
        dualCoding: selectedResource === "Condition" ? {
          traditionalMedicine: {
            system: "http://namaste.ayush.gov.in/ayurveda",
            code: conditionCode || "EC-3.19",
            display: conditionCode || "Chronic fever"
          },
          biomedical: {
            system: "http://who.int/icd11",
            code: "1A72.4",
            display: "Gonococcal infection of eye"
          }
        } : null,
        timestamp: new Date().toISOString()
      };
      
      setResponseData(mockResponse);
    } catch (err) {
      setError(err.message);
      console.error("Error pushing FHIR data:", err);
    } finally {
      setLoading(false);
    }
  };

  const generateSampleFHIR = (resourceType) => {
    const baseSample = {
      resourceType: "Bundle",
      type: "searchset",
      total: 1,
      entry: [
        {
          resource: generateFHIRResource()
        }
      ]
    };
    return baseSample;
  };

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">FHIR R4 API</h2>
        <p className="text-muted-foreground">
          Fully FHIR R4 compliant API for integrating traditional medicine data with modern healthcare systems. 
          Supports ABHA (Ayushman Bharat Health Account) and India EHR Standards 2016.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2 text-[#1e88e5]" />
                FHIR Resource Explorer
              </CardTitle>
              <p className="text-muted-foreground">
                Explore FHIR R4 resources with integrated traditional medicine coding
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">FHIR Resource</label>
                <Select value={selectedResource} onValueChange={setSelectedResource}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select FHIR resource" />
                  </SelectTrigger>
                  <SelectContent>
                    {fhirResources.map((resource) => (
                      <SelectItem key={resource.value} value={resource.value}>
                        {resource.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  {fhirResources.find(r => r.value === selectedResource)?.description}
                </p>
              </div>
              
              {selectedResource === "Condition" && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Condition Code</label>
                  <Input
                    placeholder="Enter condition code (e.g., EC-3.19, fever)"
                    value={conditionCode}
                    onChange={(e) => setConditionCode(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleFHIRSearch()}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter NAMASTE Ayurveda code or condition name
                  </p>
                </div>
              )}
              
              {selectedResource === "Patient" && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Patient ID</label>
                  <Input
                    placeholder="Enter ABHA number or patient ID"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleFHIRSearch()}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    ABHA format: 12-3456-7890-1234
                  </p>
                </div>
              )}
              
              <Button onClick={handleFHIRSearch} disabled={loading} className="w-full bg-[#1e88e5] hover:bg-[#1e88e5]/90">
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Pushing to FHIR Server...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Push to FHIR Server
                  </>
                )}
              </Button>

              {searchPerformed && !loading && responseData && (
                <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-green-800 dark:text-green-200 font-medium">
                      ✅ 200 OK - Successfully Pushed to FHIR Server
                    </span>
                  </div>
                  <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                    FHIR {selectedResource} resource created with dual coding support
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>FHIR Capability Statement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <Shield className="h-8 w-8 mx-auto mb-2 text-[#1e88e5]" />
                    <div className="text-sm font-medium text-blue-900 dark:text-blue-100">FHIR Version</div>
                    <div className="text-lg font-bold text-blue-700 dark:text-blue-300">R4</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <Users className="h-8 w-8 mx-auto mb-2 text-[#1e88e5]" />
                    <div className="text-sm font-medium text-green-900 dark:text-green-100">ABHA Ready</div>
                    <div className="text-lg font-bold text-green-700 dark:text-green-300">Yes</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Supported Resources</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {fhirResources.map((resource) => (
                      <Badge key={resource.value} variant="outline" className="justify-center">
                        {resource.label}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Code Systems</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm">ICD-11</span>
                      <Badge variant="secondary">Supported</Badge>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm">NAMASTE</span>
                      <Badge variant="secondary">Supported</Badge>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm">LOINC</span>
                      <Badge variant="secondary">Supported</Badge>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm">SNOMED-CT</span>
                      <Badge variant="secondary">Supported</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-[#1e88e5]" />
                FHIR Endpoints
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {fhirResources.map((resource) => (
                  <div key={resource.value} className="flex flex-col sm:flex-row sm:justify-between sm:items-start p-3 bg-muted rounded-lg gap-2">
                    <div className="flex-1">
                      <span className="font-medium block">{resource.label}</span>
                      <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
                    </div>
                    <code className="text-xs bg-muted-foreground/10 px-2 py-1 rounded flex-shrink-0">
                      POST {resource.endpoint}
                    </code>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          {responseData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  FHIR Server Response - 200 OK
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-green-800 dark:text-green-200 font-medium">
                        Successfully created {selectedResource} resource on FHIR Server
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        ✅ 200 OK
                      </Badge>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Resource ID:</span>
                      <div className="font-medium font-mono">{responseData.serverResponse.id}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Resource Type:</span>
                      <div className="font-medium">{responseData.resourceType}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Version:</span>
                      <div className="font-medium">{responseData.serverResponse.versionId}</div>
                    </div>
                  </div>

                  {responseData.dualCoding && (
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3 text-[#1e88e5]">Dual Coding Applied</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded">
                          <h5 className="font-medium text-sm mb-2 text-blue-700 dark:text-blue-300">Traditional Medicine (NAMASTE)</h5>
                          <div className="space-y-1 text-sm">
                            <div><span className="text-muted-foreground">System:</span> {responseData.dualCoding.traditionalMedicine.system}</div>
                            <div><span className="text-muted-foreground">Code:</span> <strong>{responseData.dualCoding.traditionalMedicine.code}</strong></div>
                            <div><span className="text-muted-foreground">Display:</span> {responseData.dualCoding.traditionalMedicine.display}</div>
                          </div>
                        </div>
                        <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded">
                          <h5 className="font-medium text-sm mb-2 text-green-700 dark:text-green-300">Biomedical (ICD-11)</h5>
                          <div className="space-y-1 text-sm">
                            <div><span className="text-muted-foreground">System:</span> {responseData.dualCoding.biomedical.system}</div>
                            <div><span className="text-muted-foreground">Code:</span> <strong>{responseData.dualCoding.biomedical.code}</strong></div>
                            <div><span className="text-muted-foreground">Display:</span> {responseData.dualCoding.biomedical.display}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">FHIR Compliance</h4>
                    <div className="flex flex-wrap gap-2">
                      {responseData.fhirCompliance.standards.map((standard, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {standard}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {!responseData && !loading && (
            <Card>
              <CardHeader>
                <CardTitle>Sample FHIR Resource</CardTitle>
                <p className="text-muted-foreground">
                  Example {selectedResource} resource with traditional medicine coding
                </p>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96 w-full rounded-md border">
                  <pre className="p-4 text-sm bg-[#1E1E1E] text-white">
                    <code>{JSON.stringify(generateFHIRResource(), null, 2)}</code>
                  </pre>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
          
          <Card>
            <CardHeader>
              <CardTitle>NAMASTE & ICD-11 Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <h4 className="font-medium mb-2 text-blue-900 dark:text-blue-100">Dual Coding for Interoperability</h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    This FHIR implementation supports dual coding with NAMASTE (4,500+ terms) and ICD-11 TM2 (529 disorder categories), 
                    enabling seamless integration between traditional medicine and biomedical systems while complying with India's 2016 EHR Standards.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-md flex items-center">
                        <Database className="h-4 w-4 mr-2 text-[#1e88e5]" />
                        NAMASTE Codes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Terms:</span>
                          <span className="font-medium">4,500+</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Systems:</span>
                          <span className="font-medium">Ayurveda, Siddha, Unani</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Standard:</span>
                          <span className="font-medium">Ministry of Ayush</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-md flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-[#1e88e5]" />
                        ICD-11 TM2
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Disorder Categories:</span>
                          <span className="font-medium">529</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Pattern Codes:</span>
                          <span className="font-medium">196</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Standard:</span>
                          <span className="font-medium">WHO</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
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
            <Route path="/fhir" element={<FHIRPage />} />
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