import { useState } from 'react';
import ProductsGrid from './ProductsGrid';
import ProductsList from './ProductsList';
import { useLoaderData } from 'react-router-dom';
import { BsFillGridFill, BsList } from 'react-icons/bs';
const ProductsContainer = () => {
  const [layout, setLayout] = useState('grid');
  const { meta } = useLoaderData(); // access data from loader

  const totalProducts = meta.pagination.total;
  // console.log(totalProducts, 'totalProducts');
  const setActivestyles = (pattern) => {
    return `text-xl btn btn-circle btn-sm ${
      pattern === layout
        ? 'btn-primary text-primary-content'
        : 'btn-ghost text-based-content'
    } `;
  };
  return (
    <>
      <div className="flex justify-between items-center border-b mt-8 pb-5">
        <h4 className="font-medium">
          {totalProducts} product{totalProducts > 1 && 's'}
        </h4>
        <div className="flex gap-x-2">
          <button
            onClick={() => setLayout('grid')}
            className={`${setActivestyles('grid')}`}
          >
            <BsFillGridFill />
          </button>
          <button
            onClick={() => setLayout('list')}
            className={`${setActivestyles('list')}`}
          >
            <BsList />
          </button>
        </div>
      </div>
      <div>
        {totalProducts === 0 ? (
          <h5 className="text-2xl- mt-16">Sorry no products available...</h5>
        ) : layout === 'grid' ? (
          <ProductsGrid />
        ) : (
          <ProductsList />
        )}
      </div>
    </>
  );
};

export default ProductsContainer;
