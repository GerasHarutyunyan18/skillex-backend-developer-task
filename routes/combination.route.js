const express = require("express");
const { latinaAlphabetLength, latinaAlphabet } = require("../utils/constant");
const CustomError = require("../errors/customError");
const { generateCombinations } = require("../utils/helper");
const {
  createCombination,
  createResponse,
  createItem,
} = require("../databseServices");

const router = express.Router();

/**
 * @swagger
 * /api/combination/generate:
 *   post:
 *     summary: Generate ticket combinations
 *     tags: [Combinations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *               - length
 *             properties:
 *               items:
 *                 type: array
 *                 example: [2, 3]
 *                 items:
 *                   type: integer
 *               length:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Successfully created combinations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 combination:
 *                   type: string
 *                   example: '[["A1", "B1"], ["A1", "B2"], ["A2", "B1"], ["A2", "B2"]]'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: '`items` must be a non-empty array'
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'An unexpected error occurred'
 */
router.post("/generate", async (req, res) => {
  try {
    const { items, length } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      throw new CustomError("`items` must be a non-empty array", 400);
    }

    if (items.length >= latinaAlphabetLength) {
      throw new CustomError(
        `\`items\` length must be less than the Latina alphabet length:(${latinaAlphabetLength})`,
        400,
      );
    }

    const allItems = [];
    for (let i = 0; i < items.length; i++) {
      const tempItem = [];
      for (let j = 0; j < items[i]; j++) {
        const ticket = latinaAlphabet[i] + String(j + 1);
        tempItem.push(ticket);
      }
      allItems.push(tempItem);
    }
    const result = generateCombinations(allItems, length);

    await Promise.all(allItems.flat().map((value) => createItem(value)));

    const combinationId = await createCombination(result);

    const response = await createResponse(allItems, length, combinationId);

    res.status(201).json({ ...response });
  } catch (error) {
    console.error("[/generate]", error);
    const message = error.message || "An unexpected error occurred";
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message });
  }
});

module.exports = router;
