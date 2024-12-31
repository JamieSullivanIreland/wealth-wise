interface Props {
  category: ICategory;
}

const Category = ({ category }: Props) => {
  return (
    <div>
      <div className='flex items-center'>
        <div className='w-2 h-2 rounded-full bg-white mr-2' />
        <h5>{category.type}</h5>
      </div>
      <div className='flex items-center'>
        <div className='w-2 h-2 rounded-full bg-white mr-2 invisible' />
        <div>69%</div>
      </div>
    </div>
  );
};

export default Category;
