interface Props {
  text: string;
  isActive: boolean;
  onClick: () => void;
}

const PillButton = ({ text, isActive, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`font-medium inline-flex items-center justify-center rounded-full border px-4 py-1 text-center text-sm bg-gray-1 text-black dark:text-white dark:bg-gray-4 dark;text-white hover:bg-opacity-90 ${isActive ? 'text-primary border-primary  dark:border-white' : 'border-stroke dark:border-gray-4'}`}
    >
      {text}
    </button>
  );
};

export default PillButton;
