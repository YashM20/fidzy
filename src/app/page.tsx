"use client"
import { useEffect, useState } from "react";
import { ModernDesign } from "@/components/feedback/ModernDesign";
import { PlayfulDesign } from "@/components/feedback/PlayfulDesign";
import { CafeDesign } from "@/components/feedback/CafeDesign";
import type { FeedbackData } from "@/components/feedback/types";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormStore } from "@/store/useFormStore";
import { 
  PlusCircle, Trash2, Download, Share2, Undo2, Redo2, Save, 
  FileCode, Settings, HelpCircle, Copy, Pencil, Eye, EyeOff, ChevronDown, Maximize2, X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { ContentTypePicker } from "@/components/content/ContentTypePicker";
import { FieldEditorDialog } from "@/components/fields/FieldEditorDialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { FormState } from "@/store/useFormStore";
import { Container } from "@/components/ui/container";
import { MobileNav } from "@/components/mobile/MobileNav";
import { BottomNav } from "@/components/mobile/BottomNav";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function Home() {
  const { 
    contentType, design, userName, points, walletBalance, formFields,
    setContentType, setDesign, setUserName, setPoints, setWalletBalance,
    addField, updateField, removeField, duplicateField
  } = useFormStore();

  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const [fullScreenPreview, setFullScreenPreview] = useState<boolean>(false);
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleFeedbackSubmit = (data: FeedbackData) => {
    console.log('Feedback submitted:', data);
    // Handle submission logic
  };

  // Add this useEffect to ensure default values are set
  useEffect(() => {
    if (!design) setDesign('modern');
    if (!userName) setUserName('Anita');
    if (points === undefined) setPoints(50);
    if (walletBalance === undefined) setWalletBalance(250);
  }, [design, userName, points, walletBalance, setDesign, setUserName, setPoints, setWalletBalance]);

  // Function to toggle full screen preview
  const toggleFullScreenPreview = () => {
    setFullScreenPreview(!fullScreenPreview);
  };

  // Toggle sidebar function
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Render the appropriate design component based on the selected design
  const renderDesign = () => {
    switch (design) {
      case 'modern':
        return (
          <ModernDesign
            userName={userName || 'User'}
            points={points || 0}
            walletBalance={walletBalance || 0}
            onSubmit={handleFeedbackSubmit}
          />
        );
      case 'playful':
        return (
          <PlayfulDesign
            userName={userName || 'User'}
            points={points || 0}
            walletBalance={walletBalance || 0}
            onSubmit={handleFeedbackSubmit}
          />
        );
      default:
        return (
          <CafeDesign
            userName={userName || 'User'}
            points={points || 0}
            walletBalance={walletBalance || 0}
            onSubmit={handleFeedbackSubmit}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Full Screen Preview Mode */}
      {fullScreenPreview ? (
        <div className="fixed inset-0 bg-background z-50 flex flex-col">
          <div className="p-4 border-b flex items-center justify-between bg-card">
            <h2 className="font-semibold">Preview Mode</h2>
            <Button variant="ghost" size="sm" onClick={toggleFullScreenPreview}>
              <EyeOff className="h-4 w-4 mr-2" />
              Exit Preview
            </Button>
          </div>
          <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {renderDesign()}
            </motion.div>
          </div>
        </div>
      ) : null}

      {/* Main Header */}
      <header className="border-b bg-card shadow-sm p-3">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-foreground">Fidzy</h1>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Beta</span>
            </div>
            
            <div className="flex items-center gap-2">
              <MobileNav previewMode={previewMode} setPreviewMode={setPreviewMode} />
              
              <div className="hidden md:flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
                
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
                
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
                
                <Button variant="ghost" size="icon">
                  <FileCode className="h-4 w-4" />
                </Button>
                
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
                
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-4 w-4" />
                </Button>
                
                <ThemeToggle />
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Secondary Toolbar - Hidden on Mobile */}
      <div className="bg-muted/40 border-b p-2 hidden md:block">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ContentTypePicker 
                value={contentType} 
                onChange={setContentType} 
              />
              
              <Button variant="ghost" size="sm">
                <Undo2 className="h-4 w-4 mr-1" />
                Undo
              </Button>
              
              <Button variant="ghost" size="sm">
                <Redo2 className="h-4 w-4 mr-1" />
                Redo
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <ToggleGroup type="single" value={previewMode ? "preview" : "edit"} onValueChange={(value) => setPreviewMode(value === "preview")}>
                <ToggleGroupItem value="edit" aria-label="Edit mode">
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </ToggleGroupItem>
                <ToggleGroupItem value="preview" aria-label="Preview mode">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </ToggleGroupItem>
              </ToggleGroup>
              
              {previewMode && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" onClick={toggleFullScreenPreview}>
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Full Screen Preview</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {isMobile ? (
          // Mobile Layout
          <div className="pb-16"> {/* Add padding to bottom to account for the bottom nav */}
            {previewMode ? (
              // Preview Mode
              <div className="p-4">
                <div className="bg-card rounded-lg p-4 shadow-sm">
                  <div className="p-3 border-b flex items-center justify-between">
                    <h3 className="font-medium">Preview</h3>
                    {!previewMode && (
                      <Button variant="ghost" size="sm" onClick={() => setPreviewMode(true)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Preview Mode
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={toggleFullScreenPreview}>
                      <Maximize2 className="h-4 w-4 mr-2" />
                      Full Screen
                    </Button>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    key={design}
                  >
                    {renderDesign()}
                  </motion.div>
                </div>
              </div>
            ) : (
              // Edit Mode
              <div className="p-4">
                <Tabs defaultValue="design" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="design">Design</TabsTrigger>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="fields">Fields</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="design" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Design Style</CardTitle>
                        <CardDescription>Choose a design style for your content</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-2">
                          <Button 
                            variant={design === 'modern' ? "default" : "outline"} 
                            className="h-auto py-6 flex flex-col"
                            onClick={() => setDesign('modern')}
                          >
                            <div className="w-full h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded mb-2"></div>
                            Modern
                          </Button>
                          <Button 
                            variant={design === 'playful' ? "default" : "outline"} 
                            className="h-auto py-6 flex flex-col"
                            onClick={() => setDesign('playful')}
                          >
                            <div className="w-full h-16 bg-gradient-to-br from-pink-500/20 to-yellow-500/20 rounded mb-2"></div>
                            Playful
                          </Button>
                          <Button 
                            variant={design === 'cafe' ? "default" : "outline"} 
                            className="h-auto py-6 flex flex-col"
                            onClick={() => setDesign('cafe')}
                          >
                            <div className="w-full h-16 bg-gradient-to-br from-amber-500/20 to-red-500/20 rounded mb-2"></div>
                            Cafe
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Preview Card for Mobile */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Preview</CardTitle>
                        <CardDescription>Current design preview</CardDescription>
                      </CardHeader>
                      <CardContent className="flex justify-center">
                        <div className="w-full max-w-sm scale-75 origin-top">
                          {renderDesign()}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="content" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>User Information</CardTitle>
                        <CardDescription>Customize the user details in your content</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="userName">User Name</Label>
                          <Input 
                            id="userName" 
                            value={userName} 
                            onChange={(e) => setUserName(e.target.value)} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="points">Points</Label>
                          <Input 
                            id="points" 
                            type="number" 
                            value={points} 
                            onChange={(e) => setPoints(Number(e.target.value))} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="walletBalance">Wallet Balance</Label>
                          <Input 
                            id="walletBalance" 
                            type="number" 
                            value={walletBalance} 
                            onChange={(e) => setWalletBalance(Number(e.target.value))} 
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="fields" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Form Fields</CardTitle>
                        <CardDescription>Customize the fields in your content</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <AnimatePresence>
                            {formFields.length === 0 ? (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center py-8 text-center"
                              >
                                <div className="rounded-full bg-muted p-3 mb-3">
                                  <PlusCircle className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-medium">No fields added</h3>
                                <p className="text-sm text-muted-foreground max-w-xs mt-1">
                                  Add your first field to start customizing your form content
                                </p>
                              </motion.div>
                            ) : (
                              formFields.map((field) => (
                                <motion.div 
                                  key={field.id}
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="border rounded-lg p-4 hover:border-primary/50 transition-colors"
                                >
                                  <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-medium">{field.label}</h3>
                                    <div className="flex gap-1">
                                      <FieldEditorDialog
                                        field={field}
                                        onSave={(updatedField) => updateField(field.id, updatedField)}
                                        trigger={
                                          <Button variant="ghost" size="sm">
                                            <Pencil className="h-4 w-4" />
                                          </Button>
                                        }
                                      />
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => duplicateField(field.id)}
                                      >
                                        <Copy className="h-4 w-4" />
                                      </Button>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => removeField(field.id)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Type: {field.type} • {field.required ? 'Required' : 'Optional'}
                                  </div>
                                </motion.div>
                              ))
                            )}
                          </AnimatePresence>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
            
            {/* Mobile Bottom Navigation */}
            <BottomNav previewMode={previewMode} setPreviewMode={setPreviewMode} />
          </div>
        ) : (
          // Desktop Layout - Side by Side
          <Container className="py-6">
            <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-12rem)]">
              {/* Preview Panel */}
              <ResizablePanel defaultSize={sidebarVisible ? 50 : 100} minSize={30}>
                <div className="h-full flex flex-col bg-card rounded-lg">
                  <div className="p-3 border-b flex items-center justify-between">
                    <h3 className="font-medium">Preview</h3>
                    <div className="flex items-center gap-2">
                      {!sidebarVisible && (
                        <Button variant="outline" size="sm" onClick={toggleSidebar}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      )}
                      <Button variant="outline" size="sm" onClick={toggleFullScreenPreview}>
                        <Maximize2 className="h-4 w-4 mr-2" />
                        Full Screen
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-center p-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      key={design}
                    >
                      {renderDesign()}
                    </motion.div>
                  </div>
                </div>
              </ResizablePanel>

              {sidebarVisible && (
                <>
                  <ResizableHandle withHandle />
                  {/* Customization Panel */}
                  <ResizablePanel defaultSize={50} minSize={30}>
                    <div className="p-3 border-b flex items-center justify-between">
                      <h3 className="font-medium">Editor</h3>
                      <Button variant="ghost" size="sm" onClick={toggleSidebar}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <ScrollArea className="h-full">
                      <div className="p-6">
                        <Tabs defaultValue="design">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="design">Design</TabsTrigger>
                            <TabsTrigger value="content">Content</TabsTrigger>
                            <TabsTrigger value="fields">Fields</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="design" className="space-y-4 mt-4">
                            <Card>
                              <CardHeader>
                                <CardTitle>Design Style</CardTitle>
                                <CardDescription>Choose a design style for your content</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-3 gap-4">
                                  <Button 
                                    variant={design === 'modern' ? "default" : "outline"} 
                                    className="h-auto py-6 flex flex-col"
                                    onClick={() => setDesign('modern')}
                                  >
                                    <div className="w-full h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded mb-2"></div>
                                    Modern
                                  </Button>
                                  <Button 
                                    variant={design === 'playful' ? "default" : "outline"} 
                                    className="h-auto py-6 flex flex-col"
                                    onClick={() => setDesign('playful')}
                                  >
                                    <div className="w-full h-24 bg-gradient-to-br from-pink-500/20 to-yellow-500/20 rounded mb-2"></div>
                                    Playful
                                  </Button>
                                  <Button 
                                    variant={design === 'cafe' ? "default" : "outline"} 
                                    className="h-auto py-6 flex flex-col"
                                    onClick={() => setDesign('cafe')}
                                  >
                                    <div className="w-full h-24 bg-gradient-to-br from-amber-500/20 to-red-500/20 rounded mb-2"></div>
                                    Cafe
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>
                          
                          <TabsContent value="content" className="space-y-4 mt-4">
                            <Card>
                              <CardHeader>
                                <CardTitle>User Information</CardTitle>
                                <CardDescription>Customize the user details in your content</CardDescription>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="userName">User Name</Label>
                                  <Input 
                                    id="userName" 
                                    value={userName} 
                                    onChange={(e) => setUserName(e.target.value)} 
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="points">Points</Label>
                                  <Input 
                                    id="points" 
                                    type="number" 
                                    value={points} 
                                    onChange={(e) => setPoints(Number(e.target.value))} 
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="walletBalance">Wallet Balance</Label>
                                  <Input 
                                    id="walletBalance" 
                                    type="number" 
                                    value={walletBalance} 
                                    onChange={(e) => setWalletBalance(Number(e.target.value))} 
                                  />
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>
                          
                          <TabsContent value="fields" className="space-y-4 mt-4">
                            <Card>
                              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div>
                                  <CardTitle>Form Fields</CardTitle>
                                  <CardDescription>Customize the fields in your content</CardDescription>
                                </div>
                                <FieldEditorDialog
                                  onSave={(field) => addField(field)}
                                  trigger={
                                    <Button size="sm">
                                      <PlusCircle className="mr-2 h-4 w-4" />
                                      Add Field
                                    </Button>
                                  }
                                />
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-4">
                                  <AnimatePresence>
                                    {formFields.length === 0 ? (
                                      <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col items-center justify-center py-8 text-center"
                                      >
                                        <div className="rounded-full bg-muted p-3 mb-3">
                                          <PlusCircle className="h-6 w-6 text-muted-foreground" />
                                        </div>
                                        <h3 className="text-lg font-medium">No fields added</h3>
                                        <p className="text-sm text-muted-foreground max-w-xs mt-1">
                                          Add your first field to start customizing your form content
                                        </p>
                                      </motion.div>
                                    ) : (
                                      formFields.map((field) => (
                                        <motion.div 
                                          key={field.id}
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: 'auto' }}
                                          exit={{ opacity: 0, height: 0 }}
                                          className="border rounded-lg p-4 hover:border-primary/50 transition-colors"
                                        >
                                          <div className="flex justify-between items-center mb-2">
                                            <h3 className="font-medium">{field.label}</h3>
                                            <div className="flex gap-1">
                                              <FieldEditorDialog
                                                field={field}
                                                onSave={(updatedField) => updateField(field.id, updatedField)}
                                                trigger={
                                                  <Button variant="ghost" size="sm">
                                                    <Pencil className="h-4 w-4" />
                                                  </Button>
                                                }
                                              />
                                              <Button 
                                                variant="ghost" 
                                                size="sm"
                                                onClick={() => duplicateField(field.id)}
                                              >
                                                <Copy className="h-4 w-4" />
                                              </Button>
                                              <Button 
                                                variant="ghost" 
                                                size="sm"
                                                onClick={() => removeField(field.id)}
                                              >
                                                <Trash2 className="h-4 w-4" />
                                              </Button>
                                            </div>
                                          </div>
                                          <div className="text-sm text-muted-foreground">
                                            Type: {field.type} • {field.required ? 'Required' : 'Optional'}
                                          </div>
                                        </motion.div>
                                      ))
                                    )}
                                  </AnimatePresence>
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </ScrollArea>
                  </ResizablePanel>
                </>
              )}
            </ResizablePanelGroup>
          </Container>
        )}
      </div>
    </div>
  );
}
