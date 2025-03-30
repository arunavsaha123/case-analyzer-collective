
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/custom-ui/Button';
import { Input } from '../components/custom-ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/custom-ui/Card';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../components/custom-ui/Select';
import { BarChart4, FileSearch, Users, Upload } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/search');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Legal Case Management Dashboard</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Search, manage, and analyze your legal cases all in one place. Get started by searching for a case or accessing one of the quick links below.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-3">
                <Input
                  type="text"
                  placeholder="Search by case name, number, or client..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="civil">Civil Law</SelectItem>
                    <SelectItem value="criminal">Criminal Law</SelectItem>
                    <SelectItem value="family">Family Law</SelectItem>
                    <SelectItem value="corporate">Corporate Law</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Button type="submit" className="w-full">
                  <FileSearch className="mr-2 h-4 w-4" />
                  Search Cases
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Access Cards */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileSearch className="h-5 w-5 mr-2" />
              Recent Cases
            </CardTitle>
            <CardDescription>Access your recently viewed cases</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="p-2 hover:bg-gray-50 rounded">
                <a href="#" className="text-blue-600 hover:underline">Smith vs Johnson (Case #12345)</a>
                <p className="text-sm text-gray-500">Last viewed: 3 hours ago</p>
              </li>
              <li className="p-2 hover:bg-gray-50 rounded">
                <a href="#" className="text-blue-600 hover:underline">Garcia Estate Planning (Case #67890)</a>
                <p className="text-sm text-gray-500">Last viewed: Yesterday</p>
              </li>
              <li className="p-2 hover:bg-gray-50 rounded">
                <a href="#" className="text-blue-600 hover:underline">Taylor Custody Hearing (Case #54321)</a>
                <p className="text-sm text-gray-500">Last viewed: 3 days ago</p>
              </li>
            </ul>
            <Button variant="outline" className="w-full mt-4">
              View All Recent Cases
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              Upload Documents
            </CardTitle>
            <CardDescription>Add files to existing cases or create new ones</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">
              Quickly upload and organize case documents, evidence, or client communications.
            </p>
            <Button onClick={() => navigate('/upload')} className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Upload Files
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Client Portal
            </CardTitle>
            <CardDescription>Manage client access and communications</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">
              Share documents, updates, and information securely with your clients.
            </p>
            <Button onClick={() => navigate('/groups')} variant="outline" className="w-full">
              <Users className="mr-2 h-4 w-4" />
              Manage Clients
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart4 className="h-5 w-5 mr-2" />
              Performance Overview
            </CardTitle>
            <CardDescription>Case statistics and productivity metrics</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center bg-gray-50">
            <p className="text-gray-500">Chart visualization would appear here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
