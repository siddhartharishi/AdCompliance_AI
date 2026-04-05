import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, ShieldAlert, ShieldCheck, Loader2, Youtube, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import logo from '../assets/logo.jpg'

interface ComplianceResult {
  category: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  description: string;
}

interface AnalysisResult {
  status: "PASS" | "FAIL";
  final_report: string;
  compliance_results: ComplianceResult[];
}

const severityColor: Record<string, string> = {
  CRITICAL: "bg-destructive text-destructive-foreground",
  HIGH: "bg-warning text-warning-foreground",
  MEDIUM: "bg-primary/80 text-primary-foreground",
  LOW: "bg-muted text-muted-foreground",
};

export default function ComplianceChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!url.trim()) return;
  
    setLoading(true);
    setResult(null);
  
    try {
      const response = await fetch("http://localhost:8000/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ video_url: url }),
      });
  
      if (!response.ok) {
        throw new Error("API request failed");
      }
  
      const data = await response.json();
  
      // Map backend response → frontend format
      const formatted: AnalysisResult = {
        status: data.status,
        final_report: data.final_report,
        compliance_results: data.compliance_results || [],
      };
  
      setResult(formatted);
    } catch (error) {
      console.error("Error:", error);
  
      setResult({
        status: "FAIL",
        final_report: "Something went wrong while analyzing the video.",
        compliance_results: [
          {
            category: "System Error",
            severity: "CRITICAL",
            description: "Unable to fetch analysis from server.",
          },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center gap-3 px-6 py-5">
          <img
              src={logo}   // put your logo in public folder
              alt="Ad Compliance AI Logo"
              className="h-7 w-7 object-contain"
            />
          
          <h1 className="text-xl font-semibold text-foreground tracking-tight">
            Ad Compliance AI
          </h1>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-6 py-12">
        {/* Hero */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            AI-Powered Video Compliance Check
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Drop a YouTube link and get instant insights on disclosure and endorsement compliance.
          </p>
        </div>

        {/* Input */}
        <Card className="mb-8 shadow-sm">
          <CardContent className="flex flex-col sm:flex-row gap-3 pt-6">
            <div className="relative flex-1">
              <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="https://www.youtube.com/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                className="pl-10"
              />
            </div>
            <Button onClick={handleAnalyze} disabled={loading || !url.trim()}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing…
                </>
              ) : (
                "Analyze"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Status banner */}
            <Card
              className={
                result.status === "PASS"
                  ? "border-success/40 bg-success/5"
                  : "border-destructive/40 bg-destructive/5"
              }
            >
              <CardContent className="flex items-start gap-4 pt-6">
                {result.status === "PASS" ? (
                  <ShieldCheck className="h-8 w-8 text-success shrink-0 mt-0.5" />
                ) : (
                  <ShieldAlert className="h-8 w-8 text-destructive shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-semibold text-foreground">
                      {result.status === "PASS" ? "Compliant" : "Non-Compliant"}
                    </span>
                    <Badge
                      variant={result.status === "PASS" ? "default" : "destructive"}
                      className={result.status === "PASS" ? "bg-success text-success-foreground" : ""}
                    >
                      {result.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {result.final_report}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Issues */}
            {result.compliance_results.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    Issues Found ({result.compliance_results.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result.compliance_results.map((item, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-border p-4 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground text-sm">
                          {item.category}
                        </span>
                        <Badge className={severityColor[item.severity] || ""}>
                          {item.severity}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {result.status === "PASS" && (
              <Card>
                <CardContent className="flex items-center gap-3 pt-6">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <p className="text-sm text-muted-foreground">
                    No compliance issues detected. The video meets all guidelines.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
