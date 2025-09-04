import { useTransactions } from "../context/TransactionContext";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import StatusChip from "./StatusChip";
import { useEffect, useState } from "react";
import type { Transaction } from "../types/transaction";

export default function TransactionTable() {
  const [transactions] = useTransactions();
  const [savedTransactions, setSavedTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if(transactions.length) {
      setSavedTransactions(prev =>
        [
          ...prev,
          ...transactions.filter(tx => !prev.some(savedTx => savedTx.id === tx.id))
        ]
      );
    }
  }, [transactions]);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Account Number</TableCell>
          <TableCell>Holder</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {savedTransactions.map((tx) => (
          <TableRow key={tx.id}>
            <TableCell>{tx.transactionDate}</TableCell>
            <TableCell>{tx.accountNumber}</TableCell>
            <TableCell>{tx.accountHolderName}</TableCell>
            <TableCell>{tx.amount?.toFixed(2)}</TableCell>
            <TableCell><StatusChip status={tx.status} error={tx.errorMessage} /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
