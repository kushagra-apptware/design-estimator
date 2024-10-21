import { useForm } from '../context/FormContext';
import ProjectDetails from './forms/ProjectDetails';
import ProjectType from './forms/ProjectType';
import ProjectDomain from './forms/ProjectDomain';
import ProjectStage from './forms/ProjectStage';
import ClientDetails from './forms/ClientDetails';
import FormBanner from '../assets/Form-banner.png'

const FormStepper = () => {
  const { currentStep } = useForm();
  switch (currentStep) {
    case 1:
      return <ProjectDetails />;
    case 2:
      return <ProjectType />;
    case 3:
      return <ProjectDomain />;
    case 4:
      return <ProjectStage />;
    case 5:
      return <ClientDetails />;
  }
};

const Form = () => {
  return (
    <div className="form-wrapper">
      <div className="form-parent">
        <FormStepper />
      </div>
      <div>
        <img
          src={FormBanner}
          alt="Form Banner"
          height={646}
        />
      </div>
    </div>
  );
};

export default Form;
