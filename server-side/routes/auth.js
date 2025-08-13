// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// const GitHubStrategy = require('passport-github2').Strategy;


// passport.use(new GitHubStrategy({
//   clientID: 'Ov23liNT9gMWp8kfCHWM',
//   clientSecret: 'e79f78562459df8298673b0f283a61ccfe29e820',
//   callbackURL: "http://localhost:6200/api/auth/github/callback"
// },
//   function (accessToken, refreshToken, profile, done) {
//     // שולחים את המשתמש חזרה (לא שומרים עדיין במסד נתונים)
//     console.log(profile);

//     return done(null, profile);
//   }
// ));

// // סדרות ופרוק
// passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((obj, done) => done(null, obj));

// router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// router.get('/github/callback',
//   passport.authenticate('github', { failureRedirect: '/' }),
//   function (req, res) {
//     // הצלחה – מעבירים את האימייל לצד לקוח (למשל ב-query)
//     console.log(req.user.emails + "כככככככככככככככככככככככככככככככככככככ")
//     const email = req.user.emails[0].value;
//     res.redirect(`http://localhost:4200/github-success?email=${encodeURIComponent(email)}`);
//   });

// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// const GitHubStrategy = require('passport-github2').Strategy;
// const fetch = require('node-fetch');  // אם אין התקן, תריץ: npm install node-fetch

// passport.use(new GitHubStrategy({
//   clientID: 'Ov23liNT9gMWp8kfCHWM',
//   clientSecret: 'e79f78562459df8298673b0f283a61ccfe29e820',
//   callbackURL: "http://localhost:6200/api/auth/github/callback"
// },
//   async function (accessToken, refreshToken, profile, done) {
//     try {
//       console.log("dddddddddddddddddddddd")
//       // קריאה ל-API לקבלת רשימת המיילים
//       const res = await fetch('https://api.github.com/user/emails', {
//         headers: {
//           'Authorization': `token ${accessToken}`,
//           'User-Agent': 'Node.js'
//         }
//       });
//       console.log("ffffffffffffffff")

//       const emails = await res.json();
//       console.log(emails)

//       // מחפשים מייל ראשי ומאומת
//       const primaryEmailObj = emails.find(email => email.primary && email.verified);

//       if (primaryEmailObj) {
//         profile.emails = [primaryEmailObj];
//       } else {
//         profile.emails = [];
//       }
//       console.log(profile.emails[0].email + "profile")
//       return done(null, profile);
//     } catch (error) {
//       console.error('Error fetching emails:', error);
//       return done(error, profile);
//     }
//   }
// ));

// // סדרות ופרוק
// passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((obj, done) => done(null, obj));

// // נתיב התחברות ל-GitHub
// router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// // נתיב callback
// router.get('/github/callback',
//   passport.authenticate('github', { failureRedirect: '/' }),
//   function (req, res) {
//     let email = 'unknown';
//     if (req.user && req.user.emails && req.user.emails.length > 0) {
//       email = req.user.emails[0].email;
//     }
//     console.log('Redirecting with email:', email);
//     res.redirect(`https://donation-project-server.onrender.com/github-success?email=${encodeURIComponent(email)}`);
//   });


// module.exports = router;

const express = require('express');
const router = express.Router();
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const fetch = require('node-fetch');

passport.use(new GitHubStrategy({
  clientID: 'Ov23liNT9gMWp8kfCHWM',
  clientSecret: 'e79f78562459df8298673b0f283a61ccfe29e820',
  // ★ שנה את הכתובת הזו לכתובת האמיתית של השרת שלך
  callbackURL: "https://donation-project-server.onrender.com/api/auth/github/callback"
},
  async function (accessToken, refreshToken, profile, done) {
    try {
      console.log("Starting GitHub auth process");
      
      // קריאה ל-API לקבלת רשימת המיילים
      const res = await fetch('https://api.github.com/user/emails', {
        headers: {
          'Authorization': `token ${accessToken}`,
          'User-Agent': 'Node.js'
        }
      });
      
      console.log("Fetched emails from GitHub");

      const emails = await res.json();
      console.log('GitHub emails:', emails);

      // מחפשים מייל ראשי ומאומת
      const primaryEmailObj = emails.find(email => email.primary && email.verified);

      if (primaryEmailObj) {
        profile.emails = [primaryEmailObj];
      } else {
        // אם אין מייל ראשי, ניקח את הראשון שמאומת
        const verifiedEmail = emails.find(email => email.verified);
        profile.emails = verifiedEmail ? [verifiedEmail] : [];
      }
      
      console.log('Final profile email:', profile.emails[0]?.email || 'No email found');
      return done(null, profile);
    } catch (error) {
      console.error('Error fetching emails:', error);
      return done(error, profile);
    }
  }
));

// סדרות ופרוק
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// נתיב התחברות ל-GitHub
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// נתיב callback
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function (req, res) {
    let email = 'unknown';
    if (req.user && req.user.emails && req.user.emails.length > 0) {
      email = req.user.emails[0].email;
    }
    
    console.log('GitHub auth successful, redirecting with email:', email);
    
    // ★ שנה גם את הכתובת הזו אם צריך
    res.redirect(`https://donation-project-server.onrender.com/github-success?email=${encodeURIComponent(email)}`);
  });

module.exports = router;