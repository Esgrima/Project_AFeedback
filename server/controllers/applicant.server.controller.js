
/* Dependencies */
var mongoose = require('mongoose'),
  Applicant = require('../models/listing.js');

/* Create a listing */
exports.create = function (req, res) {
  /* Instantiate a Listing */
  var newListing = new Listing(req.body);
  console.log(newListing);

  /* Then save the listing */
  newListing.save(function (err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(newListing);
    }
  });
};

/* Show the current listing */
exports.read = function (req, res) {
  /* send back the listing as json from the request */
  res.json(req.listing);
};

/* Update a listing *///////////////////////////////////////////////////////////////////////////////////////////////////////
exports.update = function (req, res) {
  var listing = req.listing;
  listing.name = req.body.name;
  listing.role = req.body.role;
  listing.classes = req.body.classes;
  listing.twitter = req.body.twitter;
  listing.slack = req.body.slack;
  listing.linkedin = req.body.linkedin;
  listing.email = req.body.email;
  listing.information = req.body.information;
  listing.createdBy = req.body.createdBy;
  // Then save the listing
  listing.save(function (err) {
    if (err) {
      console.log('error is here');
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });
};

/* Delete a listing */
exports.delete = function (req, res) {
  var listing = req.listing;
  Listing.findOneAndRemove({ name: listing.name }, function (err) {
    if (err) throw err;
    res.json(listing);
    console.log('Listing deleted!');
  });

  /** TODO **/
  /* Remove the article */
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function (req, res) {
  Listing.find({}, function (err, listings) {
    if (err) throw err;
    res.json(listings);
  })
};


/*
  Middleware: find a listing by its ID, then pass it to the next request handler.

  Find the listing using a mongoose query,
        bind it to the request object as the property 'listing',
        then finally call next
 */
exports.listingByID = function (req, res, next, id) {
  Listing.findById(id).exec(function (err, listing) {
    if (err) {
      res.status(400).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });
};

exports.listingByEmail = function (req, res, next, email) {
  Listing.findOne({ 'email': email }).exec(function (err, listing) {
    if (err) {
      res.status(400).send(err);
      console.log(listing);
    } else {
      console.log(listing);
      req.listing = listing;
      next();
    }
  });
};
