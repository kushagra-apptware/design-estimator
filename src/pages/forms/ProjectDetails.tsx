import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import FormDescription from '../../components/FormDescription';
import Input from '../../components/Input';
import Stepper from '../../components/Stepper';
import { useForm } from '../../context/FormContext';
import { ButtonTypes, TOTAL_STEPS } from '../../utils/constants';

const ProjectDetails = () => {
  const {
    updateFormData,
    goToNextStep,
    currentStep,
    formData,
    setInitialStep
  } = useForm();
  const navigate = useNavigate();

  const [validationError, setValidationError] = useState({
    projectDescription: false,
    projectName: false
  });

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
    const { value: projectName } = e.target;
    if (projectName.length) {
      setValidationError((prev) => ({
        ...prev,
        projectName: false
      }));
    }
    updateFormData({
      projectDetails: {
        ...formData.projectDetails,
        projectName
      }
    });
  };

    const handleUpdateDescription = (e: any) => {
    const { value: projectDescription } = e.target;
    if (projectDescription.length) {
      setValidationError((prev) => ({
        ...prev,
        projectDescription: false
      }));
    }
    updateFormData({
      projectDetails: {
        ...formData.projectDetails,
        projectDescription
      }
    });
  };

  const handleNextStepChange = () => {
    let hasError = false;
    if (
      !formData.projectDetails?.projectDescription ||
      formData.projectDetails.projectDescription.trim() === ''
    ) {
      setValidationError((prev) => ({
        ...prev,
        projectDescription: true
      }));
      hasError = true;
    }
    if (
      !formData.projectDetails?.projectName ||
      formData.projectDetails.projectName.trim() === ''
    ) {
      setValidationError((prev) => ({
        ...prev,
        projectName: true
      }));
      hasError = true;
    }
    if (!hasError) {
      goToNextStep();
    }
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
      <div className="form-fields project-details">
        <Input
          type="text"
          label="Project Name"
          placeholder="MoneyMingle"
          value={formData.projectDetails?.projectName}
          onChange={handleUpdateName}
          required
          hasError={validationError}
        />
        <Input
          type="textarea"
          label="Project Description"
          placeholder="Two lines about your project"
          value={formData.projectDetails?.projectDescription}
          onChange={handleUpdateDescription}
          required
          style={{ fontSize: textAreaFontSize }}
          hasError={validationError}
        />
      </div>
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
