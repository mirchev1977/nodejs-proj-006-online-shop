"use strict";

import express from 'express';

import *  as controllersUser from '../controllers/controllers-admin';

const router = express.Router();

router.get(  '/product/new', controllersUser.getAdminAddProduct );
router.post(  '/product/new', controllersUser.postAdminAddProduct );

export default router;