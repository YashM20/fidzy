"use client"

import * as React from "react"
import { 
  MessageSquare, Receipt, FileText, Calendar, BarChart3, 
  Award, Mail, FileImage, ChevronDown 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import type { FormState } from "@/store/useFormStore"

export const contentTypes = [
  {
    value: "feedback",
    label: "Feedback Form",
    icon: MessageSquare,
    description: "Collect user opinions and ratings"
  },
  {
    value: "receipt",
    label: "Receipt",
    icon: Receipt,
    description: "Generate transaction receipts"
  },
  {
    value: "invoice",
    label: "Invoice",
    icon: FileText,
    description: "Create professional invoices"
  },
  {
    value: "invitation",
    label: "Invitation",
    icon: Calendar,
    description: "Design event invitations"
  },
  {
    value: "survey",
    label: "Survey",
    icon: BarChart3,
    description: "Build detailed questionnaires"
  },
  {
    value: "certificate",
    label: "Certificate",
    icon: Award,
    description: "Create recognition documents"
  },
  {
    value: "card",
    label: "Digital Card",
    icon: Mail,
    description: "Design greeting cards"
  },
  {
    value: "brochure",
    label: "Brochure",
    icon: FileImage,
    description: "Create promotional materials"
  }
]

export function ContentTypePicker({
  value,
  onChange
}: {
  value: FormState['contentType']
  onChange: (value: FormState['contentType']) => void
}) {
  const [open, setOpen] = React.useState(false)
  const selectedType = contentTypes.find((type) => type.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 w-[180px] justify-start">
          {selectedType && React.createElement(selectedType.icon, { className: "h-4 w-4" })}
          <span className="truncate">{selectedType?.label || "Select type"}</span>
          <ChevronDown className="h-4 w-4 ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search content type..." />
          <CommandList>
            <CommandEmpty>No content type found.</CommandEmpty>
            <CommandGroup>
              {contentTypes.map((type) => (
                <CommandItem
                  key={type.value}
                  onSelect={() => {
                    onChange(type.value as FormState['contentType'])
                    setOpen(false)
                  }}
                  className="flex items-center gap-2"
                >
                  {React.createElement(type.icon, { className: "h-4 w-4" })}
                  <span>{type.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 