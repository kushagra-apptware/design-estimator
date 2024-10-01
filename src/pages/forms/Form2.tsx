import { useState } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import FormDescription from '../../components/FormDescription';
import Stepper from '../../components/Stepper';
import { useForm } from '../../context/FormContext';
import {
  ButtonTypes,
  ErrorMessages,
  PROJECT_TYPES,
  TOTAL_STEPS
} from '../../utils/constants';
import ErrorText from '../../components/ErrorText';

const Step2 = () => {
  const [validationError, setValidationError] = useState(false);

  const {
    goToNextStep,
    currentStep,
    goToPrevStep,
    formData: { step2Data },
    updateFormData
  } = useForm();

  const handleAddProject = (selectedCategory: string) => {
    setValidationError(false);
    const isExistingValue = step2Data?.projectType?.includes(selectedCategory);

    if (isExistingValue) {
      const updatedArray = step2Data?.projectType?.filter(
        (item) => item !== selectedCategory
      );
      updateFormData({
        step2Data: {
          projectType: updatedArray
        }
      });
    } else {
      const updatedArray = [
        ...(step2Data?.projectType || []),
        selectedCategory
      ];
      updateFormData({
        step2Data: {
          projectType: updatedArray
        }
      });
    }
  };

  const handleNextStepChange = () => {
    if (!step2Data || step2Data?.projectType?.length === 0) {
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
        title="What type of project is it?"
        description="This information is collected to better understand needs and preferences. It will help us tailor the timeline that will suit specific requirements."
      />
      <div className="card-container">
        <Card
          values={PROJECT_TYPES}
          currentValues={step2Data?.projectType || []}
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

export default Step2;
