interface IProps {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}

const Header = ({ sidebarOpen, setSidebarOpen }: IProps) => {
  return <div>Header</div>;
};

export default Header;
