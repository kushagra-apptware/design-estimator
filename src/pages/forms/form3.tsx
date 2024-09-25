import { useState } from 'react';
import Button from '../../component/button';
import Card from '../../component/card';
import FormDescription from '../../component/form-description';
import Stepper from '../../component/stepper';
import { useForm } from '../../context/form-context';
import { ButtonTypes, ErrorMessages, PROJECT_DOMAIN, TOTAL_STEPS } from '../../utils/constants';
import ErrorText from '../../component/error-text';

const Step3 = () => {

  const [validationError, setValidationError] = useState(false)

  const {
    nextStep,
    currentStep,
    prevStep,
    formData: { step3Data },
    updateFormData
  } = useForm();

  const handleAddProject = (selectedCategory: string) => {
    setValidationError(false);
    const isCategoryAlreadyExist =
      step3Data?.projectDomain?.includes(selectedCategory);

    if (isCategoryAlreadyExist) {
      const updatedArray = step3Data?.projectDomain?.filter(
        (item) => item !== selectedCategory
      );
      updateFormData({
        step3Data: {
          projectDomain: updatedArray
        }
      });
    } else {
      const updatetArray = [
        ...(step3Data?.projectDomain || []),
        selectedCategory
      ];
      updateFormData({
        step3Data: {
          projectDomain: updatetArray
        }
      });
    }
  };

  const handleNextStepChange = () => {
    if(!step3Data || step3Data?.projectDomain?.length ===  0) {
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
        title="What’s the project’s domain?"
        description="This information is collected to better understand needs and preferences. It will help us tailor the timeline that will suit specific requirements."
      />
      <div className="card-container">
        <Card
          categories={PROJECT_DOMAIN}
          currentCategories={step3Data?.projectDomain || []}
          handleUpdateCategory={handleAddProject}
        />
      </div>
      {
        validationError && <ErrorText message={ErrorMessages.cardError}/>
      }
      <div className='button-container'>
        <Button variant={ButtonTypes.SECONDARY} onClick={prevStep}>Back</Button>
        <Button onClick={handleNextStepChange}>Next</Button>
      </div>
    </div>
  );
};

export default Step3;
