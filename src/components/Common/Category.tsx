import { camelCase } from '@/utils/string';

interface Props {
  category: ICategory;
}

const Category = ({ category }: Props) => {
  const categoryColors: ICategoryColors = {
    accounts: 'bg-primary',
    stocks: 'bg-category-teal',
    crypto: 'bg-category-green',
    realEstate: 'bg-category-pink',
    cars: 'bg-category-purple',
    other: 'bg-category-red',
  };

  return (
    <div className='grid grid-flow-col auto-cols-max gap-2'>
      <div
        className={`w-2 h-2 rounded-full mt-2  ${categoryColors[camelCase(category._id) as keyof ICategoryColors]}`}
      />
      <div>
        <h5>{category._id}</h5>
        <div>{category.count}</div>
      </div>
    </div>
  );
};

export default Category;
