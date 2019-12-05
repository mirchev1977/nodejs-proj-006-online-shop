"use strict";

import express from 'express';

import *  as controllersProducts from '../controllers/controllers-products';

const router = express.Router();

router.get(  '/all',            controllersProducts.getAllProducts            );
router.get(  '/mine',           controllersProducts.getMyProducts             );
router.get(  '/add-remove/:id', controllersProducts.getAddRemoveProductToCart );

router.get(  '/cart',           controllersProducts.getCartProducts           );

router.get(  '/buy',            controllersProducts.getBuy                    );
router.get(  '/ordered',        controllersProducts.getOrderItems             );

export default router;