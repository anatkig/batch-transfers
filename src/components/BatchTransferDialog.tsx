import { useState } from "react";
import { Dialog, Stepper, Step, StepLabel, DialogContent, DialogTitle } from "@mui/material";
import Details from "./Details";
import Review from "./Review";
import Summary from "./Summary";
import type { BatchTransferDialogProps } from "../types/types";



const steps = ["Details", "Review", "Summary"];

export default function BatchTransferDialog({ open, onClose }: BatchTransferDialogProps) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep(prev => prev + 1);
  const handleBack = () => setActiveStep(prev => prev - 1);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Batch Transfer</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep}>
          {steps.map(label => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>
        {activeStep === 0 && <Details onNext={handleNext} />}
        {activeStep === 1 && <Review onNext={handleNext} onBack={handleBack} />}
        {activeStep === 2 && <Summary onBack={handleBack} onClose={onClose} />}
      </DialogContent>
    </Dialog>
  );
}
