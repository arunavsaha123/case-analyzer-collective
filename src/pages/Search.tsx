
import React, { useState } from 'react';
import { Input } from '../components/custom-ui/Input';
import { Button } from '../components/custom-ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/custom-ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/custom-ui/Table';
import { Badge } from '../components/custom-ui/Badge';
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from '../components/custom-ui/Select';
import { XCircle, Filter, ArrowUpDown } from 'lucide-react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Sample search results
  const searchResults = [
    { id: 1, title: 'Doe vs. Smith', category: 'Civil', status: 'Active', date: '2023-05-15' },
    { id: 2, title: 'State vs. Johnson', category: 'Criminal', status: 'Closed', date: '2023-04-22' },
    { id: 3, title: 'Brown Family Trust', category: 'Estate', status: 'Pending', date: '2023-06-01' },
    { id: 4, title: 'Garcia Property Dispute', category: 'Real Estate', status: 'Active', date: '2023-05-28' },
    { id: 5, title: 'Wilson Bankruptcy', category: 'Bankruptcy', status: 'Pending', date: '2023-05-10' },
  ];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    console.log('Category:', selectedCategory);
    console.log('Status:', selectedStatus);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Search Cases</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search by case name, number, client..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-3 pr-10"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <XCircle className="h-5 w-5 text-gray-400" />
                  <span className="sr-only">Clear search</span>
                </button>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="civil">Civil</SelectItem>
                    <SelectItem value="criminal">Criminal</SelectItem>
                    <SelectItem value="estate">Estate</SelectItem>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="bankruptcy">Bankruptcy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full sm:w-1/3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full sm:w-1/3 flex items-end">
                <Button type="submit" className="w-full">
                  <Filter className="mr-2 h-4 w-4" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case Title</TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="-ml-3 h-8">
                    <span>Category</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="-ml-3 h-8">
                    <span>Date</span>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {searchResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium">{result.title}</TableCell>
                  <TableCell>{result.category}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        result.status === 'Active'
                          ? 'default'
                          : result.status === 'Closed'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {result.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(result.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Search;
