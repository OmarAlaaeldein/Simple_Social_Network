const sqlConn = require('../databases/db');
const crypto = require('crypto');
let globuser='';
module.exports = {
  login: (req, res) => {
    var cookie = req.cookies.loggedin;
    console.log(globuser);
    if(cookie === undefined){
      res.render('login')
    }
    else{
      res.redirect('./~')
    }
  },

  hello: (req, res) => {
    let username='';
    let results='';
    if(!username)username=globuser;
    res.render('hello',{username,results})
  },
  
  
  logout: (req, res) => {
    let options = {
      maxAge: 1000 * 60 * 2/1000,
      httpOnly: true
    }
    res.cookie("loggedin", "false", options);
    if(!globuser)globuser='';
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
    if (username!=undefined && username!='')
      globuser=username;
    console.log(globuser);
    // console.log('username:',username,'.')
    if(req.cookies.loggedin == "true") {
      if(!username)username=globuser;
        
        res.render('hello', {username,results})
    }
    res.redirect('./login');
  },
  
  newpost: (req, res) => {
    let options = {
      maxAge: 1000 * 60 * 2/1000,
      httpOnly: true
    }
    var results='';
    var post_text=req.body.post_text;
    var username=globuser;
    sqlConn.promise().query(`insert into posts (username, post) values ('${globuser}' ,'${post_text}');`);
    res.render('hello',{username,results})
    },
  follow: (req, res) => {
      let options = {
        maxAge: 1000 * 60 * 2/1000,
        httpOnly: true
      }
      var results='';
      var followee_name=req.body.followee_name;
      var username=globuser;
      sqlConn.promise().query(`insert into followers (username, follow) values ('${globuser}' ,'${followee_name}');`);
      console.log(globuser,'followed',followee_name);
      res.render('hello',{username,results})
      },
  unfollow: (req, res) => {
      let options = {
        maxAge: 1000 * 60 * 2/1000,
        httpOnly: true
      }
      var results='';
      var followee_name=req.body.followee_name;
      var username=globuser;
      sqlConn.promise().query(`DELETE FROM followers WHERE username=('${globuser}') and follow=('${followee_name}');`);
      console.log(globuser,'unfollowed',followee_name);
      res.render('hello',{username,results})
      },
  friends: async (req, res) => {
      let options = {
        maxAge: 1000 * 60 * 2/1000,
        httpOnly: true
      }
      var username=globuser;
      var title='These are your friends, ';
      const result = await sqlConn.promise().query(`SELECT follow from followers where username = '${username}'`);
      console.log(globuser+"'s friends are",result[0]);
      res.render('friends',{username,title,result})
      },
  auth: async (req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    
    if (username!=undefined && username!='')
      globuser=username;
    
    if(!username)username=globuser;
    var hash = crypto.createHash('sha512')
    let password1 = hash.update(password, "utf-8")
    password = password1.digest('hex')
    const result =await sqlConn.promise().query(`SELECT * from accounts where username = '${username}' and password = '${password}'`);
    let signup = req.body.signup;


    if(signup==="Sign Up"){
      const result2 = await sqlConn.promise().query(`SELECT * from accounts where username = '${username}'`);
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
            maxAge: 1000 * 60 * 2,
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
  },


}