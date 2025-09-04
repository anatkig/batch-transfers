import { useTransactions } from "../context/TransactionContext";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import type { Transaction } from "../types/types";
import type { TransactionTableProps } from "../types/types";
import BatchTable from "./BatchTable";

export default function TransactionTable({ openDialog }: TransactionTableProps) {
  const [transactions, , clearTransactions] = useTransactions();
  const [savedTransactions, setSavedTransactions] = useState<Transaction[]>([]);

  const clearSavedTransactions = () => {
    setSavedTransactions([]);
  };

  // Handler to mark a transaction as successful
  const markAsSuccessful = (id: string) => {
    setSavedTransactions(prev =>
      prev.map(tx =>
        tx.id === id ? { ...tx, status: "Settled" } : tx
      )
    );
  };

  useEffect(() => {
    if (transactions.length && !openDialog) {
      setSavedTransactions(prev =>
        [
          ...prev,
          ...transactions.filter(tx => !prev.some(savedTx => savedTx.id === tx.id))
        ]
      );
      clearTransactions();
    }
  }, [transactions, openDialog, clearTransactions]);

  // Group transactions by batchName
  const batches = savedTransactions.reduce<Record<string, Transaction[]>>((acc, tx) => {
    if (!acc[tx.batchName]) acc[tx.batchName] = [];
    acc[tx.batchName].push(tx);
    return acc;
  }, {});

  return (
    <>
      {savedTransactions.length ? (
        <Button variant="contained" onClick={clearSavedTransactions} style={{ marginTop: 15, marginBottom: 15 }}>
          Clear Transactions
        </Button>
      ) : null}
      {Object.entries(batches).map(([batchName, batchTxs]) => (
        <BatchTable
          key={batchName}
          batchName={batchName}
          transactions={batchTxs}
          markAsSuccessful={markAsSuccessful}
        />
      ))}
    </>
  );
}
