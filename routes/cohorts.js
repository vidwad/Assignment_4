const express = require("express");
const router = express.Router();
const knex = require("../db/client");



router.get("/", (req, res) => {
  knex("cohorts")
    .orderBy("id", "ASC")
    .then(cohorts => {
     res.render("cohorts/index", { cohorts: cohorts });
    });
});


router.get("/new", (req, res) => {
  res.render("cohorts/new");
});



// NAME: cohorts#create, METHOD: POST, PATH: /cohorts
router.post("/", (req, res) => {
  knex("cohorts") // --- START SQL
    .insert({
      logo_url: req.body.logo_url,
      members: req.body.members,
      cname : req.body.cname
    })
    .returning("*") // --- END SQL
    .then(data => {
      
      const cohorts = data[0];
      res.redirect(`/cohorts/${cohorts.id}`);
    });
});



// NAME: cohorts#show, METHOD: GET, PATH: /cohorts/:id


router.get("/:id", (req, res) => {
  const id = req.params.id;

  console.log("show get started")
    knex("cohorts")
    .where("id", id)
    .first() // when an array is returned as data, only return the first value
    .then(cohorts => {
      if (cohorts) {
        res.render("cohorts/show", { cohorts: cohorts });
      } else {
        res.send(`Cannot find cohort with id=${id}`);
      }
    });
});



// THIS IS THE NEW FUNCTION FOR THE TEAM ASSIGNMENT

// router.post('/cohorts/:id', (req, res) => {
router.get('/show/:id', (req, res) => {
  const id = req.params.id;  
  const qty = req.query.qty;
  const picMethod = req.query.picMethod;
  
  //console.log(req.query);

  knex("cohorts")
    .where("id", id)
    .first() // when an array is returned as data, only return the first value
    .then(cohorts => {
   
    teamArray=cohorts.members.split(",")
    //console.log(teamArray);
      
    //shuffle(teamArray);
      var n = teamArray.length;
      var tempArr = [];
      for ( var i = 0; i < n-1; i++ ) {
      tempArr.push(teamArray.splice(Math.floor(Math.random()*teamArray.length),1)[0]);
      }
      tempArr.push(teamArray[0]);
      
      //console.log("Radomized array :" + tempArr);
      //console.log("Radomized type :" + picMethod);
      console.log("Quantity :" + qty);
      newteamArray=[];
    
    if (picMethod=="byteam") {
        
      var i, j, str, temparray, chunk = tempArr.length/qty;
      for (i=0 ; i<tempArr.length; i+=chunk){
      temparray=tempArr.slice(i, i+chunk);
        
        str=temparray[0]
        for (j=1 ; j<temparray.length; j=j+1){
          str = str + " * " + temparray[j];
        }
      newteamArray.push(str);
      console.log(newteamArray);
      str=""
      }
        
    } else { 

      var i, j, str, temparray, chunk = qty;
      for (i=0 ; i<tempArr.length; i+=chunk){
      temparray=tempArr.slice(i, i+chunk);
        
        str=temparray[0]
        for (j=1 ; j<temparray.length; j=j+1){
          str = str + " * " + temparray[j];
        }
      newteamArray.push(str);
      console.log(newteamArray);
      str=""
      }

    };
    
  res.render('cohorts/show', {cohorts : cohorts, picMethod: picMethod, qty: qty, newteamArray : newteamArray});
  });
});



// NAME: cohorts#destroy, METHOD: DELETE, PATH: /cohorts/:id
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  knex("cohorts")
    .where("id", id)
    .del()
    .then(() => {
      res.redirect("/cohorts");
    });
});



module.exports = router;
