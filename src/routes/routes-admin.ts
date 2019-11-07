"use strict";

import express from 'express';

import *  as controllersUser from '../controllers/controllers-admin';

const router = express.Router();

router.get(  '/product/new',  controllersUser.getAdminAddProduct  );
router.post(  '/product/new', controllersUser.postAdminAddProduct );

router.get(  '/product/edit/:id',     controllersUser.getAdminEditProduct    );
router.post(  '/product/edit',        controllersUser.postAdminEditProduct   );
router.get(   '/product/delete/:id',  controllersUser.getAdminDeleteProduct  );

export default router;