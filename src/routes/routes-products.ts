"use strict";

import express from 'express';

import *  as controllersProducts from '../controllers/controllers-products';

const router = express.Router();

router.get(  '/all',            controllersProducts.getAllProducts            );
router.get(  '/mine',           controllersProducts.getMyProducts             );
router.get(  '/add-remove/:id', controllersProducts.getAddRemoveProductToCart );

router.get(  '/cart',     controllersProducts.getCartProducts    );

export default router;