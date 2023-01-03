const moment = require("moment");
const transactionModel = require("../models/transactionModel");


// getting all transactions ----------------------------------------------------------
const getAllTransaction = async (req, res) => {

  try {
    const { frequency, selectedDate, type } = req.body;
    const transactions = await transactionModel.find({...(frequency !== "custom" ? {
            date: { $gt: moment().subtract(Number(frequency), "d").toDate(), },
          } : {
            date: { $gte: selectedDate[0], $lte: selectedDate[1], },
          }),
      userid: req.body.userid, ...(type !== "all" && { type }),}); 
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json(erorr);
  }
};
// ------------------------------------------------------------------------------------


 // delete transaction -----------------------------------------------------------------
const deleteTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndDelete({ _id: req.body.transactionId }); 
    res.status(200).send("Transaction Deleted!");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
// -------------------------------------------------------------------------------------


// edit transaction --------------------------------------------------------------------
const editTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndUpdate(
      { _id: req.body.transactionId }, req.body.payload );
    res.status(200).send("Edit SUccessfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
// -------------------------------------------------------------------------------------


// add transaction ---------------------------------------------------------------------

const addTransaction = async (req, res) => {
  try {
   
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).send("Transaction Created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
// -------------------------------------------------------------------------------------

module.exports = { getAllTransaction, addTransaction, editTransaction, deleteTransaction,};