import React, { useState, useRef, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowRight, Folder, MessagesSquare, Send, FilePlus2, Bot, Sparkles, Download, User, Ban } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockChatData = {
  conversationId: 'c1',
  title: 'State vs. Johnson',
  messages: [
    {
      id: 'm1',
      sender: 'ai',
      content: 'Welcome to the case analysis chat. What would you like to know about the State vs. Johnson case?',
      timestamp: '2023-10-10T10:00:00',
    },
    {
      id: 'm2',
      sender: 'user',
      content: 'Can you summarize the key evidence in this case?',
      timestamp: '2023-10-10T10:01:00',
    },
    {
      id: 'm3',
      sender: 'ai',
      content: 'Based on the case documents, the key evidence includes:\n\n1. Witness statements from Sarah Williams (bartender) who observed the entire incident\n2. Medical records showing victim\'s injuries including a fractured orbital bone\n3. CCTV footage from the bar (mentioned but not attached to the documents)\n4. Testimony from Robert Davis who saw parts of the altercation\n5. Conflicting account from Lisa Johnson (defendant\'s girlfriend) claiming self-defense\n\nThe prosecution is primarily relying on the bartender\'s testimony and medical evidence, while the defense is building a self-defense argument based on alleged prior harassment.',
      timestamp: '2023-10-10T10:01:30',
    },
    {
      id: 'm4',
      sender: 'user',
      content: 'Are there any precedents for similar assault cases that resulted in acquittal due to self-defense?',
      timestamp: '2023-10-10T10:02:15',
    },
    {
      id: 'm5',
      sender: 'ai',
      content: 'Yes, there are several relevant precedents that could support a self-defense argument:\n\n1. State v. Miller (2021) - Defendant was acquitted on similar assault charges when they established a reasonable belief of imminent harm, despite the severity of injuries caused.\n\n2. People v. Anderson (2019) - Court ruled that prior harassment, even non-physical, could establish grounds for reasonable fear when combined with threatening gestures.\n\n3. Commonwealth v. Parker (2020) - Established that third-party testimony about victim\'s earlier threatening behavior was admissible to support self-defense claims.\n\nThe defense could potentially leverage these cases, particularly if they can corroborate Lisa Johnson\'s account of prior harassment and establish that Smith made threatening gestures before the altercation.',
      timestamp: '2023-10-10T10:03:00',
    }
  ],
  relatedCases: [
    { id: '1', title: 'State vs. Johnson', category: 'Criminal' },
  ],
  status: 'active',
};

const mockChatHistory = [
  {
    id: 'c1',
    title: 'State vs. Johnson',
    lastMessage: 'Are there any precedents for similar assault cases...',
    timestamp: '2023-10-10T10:02:15',
    caseCount: 1,
  },
  {
    id: 'c2',
    title: 'Davis Family Trust Analysis',
    lastMessage: 'What are the main dispute points in the trust...',
    timestamp: '2023-10-09T15:30:00',
    caseCount: 1,
  },
  {
    id: 'c3',
    title: 'Multi-case Comparison: Johnson, Smith, and Davis',
    lastMessage: 'Compare the witness credibility factors across these three cases',
    timestamp: '2023-10-08T09:15:00',
    caseCount: 3,
  },
];

const mockAvailableCases = [
  { id: '1', title: 'State vs. Johnson', category: 'Criminal' },
  { id: '2', title: 'Smith Corp. vs. Tech Innovations Inc.', category: 'Corporate' },
  { id: '3', title: 'Davis Family Trust', category: 'Family' },
  { id: '4', title: 'City of Springfield vs. Martinez', category: 'Municipal' },
  { id: '5', title: 'Williams Healthcare Malpractice', category: 'Medical' },
];

const Chat = () => {
  const { toast } = useToast();
  const [currentChat, setCurrentChat] = useState<typeof mockChatData | null>(mockChatData);
  const [message, setMessage] = useState('');
  const [selectedCases, setSelectedCases] = useState<string[]>([]);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentChat?.messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    const newUserMessage = {
      id: `m${Date.now()}`,
      sender: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };
    
    if (currentChat) {
      setCurrentChat({
        ...currentChat,
        messages: [...currentChat.messages, newUserMessage as any]
      });
      
      setIsTyping(true);
      
      setMessage('');
      
      setTimeout(() => {
        setIsTyping(false);
        
        const aiResponses = [
          "Based on the case documents, I can see that this aspect is particularly complex. The legal precedent in Johnson v. State (2018) established that similar circumstances should be evaluated on a case-by-case basis, considering all contextual factors.",
          "Looking at the related statutes and case law, there are several interpretations to consider. The court in Davis (2020) ruled that these situations require a balancing test between the interests of all parties involved.",
          "The documents show conflicting evidence on this point. While witness statements support the plaintiff's version of events, the physical evidence and timeline create some inconsistencies that could be exploited by the defense.",
          "This is an interesting question. The case file indicates that similar arguments have been raised before in Commonwealth v. Roberts, where the court ultimately ruled that such claims require substantial supporting evidence beyond mere testimony."
        ];
        
        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        
        const newAiMessage = {
          id: `m${Date.now()}-ai`,
          sender: 'ai',
          content: randomResponse,
          timestamp: new Date().toISOString(),
        };
        
        setCurrentChat(prev => prev ? {
          ...prev,
          messages: [...prev.messages, newAiMessage as any]
        } : null);
      }, 1500);
    }
  };
  
  const handleCreateNewChat = () => {
    if (selectedCases.length === 0) {
      toast({
        title: "Select cases",
        description: "Please select at least one case to analyze",
        variant: "destructive"
      });
      return;
    }
    
    if (!newChatTitle.trim()) {
      toast({
        title: "Enter a title",
        description: "Please enter a title for your conversation",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Login required",
      description: "You need to login to create new chats",
    });
  };
  
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const handleCaseSelection = (caseId: string) => {
    setSelectedCases(prev => 
      prev.includes(caseId) 
        ? prev.filter(id => id !== caseId) 
        : [...prev, caseId]
    );
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto p-6 max-w-7xl h-[calc(100vh-8rem)]">
        <div className="flex h-full gap-4">
          <div className="hidden md:block w-64 h-full flex-shrink-0">
            <Card className="h-full flex flex-col">
              <CardHeader className="py-4">
                <CardTitle className="text-lg flex justify-between items-center">
                  Chat History
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsCreatingNew(true)}
                  >
                    <FilePlus2 className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 p-0 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="px-4 space-y-2">
                    {mockChatHistory.map((chat) => (
                      <Card 
                        key={chat.id}
                        className={`hover:shadow-sm transition-shadow cursor-pointer ${currentChat?.conversationId === chat.id ? 'border-primary' : ''}`}
                        onClick={() => setCurrentChat(mockChatData)}
                      >
                        <CardContent className="p-3">
                          <div className="flex justify-between mb-1">
                            <h3 className="font-medium text-sm truncate max-w-[150px]">{chat.title}</h3>
                            <span className="text-xs text-muted-foreground">
                              {new Date(chat.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                          <div className="mt-1 flex items-center justify-between">
                            <div className="flex items-center">
                              <MessagesSquare className="h-3 w-3 text-muted-foreground mr-1" />
                              <span className="text-xs text-muted-foreground">{chat.caseCount} {chat.caseCount === 1 ? 'case' : 'cases'}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {mockChatHistory.length === 0 && (
                      <div className="text-center py-6 text-muted-foreground">
                        <p className="text-sm">No chat history yet</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex-1 flex flex-col h-full">
            {isCreatingNew ? (
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>New Conversation</CardTitle>
                  <CardDescription>Select case files to analyze and discuss</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Conversation Title</label>
                    <Input 
                      placeholder="Enter a title for this conversation"
                      value={newChatTitle}
                      onChange={(e) => setNewChatTitle(e.target.value)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Cases</label>
                    <p className="text-xs text-muted-foreground">Choose one or more cases to discuss</p>
                    
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {mockAvailableCases.map((caseItem) => (
                        <div 
                          key={caseItem.id}
                          className={`p-3 rounded-md border cursor-pointer flex justify-between items-center ${
                            selectedCases.includes(caseItem.id) 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:bg-muted/50'
                          }`}
                          onClick={() => handleCaseSelection(caseItem.id)}
                        >
                          <div>
                            <p className="font-medium text-sm">{caseItem.title}</p>
                            <p className="text-xs text-muted-foreground">{caseItem.category}</p>
                          </div>
                          <input 
                            type="checkbox"
                            checked={selectedCases.includes(caseItem.id)}
                            onChange={() => handleCaseSelection(caseItem.id)}
                            onClick={(e) => e.stopPropagation()}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between border-t p-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsCreatingNew(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateNewChat}>
                    <MessagesSquare className="h-4 w-4 mr-2" />
                    Start Conversation
                  </Button>
                </CardFooter>
              </Card>
            ) : currentChat ? (
              <Card className="h-full flex flex-col">
                <CardHeader className="py-4 border-b">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{currentChat.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Bot className="h-3 w-3" /> 
                        AI-assisted case analysis
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" /> Export
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setIsCreatingNew(true)}>
                        <FilePlus2 className="h-4 w-4 mr-1" /> New Chat
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <div className="flex-1 overflow-hidden flex flex-col">
                  <div className="p-4 bg-muted/40">
                    <h3 className="text-sm font-medium mb-2">Related Cases</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentChat.relatedCases.map((caseItem) => (
                        <Link to={`/cases/${caseItem.id}`} key={caseItem.id}>
                          <Badge variant="outline" className="cursor-pointer hover:bg-secondary/20 transition-colors">
                            <Folder className="h-3 w-3 mr-1" />
                            {caseItem.title}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-6">
                      {currentChat.messages.map((message) => (
                        <div 
                          key={message.id}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] ${
                              message.sender === 'user' 
                                ? 'bg-primary/10 rounded-tl-2xl rounded-tr-sm rounded-bl-2xl' 
                                : 'bg-secondary/10 rounded-tr-2xl rounded-tl-sm rounded-br-2xl'
                            } p-4 relative`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              {message.sender === 'user' ? (
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="bg-primary text-white text-xs">
                                    <User className="h-3 w-3" />
                                  </AvatarFallback>
                                </Avatar>
                              ) : (
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="bg-secondary text-white text-xs">
                                    <Bot className="h-3 w-3" />
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              <span className="text-xs font-medium">
                                {message.sender === 'user' ? 'You' : 'AI Assistant'}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {formatTime(message.timestamp)}
                              </span>
                            </div>
                            
                            <div className="whitespace-pre-line text-sm">
                              {message.content}
                            </div>
                            
                            {message.sender === 'ai' && (
                              <div className="mt-2 flex gap-2 justify-end">
                                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                  <Ban className="h-3 w-3 mr-1" /> Report
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-secondary/10 rounded-tr-2xl rounded-tl-sm rounded-br-2xl p-4 relative max-w-[80%]">
                            <div className="flex items-center gap-2 mb-1">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="bg-secondary text-white text-xs">
                                  <Bot className="h-3 w-3" />
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs font-medium">AI Assistant</span>
                            </div>
                            <div className="flex space-x-1 items-center h-6">
                              <div className="w-2 h-2 rounded-full bg-secondary animate-bounce"></div>
                              <div className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              <div className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                  
                  <div className="p-4 border-t">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <Textarea 
                        placeholder="Ask a question about this case..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="min-h-[60px] resize-none"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage(e);
                          }
                        }}
                      />
                      <Button type="submit" className="h-full" disabled={isTyping}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                    <div className="mt-2 text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      AI responses are generated based on the case documents and legal knowledge
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-full flex flex-col items-center justify-center text-center p-6">
                <MessagesSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-bold mb-2">Start a New Conversation</h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Select cases to analyze and chat with our AI assistant to get insights and answers to your legal questions.
                </p>
                <Button onClick={() => setIsCreatingNew(true)}>
                  <FilePlus2 className="h-4 w-4 mr-2" />
                  New Conversation
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Chat;
