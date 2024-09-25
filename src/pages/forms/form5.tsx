import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../component/button';
import FormDescription from '../../component/form-description';
import Input from '../../component/input';
import Stepper from '../../component/stepper';
import { useForm } from '../../context/form-context';
import { ButtonTypes, ErrorMessages, TOTAL_STEPS } from '../../utils/constants';
import ErrorText from '../../component/error-text';

const Step5 = () => {
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState(false);
  const { updateFormData, currentStep, prevStep, formData } = useForm();

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
      {validationError && <ErrorText message={ErrorMessages.inputFieldError} />}
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
