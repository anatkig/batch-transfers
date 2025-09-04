import React, { createContext, useContext, useState } from "react";
import type { Transaction } from "../types/types";
import type { TransactionContextType } from "../types/types";


const TransactionContext = createContext<TransactionContextType | null>(null);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (tx: Transaction) => {
    setTransactions(prev => [...prev, tx]);
  };

  const clearTransactions = () => {
    setTransactions([]);
  }

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, clearTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const ctx = useContext(TransactionContext);
  if (!ctx) throw new Error("useTransactions must be used inside TransactionProvider");
  return [ctx.transactions as Transaction[], ctx.addTransaction as (txs: Transaction) => void, ctx.clearTransactions as () => void] as const;
};
