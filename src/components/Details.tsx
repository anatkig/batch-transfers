import React, { use, useEffect, useState } from "react";
import { Box, Button, TextField, MenuItem, Stack } from "@mui/material";
import { useTransactions } from "../context/TransactionContext";
import { mapTransactions, validateTransaction } from "../utils/validators";
import Papa from "papaparse";
import type { Transaction } from "../types/transaction";


interface Props {
  onNext: () => void;
}

const approvers = ["Alice Johnson", "Bob Smith", "Charlie Brown", "Dana White"];

export default function Details({ onNext }: Props) {
  const [batchName, setBatchName] = useState("");
  const [approver, setApprover] = useState("");
  const [file, setFile] = useState<File | null>(null);

// Import your context at the top of the file
const [transactions, addTransaction] = useTransactions();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const canProceed = batchName && approver && file;

  useEffect(() => {

  if(file) {
      Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
              if (results.data) {
                const mappedTransactions = mapTransactions(results.data);
                mappedTransactions.forEach((tx) => {
                  addTransaction(tx);
                });
              }
          },
      });
    }
  }, [file]);

  return (
    <Box mt={3}>
      <Stack spacing={2}>
        <TextField
          label="Batch Transfer Name"
          fullWidth
          value={batchName}
          onChange={e => setBatchName(e.target.value)}
        />

        <TextField
          select
          label="Select Approver"
          value={approver}
          onChange={e => setApprover(e.target.value)}
          fullWidth
        >
          {approvers.map(name => (
            <MenuItem key={name} value={name}>{name}</MenuItem>
          ))}
        </TextField>

        <Button variant="outlined" component="label">
          Upload CSV File
          <input type="file" accept=".csv" hidden onChange={handleFileChange} />
        </Button>
        {file && <span>Uploaded: {file.name}</span>}

        <Button variant="contained" disabled={!canProceed} onClick={onNext}>
          Next
        </Button>
      </Stack>
    </Box>
  );
}
