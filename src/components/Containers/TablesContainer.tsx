interface IProps {
  title: string;
}

const TablesContainer = ({ title }: IProps) => {
  return <div>{title}</div>;
};

export default TablesContainer;
