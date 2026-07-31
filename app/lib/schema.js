// Importing the 'z' object from the 'zod' library, which is used for schema validation.
import { z } from "zod";

// Defining and exporting a schema called 'accountSchema' using Zod's 'object' method.
// This schema will validate the structure and data types of an account object.
export const accountSchema = z.object({
  
  // 'name' field is required and must be a string.
  // 'min(1)' ensures that the string is at least 1 character long.
  // If the field is empty, the error message "Name is required" will be shown.
  name: z.string().min(1, "Name is required"),
  
  // 'type' field must be one of the specified values: "CURRENT" or "SAVINGS".
  // 'enum' enforces that only these two values are accepted.
  type: z.enum(["CURRENT", "SAVINGS"]),
  
  // 'balance' field is required and must be a string.
  // 'min(1)' ensures the balance string is not empty.
  // If it's left empty, the error message "Initial balance is required" will be triggered.
  balance: z.string().min(1, "Initial balance is required"),
  
  // 'isDefault' is a boolean field.
  // If no value is provided for 'isDefault', it defaults to 'false'.
  isDefault: z.boolean().default(false),
});


export const transactionSchema = z
  .object({
    type: z.enum(["INCOME", "EXPENSE"]),
    amount: z.string().min(1, "Amount is required"),
    description: z.string().optional(),
    date: z.date({ required_error: "Date is required" }),
    accountId: z.string().min(1, "Account is required"),
    category: z.string().min(1, "Category is required"),
    isRecurring: z.boolean().default(false),
    recurringInterval: z
      .enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"])
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isRecurring && !data.recurringInterval) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Recurring interval is required for recurring transactions",
        path: ["recurringInterval"],
      });
    }
  });
