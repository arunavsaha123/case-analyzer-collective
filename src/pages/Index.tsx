import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, ArrowRight } from 'lucide-react';

const mockCases = [
  {
    id: '1',
    title: 'State vs. Johnson',
    category: 'Criminal',
    date: '2023-05-10',
    status: 'Ongoing',
    confidenceScore: 92,
    summary: 'Defendant charged with aggravated assault and battery following an incident at a local bar.',
    tags: ['Criminal', 'Assault', 'Battery'],
  },
  {
    id: '2',
    title: 'Smith Corp. vs. Tech Innovations Inc.',
    category: 'Corporate',
    date: '2022-11-22',
    status: 'Closed',
    confidenceScore: 87,
    summary: 'Patent infringement case regarding smartphone technology. Settlement reached outside of court.',
    tags: ['Corporate', 'Patent', 'Settlement'],
  },
  {
    id: '3',
    title: 'Davis Family Trust',
    category: 'Family',
    date: '2023-07-15',
    status: 'Ongoing',
    confidenceScore: 95,
    summary: 'Dispute over inheritance and distribution of family assets following the death of the primary benefactor.',
    tags: ['Family', 'Trust', 'Estate'],
  },
  {
    id: '4',
    title: 'City of Springfield vs. Martinez',
    category: 'Municipal',
    date: '2023-02-28',
    status: 'Closed',
    confidenceScore: 90,
    summary: 'Zoning violation case. Property owner fined for unauthorized commercial activities in residential zone.',
    tags: ['Municipal', 'Zoning', 'Fine'],
  },
  {
    id: '5',
    title: 'Williams Healthcare Malpractice',
    category: 'Medical',
    date: '2023-09-01',
    status: 'Ongoing',
    confidenceScore: 76,
    summary: 'Medical malpractice suit alleging negligence during routine surgery resulting in complications.',
    tags: ['Medical', 'Malpractice', 'Negligence'],
  },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filteredCases = mockCases.filter(caseItem => {
    const matchesSearch = caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          caseItem.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || caseItem.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || caseItem.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  return (
    <MainLayout>
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-navy-600">Case Analyzer Collective</h1>
            <p className="text-muted-foreground">Search, analyze, and collaborate on legal cases</p>
          </div>
          <div className="flex gap-2">
            <Link to="/upload">
              <Button>Upload New Case</Button>
            </Link>
            <Link to="/groups">
              <Button variant="outline">Create Group</Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="public" className="mb-8">
          <TabsList>
            <TabsTrigger value="public">Public Cases</TabsTrigger>
            <TabsTrigger value="my-cases">My Cases</TabsTrigger>
            <TabsTrigger value="shared">Shared With Me</TabsTrigger>
          </TabsList>
          
          <TabsContent value="public" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Search Public Cases</CardTitle>
                <CardDescription>Browse through publicly available case documents and analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search cases..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Criminal">Criminal</SelectItem>
                        <SelectItem value="Corporate">Corporate</SelectItem>
                        <SelectItem value="Family">Family</SelectItem>
                        <SelectItem value="Municipal">Municipal</SelectItem>
                        <SelectItem value="Medical">Medical</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="Ongoing">Ongoing</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCases.map((caseItem) => (
                <Link to={`/cases/${caseItem.id}`} key={caseItem.id}>
                  <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex justify-between">
                        <Badge variant={caseItem.status === 'Ongoing' ? 'default' : 'secondary'}>
                          {caseItem.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{caseItem.date}</span>
                      </div>
                      <CardTitle className="mt-2">{caseItem.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3">{caseItem.summary}</p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {caseItem.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4 text-sm">
                      <div className="flex items-center gap-1">
                        <span className={`inline-block w-3 h-3 rounded-full ${
                          caseItem.confidenceScore > 90 ? 'bg-green-500' : 
                          caseItem.confidenceScore > 80 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></span>
                        <span>AI Confidence: {caseItem.confidenceScore}%</span>
                      </div>
                      <span className="flex items-center">
                        View Case <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
            
            {filteredCases.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No cases found matching your search criteria.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="my-cases">
            <Card className="flex items-center justify-center h-64">
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">You need to log in to view your cases</p>
                <Link to="/auth">
                  <Button>Log In</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="shared">
            <Card className="flex items-center justify-center h-64">
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">You need to log in to view shared cases</p>
                <Link to="/auth">
                  <Button>Log In</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Featured Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockCases.slice(0, 4).map((caseItem) => (
              <Card key={`featured-${caseItem.id}`} className="hover:shadow-md transition-shadow">
                <CardHeader className="p-4">
                  <CardTitle className="text-base">{caseItem.title}</CardTitle>
                  <CardDescription className="text-xs">{caseItem.category}</CardDescription>
                </CardHeader>
                <CardFooter className="p-4 pt-0 flex justify-between text-sm">
                  <Badge variant="outline">{caseItem.status}</Badge>
                  <Link to={`/cases/${caseItem.id}`} className="text-primary flex items-center">
                    View <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
