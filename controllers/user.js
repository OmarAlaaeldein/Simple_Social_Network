const sqlConn = require('../databases/db');
const crypto = require('crypto');
let globuser='';
let search_results=[];
let my_posts=['My Posts:'];
let visit_posts=['Posts:'];


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

  hello: async (req, res) => {
    let username='';
    let results='';
    if(!username)username=globuser;
    
    let my_posts=['My Posts:'];
    const my_fetched_posts = await sqlConn.promise().query(`SELECT username,post,datetime from posts where username = '${username}' order by datetime DESC`);
    // console.log(my_fetched_posts);
    for (let i = 0; i < my_fetched_posts[0].length; i++) {
      my_posts.push(my_fetched_posts[0][i]['datetime']+', '+my_fetched_posts[0][i]['username']+':   '+my_fetched_posts[0][i]['post']);
    }
    
    res.render('hello',{username,results,search_results,my_posts})
    search_results=[];
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

  getPage: async (req, res) => {
    let username = req.body.username;
    let results= ' ';
    if (username!=undefined && username!='')
      globuser=username;
    console.log(globuser);
    // console.log('username:',username,'.')
    if(req.cookies.loggedin == "true") {
      if(!username)username=globuser;
        let my_posts=['My Posts:'];
        const my_fetched_posts = await sqlConn.promise().query(`SELECT username,post,datetime from posts where username = '${username}' order by datetime DESC`);
        for (let i = 0; i < my_fetched_posts[0].length; i++) {
          my_posts.push(my_fetched_posts[0][i]['datetime']+', '+my_fetched_posts[0][i]['username']+':   '+my_fetched_posts[0][i]['post']);
        }
        res.render('hello', {username,results,search_results,my_posts})
    }
    res.redirect('./login');
  },
  
  newpost: (req, res) => {
    
    var results='';
    var post_text=req.body.post_text;
    var username=globuser;
    sqlConn.promise().query(`insert into posts (username, post, datetime) values ('${globuser}' ,'${post_text}',NOW());`);
    // res.render('hello',{username,results,search_results,my_posts})
    res.redirect('./hello');
    },
  follow: (req, res) => {
      
      var results='';
      var followee_name=req.body.followee_name;
      var username=globuser;
      sqlConn.promise().query(`insert into followers (username, follow) values ('${globuser}' ,'${followee_name}'), where;`);
      console.log(globuser,'followed',followee_name);
      // res.render('hello',{username,results,search_results,my_posts}
      res.redirect('./hello');
      },
  unfollow: (req, res) => {
      
      var results='';
      var followee_name=req.body.followee_name;
      var username=globuser;
      sqlConn.promise().query(`DELETE FROM followers WHERE username=('${globuser}') and follow=('${followee_name}');`);
      console.log(globuser,'unfollowed',followee_name);
      // res.render('hello',{username,results,search_results,my_posts})
      res.redirect('./hello');
      },
  friends: async (req, res) => {
      var username=globuser;
      var title='These are your friends, ';
      const result = await sqlConn.promise().query(`SELECT follow from followers where username = '${username}'`);
      console.log(globuser+"'s friends are",result[0]);
      res.render('friends',{username,title,result})
      },


  search: async (req, res) => {
    var name=req.body.username;
    var username=globuser;
    var results='';
    
    const result = await sqlConn.promise().query(`SELECT username from accounts where username LIKE '%${name}%'`);
        
    // console.log(result)
    search_results.push('Search results:')
    for (let i = 0; i < result[0].length; i++) {
      search_results.push(result[0][i]['username']);
    }

    console.log(search_results)
    // res.render('hello',{username,results,search_results,my_posts})
    res.redirect('./hello');
    
    },
  
  visit: async (req, res) => {
    var name=req.body.visit;
    var username=name;
    var results='';
    
    const result = await sqlConn.promise().query(`SELECT username from accounts where username = '${name}'`);
    
    // console.log(result)
    const fetched_posts = await sqlConn.promise().query(`SELECT username,post,datetime from posts where username = '${name}' order by datetime DESC`);
    



    if(result[0].length!=0){
      // console.log(fetched_posts[0]);
      console.log(result[0])
      for (let i = 0; i < fetched_posts[0].length; i++) {

        visit_posts.push(fetched_posts[0][i]['datetime']+', '+fetched_posts[0][i]['username']+':   '+fetched_posts[0][i]['post']);
      }


      res.render('person',{username,results,visit_posts})
      }
      else{
        res.render('user_doesnt_exist')
      }
      visit_posts=['Posts:']
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
        // res.render('hello', {username,results,search_results,my_posts})
        res.redirect('./hello');
        
      }


    }
    else{
      if (result[0][0]){
        if(username && password && result[0][0]['password'] === password){
          let options = {
            maxAge: 1000 * 60 * 2/1000,
            httpOnly: true
          }
          if(!req.cookie)
          res.cookie("loggedin", "true", options);
          let username = req.body.username;
          let results= ' ';
          // res.render('hello', {username,results,search_results,my_posts})
          res.redirect('./hello');
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