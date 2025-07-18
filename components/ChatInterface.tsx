'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Brain, Zap } from 'lucide-react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if API key is stored in localStorage
    const storedApiKey = localStorage.getItem('gemini-api-key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setShowApiKeyInput(false);
    }
  }, []);

  useEffect(() => {
    // Animate chat container on mount
    if (chatContainerRef.current) {
      gsap.fromTo(
        chatContainerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini-api-key', apiKey);
      setShowApiKeyInput(false);
      
      // Animate the transition
      gsap.to('.api-key-form', {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => {
          gsap.fromTo('.chat-interface', 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 }
          );
        }
      });
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages,
          apiKey: apiKey,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (showApiKeyInput) {
        handleApiKeySubmit();
      } else {
        sendMessage();
      }
    }
  };

  const clearChat = () => {
    setMessages([]);
    gsap.fromTo('.message-container', 
      { opacity: 1 },
      { opacity: 0, duration: 0.3, onComplete: () => {
        gsap.set('.message-container', { opacity: 1 });
      }}
    );
  };

  const clearApiKey = () => {
    localStorage.removeItem('gemini-api-key');
    setApiKey('');
    setShowApiKeyInput(true);
    setMessages([]);
  };

  if (showApiKeyInput) {
    return (
      <div className="api-key-form flex items-center justify-center min-h-screen p-4">
        <div className="glass rounded-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <Brain className="w-12 h-12 text-purple-400 mr-2" />
              <h1 className="text-2xl font-bold gradient-text">Aarnav AI Chat</h1>
            </div>
            <p className="text-gray-300 mb-4">
              Welcome to Aarnav&apos;s AI Chat - Enter your Google Gemini API key to get started
            </p>
            <a 
              href="https://makersuite.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 underline text-sm"
            >
              Get your API key here
            </a>
          </div>
          
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Enter your Gemini API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-white/10 border-white/20 text-white placeholder-gray-400"
            />
            <Button 
              onClick={handleApiKeySubmit}
              disabled={!apiKey.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Start Chatting
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={chatContainerRef} className="chat-interface flex flex-col h-screen">
      {/* Header */}
      <div className="glass border-b border-white/10 p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <Brain className="w-8 h-8 text-purple-400" />
            <h1 className="text-xl font-bold gradient-text">Aarnav AI Chat</h1>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
              By Aarnav Anand
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={clearChat}
              className="bg-white/10 border-white/20 hover:bg-white/20"
            >
              <Zap className="w-4 h-4 mr-2" />
              Clear
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearApiKey}
              className="bg-white/10 border-white/20 hover:bg-white/20"
            >
              API Key
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="message-container max-w-4xl mx-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-20">
                <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-50" />
                <p className="text-gray-400 text-lg">
                  Start a conversation with Aarnav&apos;s AI
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Ask me anything - Powered by Google Gemini for Aarnav Anand
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))
            )}
            
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Input */}
      <div className="glass border-t border-white/10 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1 bg-white/10 border-white/20 text-white placeholder-gray-400"
            />
            <Button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}