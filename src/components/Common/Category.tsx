import { camelCase } from '@/utils/string';

interface Props {
  category: ICategory;
}

const Category = ({ category }: Props) => {
  const categoryColors: ICategoryColors = {
    accounts: 'bg-category-blue',
    stocks: 'bg-category-teal',
    crypto: 'bg-category-green',
    realEstate: 'bg-category-pink',
    cars: 'bg-category-purple',
    other: 'bg-category-red',
  };

  return (
    <div className='grid grid-flow-col auto-cols-max gap-2'>
      <div
        className={`w-2 h-2 rounded-full mt-2  ${categoryColors[camelCase(category.type) as keyof ICategoryColors]}`}
      />
      <div>
        <h5>{category.type}</h5>
        <div>69%</div>
      </div>
      {/* <div className='flex items-center'>
        <div className='w-2 h-2 rounded-full mr-2 invisible' />
      </div> */}
    </div>
  );
};

export default Category;
