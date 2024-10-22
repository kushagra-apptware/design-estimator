import { CardDetails } from '../utils/constants';
import SelectedSVG from '../assets/Selected.svg';
import Branding from '../assets/project/branding.svg';
import MobileApp from '../assets/project/mobile-app.svg';
import UXAudit from '../assets/project/ux-audit.svg';
import WebApp from '../assets/project/web-app.svg';
import Website from '../assets/project/website.svg';
import AI from '../assets/project/ai.svg';
import Healthcare from '../assets/project/healthcare.svg';
import Finance from '../assets/project/finance.svg';
import DataAnalytics from '../assets/project/data-analytics.svg';
import Other from '../assets/project/other.svg';
import Concept from '../assets/project/concept.svg';
import Planning from '../assets/project/planning.svg';
import Imminent from '../assets/project/imminent.svg';
import Execution from '../assets/project/execution.svg';

const images = {
  'branding': Branding,
  'mobile-app': MobileApp,
  'ux-audit': UXAudit,
  'web-app': WebApp,
  'website': Website,
  'ai': AI,
  'healthcare': Healthcare,
  'finance': Finance,
  'data-analytics': DataAnalytics,
  'other': Other,
  'concept': Concept,
  'planning': Planning,
  'imminent': Imminent,
  'execution': Execution
};

interface CardProps {
  values: CardDetails[];
  currentValues: Array<string>;
  handleUpdateValues: (categoryName: string) => void;
}

const CardCheckBox = ({
  values,
  currentValues,
  handleUpdateValues
}: CardProps) => {
  const isProjectSelected = (projectName: string) =>
    currentValues?.includes(projectName);

  const styleForSelectedProject = (projectName: string) =>
    isProjectSelected(projectName)
      ? {
          opacity: '100%'
        }
      : {};

  const styleForSelectedCard = (projectName: string) =>
    isProjectSelected(projectName)
      ? {
          border: '2px solid #6B76D0',
          opacity: '100%'
        }
      : {};

  const selectedIcon = (projectName: string) =>
    isProjectSelected(projectName) && (
      <img
        src={SelectedSVG}
        className="project-selected"
        style={{
          opacity: '100%'
        }}
      />
    );

  const AllCards = values.map(({ name, imageUrl }: CardDetails, index) => (
    <div
      className="card"
      key={index}
      style={styleForSelectedCard(name)}
      onClick={() => handleUpdateValues(name)}
    >
      {selectedIcon(name)}
      <img
        className="card-logo"
        src={(images as any)[imageUrl]}
        style={styleForSelectedProject(name)}
      />
      <span
        className="card-title"
        style={styleForSelectedProject(name)}
      >
        {name}
      </span>
    </div>
  ));

  return AllCards;
};

export default CardCheckBox;
