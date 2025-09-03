import React, { useState } from "react";
import { Dialog, Stepper, Step, StepLabel, DialogContent, DialogTitle } from "@mui/material";
import Step1Details from "./steps/Step1Details";
import Step2Review from "./steps/Step2Review";
import Step3Summary from "./steps/Step3Summary";

interface Props {
  open: boolean;
  onClose: () => void;
}

const steps = ["Details", "Review", "Summary"];

export default function BatchTransferDialog({ open, onClose }: Props) {
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
        {activeStep === 0 && <Step1Details onNext={handleNext} />}
        {activeStep === 1 && <Step2Review onNext={handleNext} onBack={handleBack} />}
        {activeStep === 2 && <Step3Summary onBack={handleBack} onClose={onClose} />}
      </DialogContent>
    </Dialog>
  );
}
