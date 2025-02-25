"use client"

import * as React from "react"
import { 
  MessageSquare, Receipt, FileText, Calendar, BarChart3, 
  Award, Mail, FileImage, ChevronsUpDown, Check 
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const contentTypes = [
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

export function ContentTypeSelector({
  value,
  onChange
}: {
  value: string
  onChange: (value: string) => void
}) {
  const [open, setOpen] = React.useState(false)
  const selectedType = contentTypes.find((type) => type.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedType ? (
            <div className="flex items-center">
              {React.createElement(selectedType.icon, { className: "mr-2 h-4 w-4" })}
              <span>{selectedType.label}</span>
            </div>
          ) : (
            "Select content type"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search content type..." />
          <CommandEmpty>No content type found.</CommandEmpty>
          <CommandGroup>
            {contentTypes.map((type) => (
              <CommandItem
                key={type.value}
                value={type.value}
                onSelect={(currentValue) => {
                  onChange(currentValue)
                  setOpen(false)
                }}
              >
                <div className="flex items-center">
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === type.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {React.createElement(type.icon, { className: "mr-2 h-4 w-4" })}
                  <div>
                    <p>{type.label}</p>
                    <p className="text-xs text-muted-foreground">{type.description}</p>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 