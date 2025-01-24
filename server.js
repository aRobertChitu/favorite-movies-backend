require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const movieRoutes = require('./routes/MovieRoutes.js');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {

  useNewUrlParser: true,
  useUnifiedTopology: true

}).then(() => {

  console.log("Conectat la MongoDB!");

}).catch((error) => {

  console.error("Eroare la conectarea MongoDB:", error);

});

app.use('/api/movies', movieRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {

  console.log(`Server pornit pe portul ${PORT}`);

});
