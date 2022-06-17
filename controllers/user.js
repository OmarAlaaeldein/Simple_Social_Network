const sqlConn = require('../databases/db');
const crypto = require

module.exports = {
  login: (req, res) => {
    var cookie = req.cookies.loggedin;
    if(cookie === undefined){
      res.render('login')
    }
    else{
      res.redirect('./~')
    }
  },
  
  getPage: (req, res) => {
    let username = req.body.username;
    let results= ' ';
    if(req.cookies.loggedin == "true") {
        res.render('hello', {username,results})
    }
    res.redirect('./login');
  },
  
  auth: async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    //let hashed_pass = crpto.md5(pass)
    const result = await sqlConn.promise().query(`SELECT * from accounts where username = '${username}' and password = '${password}'`)
    //console.log("here result");
    //console.log(result[0][0]['password']);
    // console.log(req.body);
    let signup = req.body.signup;
    if(signup==="Sign Up"){
      //let hashed_pass = crpto.md5(pass)
      const result2 = await sqlConn.promise().query(`SELECT * from accounts where username = '${username}'`)
      
      //console.log(result[0][0]['password']);
  
      if (result2[0][0]){
        console.log("this username already exists");
        res.render('user_taken')
        
  
      }else{
        sqlConn.promise().query(`insert into accounts (username, password) values ('${username}' ,'${password}');`)
        console.log("new user added");
        results='\nwelcome new user'
        res.render('hello', {username,results})
        
      }


    }
    else{
      if (result[0][0]){
        if(username && password && result[0][0]['password'] === password){
          let options = {
            maxAge: 1000 * 60 * 2 /1000,
            httpOnly: true
          }
          if(!req.cookie)
          res.cookie("loggedin", "true", options);
          let username = req.body.username;
          let results= ' ';
          res.render('hello', {username,results})
        }else{
          
          res.send(401);
        }
      }else{
        console.log("wrong credentials");
        res.render('wrong_creds')
      }
    }
  }
}