import React,{useState,useEffect} from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

const CartPage = () => {
  const [instance, setInstance] = useState("")
  const [loading,setLoading] =useState(false)
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const[clientToken,setClientToken]= useState("")
  const navigate = useNavigate();

  const totalPrice =()=>
  {
    try {
        let total=0;
         cart?.map(item => {total= total+item.price})
         return total;
    } catch (error) {
        console.log(error)
    }
  }
  const removeCartItem =(pid)=>
  {
    try {
         let myCart= [...cart]
         let index = myCart.findIndex(item=> item._id=== pid)
         myCart.splice(index,1)
         setCart(myCart)
         localStorage.setItem('cart',JSON.stringify(myCart))
    } catch (error) {
        console.log(error);
    }
  }


  const getToken = async()=>
  {
    try {
      const {data} = await axios.get('/api/v1/product/braintree/token')
      setClientToken(data?.clientToken)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>
  {
     getToken()
  },[auth?.token])

  const handlePayment= ()=>
  {

  }
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length 
                ? `You have ${cart.length} items in your cart ${auth?.token ? "": "please login to checkout"}`
                : "your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                
                    {
                        cart?.map(p=>(
                            <div className="row mb-2 p-3 card flex-row">
                                <div className="col-md-4 ">
                                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  width={"75px"}
                  height= {"200px"}
                />
                                </div>
                                <div className="col-md-8">
                                   <p>{p.name}</p>
                                   <p>{p.description.substring(0,30)}</p>
                                   <p>Price:{p.price}</p>
                                   <button className="btn btn-danger" onClick={()=>removeCartItem(p._id)}>remove</button>
                                </div>
                            </div>
                        ))
                    }
                
            </div>
            <div className="col-md-4 text-center">
             <h2>Cart summary</h2>
             <p>Total | Checkout | payment</p>
             <hr />
             <h4>Total : {totalPrice()}</h4>
             {auth?.user?.address?(
              <>
              <div className="mb-3"></div>
              <h4>Current address</h4>
              <h5>{auth?.user?.address}</h5>
              <button className="btn btn-outline-warning" onClick={()=>navigate('/dashboard/user/profile')}>Update Address</button>
              </>
             ):(
              <div className="mb-3">
                {
                  auth?.token?(
                    <button className="btn btn-outline-warning"  onClick={()=>navigate('/dashboard/user/profile')}>Update Address</button>
                  ):(
                     <button  onClick={()=>navigate('/login',
                    { state:'/cart'})}>Please login to checkout</button>
                  )
                }
              </div>
             )}

             <div className="mt-2">
             <DropIn
            options={{ authorization: clientToken,
            paypal:{
              flow:'valut'
            } }}
            onInstance={(instance) => setInstance(instance)}
          />
          <button className="btn btn-primary" onClick={handlePayment}>Make Payment</button>
             </div>
            </div>

        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
