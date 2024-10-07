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

const ProjectDomain = () => {
  const [validationError, setValidationError] = useState(false);

  const {
    goToNextStep,
    currentStep,
    goToPrevStep,
    formData: { domain },
    updateFormData
  } = useForm();

  const handleAddProject = (selectedCategory: string) => {
    setValidationError(false);
    const isExistingValue =
      domain?.projectDomain?.includes(selectedCategory);

    if (!isExistingValue) {
      updateFormData({
        domain: {
          projectDomain: [selectedCategory]
        }
      });
    }
  };

  const handleNextStepChange = () => {
    if (!domain || domain?.projectDomain?.length === 0) {
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
        title="What’s the project’s domain?"
        description="This information is collected to better understand needs and preferences. It will help us tailor the timeline that will suit specific requirements."
      />
    </div>
      <div className="card-container">
        <Card
          values={PROJECT_DOMAINS}
          currentValues={domain?.projectDomain || []}
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
    </>
  );
};

export default ProjectDomain;
