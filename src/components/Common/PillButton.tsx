interface Props {
  text: string;
  onClick: () => void;
}

const PillButton = ({ text, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className='inline-flex items-center justify-center rounded-full bg-gray-4 px-4 py-1 text-center text-sm text-white hover:bg-opacity-90 '
    >
      {text}
    </button>
  );
};

export default PillButton;
