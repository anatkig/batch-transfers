import React, { useEffect, useState } from "react";
import { Box, Button, TextField, MenuItem, Stack } from "@mui/material";
import { useTransactions } from "../context/TransactionContext";
import { mapTransactions } from "../utils/validators";
import Papa from "papaparse";
import type { DetailsProps } from "../types/types";
import { approvers } from "../constants/constants";

export default function Details({ onNext }: DetailsProps) {
  const [batchName, setBatchName] = useState("");
  const [approver, setApprover] = useState("");
  const [file, setFile] = useState<File | null>(null);

// Import your context at the top of the file
const [, addTransaction] = useTransactions();

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
                  addTransaction({ ...tx, batchName });
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
