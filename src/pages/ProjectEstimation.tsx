import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { ButtonTypes } from '../utils/constants';
import { useForm } from '../context/FormContext';

const ProjectEstimation = () => {
  const { setInitialStep } = useForm();
  const navigate = useNavigate();

  const handleEditDetails = () => {
    setInitialStep();
    navigate('/form');
  };
  return (
    <div className="estimation-wrapper">
      <span className="project-domain">Project Domain</span>
      <div className="project-header">
        <span>Project Name</span>
        <span>30 Days</span>
      </div>
      <div>Gantt Chart</div>
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
