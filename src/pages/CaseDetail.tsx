import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  FileText, 
  UserRound, 
  MapPin, 
  Calendar, 
  Scale, 
  AlertCircle, 
  Award, 
  MessageSquare,
  Download,
  Users,
  Lock,
  Unlock,
  Edit,
  Eye,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

const mockCase = {
  id: '1',
  title: 'State vs. Johnson',
  category: 'Criminal',
  date: '2023-05-10',
  status: 'Ongoing',
  confidenceScore: 92,
  isPrivate: false,
  summary: 'Defendant charged with aggravated assault and battery following an incident at a local bar on the night of May 5th, 2023. The prosecution alleges that the defendant initiated an unprovoked attack on the victim, resulting in significant injuries requiring hospitalization. The defense maintains that the defendant acted in self-defense after being threatened.',
  rawText: `STATE OF EXAMPLE v. MICHAEL JOHNSON\nCase No. CR-2023-0589\n\nSUMMARY OF CHARGES:\n- Count 1: Aggravated Assault (§ 13-1204.A)\n- Count 2: Battery (§ 13-1203.A)\n\nFACTUAL BACKGROUND:\nOn May 5, 2023, at approximately 11:30 PM, officers responded to a disturbance at The Corner Bar located at 123 Main Street. Upon arrival, officers found the victim, James Smith, with facial injuries including a fractured orbital bone and lacerations requiring 12 stitches. Multiple witnesses stated that the defendant, Michael Johnson, struck the victim multiple times following a verbal altercation.\n\nWitness Statements:\n1. Sarah Williams (bartender) - Observed the entire incident and stated that Johnson appeared to initiate the physical confrontation after Smith made a comment about Johnson's girlfriend.\n\n2. Robert Davis (patron) - Stated that he saw Johnson throw the first punch but also noted that Smith had been "getting in Johnson's face" prior to the altercation.\n\n3. Lisa Johnson (defendant's girlfriend) - Claims that Smith had been harassing her throughout the evening and that Johnson intervened only after Smith made threatening gestures.\n\nThe defendant was arrested at the scene and invoked his right to counsel.`,
  insights: {
    suspects: ['Michael Johnson'],
    victims: ['James Smith'],
    witnesses: ['Sarah Williams (bartender)', 'Robert Davis (patron)', 'Lisa Johnson (girlfriend of suspect)'],
    location: '123 Main Street, The Corner Bar',
    date: 'May 5, 2023, 11:30 PM',
    lawCodes: ['§ 13-1204.A (Aggravated Assault)', '§ 13-1203.A (Battery)'],
    keyIncidents: [
      'Verbal altercation at The Corner Bar',
      'Physical assault resulting in fractured orbital bone and lacerations',
      'Possible self-defense claim by the defendant',
      'Potential harassment of defendant\'s girlfriend prior to incident'
    ],
    evidenceItems: [
      'Medical records showing victim\'s injuries',
      'CCTV footage from bar (mentioned in report but not attached)',
      'Photographs of the crime scene',
      'Officer body cam footage from arrest'
    ],
    currentStatus: 'Discovery phase. Preliminary hearing scheduled for June 15, 2023.'
  },
  tags: ['Criminal', 'Assault', 'Battery', 'Self-Defense'],
  comments: [
    { id: 1, user: 'LawyerA', content: 'The witness statements contradict each other regarding who initiated the physical confrontation.', timestamp: '2023-05-15T10:23:00' },
    { id: 2, user: 'ParalegalB', content: 'Need to request the CCTV footage mentioned in the report.', timestamp: '2023-05-15T14:45:00' },
    { id: 3, user: 'LawyerC', content: 'Similar case precedent: State v. Miller (2021) where self-defense was successfully argued under similar circumstances.', timestamp: '2023-05-16T09:12:00' }
  ]
};

const CaseDetail = () => {
  const { caseId } = useParams();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [correctionText, setCorrectionText] = useState('');
  
  const handleDownloadPdf = () => {
    toast({
      title: "Starting download",
      description: `Downloading ${mockCase.title} insights as PDF`,
    });
  };

  const handlePrivacyToggle = () => {
    toast({
      title: "Login required",
      description: "You need to log in to change case privacy settings",
    });
  };
  
  const handleShareGroup = () => {
    toast({
      title: "Login required",
      description: "You need to log in to share cases with groups",
    });
  };
  
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    toast({
      title: "Login required",
      description: "You need to log in to add comments",
    });
    setNewComment('');
  };
  
  const handleSubmitCorrection = () => {
    if (!correctionText.trim()) return;
    
    toast({
      title: "Correction submitted",
      description: "Thank you for your contribution! Our team will review your correction.",
    });
    setIsEditing(false);
    setCorrectionText('');
  };
  
  const handleInsightFeedback = (isPositive: boolean) => {
    toast({
      title: isPositive ? "Insight confirmed" : "Insight flagged for review",
      description: isPositive 
        ? "Thank you for confirming this insight's accuracy" 
        : "Thank you for your feedback. This insight will be reviewed.",
    });
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link to="/" className="text-muted-foreground hover:text-foreground text-sm">
                Cases
              </Link>
              <span className="text-muted-foreground text-sm">/</span>
              <span className="text-sm">{mockCase.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-navy-600">{mockCase.title}</h1>
              <Badge variant={mockCase.isPrivate ? "outline" : "secondary"}>
                {mockCase.isPrivate ? <Lock className="h-3 w-3 mr-1" /> : <Unlock className="h-3 w-3 mr-1" />}
                {mockCase.isPrivate ? "Private" : "Public"}
              </Badge>
              <Badge variant={mockCase.status === 'Ongoing' ? "default" : "secondary"}>
                {mockCase.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">{mockCase.category} Case • Filed on {mockCase.date}</p>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" onClick={handlePrivacyToggle}>
              {mockCase.isPrivate ? <Unlock className="h-4 w-4 mr-1" /> : <Lock className="h-4 w-4 mr-1" />}
              Make {mockCase.isPrivate ? "Public" : "Private"}
            </Button>
            <Button variant="outline" onClick={handleShareGroup}>
              <Users className="h-4 w-4 mr-1" />
              Share with Group
            </Button>
            <Button onClick={handleDownloadPdf}>
              <Download className="h-4 w-4 mr-1" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Case Summary
                </CardTitle>
                <CardDescription>AI-generated summary and insights from the case documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <span>AI Confidence Score:</span>
                    <span className="font-medium">{mockCase.confidenceScore}%</span>
                  </div>
                  <Progress 
                    value={mockCase.confidenceScore} 
                    className="w-32 h-2"
                  />
                </div>
                
                <p className="text-sm mb-4">{mockCase.summary}</p>
              </CardContent>
            </Card>

            <Tabs defaultValue="insights">
              <TabsList className="w-full">
                <TabsTrigger value="insights" className="flex-1">AI Insights</TabsTrigger>
                <TabsTrigger value="original" className="flex-1">Original Text</TabsTrigger>
                <TabsTrigger value="discuss" className="flex-1">Discussions</TabsTrigger>
              </TabsList>

              <TabsContent value="insights">
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-medium flex items-center gap-2">
                          <UserRound className="h-5 w-5" />
                          Persons of Interest
                        </h3>
                        {isEditing ? (
                          <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>Cancel Edit</Button>
                        ) : (
                          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                            <Edit className="h-3 w-3 mr-1" /> Suggest Correction
                          </Button>
                        )}
                      </div>
                      
                      {isEditing ? (
                        <div className="space-y-3">
                          <Textarea 
                            placeholder="Suggest corrections for this section..." 
                            value={correctionText}
                            onChange={(e) => setCorrectionText(e.target.value)}
                          />
                          <div className="flex justify-end">
                            <Button onClick={handleSubmitCorrection} size="sm">Submit Correction</Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <div>
                              <p className="text-sm font-medium">Suspects:</p>
                              <ul className="list-disc pl-5 text-sm">
                                {mockCase.insights.suspects.map((suspect, index) => (
                                  <li key={index}>{suspect}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="flex gap-1">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleInsightFeedback(true)}>
                                      <ThumbsUp className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Confirm this insight</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleInsightFeedback(false)}>
                                      <ThumbsDown className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Flag this insight for review</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium">Victims:</p>
                            <ul className="list-disc pl-5 text-sm">
                              {mockCase.insights.victims.map((victim, index) => (
                                <li key={index}>{victim}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p className="text-sm font-medium">Witnesses:</p>
                            <ul className="list-disc pl-5 text-sm">
                              {mockCase.insights.witnesses.map((witness, index) => (
                                <li key={index}>{witness}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>

                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium flex items-center gap-2 mb-2">
                        <MapPin className="h-5 w-5" />
                        Location and Date
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-muted/40 p-3 rounded-md">
                          <p className="text-sm font-medium">Location:</p>
                          <p className="text-sm">{mockCase.insights.location}</p>
                        </div>
                        <div className="bg-muted/40 p-3 rounded-md">
                          <p className="text-sm font-medium">Date and Time:</p>
                          <p className="text-sm">{mockCase.insights.date}</p>
                        </div>
                      </div>
                    </div>

                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium flex items-center gap-2 mb-2">
                        <Scale className="h-5 w-5" />
                        Legal Information
                      </h3>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Applicable Law Codes:</p>
                        <ul className="list-disc pl-5 text-sm">
                          {mockCase.insights.lawCodes.map((code, index) => (
                            <li key={index}>{code}</li>
                          ))}
                        </ul>
                        <p className="text-sm font-medium mt-2">Current Status:</p>
                        <p className="text-sm">{mockCase.insights.currentStatus}</p>
                      </div>
                    </div>

                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium flex items-center gap-2 mb-2">
                        <AlertCircle className="h-5 w-5" />
                        Key Incidents
                      </h3>
                      <ul className="list-disc pl-5 text-sm">
                        {mockCase.insights.keyIncidents.map((incident, index) => (
                          <li key={index}>{incident}</li>
                        ))}
                      </ul>
                    </div>

                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium flex items-center gap-2 mb-2">
                        <Award className="h-5 w-5" />
                        Evidence
                      </h3>
                      <ul className="list-disc pl-5 text-sm">
                        {mockCase.insights.evidenceItems.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="original">
                <Card>
                  <CardHeader>
                    <CardTitle>Original Case Document</CardTitle>
                    <CardDescription>Unaltered text extracted from the uploaded documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      <div className="font-mono text-sm whitespace-pre-line">{mockCase.rawText}</div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="discuss">
                <Card>
                  <CardHeader>
                    <CardTitle>Case Discussions</CardTitle>
                    <CardDescription>Collaborate and share insights with team members</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      {mockCase.comments.map((comment) => (
                        <div key={comment.id} className="bg-muted/40 p-3 rounded-md">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{comment.user}</span>
                            <span className="text-muted-foreground">
                              {new Date(comment.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm mt-1">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-3 pt-2">
                      <Textarea 
                        placeholder="Add a comment or insight..." 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                      <div className="flex justify-end">
                        <Button onClick={handleAddComment}>
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Add Comment
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="w-full lg:w-80 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Case Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">Category</p>
                  <p className="text-sm">{mockCase.category}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Filed Date</p>
                  <p className="text-sm">{mockCase.date}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <p className="text-sm">{mockCase.status}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tags</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {mockCase.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="h-4 w-4 mr-2" />
                  Compare with other cases
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat with this document
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">AI Confidence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Summary</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Persons Identified</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Law Codes</span>
                    <span className="font-medium">89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Timeline</span>
                    <span className="font-medium">86%</span>
                  </div>
                  <Progress value={86} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CaseDetail;
