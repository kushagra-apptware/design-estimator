import { useState } from 'react';
import Button from '../../components/Button';
import Card from '../../components/CardCheckBox';
import FormDescription from '../../components/FormDescription';
import Stepper from '../../components/Stepper';
import { useForm } from '../../context/FormContext';
import {
  ButtonTypes,
  ErrorMessages,
  PROJECT_STAGES,
  TOTAL_STEPS
} from '../../utils/constants';
import ErrorText from '../../components/ErrorText';

const Step4 = () => {
  const [validationError, setValidationError] = useState(false);

  const {
    goToNextStep,
    currentStep,
    goToPrevStep,
    formData: { step4Data },
    updateFormData
  } = useForm();

  const handleAddProject = (selectedCategory: string) => {
    setValidationError(false);
    const isExistingValue = step4Data?.projectStage?.includes(selectedCategory);

    if (isExistingValue) {
      const updatedArray = step4Data?.projectStage?.filter(
        (item) => item !== selectedCategory
      );
      updateFormData({
        step4Data: {
          projectStage: updatedArray
        }
      });
    } else {
      const updatedArray = [
        ...(step4Data?.projectStage || []),
        selectedCategory
      ];
      updateFormData({
        step4Data: {
          projectStage: updatedArray
        }
      });
    }
  };

  const handleNextStepChange = () => {
    if (!step4Data || step4Data?.projectStage?.length === 0) {
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
        title="What stage is the project at?"
        description="This information is collected to better understand needs and preferences. It will help us tailor the timeline that will suit specific requirements."
      />
      <div className="card-container">
        <Card
          values={PROJECT_STAGES}
          currentValues={step4Data?.projectStage || []}
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

export default Step4;
