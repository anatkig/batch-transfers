import { Box, Button, Typography, Stack } from "@mui/material";
import { useTransactions } from "../context/TransactionContext";

interface Props {
  onBack: () => void;
  onClose: () => void;
}

type Transaction = { amount?: number };

export default function Summary({ onBack, onClose }: Props) {
  const [transactions,, clearTransactions] = useTransactions();

  const total = transactions.reduce((acc: number, t: Transaction) => acc + (t.amount || 0), 0);
  const count = transactions.length;
  const average = count ? total / count : 0;

  const handleFinishClick = () => {
    onClose();
    clearTransactions();
  };

  return (
    <Box mt={3}>
      <Typography variant="h6">Batch Summary</Typography>
      <Stack spacing={1} mt={2}>
        <Typography>Total Amount: {total.toFixed(2)}</Typography>
        <Typography>Number of Payments: {count}</Typography>
        <Typography>Average Payment Value: {average.toFixed(2)}</Typography>
      </Stack>
      <Stack direction="row" spacing={2} mt={3}>
        <Button onClick={onBack}>Back</Button>
        <Button variant="contained" onClick={handleFinishClick}>Finish</Button>
      </Stack>
    </Box>
  );
}
