import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import FormDescription from '../../components/FormDescription';
import Input from '../../components/Input';
import Stepper from '../../components/Stepper';
import { useForm } from '../../context/FormContext';
import { ButtonTypes, ErrorMessages, TOTAL_STEPS } from '../../utils/constants';
import ErrorText from '../../components/ErrorText';
import { form5Schema } from '../../utils/schema';

import axios from 'axios';

const ClientDetails = () => {
  const navigate = useNavigate();
  const { updateFormData, currentStep, goToPrevStep, formData } = useForm();

  const [validationError, setValidationError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdateEmail = (e: any) => {
    setValidationError(false);
    updateFormData({
      clientDetails: {
        ...formData.clientDetails,
        clientEmail: e.target.value
      }
    });
  };

  const sendEmail = useCallback(() => {
    const { clientDetails } = formData;
    axios
      .post('http://localhost:3001/send-email', {
        name: clientDetails?.clientName,
        email: clientDetails?.clientEmail,
        message: 'Hello from Design Estimator'
      })
      .then((response) => {
        console.log('Email sent successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  }, [formData]);

  const handleUpdateName = (e: any) => {
    setValidationError(false);
    updateFormData({
      clientDetails: {
        ...formData.clientDetails,
        clientName: e.target.value
      }
    });
  };

  const handleNextStepChange = () => {
    if (
      !formData.clientDetails?.clientEmail ||
      !formData.clientDetails.clientName ||
      formData.clientDetails.clientName.trim() === '' ||
      formData.clientDetails.clientEmail.trim() === ''
    ) {
      setValidationError(true);
      return;
    }

    const validation = form5Schema.safeParse(formData.clientDetails);

    if (!validation.success) {
      const message = validation.error.issues[0].message;
      setErrorMessage(message);
      setValidationError(true);
      return;
    }

    /**
     * submit data to google sheets --- START
     */

    const formFields: any = {
      name: formData.clientDetails.clientName,
      email: formData.clientDetails.clientEmail
    };

    const queryString = new URLSearchParams(formFields).toString();

    fetch(
      `https://script.google.com/macros/s/AKfycbyPHta43UbGBbApNTZHtAEitOqSXa8ONfJThbCL1-kPaPjeqMY5UxICI43xWmMD1vJA/exec`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded' // Important for URL encoding
        },
        body: queryString
        // mode: 'no-cors' // Prevent CORS issue
      }
    )
      .then((response) => {
        if (response.ok) {
          console.info('Data submitted successfully!');
        } else {
          console.info('Error submitting data.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    /**
     * submit data to google sheets --- END
     */

    sendEmail();

    navigate('/project-estimation');
  };
  return (
    <>
      <div>
        <Stepper
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
        />
        <FormDescription
          title="Share some more details"
          description="This information is collected to better understand needs and preferences. It will help us tailor the timeline that will suit specific requirements."
        />
      </div>
      <div className="form-fields client-details">
        <Input
          type="text"
          label="Your email"
          placeholder="johndoe121@gmail.com"
          value={formData.clientDetails?.clientEmail}
          onChange={handleUpdateEmail}
          required
        />
        <Input
          type="tex"
          label="Your name"
          placeholder="John Doe"
          value={formData.clientDetails?.clientName}
          onChange={handleUpdateName}
          required
        />
      </div>
      <ErrorText
        message={errorMessage || ErrorMessages.inputFieldError}
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

export default ClientDetails;
