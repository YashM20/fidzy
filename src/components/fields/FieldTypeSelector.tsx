"use client"

import * as React from "react"
import { Check, ChevronsUpDown, MessageSquare, Star, CheckSquare, Calendar, List } from "lucide-react"
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

const fieldTypes = [
  {
    value: "text",
    label: "Text Input",
    icon: MessageSquare,
    description: "Single line text input"
  },
  {
    value: "rating",
    label: "Rating",
    icon: Star,
    description: "Star rating selection"
  },
  {
    value: "checkbox",
    label: "Checkbox",
    icon: CheckSquare,
    description: "Yes/No selection"
  },
  {
    value: "date",
    label: "Date",
    icon: Calendar,
    description: "Date selection"
  },
  {
    value: "select",
    label: "Dropdown",
    icon: List,
    description: "Selection from options"
  }
]

export function FieldTypeSelector({
  value,
  onChange
}: {
  value: string
  onChange: (value: string) => void
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? (
            <>
              {fieldTypes.find((type) => type.value === value)?.label || "Select field type"}
              {React.createElement(
                fieldTypes.find((type) => type.value === value)?.icon || MessageSquare,
                { className: "ml-2 h-4 w-4 shrink-0 opacity-50" }
              )}
            </>
          ) : (
            "Select field type"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search field type..." />
          <CommandEmpty>No field type found.</CommandEmpty>
          <CommandGroup>
            {fieldTypes.map((type) => (
              <CommandItem
                key={type.value}
                value={type.value}
                onSelect={(currentValue) => {
                  onChange(currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === type.value ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="flex items-center">
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