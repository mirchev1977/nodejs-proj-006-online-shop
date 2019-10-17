"use strict";

import express from 'express';

import *  as controllersProducts from '../controllers/controllers-products';

const router = express.Router();

router.get(  '/all', controllersProducts.getAllProducts );

export default router;