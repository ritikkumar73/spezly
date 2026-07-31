// Install dependencies: react-hook-form for form handling, zod for schema validation, 
// and @hookform/resolvers for integrating zod with react-hook-form

"use client"; // Enables client-side rendering in Next.js

import { useState, useEffect } from "react"; // React hooks for state and effects
import { useForm } from "react-hook-form"; // Form management
import { zodResolver } from "@hookform/resolvers/zod"; // Zod resolver for validation
import { Loader2 } from "lucide-react"; // Loader icon for loading state
import useFetch from "@/hooks/use-fetch"; // Custom hook for API requests
import { toast } from "sonner"; // Toast notifications

// Importing UI components
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import { createAccount } from "@/actions/dashboard"; // API call function
import { accountSchema } from "@/app/lib/schema"; // Schema validation

export function CreateAccountDrawer({ children }) {
  const [open, setOpen] = useState(false); // State for drawer visibility

  // Form setup with validation schema
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: "",
      isDefault: false,
    },
  });

  // Custom hook to handle API call
  const {
    loading: createAccountLoading,
    fn: createAccountFn,
    error,
    data: newAccount,
  } = useFetch(createAccount);

  // Submit form data to API
  const onSubmit = async (data) => {
    await createAccountFn(data);
  };

  // Show success toast & reset form on successful account creation
  useEffect(() => {
    if (newAccount) {
      toast.success("Account created successfully");
      reset();
      setOpen(false);
    }
  }, [newAccount, reset]);

  // Show error toast if account creation fails
  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to create account");
    }
  }, [error]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className="hover-scale">
        {children}
      </DrawerTrigger>
      <DrawerContent className="glass-effect border-border/40">
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-bold gradient-title">Create New Account</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4">
          {/* Form for creating an account */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Account Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Account Name
              </label>
              <Input 
                id="name" 
                placeholder="e.g., Main Checking" 
                {...register("name")}
                className="focus:ring-primary/20"
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>

            {/* Account Type Dropdown */}
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium text-foreground">
                Account Type
              </label>
              <Select onValueChange={(value) => setValue("type", value)} defaultValue={watch("type")}>
                <SelectTrigger id="type" className="focus:ring-primary/20">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border/40">
                  <SelectItem value="CURRENT" className="focus:bg-secondary">Current</SelectItem>
                  <SelectItem value="SAVINGS" className="focus:bg-secondary">Savings</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && <p className="text-sm text-destructive">{errors.type.message}</p>}
            </div>

            {/* Initial Balance Field */}
            <div className="space-y-2">
              <label htmlFor="balance" className="text-sm font-medium text-foreground">
                Initial Balance
              </label>
              <Input 
                id="balance" 
                type="number" 
                step="0.01" 
                placeholder="0.00" 
                {...register("balance")}
                className="focus:ring-primary/20"
              />
              {errors.balance && <p className="text-sm text-destructive">{errors.balance.message}</p>}
            </div>

            {/* Default Account Toggle Switch */}
            <div className="flex items-center justify-between rounded-lg border border-border/40 p-3 card-hover">
              <div className="space-y-0.5">
                <label htmlFor="isDefault" className="text-base font-medium cursor-pointer text-foreground">
                  Set as Default
                </label>
                <p className="text-sm text-muted-foreground">
                  This account will be selected by default for transactions
                </p>
              </div>
              <Switch 
                id="isDefault" 
                checked={watch("isDefault")} 
                onCheckedChange={(checked) => setValue("isDefault", checked)}
                className="data-[state=checked]:bg-primary"
              />
            </div>

            {/* Form Buttons */}
            <div className="flex gap-4 pt-4">
              <DrawerClose asChild>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 hover:bg-secondary hover:text-secondary-foreground transition-colors duration-300"
                >
                  Cancel
                </Button>
              </DrawerClose>
              <Button 
                type="submit" 
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/20" 
                disabled={createAccountLoading}
              >
                {createAccountLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>

          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
