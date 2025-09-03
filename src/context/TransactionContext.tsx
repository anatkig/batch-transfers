import React, { createContext, useContext, useState } from "react";
import type { Transaction } from "../types/transaction";

interface TransactionContextType {
  transactions: Transaction[];
  addTransactions: (txs: Transaction[]) => void;
}

const TransactionContext = createContext<TransactionContextType | null>(null);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransactions = (txs: Transaction[]) => {
    setTransactions(prev => [...prev, ...txs]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const ctx = useContext(TransactionContext);
  if (!ctx) throw new Error("useTransactions must be used inside TransactionProvider");
  return ctx;
};
