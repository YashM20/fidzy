"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { ContentTypePicker } from "@/components/content/ContentTypePicker"
import { useFormStore } from "@/store/useFormStore"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { 
  Settings, Download, Share2, Save, FileCode, HelpCircle,
  Undo2, Redo2, Pencil, Eye
} from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function MobileNav({ previewMode, setPreviewMode }: { 
  previewMode: boolean;
  setPreviewMode: (value: boolean) => void;
}) {
  const { contentType, setContentType } = useFormStore()
  const [open, setOpen] = React.useState(false)
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col h-full">
        <div className="px-2 py-4">
          <h2 className="text-lg font-semibold mb-4">Fidzy</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Content Type</p>
              <ContentTypePicker 
                value={contentType} 
                onChange={(value) => {
                  setContentType(value)
                  setOpen(false)
                }} 
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <p className="text-sm font-medium">View Mode</p>
              <ToggleGroup 
                type="single" 
                value={previewMode ? "preview" : "edit"} 
                onValueChange={(value) => {
                  if (value) {
                    setPreviewMode(value === "preview")
                    setOpen(false)
                  }
                }}
                className="w-full"
              >
                <ToggleGroupItem value="edit" className="flex-1" aria-label="Edit mode">
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </ToggleGroupItem>
                <ToggleGroupItem value="preview" className="flex-1" aria-label="Preview mode">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Actions</p>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
                  <Undo2 className="h-4 w-4 mr-2" />
                  Undo
                </Button>
                <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
                  <Redo2 className="h-4 w-4 mr-2" />
                  Redo
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    // Perform action
                    setOpen(false);
                  }}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
                  <FileCode className="h-4 w-4 mr-2" />
                  Code
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-auto p-4 flex items-center justify-between">
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <HelpCircle className="h-4 w-4" />
          </Button>
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  )
} 