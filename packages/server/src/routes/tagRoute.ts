/**
 * Route synchronisation requests
 * @description Redirect request from /sync to the proper controller call
 */

import express from 'express';

const sync = express();

import tagController from '../controllers/tagController';

sync.route('/')
    .post(tagController.createTag);

export default sync;