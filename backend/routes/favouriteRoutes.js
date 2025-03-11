const express = require("express");
const Favourite = require("../models/Favourite");

const router = express.Router();

router.post("/api/favourites", async (req, res) => {
  const { university } = req.body;
  const startTime = Date.now(); 

  try {
    const favourite = new Favourite(university);
    console.log(favourite);
    await favourite.save();
    res.json(favourite); 

    const duration = Date.now() - startTime; 
    const statusCode = res.statusCode; 
    console.log(`[POST] ${req.originalUrl} - ${statusCode} - ${duration}ms`);
  } catch (error) {
    console.error("Error adding to favourites:", error);
    res.status(500).json({ message: "Error adding to favourites" });

    const duration = Date.now() - startTime;
    const statusCode = res.statusCode; 

    console.log(`[POST] ${req.originalUrl} - ${statusCode} - ${duration}ms`);
  }
});


router.get("/api/favourites", async (req, res) => {
  const startTime = Date.now(); 

  try {
    const favourites = await Favourite.find({});
    res.json(favourites);
    const duration = Date.now() - startTime; 
    const statusCode = res.statusCode; 

    console.log(`[GET] ${req.originalUrl} - ${statusCode} - ${duration}ms`);
  } catch (error) {
    console.error("Error fetching favourites:", error);
    res.status(500).json({ message: "Error fetching favourites" });

    const duration = Date.now() - startTime;
    const statusCode = res.statusCode; 

    console.log(`[GET] ${req.originalUrl} - ${statusCode} - ${duration}ms`);
  }
});

router.delete("/api/favourites/:id", async (req, res) => {
  const { id } = req.params;
  const startTime = Date.now();

  try {
    await Favourite.findByIdAndDelete(id);
    res.json({ message: "Favourite removed" });
    const duration = Date.now() - startTime; 
    const statusCode = res.statusCode;

    console.log(`[DELETE] ${req.originalUrl} - ${statusCode} - ${duration}ms`);
  } catch (error) {
    console.error("Error removing favourite:", error);
    res.status(500).json({ message: "Error removing favourite" });

    const duration = Date.now() - startTime;
    const statusCode = res.statusCode; 

    console.log(`[DELETE] ${req.originalUrl} - ${statusCode} - ${duration}ms`);
  }
});

module.exports = router;
