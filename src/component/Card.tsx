import { ProjectInfoInterface } from '../utils/constants';

interface CardProps {
  categories: ProjectInfoInterface[];
  currentCategories: Array<string>;
  handleUpdateCategory: (categoryName: string) => void;
}

const Card = ({
  categories,
  currentCategories,
  handleUpdateCategory
}: CardProps) => {
  const isProjectSelected = (projectName: string) =>
    currentCategories?.includes(projectName);

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

  const AllCards = categories.map(
    ({ name, imageUrl }: ProjectInfoInterface, index) => (
      <div
        className="card"
        key={index}
        style={styleForSelectedCard(name)}
        onClick={() => handleUpdateCategory(name)}
      >
        {selectedIcon(name)}
        <img
          className="card-logo"
          src={`/project/${imageUrl}Selected.svg`}
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

export default Card;
