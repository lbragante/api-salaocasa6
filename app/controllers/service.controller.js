const Service = require('../models/service.model');


// Create and save a new Service
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: 'Service content can not be empty'
        });
    }
    // Create a Service
    const service = new Service(req.body);
    // Save Service in the database
    service.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Service'
            });
        });
};


// Retrieve and return all Services from the database
exports.findAll = (req, res) => {
    Service.find().sort({
        price: 1
    }).then(services => {
        res.send(services);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving services'
        });
    });
};


// Find a single Service with a serviceId
exports.findOne = (req, res) => {
    Service.findById(req.params.serviceId)
        .then(service => {
            if (!service) {
                return res.status(404).send({
                    message: "Service not found with id " + req.params.serviceId
                });
            }
            res.send(service);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Service not found with id " + req.params.serviceId
                });
            }
            return res.status(500).send({
                message: "Error retrieving service with id " + req.params.serviceId
            });
        });
};


// Update a service identified by the Id in the request
exports.update = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: 'Service content can not be empty'
        });
    }
    // Find note and update it with the request body
    Service.findByIdAndUpdate(req.params.serviceId, req.body, { new: true })
        .then(service => {
            if (!service) {
                return res.status(404).send({
                    message: 'Service not found with id ' + req.params.serviceId
                });
            }
            res.send(service);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Service not found with id ' + req.params.serviceId
                });
            }
            return res.status(500).send({
                message: 'Error updating service with id ' + req.params.serviceId
            });
        });
};


// Delete a Service with the specified serviceId in the request
exports.delete = (req, res) => {
    Service.findByIdAndRemove(req.params.serviceId)
        .then(service => {
            if (!service) {
                return res.status(404).send({
                    message: "Service not found with id " + req.params.serviceId
                });
            }
            res.send({ message: "service deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Service not found with id " + req.params.serviceId
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.serviceId
            });
        });
};