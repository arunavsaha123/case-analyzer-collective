
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { Upload as UploadIcon, File, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Upload = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<null | 'processing' | 'error' | 'success'>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };
  
  const removeFile = (fileName: string) => {
    setFiles(files.filter(file => file.name !== fileName));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to upload",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate processing
    setProcessingStatus('processing');
    
    // Mock API call
    setTimeout(() => {
      setProcessingStatus('success');
      toast({
        title: "Upload successful",
        description: "Your case files have been uploaded and processed",
      });
    }, 3000);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };
  
  const renderProcessingStatus = () => {
    switch (processingStatus) {
      case 'processing':
        return (
          <div className="mt-6 bg-blue-50 text-blue-700 p-4 rounded-md flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700 mr-3"></div>
            <div>
              <p className="font-medium">Processing your documents...</p>
              <p className="text-sm">This may take a few minutes depending on the file size.</p>
            </div>
          </div>
        );
      case 'error':
        return (
          <div className="mt-6 bg-red-50 text-red-700 p-4 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 mr-3 mt-0.5" />
            <div>
              <p className="font-medium">Error processing documents</p>
              <p className="text-sm">There was an issue processing your files. Please try again.</p>
              <Button variant="outline" size="sm" className="mt-2 text-red-700 border-red-300 hover:bg-red-50">
                Try Again
              </Button>
            </div>
          </div>
        );
      case 'success':
        return (
          <div className="mt-6 bg-green-50 text-green-700 p-4 rounded-md flex items-start">
            <CheckCircle2 className="h-5 w-5 mr-3 mt-0.5" />
            <div>
              <p className="font-medium">Success!</p>
              <p className="text-sm">Your case has been uploaded and analyzed.</p>
              <Link to="/cases/new">
                <Button variant="outline" size="sm" className="mt-2 text-green-700 border-green-300 hover:bg-green-50">
                  View Case
                </Button>
              </Link>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-navy-600">Upload Case Files</h1>
          <p className="text-muted-foreground">Upload legal documents for AI analysis and insight extraction</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Case Information</CardTitle>
                <CardDescription>Basic information about the case</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="caseTitle">Case Title</Label>
                    <Input id="caseTitle" placeholder="e.g., Smith v. Johnson" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="caseCategory">Case Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="criminal">Criminal</SelectItem>
                        <SelectItem value="civil">Civil</SelectItem>
                        <SelectItem value="corporate">Corporate</SelectItem>
                        <SelectItem value="family">Family Law</SelectItem>
                        <SelectItem value="immigration">Immigration</SelectItem>
                        <SelectItem value="intellectual">Intellectual Property</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="caseDescription">Brief Description</Label>
                  <Textarea id="caseDescription" placeholder="Provide a brief description of the case..." />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="private" 
                    checked={isPrivate} 
                    onCheckedChange={setIsPrivate}
                  />
                  <Label htmlFor="private">Make this case private (only viewable by you and those you invite)</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Document Upload</CardTitle>
                <CardDescription>Upload legal documents for analysis (PDF, DOCX, JPG, PNG)</CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('fileUpload')?.click()}
                >
                  <UploadIcon className="h-12 w-12 mx-auto text-muted-foreground/70" />
                  <p className="mt-2 text-muted-foreground font-medium">Drag & drop files here or click to browse</p>
                  <p className="text-sm text-muted-foreground/70 mt-1">Supported formats: PDF, DOCX, JPG, PNG</p>
                  <p className="text-xs text-muted-foreground/70 mt-4">Maximum file size: 25MB per file</p>
                  <Input 
                    id="fileUpload" 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileChange} 
                    multiple 
                    accept=".pdf,.docx,.jpg,.jpeg,.png"
                  />
                </div>
                
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium">Selected Files ({files.length})</p>
                    <ul className="divide-y">
                      {files.map((file, index) => (
                        <li key={index} className="flex items-center justify-between py-2">
                          <div className="flex items-center">
                            <File className="h-5 w-5 text-muted-foreground mr-2" />
                            <div>
                              <p className="text-sm font-medium truncate max-w-[300px]">{file.name}</p>
                              <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          </div>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground" 
                            onClick={() => removeFile(file.name)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Processing Options</CardTitle>
                <CardDescription>Configure how the AI should process your documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Analysis Level</Label>
                    <RadioGroup defaultValue="standard">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="basic" id="basic" />
                        <Label htmlFor="basic">Basic (Faster, less detailed)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard">Standard (Recommended)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comprehensive" id="comprehensive" />
                        <Label htmlFor="comprehensive">Comprehensive (Slower, more detailed)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label>Analysis Features</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="summary" defaultChecked />
                        <Label htmlFor="summary">Case Summary</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="entities" defaultChecked />
                        <Label htmlFor="entities">Person/Entity Extraction</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="codes" defaultChecked />
                        <Label htmlFor="codes">Legal Code Identification</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="timeline" defaultChecked />
                        <Label htmlFor="timeline">Timeline Generation</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="searchIndex" defaultChecked />
                        <Label htmlFor="searchIndex">Create Searchable Index</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="relationships" defaultChecked />
                        <Label htmlFor="relationships">Entity Relationship Mapping</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={processingStatus === 'processing'}>
                  {processingStatus === 'processing' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <UploadIcon className="h-4 w-4 mr-2" />
                      Upload and Analyze
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            {renderProcessingStatus()}
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default Upload;
