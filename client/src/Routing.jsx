import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./features/DefaultLayout";
import App from "./App";
import Home from "./features/Home";
import Login from "./features/Login";
import Register from "./features/Register";
import Products from "./features/Products";
import Pagenotfound from "./features/Pagenotfound";
import Cart from "./features/Cart";
import Dashboard from "./features/Admin/Dashboard";
import AdminLayout from "./features/Admin/AdminLayout";
import AddCategory from "./features/Admin/AddCategory";
import ViewCategory from "./features/Admin/ViewCategory";
import AddSlider from "./features/Admin/AddSlider";
import ViewSlider from "./features/Admin/ViewSlider";
import AddProduct from "./features/Admin/AddProduct";
import ViewProduct from "./features/Admin/ViewProduct";
import ProductDetails from "./features/ProductDetails";
import { Protected, ProtectedAdmin } from "./features/hiddenlinks";
import CheckoutDetails from "./features/CheckoutDetails";
import Checkout from "./features/Checkout";
import CheckoutSuccess from "./features/CheckoutSuccess";
import MyOrders from "./features/MyOrders";
import MyOrderDetails from "./features/MyOrderDetails";
import Orders from "./features/Admin/Orders";
import OrderDetails from "./features/Admin/OrderDetails";

const routerPath = createBrowserRouter([
    {
      path: "/",
      element:<DefaultLayout> <App/></DefaultLayout>,
      children:[
        {path:'',element:<Home/>},
        {path:'login',element:<Login/>},
        {path:'register',element:<Register/>},
        {path:'products',element:<Products/>},   
        {path:'product-details/:id',element:<ProductDetails/>}, 
        {path:'cart',element:<Cart/>},   
        {path:'checkout-details',element:<Protected><CheckoutDetails/></Protected>},
        {path:'checkout',element:<Protected><Checkout/></Protected>},
        {path:'checkout-success',element:<Protected><CheckoutSuccess/></Protected>},
        {path:'myorders',element:<Protected><MyOrders/></Protected>},
        {path:'myorders/details/:id',element:<Protected><MyOrderDetails/></Protected>},
      ]
    },
    {path:'/admin',element:<ProtectedAdmin><AdminLayout></AdminLayout></ProtectedAdmin>,
    children :[
      {path:'',element:<Dashboard/>},
      {path:'addcategory',element:<AddCategory/>},
      {path:'viewcategory',element:<ViewCategory/>},
      {path:'editcategory/:id',element:<AddCategory/>},
      {path:'addslider',element:<AddSlider/>},
      {path:'viewslider',element:<ViewSlider/>},
      {path:'editslider/:id',element:<AddSlider/>},
      {path:'addproduct',element:<AddProduct/>},
      {path:'viewproduct',element:<ViewProduct/>},
      {path:'editproduct/:id',element:<AddProduct/>},
      {path:'orders',element:<Orders/>},
      {path:'orders/details/:id',element:<OrderDetails/>},
    ]
  },
    {path:'*',element:<Pagenotfound/>}
  ]);

  export default routerPath