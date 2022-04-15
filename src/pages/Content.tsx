import React, { createContext, useState } from "react";
import { Grid } from "@material-ui/core";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { RegisterInfo } from "../components/Register/RegisterInfo";
import { RegisterConfirm } from "../components/Register/RegisterConfirm";
import { User } from "../types/User";

// export const RegisterData = createContext<User | undefined>(undefined);

function getSteps() {
  return ["入力画面", "確認画面"];
}

function getStepContent(stepIndex: number) {
  switch (stepIndex) {
    case 0:
      return <RegisterInfo />;
    case 1:
      return <RegisterConfirm />;
    default:
      return "Unknown stepIndex";
  }
}
export function Content() {
  //   const sampleRegister: User = {
  //     id: 1,
  //     name: "string",
  //     email: "string",
  //     password: "string",
  //     zipcode: "string",
  //     address: "string",
  //     telephone: "string",
  //   };

  //   const [inputUserData, setinputUserData] = useState("");
  //   const value = { inputUserData, setinputUserData };

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <Grid container>
      <Grid sm={2} />
      <Grid lg={8} sm={8} spacing={10}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {/* <RegisterData.Provider value={sampleRegister}>
          {getStepContent(activeStep)};
        </RegisterData.Provider> */}
        {activeStep === steps.length ? (
          <div>
            <Typography>全ステップの表示を完了</Typography>
            <Button onClick={handleReset}>リセット</Button>
          </div>
        ) : (
          <div>
            <Typography>{getStepContent(activeStep)}</Typography>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              戻る
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              {activeStep === steps.length - 1 ? "送信" : "次へ"}
            </Button>
          </div>
        )}
      </Grid>
    </Grid>
  );
}
