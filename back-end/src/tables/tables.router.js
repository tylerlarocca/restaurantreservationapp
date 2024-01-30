const router = require('express').Router();
const controller = require('./tables.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router
  .route('/:table_id/edit')
  .get(controller.read)
  .put(controller.updateTable)
  .delete(controller.delete)
  .all(methodNotAllowed);

router
  .route('/:table_id/seat')
  .put(controller.assignReservation)
  .delete(controller.deleteReservationId)
  .all(methodNotAllowed);

router
  .route('/')
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

module.exports = router;