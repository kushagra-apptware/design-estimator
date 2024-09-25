import { useState } from 'react';
import Button from '../../component/button';
import Card from '../../component/card';
import FormDescription from '../../component/form-description';
import Stepper from '../../component/stepper';
import { useForm } from '../../context/form-context';
import { ButtonTypes, ErrorMessages, PROJECT_TYPES, TOTAL_STEPS } from '../../utils/constants';
import ErrorText from '../../component/error-text';

const Step2 = () => {
  const [validationError, setValidationError] = useState(false)

  const {
    nextStep,
    currentStep,
    prevStep,
    formData: { step2Data },
    updateFormData
  } = useForm();

  const handleAddProject = (selectedCategory: string) => {
    setValidationError(false)
    const isCategoryAlreadyExist =
      step2Data?.projectType?.includes(selectedCategory);

    if (isCategoryAlreadyExist) {
      const updatedArray = step2Data?.projectType?.filter(
        (item) => item !== selectedCategory
      );
      updateFormData({
        step2Data: {
          projectType: updatedArray
        }
      });
    } else {
      const updatetArray = [
        ...(step2Data?.projectType || []),
        selectedCategory
      ];
      updateFormData({
        step2Data: {
          projectType: updatetArray
        }
      });
    }
  };

  const handleNextStepChange = () => {
    if(!step2Data || step2Data?.projectType?.length ===  0) {
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
        title="What type of project is it?"
        description="This information is collected to better understand needs and preferences. It will help us tailor the timeline that will suit specific requirements."
      />
      <div className="card-container">
        <Card
          categories={PROJECT_TYPES}
          currentCategories={step2Data?.projectType || []}
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

export default Step2;
