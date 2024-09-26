import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../component/button';
import FormDescription from '../../component/form-description';
import Input from '../../component/input';
import Stepper from '../../component/stepper';
import { useForm } from '../../context/form-context';
import { ButtonTypes, ErrorMessages, TOTAL_STEPS } from '../../utils/constants';
import ErrorText from '../../component/error-text';
import { form5Schema } from '../../utils/schema';

const Step5 = () => {
  const { updateFormData, currentStep, prevStep, formData } = useForm();
  const navigate = useNavigate();

  const [validationError, setValidationError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdateEmail = (e: any) => {
    setValidationError(false);
    updateFormData({
      step5Data: {
        ...formData.step5Data,
        clientEmail: e.target.value
      }
    });
  };

  const handleUpdateName = (e: any) => {
    setValidationError(false);
    updateFormData({
      step5Data: {
        ...formData.step5Data,
        clientName: e.target.value
      }
    });
  };

  const handleNextStepChange = () => {
    if (!formData.step5Data?.clientEmail || !formData.step5Data.clientName) {
      setValidationError(true);
      return;
    }

    const validationResult = form5Schema.safeParse(formData.step5Data);

    if (validationResult.error) {
      const message = validationResult.error.issues[0].message;
      setErrorMessage(message);
      setValidationError(true);
      return;
    }
    
    navigate('/project-estimation');
  };
  return (
    <div>
      <Stepper
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
      />
      <FormDescription
        title="Share some more details"
        description="This information is collected to better understand needs and preferences. It will help us tailor the timeline that will suit specific requirements."
      />
      <Input
        type="text"
        label="Your email"
        placeholder="johndoe121@gmail.com"
        value={formData.step5Data?.clientEmail}
        onChange={handleUpdateEmail}
        required
      />
      <Input
        type="tex"
        label="Your name"
        placeholder="John Doe"
        value={formData.step5Data?.clientName}
        onChange={handleUpdateName}
        required
      />
      {validationError && <ErrorText message={errorMessage || ErrorMessages.inputFieldError} />}
      <div className="button-container">
        <Button
          variant={ButtonTypes.SECONDARY}
          onClick={prevStep}
        >
          Back
        </Button>
        <Button onClick={handleNextStepChange}>Next</Button>
      </div>
    </div>
  );
};

export default Step5;
