Traditional Medicine API Documentation Portal
Overview
A comprehensive documentation portal for India's traditional medicine terminologies integrated with WHO ICD-11 TM2. This React-based application provides detailed API documentation, testing capabilities, and an AI assistant to help users understand and work with traditional medicine APIs.

Features
1. Comprehensive API Documentation
Ayurveda API: Search Ayurvedic medical terminologies with English names, Hindi names, and diacritical representations

Siddha API: Access Siddha medical terminologies with English names, Tamil names, and romanized representations

Unani API: Explore Unani medical terminologies with English names, Arabic names, and romanized representations

ICD-11 API: Search WHO's International Classification of Diseases codes and terminologies

Mappings API: Find connections between traditional medicine terminologies and ICD-11 codes with confidence scores

2. Interactive Testing Playground
Live API testing interface for all endpoints

Real-time response visualization

Sample queries and parameter examples

Copy-paste ready code snippets

3. AI-Powered Assistant
Intelligent chatbot for answering API-related questions

Context-aware responses based on user queries

Quick action buttons for common questions

Scrollable chat history with smooth auto-scrolling

4. Detailed System Information
About Ayurveda: History, principles, and treatment methods

About Siddha: Origins, diagnostic methods, and therapies

About Unani: Philosophical foundations and treatment approaches

About ICD-11: WHO standards and traditional medicine integration

5. Analytics Dashboard
API usage statistics visualization

Success rates monitoring

Popular search terms tracking

Performance metrics

6. User-Friendly Interface
Dark/light theme support

Responsive design for all devices

Intuitive navigation with sidebar menu

Clean, modern UI with smooth animations

7. Technical Features
FHIR R4 compliant

India EHR Standards 2016 compatible

OAuth 2.0 ABHA ready

Dual coding system (Traditional Medicine + Biomedicine)

API Endpoints
Ayurveda Terminology Search
text
GET /terminologies/ayurveda/search/?q=query
Returns Ayurvedic medical terminologies with English names, Hindi names, and diacritical representations.

Siddha Terminology Search
text
GET /terminologies/siddha/search/?q=query
Returns Siddha medical terminologies with English names, Tamil names, and romanized representations.

Unani Terminology Search
text
GET /terminologies/unani/search/?q=query
Returns Unani medical terminologies with English names, Arabic names, and romanized representations.

ICD-11 Terminology Search
text
GET /terminologies/icd11/search/?q=query
Returns ICD-11 medical codes and terminologies with detailed information.

Mappings Search
text
GET /terminologies/mappings/?system=system&q=query&min_confidence=0.1
Finds mappings between traditional medicine terminologies and ICD-11 codes with confidence scores.

Data Coverage
4,500+ Ayurveda terms

1,200+ Siddha terms

1,800+ Unani terms

529 ICD-11 TM2 codes

Comprehensive mappings between systems

Getting Started
Prerequisites
Node.js (v14 or higher)

npm or yarn

API server running on https://ayushbandan.duckdns.org

Installation
Clone the repository:

bash
git clone <repository-url>
cd api-documentation-portal
Install dependencies:

bash
npm install
Start the development server:

bash
npm run dev
Open your browser and navigate to http://localhost:3000

Building for Production
bash
npm run build
npm start
Usage Examples
Searching for Terms
Navigate to the desired API section (Ayurveda, Siddha, Unani, or ICD-11)

Enter a search term in the input field

View the formatted API response with codes and translations

Testing API Endpoints
Visit the Testing Playground

Select an endpoint from the dropdown

Enter optional parameters

Click "Test Endpoint" to see live results

Using the AI Assistant
Click the chat icon in the bottom-right corner

Ask questions about:

API endpoints and parameters

Response formats

Specific disease codes

System integrations

Authentication and rate limits

Technology Stack
Frontend Framework: React with TypeScript

UI Library: shadcn/ui with Tailwind CSS

Routing: React Router

Animations: Framer Motion

Icons: Lucide React

API Client: Native Fetch API

Build Tool: Vite

Key Components
Header: Navigation and theme toggle

Sidebar: Main navigation menu

AIChatbot: Interactive assistant with API integration

ApiTestingComponent: Live API testing interface

HeroSection: Landing page introduction

ApiResponseDisplay: formatted API response viewer

API Integration
The application integrates with a backend API server running on https://ayushbandan.duckdns.org with the following endpoints:

Ayurveda: /terminologies/ayurveda/search/

Siddha: /terminologies/siddha/search/

Unani: /terminologies/unani/search/

ICD-11: /terminologies/icd11/search/

Mappings: /terminologies/mappings/

Customization
Adding New API Endpoints
Create a new page component in src/components/pages/

Add route in App.tsx

Update sidebar navigation items

Add API integration logic following existing patterns

Modifying Styling
Global styles: src/index.css

Component-specific styles: Tailwind CSS classes in components

Theme customization: Modify src/components/theme-provider.tsx

Extending AI Knowledge Base
Edit the getBotResponse function in the AIChatbot component to add new question-answer pairs and API integration logic.

Performance Features
Lazy loading of components

Optimized re-renders with React hooks

Efficient API call management

Smooth animations with Framer Motion

Responsive design for all screen sizes

Browser Support
Chrome (latest)

Firefox (latest)

Safari (latest)

Edge (latest)

Contributing
Fork the repository

Create a feature branch

Make your changes

Add tests if applicable

Submit a pull request

License
This project is licensed under the MIT License - see the LICENSE file for details.

Support
For technical support or questions about the API documentation:

Email: support@tradmedapi.com

Documentation: API Documentation Portal

Issues: GitHub Issues page

Acknowledgments
Ministry of AYUSH for traditional medicine data

World Health Organization for ICD-11 standards

shadcn/ui for the component library

React community for excellent tools and resources