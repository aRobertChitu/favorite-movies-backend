const express = require('express');
const router = express.Router();
const Review = require('../models/Review');


router.get('/', async (req, res) => {

  try {

    const { movieId } = req.query;
    let filter = {};
    if (movieId) {
      filter = { movieId };
    }
    const reviews = await Review.find(filter);
    res.json(reviews);
  } catch (err) {

    res.status(500).json({ error: err.message });
    }
});


router.post('/', async (req, res) => {
  try {
    const { movieId, reviewer, comment, rating } = req.body;
    const newReview = new Review({ movieId, reviewer, comment, rating });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {

res.status(400).json({ error: err.message });
  }


});


router.put('/:id', async (req, res) => {

  try {
    const { reviewer, comment, rating } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { reviewer, comment, rating },
            { new: true }
    );  
    if (!updatedReview) {
      return res.status(404).json({ error: 'Recenzia nu a fost găsită' });
    }
res.json(updatedReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }


});

router.delete('/:id', async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ error: 'Recenzia nu a fost găsită' });
    }
    res.json({ message: 'Recenzia a fost ștearsă cu succes' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }


});




module.exports = router;
