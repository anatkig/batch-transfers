import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Stack } from "@mui/material";
// import dayjs from "dayjs";
import { useTransactions } from "../context/TransactionContext";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export default function Review({ onNext, onBack }: Props) {
  const [transactions] = useTransactions();
  const handleNext = () => {
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
          {transactions.map((rec) => (
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
                  <Button variant="outlined" onClick={onBack}>
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleNext}>
                    Next
                  </Button>
                </Stack>
              </Box>
            )}
       