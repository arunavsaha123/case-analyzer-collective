
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Users, UserPlus, Link as LinkIcon, Copy, Lock, Unlock, Folder, MessageSquare, ArrowRight, Plus, UserCircle2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from 'react-router-dom';

// Mock data for groups
const mockGroups = [
  {
    id: '1',
    name: 'Criminal Defense Team',
    description: 'Collaborative group for the Johnson defense case',
    memberCount: 5,
    caseCount: 3,
    isPrivate: true,
    owner: 'JohnDoe',
    members: ['JohnDoe', 'JaneSmith', 'RobertBrown', 'AliceWilliams', 'MichaelJones'],
    cases: [
      { id: '1', title: 'State vs. Johnson', category: 'Criminal', date: '2023-05-10' },
      { id: '3', title: 'State vs. Williams', category: 'Criminal', date: '2023-02-15' },
      { id: '7', title: 'State vs. Garcia', category: 'Criminal', date: '2023-09-20' }
    ]
  },
  {
    id: '2',
    name: 'Corporate Litigation',
    description: 'Patent cases and corporate litigation matters',
    memberCount: 3,
    caseCount: 2,
    isPrivate: true,
    owner: 'JaneSmith',
    members: ['JaneSmith', 'AliceWilliams', 'ThomasMiller'],
    cases: [
      { id: '2', title: 'Smith Corp. vs. Tech Innovations Inc.', category: 'Corporate', date: '2022-11-22' },
      { id: '5', title: 'Roberts Inc. vs. Global Systems LLC', category: 'Corporate', date: '2023-04-18' }
    ]
  },
  {
    id: '3',
    name: 'Family Law Study Group',
    description: 'Study group focusing on family law cases and precedents',
    memberCount: 7,
    caseCount: 1,
    isPrivate: false,
    owner: 'RobertBrown',
    members: ['RobertBrown', 'JohnDoe', 'CarolDavis', 'StevenWilson', 'LisaJohnson', 'MarkSmith', 'KarenMiller'],
    cases: [
      { id: '3', title: 'Davis Family Trust', category: 'Family', date: '2023-07-15' }
    ]
  }
];

const Groups = () => {
  const { toast } = useToast();
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [isPrivateGroup, setIsPrivateGroup] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  
  // Get active group from mock data
  const activeGroup = activeGroupId 
    ? mockGroups.find(group => group.id === activeGroupId) 
    : null;
  
  // Function to create a group (mock)
  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      toast({
        title: "Group name required",
        description: "Please enter a name for your group",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Login required",
      description: "You need to login to create a group",
    });
    
    // Clear form
    setGroupName('');
    setGroupDescription('');
    setIsPrivateGroup(true);
  };
  
  // Function to handle invite (mock)
  const handleInvite = () => {
    if (!inviteEmail.trim()) {
      toast({
        title: "Email required",
        description: "Please enter an email address",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Invitation sent",
      description: `Invitation sent to ${inviteEmail}`,
    });
    
    setInviteEmail('');
    setInviteDialogOpen(false);
  };
  
  // Function to copy invite link (mock)
  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(`https://caseanalyzer.com/invite/${activeGroup?.id}`);
    toast({
      title: "Link copied",
      description: "Group invite link copied to clipboard",
    });
  };
  
  // Function to leave group (mock)
  const handleLeaveGroup = () => {
    toast({
      title: "Login required",
      description: "You need to login to leave a group",
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-navy-600">Case Groups</h1>
          <p className="text-muted-foreground">Create and manage collaborative case analysis groups</p>
        </div>
        
        <Tabs defaultValue="my-groups" className="space-y-6">
          <TabsList>
            <TabsTrigger value="my-groups">My Groups</TabsTrigger>
            <TabsTrigger value="explore">Explore Public Groups</TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-groups" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Create new group card */}
              <Card className="border-dashed hover:border-primary/50 hover:bg-muted/50 transition-colors">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[200px]">
                  <Users className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Create New Group</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Start a new collaborative group for case analysis
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        New Group
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create a New Group</DialogTitle>
                        <DialogDescription>
                          Create a collaborative group to share and analyze cases with colleagues
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="group-name">Group Name</Label>
                          <Input 
                            id="group-name" 
                            placeholder="Enter group name" 
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="group-desc">Description</Label>
                          <Textarea 
                            id="group-desc" 
                            placeholder="Describe the purpose of this group" 
                            value={groupDescription}
                            onChange={(e) => setGroupDescription(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="private-group"
                            checked={isPrivateGroup}
                            onChange={(e) => setIsPrivateGroup(e.target.checked)}
                            className="rounded text-primary"
                          />
                          <Label htmlFor="private-group">Make this group private (invite only)</Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleCreateGroup}>Create Group</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
              
              {/* Login prompt if not logged in */}
              <Card className="col-span-1 md:col-span-2">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[200px]">
                  <UserCircle2 className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Login to View Your Groups</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    You need to login to view your groups and collaborations
                  </p>
                  <Link to="/auth">
                    <Button>Log In</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
            
            {/* Sample group message */}
            <div className="text-center py-8 text-muted-foreground">
              <p>Once logged in, your groups will appear here</p>
            </div>
          </TabsContent>
          
          <TabsContent value="explore" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Public Groups</CardTitle>
                <CardDescription>Browse and join public case analysis groups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockGroups
                    .filter(group => !group.isPrivate)
                    .map(group => (
                    <Card key={group.id} className="hover:shadow-sm transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div>
                            <CardTitle>{group.name}</CardTitle>
                            <CardDescription className="mt-1">{group.description}</CardDescription>
                          </div>
                          <Button onClick={() => setActiveGroupId(group.id)}>View Group</Button>
                        </div>
                      </CardHeader>
                      <CardFooter className="pt-2 text-sm flex justify-between">
                        <div className="flex gap-4">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            {group.memberCount} members
                          </span>
                          <span className="flex items-center gap-1">
                            <Folder className="h-4 w-4 text-muted-foreground" />
                            {group.caseCount} cases
                          </span>
                        </div>
                        <Badge variant="secondary">Public Group</Badge>
                      </CardFooter>
                    </Card>
                  ))}
                  
                  {mockGroups.filter(group => !group.isPrivate).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No public groups available</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Group details dialog */}
        {activeGroup && (
          <Dialog open={!!activeGroupId} onOpenChange={(open) => !open && setActiveGroupId(null)}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <DialogTitle>{activeGroup.name}</DialogTitle>
                    <DialogDescription>{activeGroup.description}</DialogDescription>
                  </div>
                  <Badge variant={activeGroup.isPrivate ? "outline" : "secondary"}>
                    {activeGroup.isPrivate ? (
                      <><Lock className="h-3 w-3 mr-1" /> Private</>
                    ) : (
                      <><Unlock className="h-3 w-3 mr-1" /> Public</>
                    )}
                  </Badge>
                </div>
              </DialogHeader>
              
              <div className="flex flex-col md:flex-row gap-6 py-4 flex-1 overflow-hidden">
                <div className="md:w-2/3 space-y-4 overflow-hidden flex flex-col">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Group Cases</h3>
                    <Link to="/upload">
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" /> Add Case
                      </Button>
                    </Link>
                  </div>
                  
                  <ScrollArea className="flex-1">
                    <div className="space-y-3">
                      {activeGroup.cases.map(caseItem => (
                        <Link to={`/cases/${caseItem.id}`} key={caseItem.id}>
                          <Card className="hover:bg-muted/30 transition-colors">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <h4 className="font-medium">{caseItem.title}</h4>
                                  <p className="text-sm text-muted-foreground">{caseItem.category} • {new Date(caseItem.date).toLocaleDateString()}</p>
                                </div>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                      
                      {activeGroup.cases.length === 0 && (
                        <div className="text-center py-6 text-muted-foreground">
                          <p>No cases in this group</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                  
                  {/* Group chat button */}
                  <Button className="w-full" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Group Chat
                  </Button>
                </div>
                
                <div className="md:w-1/3 space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Members ({activeGroup.members.length})</h3>
                    <ScrollArea className="h-[200px]">
                      <div className="space-y-1">
                        {activeGroup.members.map((member, i) => (
                          <div 
                            key={i} 
                            className="flex items-center justify-between py-1 px-2 rounded hover:bg-muted/50"
                          >
                            <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full bg-muted-foreground/20 flex items-center justify-center text-xs mr-2">
                                {member.charAt(0)}
                              </div>
                              <span className="text-sm">{member}</span>
                            </div>
                            {member === activeGroup.owner && (
                              <Badge variant="outline" className="text-xs">Owner</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Invite Members</h3>
                    
                    <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Invite by Email
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Invite to {activeGroup.name}</DialogTitle>
                          <DialogDescription>
                            Send an email invitation to join this group
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <Label htmlFor="email">Email Address</Label>
                          <Input 
                            id="email" 
                            placeholder="colleague@example.com" 
                            className="mt-1" 
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                          />
                        </div>
                        <DialogFooter>
                          <Button onClick={handleInvite}>Send Invitation</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline" className="w-full" onClick={handleCopyInviteLink}>
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Copy Invite Link
                    </Button>
                  </div>
                  
                  <div className="pt-4">
                    <Button variant="outline" className="w-full" onClick={handleLeaveGroup}>
                      Leave Group
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </MainLayout>
  );
};

export default Groups;
