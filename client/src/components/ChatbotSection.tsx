import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Loader2, Bot, AlertTriangle, Droplets, Wrench, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickActions = [
  { label: "Badsanierung", icon: AlertTriangle, message: "Ich interessiere mich für eine Badsanierung" },
  { label: "Elektro", icon: Droplets, message: "Ich benötige eine Elektroinstallation" },
  { label: "Komplettsanierung", icon: Wrench, message: "Ich interessiere mich für eine Komplettsanierung" },
  { label: "Beratung", icon: Search, message: "Ich möchte eine kostenlose Erstberatung" },
];

export default function ChatbotSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Guten Tag! Ich bin der digitale Berater von Renodex.\n\nIch helfe Ihnen bei:\n- Komplettsanierung von Haus und Wohnung\n- Sanitär, Heizung, Elektro\n- Kosten und Terminen\n- Fördermöglichkeiten\n\nWas beschäftigt Sie gerade?",
    },
  ]);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (customMessage?: string) => {
    const messageText = customMessage || input.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setShowQuickActions(false);
    setIsLoading(true);

    try {
      const chatHistory = messages.slice(1);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chatHistory, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error("Chat request failed");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Entschuldigung, es gab einen Fehler. Bitte rufen Sie uns direkt an: [Telefon folgt]",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section className="py-6 md:py-8 bg-zinc-200 dark:bg-zinc-800" data-testid="section-chatbot">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="text-center lg:text-left flex flex-col">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-3">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-2" data-testid="heading-chatbot">
              Renodex München Beratung – Ihr digitaler Berater
            </h2>
            <p className="text-muted-foreground text-sm mb-3">
              Fragen zu Kosten, Ablauf oder Materialien? Unser KI-Berater hilft sofort - <strong>24 Stunden am Tag, 7 Tage die Woche</strong>.
            </p>
            
            <div className="hidden lg:block space-y-3 text-sm">
              <div className="p-3 bg-white dark:bg-zinc-900 rounded-md border">
                <div className="flex items-center gap-2 font-bold text-destructive mb-1">
                  <AlertTriangle className="w-4 h-4" /> Sturmschäden & Notfälle
                </div>
                <p className="text-xs text-muted-foreground">Kostenlose digitale Erstberatung zu Ihrer Sanierung – ohne Besichtigungstermin.</p>
              </div>
              
              <div className="p-3 bg-white dark:bg-zinc-900 rounded-md border">
                <div className="flex items-center gap-2 font-bold text-primary mb-1">
                  <Bot className="w-4 h-4" /> Kosten & Termine
                </div>
                <p className="text-xs text-muted-foreground">Erhalten Sie eine erste Kostenschätzung und Terminvorschläge - direkt im Chat, ohne Wartezeit.</p>
              </div>
              
              <div className="p-3 bg-white dark:bg-zinc-900 rounded-md border">
                <div className="flex items-center gap-2 font-bold text-primary mb-1">
                  <Wrench className="w-4 h-4" /> Sanierung & Reparaturen
                </div>
                <p className="text-xs text-muted-foreground">Beratung zu Materialien, Ablauf und Zeitplanung. Alle Infos für Ihre Entscheidung.</p>
              </div>
            </div>
            
            <div className="hidden lg:block mt-auto pt-3">
              <p className="text-xs text-muted-foreground italic">
                "Der Chatbot hat mir sofort geholfen, mein Anliegen zu klären."
              </p>
            </div>
          </div>

          <Card className="overflow-hidden shadow-lg flex flex-col">
            <div className="flex items-center gap-2 p-2 border-b bg-primary text-primary-foreground">
              <MessageCircle className="w-4 h-4" />
              <span className="font-semibold text-xs">Renodex KI-Assistent</span>
              <span className="ml-auto text-xs opacity-80">Online</span>
            </div>

            <ScrollArea className="flex-1 min-h-[250px] p-3" ref={scrollRef}>
              <div className="space-y-3">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-md px-3 py-2 text-sm whitespace-pre-line ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                      data-testid={`chatbot-message-${message.role}-${index}`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-md px-3 py-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  </div>
                )}

                {showQuickActions && !isLoading && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-muted-foreground">Schnellauswahl:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickActions.map((action) => (
                        <Button aria-label="Aktion"
                          key={action.label}
                          variant="outline"
                          size="sm"
                          onClick={() => sendMessage(action.message)}
                          className="text-xs"
                          data-testid={`button-quick-${action.label.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <action.icon className="w-3 h-3 mr-1" />
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-2 border-t bg-muted/30">
              <p className="text-[10px] text-muted-foreground mb-1.5 text-center">
                KI-System gem. EU AI Act Art. 50 | Keine rechtsverbindliche Beratung
              </p>
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ihre Frage..."
                  disabled={isLoading}
                  className="flex-1 h-8 text-sm"
                  data-testid="input-chatbot-message"
                />
                <Button aria-label="Aktion"
                  size="icon"
                  onClick={() => sendMessage()}
                  disabled={isLoading || !input.trim()}
                  className="h-8 w-8"
                  data-testid="button-chatbot-send"
                >
                  <Send className="w-3 h-3" />
                </Button>
              </div>
              <p className="text-[9px] text-muted-foreground mt-1 text-center" data-testid="text-chatbot-disclosure">
                KI-Chatbot. <a href="/datenschutz#mKI" className="hover:text-foreground">Datenschutz</a>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
