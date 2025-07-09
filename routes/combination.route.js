const express = require("express");
const { latinaAlphabetLength, latinaAlphabet } = require("../utils/constant");
const CustomError = require("../errors/customError");
const { generateCombinations } = require("../utils/helper");

const router = express.Router();

router.post("/generate", (req, res) => {
  try {
    const items = [4, 10, 3];
    const length = 2;

    if (length >= latinaAlphabetLength) {
      throw new CustomError(
        "Length must be less than the Latina alphabet length",
        400,
      );
    }

    const allItems = [];
    for (let i = 0; i < items.length; i++) {
      const tempItem = []
      for (let j = 0; j < items[i]; j++) {
        const ticket = latinaAlphabet[i] + String(j + 1);
        tempItem.push(ticket);
      }
      allItems.push(tempItem);
    }
    generateCombinations(allItems, length);
    res.status(201).json({ result: allItems });
  } catch (error) {
    console.error("[/generate]", error);
    const message = error.message || "An unexpected error occurred";
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message });
  }
});

module.exports = router;
