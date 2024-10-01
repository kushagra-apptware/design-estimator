
interface StepperProps {
    currentStep: number;
    totalSteps: number;
}

const Stepper = ({ currentStep, totalSteps }: StepperProps) => {
  return (
    <span className="stepper">Step {currentStep} / {totalSteps}</span>
  )
}

export default Stepper