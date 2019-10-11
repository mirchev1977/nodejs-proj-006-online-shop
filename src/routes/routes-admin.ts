"use strict";

import express from 'express';

import *  as controllersUser from '../controllers/controllers-admin';

const router = express.Router();

router.get(  '/product/new', controllersUser.getAdminAddProduct );

export default router;