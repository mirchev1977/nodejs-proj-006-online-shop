"use strict";

import express from 'express';

import *  as controllersUser from '../controllers/controllers-user';

const router = express.Router();

router.get(  '/register', controllersUser.getUsrRegister  );
router.post( '/register', controllersUser.postUsrRegister );

router.get(  '/login', controllersUser.getUsrLogin );
router.post( '/login', controllersUser.postUsrLogin );

export default router;