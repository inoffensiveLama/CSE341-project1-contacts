const contactsController = {};
const mongodb = require("../data/database");
const ObjectID = require("mongodb").ObjectId;

contactsController.getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection("contacts").find();
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts);
    });
};

contactsController.getSingle = async (req, res) => {
    const contactsId = new ObjectID(req.params.id);
    const result = await mongodb.getDatabase().db().collection("contacts").find({_id: contactsId});
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts);
    });
};


contactsController.createContact = async (req, res) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb.getDatabase().db().collection("contacts").insertOne(contact);
    if (result.acknowledged) {
        res.status(201).json({contactID: result.insertedId});
    } else {
        res.status(500).json(result.error || "Some error occured while creating the contact");
    }
};


contactsController.updateContact = async (req, res) => {
    const contactsId = new ObjectID(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb.getDatabase().db().collection("contacts").replaceOne({_id: contactsId}, contact);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || "Some error occured while updating the contact");
    }
};


contactsController.deleteContact = async (req, res) => {
    const contactsId = new ObjectID(req.params.id);
    const result = await mongodb.getDatabase().db().collection("contacts").deleteOne({_id: contactsId});
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || "Some error occured while deleting the contact");
    }
}




module.exports = contactsController;