interface ChipProps {
  text: string;
}

const Chip = ({ text }: ChipProps) => {
  return (
    <button className="chip">
      <span className="chip-text">{text}</span>
      <div className="border-bottom-div">{text}</div>
    </button>
  );
};

export default Chip;
