import { Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import StatusChip from "./StatusChip";
import { Statuses } from "../constants/constants";
import type { BatchTableProps } from "../types/types";

export default function BatchTable({ batchName, transactions, markAsSuccessful }: BatchTableProps) {
  const totalAmount = transactions.reduce((sum, tx) => sum + (tx.amount || 0), 0);

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ marginBottom: 16, fontWeight: "bold", fontSize: 18 }}>
        Batch Name: {batchName || "N/A"}
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Account Number</TableCell>
            <TableCell>Holder</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell>{tx.transactionDate}</TableCell>
              <TableCell>{tx.accountNumber}</TableCell>
              <TableCell>{tx.accountHolderName}</TableCell>
              <TableCell>{tx.amount?.toFixed(2)}</TableCell>
              <TableCell>
                <StatusChip status={tx.status} error={tx.errorMessage} />
              </TableCell>
              <TableCell>
                {tx.status === Statuses.Pending && (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => markAsSuccessful(tx.id)}
                  >
                    Mark as Successful
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={3} />
            <TableCell sx={{ fontWeight: 'bold' }}>{totalAmount.toFixed(2)}</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
