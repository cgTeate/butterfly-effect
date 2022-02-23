const router = require("express").Router();
const List = require("../models/List");
const verify = require("../verifyToken");

//CREATE

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//DELETE

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(201).json("The list has been delete...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET

//accept type or genre
router.get("/", verify, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  
  try {

    if (typeQuery) {
      //if choose genre from the dropdown box
      if (genreQuery) {
         //localhost:8800/api/lists?type=series&genre=comedy
        list = await List.aggregate([
          { $sample: { size: 30 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        //if there is no genre chosen
        //localhost:8800/api/lists?type=series  
        list = await List.aggregate([
          { $sample: { size: 30 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      //if it is in homepage, get random movie, aggregate produce reduced and summarized results
      list = await List.aggregate([{ $sample: { size: 30 } }]);
    }
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
