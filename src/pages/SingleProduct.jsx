import { useLoaderData } from 'react-router-dom';
import { formatPrice, customFetch, generateAmountOptions } from '../utils';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../feature/cart/cartSlice';

// this return a query func object and pass paramter id
const singleProductQuery = (id) => {
  return {
    queryKey: ['singleProduct', id],
    queryFn: () => {
      return customFetch.get(`products/${id}`);
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    // params.id is from loader
    const { id } = params;
    // ##### ensureQueryData
    // check if data is in the cache and no need to refetch
    // if data is not there then refetch
    const response = await queryClient.ensureQueryData(singleProductQuery(id));
    const product = response.data.data;
    return { product };
  };

// OLD CODE WITHOUT REACT QUERY FOR CACHING
// params from app.js path: products/:id
// export const loader =
//   (queryClient) =>
//   async ({ params }) => {
//     const { id } = params;

//     const response = await customFetch.get(`products/${id}`);
//     const product = response.data.data;
//     return { product };
//   };

const SingleProduct = () => {
  const { product } = useLoaderData();
  const { image, title, company, price, description, colors } =
    product.attributes;

  const [amount, setAmount] = useState(1);
  // use 1st color on colors as default value
  const [productColor, setProuductColor] = useState(colors[0]);

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  // add to cart functionality
  // 1st create a new Object for cart page
  // IMPORTANT: pass/construct an object to addItem as payload
  const cartProduct = {
    cartID: product.id + productColor, // this will generate a unique ID for cart items/ different colors
    productID: product.id,
    image,
    title,
    company,
    price,
    productColor,
    amount,
  };
  const dispatch = useDispatch();
  const addToCart = () => {
    // pass cartProduct object as payload
    dispatch(addItem({ product: cartProduct }));
  };

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full"
        />
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl">{formatPrice(price)}</p>
          <p className="mt-6 leading-8">{description}</p>
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              colors
            </h4>
            <div className="mt-2">
              {colors.map((color) => {
                return (
                  <button
                    key={color}
                    type="button"
                    className={`badge w-6 h-6 mr-2 ${
                      productColor === color && 'border-2 border-secondary'
                    }`}
                    style={{ background: color }}
                    onClick={() => setProuductColor(color)}
                  ></button>
                );
              })}
            </div>
            <div className="form-control w-full max-w-xs">
              <label htmlFor="amount" className="label">
                <h4 className="text-md font-medium -tracking-wider capitalize">
                  amount
                </h4>
              </label>
              <select
                name="amount"
                id="amount"
                className="select select-secondary select-bordered select-md"
                value={amount}
                onChange={handleAmount}
              >
                {generateAmountOptions(20)}
              </select>
            </div>
            <div className="mt-10 ">
              <button className="btn btn-secondary btn-md" onClick={addToCart}>
                Add to bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
