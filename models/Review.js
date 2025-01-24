const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  reviewer: {
    type: String,
    required: true
  },
  comment: {
    type: String
  },
  rating: {
    type: Number,
    default: 0
  }

  
});

module.exports = mongoose.model('Review', reviewSchema);
