"use strict";

import express from 'express';

import *  as controllersUser from '../controllers/controllers-admin';

const router = express.Router();

router.get(  '/product/new',  controllersUser.getAdminAddProduct  );
router.post(  '/product/new', controllersUser.postAdminAddProduct );

router.get(  '/product/edit/:id',  controllersUser.getAdminEditProduct  );
router.post(  '/product/edit',     controllersUser.postAdminEditProduct  );

export default router;