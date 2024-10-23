import { useMemo, useState } from 'react';
import Button from '../../components/Button';
import FormDescription from '../../components/FormDescription';
import Input from '../../components/Input';
import Stepper from '../../components/Stepper';
import { useForm } from '../../context/FormContext';
import ErrorText from '../../components/ErrorText';
import { ButtonTypes, ErrorMessages, TOTAL_STEPS } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

const ProjectDetails = () => {
  const {
    updateFormData,
    goToNextStep,
    currentStep,
    formData,
    setInitialStep
  } = useForm();
  const navigate = useNavigate();

  const [validationError, setValidationError] = useState(false);

  /**
   * dyanmically reducing the font-size of the text area if the number of characters is greater than 24
   * remaining styles applied on the textarea are coming from scss file
   */
  const textAreaFontSize = useMemo(() => {
    if (
      formData.projectDetails?.projectDescription &&
      formData.projectDetails?.projectDescription?.length > 24
    )
      return '30px';
    return '42px';
  }, [formData.projectDetails?.projectDescription]);

  const handleBackButtonClick = () => {
    setInitialStep();
    navigate('/');
  };

  const handleUpdateName = (e: any) => {
    setValidationError(false);
    updateFormData({
      projectDetails: {
        ...formData.projectDetails,
        projectName: e.target.value
      }
    });
  };

  const handleUpdateDescription = (e: any) => {
    setValidationError(false);
    updateFormData({
      projectDetails: {
        ...formData.projectDetails,
        projectDescription: e.target.value
      }
    });
  };

  const handleNextStepChange = () => {
    if (
      !formData.projectDetails?.projectDescription ||
      !formData.projectDetails.projectName ||
      formData.projectDetails.projectName.trim() === '' ||
      formData.projectDetails.projectDescription.trim() === ''
    ) {
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
          title="Share some project details"
          description="This information is collected to better understand needs and preferences. It will help us tailor the timeline that will suit specific requirements."
        />
      </div>
      <Input
        type="text"
        label="Project Name"
        placeholder="MoneyMingle"
        value={formData.projectDetails?.projectName}
        onChange={handleUpdateName}
        required
      />
      <Input
        type="textarea"
        label="Project Description"
        placeholder="Two lines about your project"
        value={formData.projectDetails?.projectDescription}
        onChange={handleUpdateDescription}
        required
        style={{ fontSize: textAreaFontSize }}
      />
      {validationError && <ErrorText message={ErrorMessages.inputFieldError} />}
      <div className="button-container">
        <Button
          variant={ButtonTypes.SECONDARY}
          onClick={handleBackButtonClick}
        >
          Back
        </Button>
        <Button onClick={handleNextStepChange}>Next</Button>
      </div>
    </>
  );
};

export default ProjectDetails;
