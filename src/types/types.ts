export interface Transaction {
  id: string;
  transactionDate: string;
  accountNumber: string;
  accountHolderName: string;
  amount: number;
  status: "Pending" | "Settled" | "Failed";
  batchName: string;
  errorMessage?: string;
}

export interface BatchTransferDialogProps {
  open: boolean;
  onClose: () => void;
}

export interface DetailsProps {
  onNext: () => void;
}

export interface ReviewProps {
  onNext: () => void;
  onBack: () => void;
}

export interface StatusChipProps {
  status: "Pending" | "Settled" | "Failed";
  error?: string;
}

export interface SummaryProps {
  onBack: () => void;
  onClose: () => void;
}

export interface BatchTableProps {
  batchName: string;
  transactions: Transaction[];
  markAsSuccessful: (id: string) => void;
}

export interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  clearTransactions: () => void;
}

export interface TransactionTableProps {
  openDialog: boolean;
}