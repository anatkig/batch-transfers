import dayjs from "dayjs";
import type { Transaction } from "../types/transaction";

/**
 * Validate a single CSV row and return the transaction status + error message if invalid
 */
export function validateTransaction(row: any): {
  status: Transaction["status"];
  errorMessage?: string;
} {
  // ✅ Transaction Date validation
  if (!dayjs(row["Transaction Date"], "YYYY-MM-DD", true).isValid()) {
    return { status: "Failed", errorMessage: "Invalid transaction date (expected YYYY-MM-DD)" };
  }

  // ✅ Account Number format validation
  if (!/^000-\d{9}-\d{2}$/.test(row["Account Number"])) {
    return { status: "Failed", errorMessage: "Invalid account number format" };
  }

  // ✅ Account Holder validation
  if (!row["Account Holder Name"] || row["Account Holder Name"].trim().length === 0) {
    return { status: "Failed", errorMessage: "Account holder name missing" };
  }

  // ✅ Amount validation
  const amount = parseFloat(row["Amount"]);
  if (isNaN(amount) || amount <= 0) {
    return { status: "Failed", errorMessage: "Amount must be a positive number" };
  }

  // ✅ Passed validation → mark as Pending
  return { status: "Pending" };
}

/**
 * Utility: validate all rows at once
 */
export function validateTransactions(rows: any[]): Transaction[] {
  return rows.map((row, i) => {
    const { status, errorMessage } = validateTransaction(row);
    return {
      id: `${i}-${row["Account Number"]}`,
      transactionDate: row["Transaction Date"],
      accountNumber: row["Account Number"],
      accountHolderName: row["Account Holder Name"],
      amount: parseFloat(row["Amount"]) || 0,
      status,
      errorMessage,
    };
  });
}
