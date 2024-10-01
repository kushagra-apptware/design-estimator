import { useForm } from '../context/FormContext';
import Step1 from './forms/Form1';
import Step2 from './forms/Form2';
import Step3 from './forms/Form3';
import Step4 from './forms/Form4';
import Step5 from './forms/Form5';

const FormStepper = () => {
  const { currentStep } = useForm();
  switch (currentStep) {
    case 1:
      return <Step1 />;
    case 2:
      return <Step2 />;
    case 3:
      return <Step3 />;
    case 4:
      return <Step4 />;
    case 5:
      return <Step5 />;
  }
};

const Form = () => {
  return (
    <div className="form-wrapper">
      <div className="form-parent">
        {/* <FormProvider> */}
        <FormStepper />
        {/* </FormProvider> */}
      </div>
      <div>
        <img
          src="/Form-banner.png"
          alt="Form Banner"
          height={646}
        />
      </div>
    </div>
  );
};

export default Form;
