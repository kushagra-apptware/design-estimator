import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import GanttChart from '../components/GanttChart';
import { useForm } from '../context/FormContext';
import { ButtonTypes } from '../utils/constants';

const ProjectEstimation = () => {
  const { setInitialStep, formData } = useForm();
  const navigate = useNavigate();

  const handleEditDetails = () => {
    setInitialStep();
    navigate('/form');
  };
  
  return (
    <div className="estimation-wrapper">
      <span className="project-domain">{formData.domain?.projectDomain}</span>
      <div className="project-header">
        <span>{formData.projectDetails?.projectName}</span>
        <span>30 Days</span>
      </div>
      <GanttChart />
      <div>
        <div className="flex-center">
          <Button
            onClick={handleEditDetails}
            variant={ButtonTypes.SECONDARY}
          >
            Edit Details
          </Button>
          <Button>Download as PDF</Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectEstimation;
