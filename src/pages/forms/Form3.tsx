import { useState } from 'react';
import Button from '../../components/Button';
import Card from '../../components/CardCheckBox';
import FormDescription from '../../components/FormDescription';
import Stepper from '../../components/Stepper';
import { useForm } from '../../context/FormContext';
import {
  ButtonTypes,
  ErrorMessages,
  PROJECT_DOMAINS,
  TOTAL_STEPS
} from '../../utils/constants';
import ErrorText from '../../components/ErrorText';

const Step3 = () => {
  const [validationError, setValidationError] = useState(false);

  const {
    goToNextStep,
    currentStep,
    goToPrevStep,
    formData: { step3Data },
    updateFormData
  } = useForm();

  const handleAddProject = (selectedCategory: string) => {
    setValidationError(false);
    const isExistingValue =
      step3Data?.projectDomain?.includes(selectedCategory);

    if (isExistingValue) {
      const updatedArray = step3Data?.projectDomain?.filter(
        (item) => item !== selectedCategory
      );
      updateFormData({
        step3Data: {
          projectDomain: updatedArray
        }
      });
    } else {
      const updatedArray = [
        ...(step3Data?.projectDomain || []),
        selectedCategory
      ];
      updateFormData({
        step3Data: {
          projectDomain: updatedArray
        }
      });
    }
  };

  const handleNextStepChange = () => {
    if (!step3Data || step3Data?.projectDomain?.length === 0) {
      setValidationError(true);
      return;
    }
    goToNextStep();
  };

  return (
    <div>
      <Stepper
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
      />
      <FormDescription
        title="What’s the project’s domain?"
        description="This information is collected to better understand needs and preferences. It will help us tailor the timeline that will suit specific requirements."
      />
      <div className="card-container">
        <Card
          values={PROJECT_DOMAINS}
          currentValues={step3Data?.projectDomain || []}
          handleUpdateValues={handleAddProject}
        />
      </div>
      {validationError && <ErrorText message={ErrorMessages.cardError} />}
      <div className="button-container">
        <Button
          variant={ButtonTypes.SECONDARY}
          onClick={goToPrevStep}
        >
          Back
        </Button>
        <Button onClick={handleNextStepChange}>Next</Button>
      </div>
    </div>
  );
};

export default Step3;
