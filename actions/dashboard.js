"use server"; // This directive tells Next.js that this module should be treated as a server component.

import { auth } from "@clerk/nextjs/server"; // Imports the auth function from Clerk, which handles authentication in Next.js.
import { revalidatePath } from "next/cache"; // Imports a function to invalidate cache for a specific path, ensuring fresh data is fetched.

import { db } from "@/lib/prisma"; // Imports the Prisma client instance from the db module.

// Helper function to serialize transactions by converting BigInt values to standard numbers.
const serializeTransaction = (obj) => {
    const serialized = { ...obj }; // Creates a shallow copy of the object to avoid mutating the original.
    if (obj.balance) {
      serialized.balance = obj.balance.toNumber(); // Converts balance from BigInt to a standard number if it exists. 
    }
    if (obj.amount) {
      serialized.amount = obj.amount.toNumber(); // Converts amount from BigInt to a standard number if it exists.
    }
    return serialized; // Returns the serialized object.
};

// Asynchronous function to create a new account.
export async function createAccount(data){
    try {
        // Extracts the userId from the authenticated session using Clerk's auth method.
        const { userId } = await auth(); 
        if(!userId) throw new Error("Unauthorized"); // Throws an error if no user is authenticated.

        // Finds the user in the database by their Clerk user ID.
        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });

        // Throws an error if no user is found in the database.
        if(!user){
            throw new Error("User not found");
        }

        // Parses the balance from the input data to a float.
        const balanceFloat = parseFloat(data.balance);
        // Throws an error if the balance is not a valid number.
        if(isNaN(balanceFloat)){
            throw new Error("Invalid balance amount");
        }
    
        // Retrieves all accounts associated with the user.
        const existingAccounts = await db.account.findMany({
            where : {
                userId : user.id, // Filters accounts by the user's ID.
            }
        });

        // Determines if the new account should be the default one.
        // If the user has no existing accounts, the new one is set as default.
        const shouldBeDefault = existingAccounts.length === 0 ? true : data.isDefault;

        // If the new account should be default, update existing accounts to no longer be default.
        if(shouldBeDefault){
            await db.account.updateMany({
                where: {
                    userId: user.id, // Only update accounts belonging to this user.
                    isDefault: true, // Targets the current default account.
                },
                data: { isDefault: false }, // Sets existing default account(s) to false.
            });
        }

        // Creates a new account in the database with the provided data.
        const account = await db.account.create({
            data: {
                ...data, // Spreads the rest of the input data (e.g., account name, type).
                balance: balanceFloat, // Stores the parsed balance.
                userId: user.id, // Links the account to the authenticated user.
                isDefault: shouldBeDefault, // Marks the account as default if necessary.
            },
        });

        // Serializes the created account to convert BigInt fields to numbers.
        // This is because BigInt values are not supported in JSON responses in Next.js.
        const serializedAccount = serializeTransaction(account);

        // Revalidates the dashboard path, ensuring updated account data is reflected 
        // the revalidatePath function is a custom function that invalidates the cache for a specific path in Next.js to ensure fresh data is fetched on the next request to that path by the user.
        revalidatePath("/dashboard");

        // Returns the newly created account along with a success message.
        return { success: true, data: serializedAccount };

    } catch (error) {
        // If any error occurs during execution, throw a new error with the message.
        throw new Error(error.message);
    }
}



// Define an asynchronous function to fetch user accounts from the database
export async function getUserAccounts() {
    
    // Authenticate the user and extract the userId from the auth() function
    // 'auth()' is likely a function that verifies and retrieves the authenticated user's information
    const { userId } = await auth();
    
    // If no userId is returned (meaning the user is not authenticated), throw an error
    if (!userId) throw new Error("Unauthorized");

    // Query the database to find the user associated with the given clerkUserId (external authentication service like Clerk)
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },  // Search for the user by their external Clerk ID
    });

    // If no user is found in the database, throw an error indicating the user does not exist
    if (!user) {
      throw new Error("User not found");
    }

    // Handle potential errors when querying the accounts from the database
    try {
      
      // Query the database to retrieve all accounts that belong to the authenticated user
      const accounts = await db.account.findMany({
        where: { userId: user.id },  // Filter accounts by the current user's ID
        
        // Sort the accounts in descending order based on when they were created (latest first)
        orderBy: { createdAt: "desc" },
        
        // Include additional information: Count the number of transactions linked to each account
        include: {
          _count: {
            select: {
              transactions: true,  // This selects and includes the transaction count for each account
            },
          },
        },
      });

      // Serialize each account by mapping over the retrieved accounts
      // 'serializeTransaction' is likely a helper function that formats the data for the client
      const serializedAccounts = accounts.map(serializeTransaction);

      // Return the formatted list of user accounts to the client
      return serializedAccounts;
    
    } catch (error) {
      // If any error occurs during the account retrieval process, log the error message to the console
      console.error(error.message);
    }
}

export async function getDashboardData() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Get all user transactions
  const transactions = await db.transaction.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
  });

  return transactions.map(serializeTransaction);
}


