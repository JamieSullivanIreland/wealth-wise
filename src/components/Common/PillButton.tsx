interface Props {
  text: string;
  onClick: () => void;
}

const PillButton = ({ text, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className='inline-flex items-center justify-center rounded-full border border-stroke dark:border-0 bg-gray-1 text-black dark:text-white dark:bg-gray-4 px-4 py-1 text-center text-sm dark;text-white hover:bg-opacity-90 '
    >
      {text}
    </button>
  );
};

export default PillButton;
