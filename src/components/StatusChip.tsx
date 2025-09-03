import { Chip, Tooltip } from "@mui/material";

interface Props {
  status: "Pending" | "Settled" | "Failed";
  error?: string;
}

export default function StatusChip({ status, error }: Props) {
  const color = status === "Pending" ? "warning" : status === "Settled" ? "success" : "error";
  return (
    <Tooltip title={error || ""}>
      <Chip label={status} color={color as any} />
    </Tooltip>
  );
}
