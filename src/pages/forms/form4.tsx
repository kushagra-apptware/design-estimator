import { useState } from 'react';
import Button from '../../component/button';
import Card from '../../component/card';
import FormDescription from '../../component/form-description';
import Stepper from '../../component/stepper';
import { useForm } from '../../context/form-context';
import { ButtonTypes, ErrorMessages, PROJECT_STAGE, TOTAL_STEPS } from '../../utils/constants';
import ErrorText from '../../component/error-text';

const Step4 = () => {

  const [validationError, setValidationError] = useState(false)

  const {
    nextStep,
    currentStep,
    prevStep,
    formData: { step4Data },
    updateFormData
  } = useForm();

  const handleAddProject = (selectedCategory: string) => {
    setValidationError(false)
    const isCategoryAlreadyExist =
      step4Data?.projectStage?.includes(selectedCategory);

    if (isCategoryAlreadyExist) {
      const updatedArray = step4Data?.projectStage?.filter(
        (item) => item !== selectedCategory
      );
      updateFormData({
        step4Data: {
          projectStage: updatedArray
        }
      });
    } else {
      const updatetArray = [
        ...(step4Data?.projectStage || []),
        selectedCategory
      ];
      updateFormData({
        step4Data: {
          projectStage: updatetArray
        }
      });
    }
  };

  const handleNextStepChange = () => {
    if(!step4Data || step4Data?.projectStage?.length ===  0) {
      setValidationError(true)
      return;
    }
    nextStep()
  }

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
          categories={PROJECT_STAGE}
          currentCategories={step4Data?.projectStage || []}
          handleUpdateCategory={handleAddProject}
        />
      </div>
      {
        validationError && <ErrorText message={ErrorMessages.cardError}/>
      }
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

export default Step4;
