import { useNavigate } from 'react-router-dom';
import Button from '../component/button';
import { ButtonTypes } from '../utils/constants';
import { useForm } from '../context/form-context';
import Chip from '../component/chip';

const ProjectEstimation = () => {
  const { setInitialStep, formData: { step2Data, step3Data, step4Data} } = useForm();
  const navigate = useNavigate();

  const formsSelection  = [step2Data?.projectType,step3Data?.projectDomain, step4Data?.projectStage ].flat() as Array<string>

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
      <div className='project-chips'>
        {
          formsSelection?.length > 0 &&
          formsSelection.map((item: string,index) => {
            return (
              <Chip text={item} key={index}/>
            )
          })
        }
      </div>
      <div>Gantt Chart</div>
      <div>
        <div className='flex-center'>
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
