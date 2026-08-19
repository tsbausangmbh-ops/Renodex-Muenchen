import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Willkommen! Ich bin der KI-Assistent von Renodex.\n\nWir sind Ihr Partnernetzwerk für die Komplettsanierung von Haus und Wohnung aus einer Hand – von Sanitär und Heizung über Elektro bis hin zum Innenausbau.\n\nBitte schildern Sie mir Ihr Anliegen!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
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
    <>
      {/* Seitlicher Tab-Balken (geschlossen) */}
      <div
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 transition-all duration-300 ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <button aria-label="Aktion"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 bg-primary text-primary-foreground px-1.5 py-2.5 rounded-l-md shadow-lg hover:bg-primary/90 transition-colors cursor-pointer"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          data-testid="button-open-chat"
        >
          <MessageCircle className="w-4 h-4 rotate-90" />
          <span className="font-semibold text-xs tracking-wide">KI-Beratung</span>
        </button>
      </div>

      {/* Aufgeklapptes Chat-Panel */}
      <div
        className={`fixed right-0 top-0 h-full z-50 transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <Card className="h-full w-[calc(100vw-1rem)] sm:w-[400px] md:w-[440px] flex flex-col shadow-xl border-l rounded-none">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 p-3 border-b bg-primary text-primary-foreground">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold text-sm">Renodex Assistent</span>
            </div>
            <Button aria-label="Aktion"
              size="icon"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground"
              data-testid="button-close-chat"
            >
              <ChevronLeft className="w-5 h-5 rotate-180" />
            </Button>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-3" ref={scrollRef}>
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
                    data-testid={`chat-message-${message.role}-${index}`}
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
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-3 border-t">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ihre Nachricht..."
                disabled={isLoading}
                className="flex-1"
                data-testid="input-chat-message"
              />
              <Button aria-label="Aktion"
                size="icon"
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                data-testid="button-send-message"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 text-center" data-testid="text-ai-disclosure">
              KI-System gem. EU AI Act Art. 50 | <a href="/datenschutz#mKI" className="hover:text-foreground">Datenschutz</a>
            </p>
          </div>
        </Card>
      </div>

      {/* Overlay wenn offen */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
