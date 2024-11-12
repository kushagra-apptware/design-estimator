import Button from '../../components/Button';
import { useDownloadAsPDF } from '../../hooks/useDownloadAsPDF/useDownloadAsPDF';
import { useEstimationPage } from '../../hooks/useEstimationPage/useEstimationPage';
import { ButtonTypes } from '../../utils/constants';

import './ChartActions.scss';

export const ChartActions = () => {
  const { handleEditDetails, setStartDay } = useEstimationPage();
  const { downloadAsPDF } = useDownloadAsPDF();
  return (
    <div className="chart-actions">
      <div className="left-actions flex-center">
        <Button
          variant={ButtonTypes.SECONDARY}
          onClick={handleEditDetails}
        >
          Edit Details
        </Button>
        <Button
          onClick={async () => {
            await setStartDay(1);
            downloadAsPDF();
          }}
        >
          Download as PDF
        </Button>
        <Button onClick={async () => {}}>Book A Call</Button>
      </div>
    </div>
  );
};
