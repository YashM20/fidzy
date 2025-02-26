"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { FieldTypeSelector } from "./FieldTypeSelector"

export function FieldEditorDialog({
  field,
  onSave,
  trigger
}: {
  field?: {
    id: string;
    type: string;
    label: string;
    required: boolean;
    options?: string[];
  };
  onSave: (field: any) => void;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false)
  const [type, setType] = React.useState(field?.type || "text")
  const [label, setLabel] = React.useState(field?.label || "")
  const [required, setRequired] = React.useState(field?.required || false)
  const [options, setOptions] = React.useState<string[]>(field?.options || [])
  const [error, setError] = React.useState<string | null>(null)
  
  const handleSave = () => {
    if (!label.trim()) {
      setError("Field label cannot be empty")
      return
    }
    
    onSave({
      id: field?.id,
      type,
      label,
      required,
      options: type === "select" ? options : undefined
    })
    setOpen(false)
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{field ? "Edit Field" : "Add New Field"}</DialogTitle>
          <DialogDescription>
            Configure the field properties. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="type">Field Type</Label>
            <FieldTypeSelector value={type} onChange={setType} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="label">Field Label</Label>
            <Input
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Enter field label"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="required"
              checked={required}
              onCheckedChange={setRequired}
            />
            <Label htmlFor="required">Required field</Label>
          </div>
          
          {type === "select" && (
            <div className="grid gap-2">
              <Label>Options</Label>
              <div className="border rounded-md p-3 space-y-2">
                {options.map((option, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...options]
                        newOptions[index] = e.target.value
                        setOptions(newOptions)
                      }}
                      placeholder={`Option ${index + 1}`}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setOptions(options.filter((_, i) => i !== index))
                      }}
                    >
                      &times;
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOptions([...options, ""])}
                >
                  Add Option
                </Button>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 