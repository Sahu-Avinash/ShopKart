import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProduct,
  productcategoryController,
  productCountController,
  ProductFilterController,
  productListController,
  productPhotoController,
  relatedPrtoductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


// requireSignIn,
//   isAdmin,
router.post(
  "/create-product",
  
  
  formidable(),
  createProductController
);

router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);
router.get("/get-product", getProductController);

router.get("/get-product/:slug", getSingleProduct);

router.get("/product-photo/:pid", productPhotoController);

router.delete("/delete-product/:pid", deleteProductController);

router.post('/product-filters',ProductFilterController);

router.get('/product-count',productCountController);

router.get('/product-list/:page', productListController);

router.get('/search/:keywords',searchProductController);

router.get('/related-product/:pid/:cid',relatedPrtoductController);

router.get('/product-category/:slug', productcategoryController);

export default router;
