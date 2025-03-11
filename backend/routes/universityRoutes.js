const express = require("express");
const axios = require("axios");
const University = require("../models/University");
const Favourites = require("../models/Favourite");

const router = express.Router();

async function populateFromJson() {
  try {
    const response = await axios.get(
      "https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json"
    );

    const universities = response.data.map((uni) => ({
      name: uni.name,
      country: uni.country,
      state_province: uni["state-province"] || null,
      web_pages: uni.web_pages,
      domains: uni.domains,
    }));
    if (universities.length > 0) {
      await University.insertMany(universities);
      console.log("Database populated with university data from JSON.");
    }
  } catch (error) {
    console.error("Error populating from JSON:", error);
  }
}

router.get("/api/universities", async (req, res) => {
  const { country, name } = req.query;
  const startTime = Date.now();    
  try {
    const universityCount = await University.countDocuments();
    if (universityCount === 0) {
      await populateFromJson();
    }
    const query = {};
    if (country) query.country = country;
    if (name) query.name = new RegExp(name, "i");
    let universities = await University.find(query);

    const favouriteUnis = await Favourites.find();

    const favUniIds = favouriteUnis
      .filter((fav) => universities.some((uni) => uni._id.equals(fav._id))) // Only include favs in the search results
      .map((fav) => fav._id.toString());

    universities = universities.map((uni) => {
      const isFavourite = uni._id
        ? favUniIds.includes(uni._id.toString())
        : false;

      return {
        ...uni._doc, 
        isFavourite, 
      };
    });

    const countries = await University.distinct("country");

    res.status(200).json({ universities, countries });
  } catch (error) {
    console.error("Error fetching universities:", error);
    res.status(500).json({ message: "Error fetching universities" });
  } finally {
    const duration = Date.now() - startTime; 
    const statusCode = res.statusCode; 

    console.log(
      `[${req.method}] ${req.originalUrl} - ${statusCode} - ${duration}ms`
    );
  }
});

module.exports = router;
