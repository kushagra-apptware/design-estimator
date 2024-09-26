import { useState } from 'react';
import Button from '../../component/button';
import FormDescription from '../../component/form-description';
import Input from '../../component/input';
import Stepper from '../../component/stepper';
import { useForm } from '../../context/form-context';
import { ErrorMessages, TOTAL_STEPS } from '../../utils/constants';
import ErrorText from '../../component/error-text';
import { form1Schema } from '../../utils/schema';

const Step1 = () => {
  const { updateFormData, nextStep, currentStep, formData } = useForm();

  const [validationError, setValidationError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    const validationResult = form1Schema.safeParse(formData.step1Data);

    if (validationResult.error) {
      const message = validationResult.error.issues[0].message;
      setErrorMessage(message);
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
      {validationError && (
        <ErrorText message={errorMessage || ErrorMessages.inputFieldError} />
      )}
      <div>
        <Button onClick={handleNextStepChange}>Next</Button>
      </div>
    </div>
  );
};

export default Step1;
