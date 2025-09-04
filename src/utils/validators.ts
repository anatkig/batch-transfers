import dayjs from "dayjs";
import type { Transaction } from "../types/types";

/**
 * Validate a single CSV row and return the transaction status + error message if invalid
 */
export function validateTransaction(row: any) {
  // ✅ Transaction Date validation
  if (!dayjs(row["Transaction Date"], "YYYY-MM-DD", true).isValid()) {
    return { ...row, status: "Failed", errorMessage: "Invalid transaction date (expected YYYY-MM-DD)" };
  }

  // ✅ Account Number format validation
  if (!/^000-\d{9}-\d{2}$/.test(row["Account Number"])) {
    return { ...row, status: "Failed", errorMessage: "Invalid account number format" };
  }

  // ✅ Account Holder validation
  if (!row["Account Holder Name"] || row["Account Holder Name"].trim().length === 0) {
    return { ...row, status: "Failed", errorMessage: "Account holder name missing" };
  }

  // ✅ Amount validation
  const amount = parseFloat(row["Amount"]);
  if (isNaN(amount) || amount <= 0) {
    return { ...row,status: "Failed", errorMessage: "Amount must be a positive number" };
  }

  // ✅ Passed validation → mark as Pending
  return { ...row, status: "Pending" };
}

/**
 * Utility: validate all rows at once
 */
export function mapTransactions(rows: any[]): Transaction[] {
  return rows.map((row, i) => {
    const validatedTransaction = validateTransaction(row);
    return {
      id: `${i}-${validatedTransaction["Account Number"]}`,
      transactionDate: validatedTransaction["Transaction Date"],
      accountNumber: validatedTransaction["Account Number"],
      accountHolderName: validatedTransaction["Account Holder Name"],
      amount: parseFloat(validatedTransaction["Amount"]) || 0,
      status: validatedTransaction.status as "Pending" | "Settled" | "Failed",
      errorMessage: validatedTransaction.errorMessage,
    };
  });
}
