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

const ProjectStage = () => {
  const [validationError, setValidationError] = useState(false);

  const {
    goToNextStep,
    currentStep,
    goToPrevStep,
    formData: { phase },
    updateFormData
  } = useForm();

  const handleAddProject = (selectedCategory: string) => {
    setValidationError(false);
    const isExistingValue = phase?.projectStage?.includes(selectedCategory);

    if (!isExistingValue) {
      updateFormData({
        phase: {
          projectStage: [selectedCategory]
        }
      });
    }
  };

  const handleNextStepChange = () => {
    if (!phase || phase?.projectStage?.length === 0) {
      setValidationError(true);
      return;
    }
    goToNextStep();
  };

  return (
    <>
      <div>
        <Stepper
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
        />
        <FormDescription
          title="What stage is the project at?"
          description="This information is collected to better understand needs and preferences. It will help us tailor the timeline that will suit specific requirements."
        />
      </div>
      <div className="card-container">
        <Card
          values={PROJECT_STAGES}
          currentValues={phase?.projectStage || []}
          handleUpdateValues={handleAddProject}
        />
      </div>
      <ErrorText
        message={ErrorMessages.cardError}
        hasError={validationError}
      />
      <div className="button-container">
        <Button
          variant={ButtonTypes.SECONDARY}
          onClick={goToPrevStep}
        >
          Back
        </Button>
        <Button onClick={handleNextStepChange}>Next</Button>
      </div>
    </>
  );
};

export default ProjectStage;
