import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

const sidebarSections = [
  {
    title: "Getting Started",
    items: [
      { id: "introduction", label: "Introduction" },
      { id: "authentication", label: "Authentication" },
      { id: "rate-limiting", label: "Rate Limiting" },
      { id: "error-handling", label: "Error Handling" }
    ]
  },
  {
    title: "FHIR Resources",
    items: [
      { id: "codesystem", label: "CodeSystem" },
      { id: "conceptmap", label: "ConceptMap" },
      { id: "valueset", label: "ValueSet" },
      { id: "bundle", label: "Bundle Upload" }
    ]
  },
  {
    title: "API Endpoints",
    items: [
      { id: "autocomplete", label: "Auto-complete Lookup" },
      { id: "translate", label: "Translation Service" },
      { id: "search", label: "Terminology Search" },
      { id: "validate", label: "Code Validation" }
    ]
  },
  {
    title: "Integration",
    items: [
      { id: "emr-integration", label: "EMR Integration" },
      { id: "fhir-bundles", label: "FHIR Bundles" },
      { id: "oauth", label: "OAuth 2.0 & ABHA" },
      { id: "audit", label: "Audit Trails" }
    ]
  }
];

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <aside className={cn("w-64 border-r bg-card/50 backdrop-blur", className)}>
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">API Documentation</h2>
          <p className="text-sm text-muted-foreground">Navigate through our comprehensive API reference</p>
        </div>
        <nav className="space-y-6">
          {sidebarSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-sm text-foreground mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1 px-2 rounded hover:bg-muted/50"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;