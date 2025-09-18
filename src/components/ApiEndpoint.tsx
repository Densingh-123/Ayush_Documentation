import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface ApiEndpointProps {
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  title: string;
  description: string;
  codeExample: string;
  responseExample?: string;
}

const ApiEndpoint = ({ method, endpoint, title, description, codeExample, responseExample }: ApiEndpointProps) => {
  const methodColors = {
    GET: "bg-medical-success text-white",
    POST: "bg-medical-primary text-white", 
    PUT: "bg-medical-warning text-white",
    DELETE: "bg-medical-error text-white"
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <Badge className={methodColors[method]}>{method}</Badge>
          <code className="text-sm bg-muted px-2 py-1 rounded">{endpoint}</code>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <p className="text-muted-foreground">{description}</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Request Example</h4>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => copyToClipboard(codeExample)}
              className="gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy
            </Button>
          </div>
          <div className="bg-code-bg text-code-foreground p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
              <code>{codeExample}</code>
            </pre>
          </div>
        </div>
        
        {responseExample && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Response Example</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => copyToClipboard(responseExample)}
                className="gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>
            </div>
            <div className="bg-code-bg text-code-foreground p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
                <code>{responseExample}</code>
              </pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiEndpoint;