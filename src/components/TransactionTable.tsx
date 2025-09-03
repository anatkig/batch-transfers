import React from "react";
import { useTransactions } from "../context/TransactionContext";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import StatusChip from "./StatusChip";

export default function TransactionTable() {
  const { transactions } = useTransactions();

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
        {transactions.map(tx => (
          <TableRow key={tx.id}>
            <TableCell>{tx.transactionDate}</TableCell>
            <TableCell>{tx.accountNumber}</TableCell>
            <TableCell>{tx.accountHolderName}</TableCell>
            <TableCell>{tx.amount.toFixed(2)}</TableCell>
            <TableCell><StatusChip status={tx.status} error={tx.errorMessage} /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
