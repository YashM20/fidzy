"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Pencil, Eye, PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { FieldEditorDialog } from "@/components/fields/FieldEditorDialog"
import { useFormStore } from "@/store/useFormStore"

interface BottomNavProps {
  previewMode: boolean
  setPreviewMode: (value: boolean) => void
  className?: string
}

export function BottomNav({ previewMode, setPreviewMode, className }: BottomNavProps) {
  const { addField } = useFormStore()
  
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-10 bg-background border-t p-2 md:hidden",
      className
    )}>
      <div className="flex items-center justify-between">
        <ToggleGroup 
          type="single" 
          value={previewMode ? "preview" : "edit"} 
          onValueChange={(value) => {
            if (value) setPreviewMode(value === "preview")
          }}
          className="flex-1"
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
        
        <div className="flex items-center ml-2">
          <FieldEditorDialog
            onSave={(field) => addField(field)}
            trigger={
              <Button size="icon" variant="default">
                <PlusCircle className="h-5 w-5" />
              </Button>
            }
          />
        </div>
      </div>
    </div>
  )
} 