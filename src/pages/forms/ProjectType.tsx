import { useState } from 'react';
import Button from '../../components/Button';
import Card from '../../components/CardCheckBox';
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

const ProjectType = () => {
  const [validationError, setValidationError] = useState(false);

  const {
    goToNextStep,
    currentStep,
    goToPrevStep,
    formData: { projectType },
    updateFormData
  } = useForm();

  const handleAddProject = (selectedCategory: string) => {
    setValidationError(false);
    const isExistingValue =
      projectType?.projectTypes?.includes(selectedCategory);

    if (isExistingValue) {
      const updatedArray = projectType?.projectTypes?.filter(
        (item) => item !== selectedCategory
      );
      updateFormData({
        projectType: {
          projectTypes: updatedArray
        }
      });
    } else {
      const updatedArray = [
        /* ...(projectType?.projectTypes || []), */ /* TODO: shall be reused when multiple project types selection is implemented in gantt chart */
        selectedCategory
      ];
      updateFormData({
        projectType: {
          projectTypes: updatedArray
        }
      });
    }
  };

  const handleNextStepChange = () => {
    if (!projectType || projectType?.projectTypes?.length === 0) {
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
          title="What type of project is it?"
          description="This information is collected to better understand needs and preferences. It will help us tailor the timeline that will suit specific requirements."
        />
      </div>
      <div className="card-container">
        <Card
          values={PROJECT_TYPES}
          currentValues={projectType?.projectTypes || []}
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

export default ProjectType;
