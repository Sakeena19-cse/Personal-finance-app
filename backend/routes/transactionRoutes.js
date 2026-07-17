const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const authMiddleware = require("../middleware/authMiddleware");

// Add Transaction
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const newTransaction = new Transaction({
      ...req.body,
      user: req.user.id,
    });

    await newTransaction.save();
    res.json(newTransaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Transactions
router.get("/", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user.id,
    }).sort({ date: -1 });

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/:id", authMiddleware, async(req,res)=>{
  try{
    const transaction = await Transaction.findOne({
      _id:req.params.id,
      user:req.user.id,

    });

    if(!transaction){
      return res.status(404).json({message:"Transaction not found",

      });
    }
    res.json(transaction);
  }
  catch(err){
    res.status(500).json({error: err.message});
  }

});

// Delete Transaction
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Update Transaction
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Transaction.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;