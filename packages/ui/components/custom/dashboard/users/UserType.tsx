"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "../../../../config/utils";
import { Button } from "../../../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../../ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../ui/popover";
import { userRoles } from "@repo/drizzle/schema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "sonner";

export default function ComboboxDemo({
  defaultValue,
  id,
}: {
  defaultValue: (typeof userRoles.enumValues)[number];
  id: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] =
    React.useState<(typeof userRoles.enumValues)[number]>(defaultValue);
  const supabase = createClientComponentClient();
  const isInitialRender = React.useRef(true);
  React.useEffect(() => {
    const updateUserRole = async (
      selectedValue: (typeof userRoles.enumValues)[number]
    ) => {
      try {
        const selectedIndex = userRoles.enumValues.indexOf(selectedValue);

        if (selectedIndex !== -1) {
          const { data, error } = await supabase
            .from("profiles")
            .update({ userrole: userRoles.enumValues[selectedIndex] })
            .eq("id", id)
            .select();
          if (error) {
            throw error;
          }
          toast.success(
            `User role updated successfully as: ${data[0].userrole}`
          );
        } else {
          toast.error("Selected enum value not found in the enumValues array.");
        }
      } catch (error) {
        console.error("Error updating user role:", error);
        toast.error("Error updating user role");
      }
    };

    if (!isInitialRender.current && value !== defaultValue) {
      updateUserRole(value);
    } else {
      isInitialRender.current = false;
    }
  }, [id, supabase, value, defaultValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search UserRole...." />
          <CommandEmpty>No User Type found.</CommandEmpty>
          <CommandGroup>
            {userRoles.enumValues.map((enum_Value) => (
              <CommandItem
                key={enum_Value}
                value={enum_Value}
                onSelect={(currentValue) => {
                  setValue(
                    currentValue.toUpperCase() as (typeof userRoles.enumValues)[number]
                  );
                  // console.log(value,currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === enum_Value ? "opacity-100" : "opacity-0"
                  )}
                />
                {enum_Value}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
