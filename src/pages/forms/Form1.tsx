import { useState } from 'react';
import Button from '../../component/Button';
import FormDescription from '../../component/FormDescription';
import Input from '../../component/Input';
import Stepper from '../../component/Stepper';
import { useForm } from '../../context/FormContext';
import { ErrorMessages, TOTAL_STEPS } from '../../utils/constants';
import ErrorText from '../../component/ErrorText';

const Step1 = () => {
  const { updateFormData, nextStep, currentStep, formData } = useForm();

  const [validationError, setValidationError] = useState(false);

  const handleUpdateName = (e: any) => {
    setValidationError(false);
    updateFormData({
      step1Data: {
        ...formData.step1Data,
        projectName: e.target.value
      }
    });
  };

  const handleUpdateDescription = (e: any) => {
    setValidationError(false);
    updateFormData({
      step1Data: {
        ...formData.step1Data,
        projectDescription: e.target.value
      }
    });
  };

  const handleNextStepChange = () => {
    if (
      !formData.step1Data?.projectDescription ||
      !formData.step1Data.projectName
    ) {
      setValidationError(true);
      return;
    }
    nextStep();
  };

  return (
    <div>
      <Stepper
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
      />
      <FormDescription
        title="Share some project details"
        description="This information is collected to better understand needs and preferences. It will help us tailor the timeline that will suit specific requirements."
      />
      <Input
        type="text"
        label="Project Name"
        placeholder="MoneyMingle"
        value={formData.step1Data?.projectName}
        onChange={handleUpdateName}
        required
      />
      <Input
        type="textarea"
        label="Project Description"
        placeholder="Two lines about your project"
        value={formData.step1Data?.projectDescription}
        onChange={handleUpdateDescription}
        required
      />
      {validationError && <ErrorText message={ErrorMessages.inputFieldError} />}
      <div>
        <Button onClick={handleNextStepChange}>Next</Button>
      </div>
    </div>
  );
};

export default Step1;
