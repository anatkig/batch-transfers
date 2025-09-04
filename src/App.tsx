import { useState } from "react";
import { Button, Container } from "@mui/material";
import TransactionTable from "./components/TransactionTable";
import BatchTransferDialog from "./components/BatchTransferDialog";
import { TransactionProvider } from "./context/TransactionContext";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <TransactionProvider>
      <Container>
        <h1>Batch Transactions</h1>
        <TransactionTable openDialog={open} />
        <Button variant="contained" onClick={() => setOpen(true)}>
          Batch Transfer
        </Button>
        <BatchTransferDialog open={open} onClose={() => setOpen(false)} />
      </Container>
    </TransactionProvider>
  );
}
