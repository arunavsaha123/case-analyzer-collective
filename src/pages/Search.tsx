import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, ChevronDown, ChevronUp, Search as SearchIcon, Calendar, Filter, SlidersHorizontal, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data
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
  {
    id: '6',
    title: 'Robinson vs. ABC Insurance',
    category: 'Insurance',
    date: '2023-03-15',
    status: 'Ongoing',
    confidenceScore: 88,
    summary: 'Dispute over denied insurance claim following property damage from natural disaster.',
    tags: ['Insurance', 'Property', 'Claim'],
  },
  {
    id: '7',
    title: 'Edwards Environmental Litigation',
    category: 'Environmental',
    date: '2022-08-20',
    status: 'Closed',
    confidenceScore: 91,
    summary: 'Class action lawsuit against industrial facility for alleged contamination of local water supply.',
    tags: ['Environmental', 'Class Action', 'Contamination'],
  },
  {
    id: '8',
    title: 'Nguyen Immigration Appeal',
    category: 'Immigration',
    date: '2023-06-12',
    status: 'Ongoing',
    confidenceScore: 82,
    summary: 'Appeal of denied asylum application based on political persecution in country of origin.',
    tags: ['Immigration', 'Asylum', 'Appeal'],
  }
];

const categories = ['Criminal', 'Corporate', 'Family', 'Municipal', 'Medical', 'Insurance', 'Environmental', 'Immigration'];
const statuses = ['Ongoing', 'Closed'];
const tags = ['Assault', 'Battery', 'Patent', 'Settlement', 'Trust', 'Estate', 'Zoning', 'Fine', 'Malpractice', 'Negligence', 'Property', 'Claim', 'Class Action', 'Contamination', 'Asylum', 'Appeal'];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [confidenceRange, setConfidenceRange] = useState([0, 100]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortOption, setSortOption] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  
  // Function to handle category checkbox changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };
  
  // Function to handle status checkbox changes
  const handleStatusChange = (status: string) => {
    setSelectedStatuses(prev => {
      if (prev.includes(status)) {
        return prev.filter(s => s !== status);
      } else {
        return [...prev, status];
      }
    });
  };
  
  // Function to handle tag checkbox changes
  const handleTagChange = (tag: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };
  
  // Function to filter cases
  const filteredCases = mockCases.filter(caseItem => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      caseItem.summary.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(caseItem.category);
    
    // Status filter
    const matchesStatus = selectedStatuses.length === 0 || 
      selectedStatuses.includes(caseItem.status);
    
    // Tag filter
    const matchesTags = selectedTags.length === 0 || 
      caseItem.tags.some(tag => selectedTags.includes(tag));
    
    // Confidence score filter
    const matchesConfidence = 
      caseItem.confidenceScore >= confidenceRange[0] && 
      caseItem.confidenceScore <= confidenceRange[1];
    
    // Date filter
    const caseDate = new Date(caseItem.date);
    const startDate = dateRange.start ? new Date(dateRange.start) : null;
    const endDate = dateRange.end ? new Date(dateRange.end) : null;
    
    const matchesStartDate = !startDate || caseDate >= startDate;
    const matchesEndDate = !endDate || caseDate <= endDate;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesTags && 
           matchesConfidence && matchesStartDate && matchesEndDate;
  });
  
  // Sort cases based on selected option
  const sortedCases = [...filteredCases].sort((a, b) => {
    switch(sortOption) {
      case 'date-newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'date-oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'confidence-high':
        return b.confidenceScore - a.confidenceScore;
      case 'confidence-low':
        return a.confidenceScore - b.confidenceScore;
      case 'relevance':
      default:
        // Default relevance sort (by title for mock data)
        return a.title.localeCompare(b.title);
    }
  });
  
  // Function to clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedStatuses([]);
    setSelectedTags([]);
    setConfidenceRange([0, 100]);
    setDateRange({ start: '', end: '' });
    setSortOption('relevance');
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-navy-600">Search Cases</h1>
          <p className="text-muted-foreground">Find and filter through case documents and AI analysis</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left sidebar with filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-72 space-y-4`}>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Filters</CardTitle>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>Clear All</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Case Categories */}
                <div className="space-y-2">
                  <Label className="font-medium">Categories</Label>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`category-${category}`} 
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryChange(category)}
                        />
                        <label 
                          htmlFor={`category-${category}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                {/* Case Status */}
                <div className="space-y-2">
                  <Label className="font-medium">Status</Label>
                  <div className="space-y-1">
                    {statuses.map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`status-${status}`} 
                          checked={selectedStatuses.includes(status)}
                          onCheckedChange={() => handleStatusChange(status)}
                        />
                        <label 
                          htmlFor={`status-${status}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {status}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                {/* Date Range */}
                <div className="space-y-2">
                  <Label className="font-medium">Filing Date</Label>
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="start-date" className="text-xs text-muted-foreground">
                        From
                      </Label>
                      <Input 
                        id="start-date" 
                        type="date" 
                        value={dateRange.start}
                        onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="end-date" className="text-xs text-muted-foreground">
                        To
                      </Label>
                      <Input 
                        id="end-date" 
                        type="date" 
                        value={dateRange.end}
                        onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                {/* AI Confidence Range */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="font-medium">AI Confidence</Label>
                    <span className="text-sm">{confidenceRange[0]}% - {confidenceRange[1]}%</span>
                  </div>
                  <Slider 
                    defaultValue={[0, 100]} 
                    max={100} 
                    step={1} 
                    value={confidenceRange}
                    onValueChange={(value) => setConfidenceRange(value as [number, number])}
                    className="my-6"
                  />
                </div>
                
                <Separator />
                
                {/* Tags */}
                <div className="space-y-2">
                  <Label className="font-medium">Tags</Label>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {tags.map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`tag-${tag}`} 
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={() => handleTagChange(tag)}
                        />
                        <label 
                          htmlFor={`tag-${tag}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {tag}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content area */}
          <div className="flex-1 space-y-4">
            {/* Search bar and sorting */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search cases by title, content, or tags..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Select value={sortOption} onValueChange={setSortOption}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">Sort by Relevance</SelectItem>
                        <SelectItem value="date-newest">Date (Newest First)</SelectItem>
                        <SelectItem value="date-oldest">Date (Oldest First)</SelectItem>
                        <SelectItem value="confidence-high">Confidence (High to Low)</SelectItem>
                        <SelectItem value="confidence-low">Confidence (Low to High)</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="lg:hidden"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Search summary */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Showing {filteredCases.length} results
                {searchTerm && ` for "${searchTerm}"`}
                {(selectedCategories.length > 0 || selectedStatuses.length > 0 || selectedTags.length > 0) && " with filters applied"}
              </p>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="lg:hidden flex items-center gap-1"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                {showFilters ? "Hide Filters" : "Show Filters"}
                {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
            
            {/* Active filters */}
            {(selectedCategories.length > 0 || selectedStatuses.length > 0 || selectedTags.length > 0) && (
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map((category) => (
                  <Badge 
                    key={`filter-category-${category}`} 
                    variant="secondary"
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => handleCategoryChange(category)}
                  >
                    Category: {category}
                    <XCircle className="h-4 w-4" />
                  </Badge>
                ))}
                
                {selectedStatuses.map((status) => (
                  <Badge 
                    key={`filter-status-${status}`} 
                    variant="secondary"
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => handleStatusChange(status)}
                  >
                    Status: {status}
                    <XCircle className="h-4 w-4" />
                  </Badge>
                ))}
                
                {selectedTags.map((tag) => (
                  <Badge 
                    key={`filter-tag-${tag}`} 
                    variant="secondary"
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => handleTagChange(tag)}
                  >
                    Tag: {tag}
                    <XCircle className="h-4 w-4" />
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Search results */}
            {sortedCases.length > 0 ? (
              <div className="space-y-4">
                {sortedCases.map((caseItem) => (
                  <Link to={`/cases/${caseItem.id}`} key={caseItem.id} className="block">
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <h3 className="text-lg font-medium">{caseItem.title}</h3>
                          <div className="flex items-center gap-2 mt-1 md:mt-0">
                            <Badge variant={caseItem.status === 'Ongoing' ? 'default' : 'secondary'}>
                              {caseItem.status}
                            </Badge>
                            <div className="flex items-center text-xs">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(caseItem.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">{caseItem.summary}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {caseItem.tags.map((tag, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center text-sm">
                            <div className="flex items-center mr-4">
                              <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
                                caseItem.confidenceScore > 90 ? 'bg-green-500' : 
                                caseItem.confidenceScore > 80 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}></span>
                              <span className="text-muted-foreground">{caseItem.confidenceScore}%</span>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <SearchIcon className="h-12 w-12 mx-auto text-muted-foreground/70" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No cases found</h3>
                  <p className="text-muted-foreground mb-4">
                    No cases match your current search criteria. Try adjusting your filters or search terms.
                  </p>
                  <Button onClick={clearFilters}>Clear All Filters</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Search;
