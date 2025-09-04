import { Chip, Tooltip } from "@mui/material";
import type { StatusChipProps } from "../types/types";
import { Statuses } from "../constants/constants";


export default function StatusChip({ status, error }: StatusChipProps) {
  const color =
    status === Statuses.Pending
      ? "warning"
      : status === Statuses.Settled
      ? "success"
      : "error";
  return (
    <Tooltip title={error || ""}>
      <Chip label={status} color={color as any} />
    </Tooltip>
  );
}
