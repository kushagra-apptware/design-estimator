import { CardDetails } from '../utils/constants';

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
          border: '2px solid #5350C3',
          opacity: '100%'
        }
      : {};

  const selectedIcon = (projectName: string) =>
    isProjectSelected(projectName) && (
      <img
        src="/Selected.svg"
        className="project-selected"
        style={{
          opacity: '100%'
        }}
      />
    );

  const AllCards = values.map(
    ({ name, imageUrl }: CardDetails, index) => (
      <div
        className="card"
        key={index}
        style={styleForSelectedCard(name)}
        onClick={() => handleUpdateValues(name)}
      >
        {selectedIcon(name)}
        <img
          className="card-logo"
          src={`/project/${imageUrl}.svg`}
          style={styleForSelectedProject(name)}
        />
        <span
          className="card-title"
          style={styleForSelectedProject(name)}
        >
          {name}
        </span>
      </div>
    )
  );

  return AllCards;
};

export default CardCheckBox;
