import React ,{useEffect,useState} from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import "../styles/categoryProduct.css"
import { toast } from 'react-hot-toast';
import { useCart } from '../context/cart';

import { NavLink, useNavigate, useParams } from 'react-router-dom';

const CategoryProduct = () => {
  const[cart,setCart]= useCart()
  const params = useParams()
  const navigate = useNavigate();
  const [products,setProducts] = useState([])
  const[category,setCategory] = useState([])
  useEffect(()=>
  {
    if(params?.slug) getProductsByCat()
  },[])
  const getProductsByCat = async()=>
  {
    try {
       const {data} = await axios.get(`/api/v1/product/product-category/${params.slug}`)
      setProducts(data?.products)
      setCategory(data?.category)
    
      } catch (error) {
      console.log(error)

    }
  }
  return (
    <Layout>
    <div>
      <div className="container mt-3">
     
        <h1 className='text-center'>{category?.name}</h1>
        <h1 className='text-center'>{products?.length}</h1>
        <div className="row">
        <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" key={p._id}>
                <NavLink to={`/product/${p.slug}`}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                </NavLink>
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div> */}
        </div>
    
       
      </div>
    </div>
    </Layout>
  )
}

export default CategoryProduct;

