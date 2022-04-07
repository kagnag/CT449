const mongoose = require("mongoose");
const { BadRequestError } = require("../errors");
const Contact = require("../models/contact.model");
// const handlePromise = require("../helpers/promise.helper");

exports.create = async (req, res) => {
  res.send({ message: "create handler" });
};

exports.findAll = async (req, res) => {
  res.send({ message: "findAll handler" });
};

exports.findOne = async (req, res) => {
  res.send({ message: "findOne handler" });
};

exports.update = async (req, res) => {
  res.send({ message: "update handler" });
};

exports.delete = async (req, res) => {
  res.send({ message: "delete handler" });
};

exports.deleteAll = async (req, res) => {
  res.send({ message: "deleteAll handler" });
};

exports.findAllFavorite = async (req, res) => {
  res.send({ message: "findAllFavorite handler" });
};

// Create and Save a new Contact
exports.create = async (req, res, next) => {
  // Validate request
  if (!req.body.name) {
    return next(new BadRequestError(400, "Name can not be empty"));
  }

  // Create a contact
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    favorite: req.body.favorite === true,
  });

  // // Save contact in the database
  // const [error, document] = await handlePromise(contact.save());

  // if (error) {
  //   return next(
  //     new BadRequestError(500, "An error occurred while creating the contact")
  //   );
  // }

  // return res.send(document);

  try {
    const document = await contact.save();
    return res.send(document);
  } catch (error) {
    return next(
      new BadRequestError(500, "An error occurred while creating the contact")
    );
  }
};

// Retrieve all contacts of a user from the database
exports.findAll = async (req, res, next) => {
  const condition = {};
  const { name } = req.query;
  if (name) {
    condition.name = { $regex: new RegExp(name), $options: "i" };
  }

  // const [error, documents] = await handlePromise(Contact.find(condition));

  // if (error) {
  //   return next(
  //     new BadRequestError(500, "An error occured while retrieving contacts")
  //   );
  // }

  // return res.send(documents);

  try {
    const documents = await Contact.find(condition);
    return res.send(documents);
  } catch (error) {
    return next(
      new BadRequestError(500, "An error occured while retrieving contacts")
    );
  }
};

// Find a single contact with an id
exports.findOne = async (req, res, next) => {
  const { id } = req.params;
  const condition = {
    _id: id && mongoose.isValidObjectId(id) ? id : null,
  };

  // const [error, document] = await handlePromise(Contact.findOne(condition));

  // if (error) {
  //   return next(
  //     new BadRequestError(
  //       500,
  //       "Error retrieving contact with id=${req.params.id)"
  //     )
  //   );
  // }

  // if (!document) {
  //   return next(new BadRequestError(404, "Contact not found"));
  // }

  // return res.send(document);

  try {
    const document = await Contact.findOne(condition);
    if (!document) {
      return next(new BadRequestError(404, "Contact not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new BadRequestError(
        500,
        `Error retrieving contact with id=${req.params.id}`
      )
    );
  }
};

// Update a contact by the id in the request
exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new BadRequestError(400, "Data to update can not be empty"));
  }

  const { id } = req.params;
  const condition = {
    _id: id && mongoose.isValidObjectId(id) ? id : null,
  };

  // const [error, document] = await handlePromise(
  //   Contact.findOneAndUpdate(condition, req.body, {
  //     new: true,
  //   })
  // );

  // if (error) {
  //   return next(
  //     new BadRequestError(500, "Error update contact with id=${req.params.id}")
  //   );
  // }

  // if (!document) {
  //   return next(new BadRequestError(404, "Contact not found"));
  // }

  // return res.send({ message: "Contact was updated successfully" });

  try {
    const document = await Contact.findOneAndUpdate(condition, req.body, {
      new: true,
    });
    if (!document) {
      return next(new BadRequestError(404, "Contact not found"));
    }
    return res.send({ message: "Contact was updated successfully" });
  } catch (error) {
    return next(
      new BadRequestError(500, `Error update contact with id=${req.params.id}`)
    );
  }
};

// Delete a contact with the specified id in the request

exports.delete = async (req, res, next) => {
  const { id } = req.params;
  const condition = {
    _id: id && mongoose.isValidObjectId(id) ? id : null,
  };

  // const [error, document] = await handlePromise(
  //   Contact.findOneandDelete(condition)
  // );

  // if (error) {
  //   return next(
  //     new BadRequestError(
  //       500,
  //       "Could not delete contact with id=${req.params.id}"
  //     )
  //   );
  // }

  // if (!document) {
  //   return next(new BadRequestError(404, "Contact not found"));
  // }
  // return res.send({ message: "Contact was deleted successfully" });

  try {
    const document = await Contact.findOneAndDelete(condition);
    if (!document) {
      return next(new BadRequestError(404, "Contact not found"));
    }
    return res.send({ message: "Contact was deleted successfully" });
  } catch (error) {
    return next(
      new BadRequestError(
        500,
        `Could not delete contact with id=${req.params.id}`
      )
    );
  }
};

// Fill all favorite constact of a user
exports.findAllFavorite = async (req, res, next) => {
  // const [error, documents] = await handlePromise(
  //   Contact.find({ favorite: true })
  // );

  // if (error) {
  //   return next(
  //     new BadRequestError(
  //       500,
  //       "An error occured while retrieving favorite contact"
  //     )
  //   );
  // }

  // return res.send(documents);

  try {
    const documents = await Contact.find({ favorite: true });
    return res.send(documents);
  } catch (error) {
    return next(
      new BadRequestError(
        500,
        "An error occured while retrieving favorite contact"
      )
    );
  }
};

// Delete all contacts of a user from the database
exports.deleteAll = async (req, res, next) => {
  // const [error, data] = await handlePromise(Contact.deleteMany({}));

  // if (error) {
  //   return next(
  //     new BadRequestError(500, "An error occurred while removing all contacts")
  //   );
  // }

  // return res.send({
  //   message: "${data.deleteCount} contact were deleted successfully",
  // });

  try {
    const data = await Contact.deleteMany({});
    return res.send({
      message: `${data.deletedCount} contact were deleted successfully`,
    });
  } catch (error) {
    return next(
      new BadRequestError(500, "An error occurred while removing all contacts")
    );
  }
};
