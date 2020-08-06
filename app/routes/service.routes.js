module.exports = (app) => {
    const service = require('../controllers/service.controller');

    // Create a new Service
    app.post('/service/create', service.create);

    // Retrieve all services
    app.get('/service', service.findAll);

    // Retrieve a single Service with serviceId
    app.get('/service/:planId', service.findOne);

    // Update a Service with serviceId
    app.put('/service/:planId', service.update);

    // Delete a Service with serviceId
    app.delete('/service/:planId', service.delete);

};