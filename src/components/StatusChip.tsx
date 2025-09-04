import { Chip, Tooltip } from "@mui/material";
import type { StatusChipProps } from "../types/types";


export default function StatusChip({ status, error }: StatusChipProps) {
  const color = status === "Pending" ? "warning" : status === "Settled" ? "success" : "error";
  return (
    <Tooltip title={error || ""}>
      <Chip label={status} color={color as any} />
    </Tooltip>
  );
}
