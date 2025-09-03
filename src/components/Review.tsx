import React, { useEffect, useState } from "react";
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Stack } from "@mui/material";
import Papa from "papaparse";
import dayjs from "dayjs";
import type { Transaction } from "../types/transaction";
import { useTransactions } from "../context/TransactionContext";
import { validateTransactions } from "../utils/validators";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function Step2Review({ onNext, onBack }: Props) {
  const { addTransactions } = useTransactions();
  const [records, setRecords] = useState<Transaction[]>([]);

  // ✅ CSV validation rules
  const validateRecord = (row: any): { status: Transaction["status"], errorMessage?: string } => {
    if (!dayjs(row["Transaction Date"], "YYYY-MM-DD", true).isValid()) {
      return { status: "Failed", errorMessage: "Invalid transaction date" };
    }
    if (!/^000-\d{9}-\d{2}$/.test(row["Account Number"])) {
      return { status: "Failed", errorMessage: "Invalid account number format" };
    }
    if (!row["Account Holder Name"]) {
      return { status: "Failed", errorMessage: "Account holder name missing" };
    }
    if (isNaN(Number(row["Amount"])) || Number(row["Amount"]) <= 0) {
      return { status: "Failed", errorMessage: "Amount must be positive" };
    }
    return { status: "Pending" };
  };

  // 📂 Example CSV load (in real app, use file from Step1 via context)
useEffect(() => {
    const csvSample = `
Transaction Date,Account Number,Account Holder Name,Amount
2025-02-20,000-123456789-01,John Doe,100.00
2025-02-21,000-987654321-02,Jane Smith,250.50
2025/02/21,00012345678901,Jane Smith,250.50
    `;

    Papa.parse(csvSample, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
            const txs = validateTransactions(results.data as any[]);
            setRecords(txs);
        },
    });
}, []);

  const handleNext = () => {
    addTransactions(records);
    onNext();
  };

  return (
    <Box mt={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Account Number</TableCell>
            <TableCell>Holder</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Error</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((rec) => (
            <TableRow key={rec.id}>
              <TableCell>{rec.transactionDate}</TableCell>
              <TableCell>{rec.accountNumber}</TableCell>
              <TableCell>{rec.accountHolderName}</TableCell>
              <TableCell>{rec.amount}</TableCell>
                        <TableCell>{rec.status}</TableCell>
                        <TableCell>{rec.errorMessage ?? ""}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Stack direction="row" spacing={2} mt={2}>
                  <Button variant="contained" color="primary" onClick={handleNext}>
                    Next
                  </Button>
                  <Button variant="outlined" onClick={onBack}>
                    Back
                  </Button>
                </Stack>
              </Box>
            )}
       