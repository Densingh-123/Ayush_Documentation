import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";

const ApiHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-medical-primary to-medical-secondary"></div>
            <h1 className="text-xl font-bold">NAMASTE API</h1>
          </div>
          <Badge variant="secondary" className="text-xs">
            v1.0.0
          </Badge>
        </div>
        
        <nav className="flex items-center gap-6">
          <a href="#getting-started" className="text-sm font-medium hover:text-primary transition-colors">
            Getting Started
          </a>
          <a href="#endpoints" className="text-sm font-medium hover:text-primary transition-colors">
            API Reference
          </a>
          <a href="#authentication" className="text-sm font-medium hover:text-primary transition-colors">
            Authentication
          </a>
          <ThemeToggle />
          <Button variant="outline" size="sm">
            GitHub
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default ApiHeader;