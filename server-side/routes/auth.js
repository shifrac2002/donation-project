// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// const GitHubStrategy = require('passport-github2').Strategy;


// passport.use(new GitHubStrategy({
//   clientID: 'Ov23liNT9gMWp8kfCHWM',
//   clientSecret: 'e79f78562459df8298673b0f283a61ccfe29e820',
//   callbackURL: "https://donation-project-server.onrender.com/api/auth/github/callback"
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
//     res.redirect(`https://donation-project-client.onrender.com/github-success?email=${encodeURIComponent(email)}`);
//   });

// module.exports = router;

// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// const GitHubStrategy = require('passport-github2').Strategy;
// const fetch = require('node-fetch');  // אם אין התקן, תריץ: npm install node-fetch

// passport.use(new GitHubStrategy({
//   clientID: 'Ov23liNT9gMWp8kfCHWM',
//   clientSecret: 'e79f78562459df8298673b0f283a61ccfe29e820',
//   callbackURL: "https://donation-project-server.onrender.com/api/auth/github/callback"
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
//     res.redirect(`https://donation-project-server.onrender.com/github/callback?email=${encodeURIComponent(email)}`);
//   });


// module.exports = router;
const express = require('express');
const router = express.Router();
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const userCheckMail = require('../services/user');

console.log('=== Auth file loading ===');

passport.use(new GitHubStrategy({
  clientID: 'Ov23liNT9gMWp8kfCHWM',
  clientSecret: 'e79f78562459df8298673b0f283a61ccfe29e820',
  callbackURL: "https://donation-project-server.onrender.com/api/auth/github/callback"
},
  async function (accessToken, refreshToken, profile, done) {
    try {
      console.log('=== GitHub Strategy called ===');
      console.log('Profile received:', {
        id: profile.id,
        username: profile.username,
        displayName: profile.displayName
      });

      // נקבל את המיילים בקריאה נפרדת
      const emailResponse = await fetch('https://api.github.com/user/emails', {
        headers: {
          'Authorization': `token ${accessToken}`,
          'User-Agent': 'Donation-App'
        }
      });

      if (emailResponse.ok) {
        const emails = await emailResponse.json();
        console.log('Emails from GitHub API:', emails);

        // מחפשים מייל ראשי ומאומת
        const primaryEmail = emails.find(email => email.primary && email.verified);
        const verifiedEmail = emails.find(email => email.verified);

        // נוסיף את המיילים לפרופיל
        if (primaryEmail) {
          profile.emails = [{ value: primaryEmail.email }];
        } else if (verifiedEmail) {
          profile.emails = [{ value: verifiedEmail.email }];
        } else {
          profile.emails = [];
        }

        console.log('Final profile emails:', profile.emails);
      } else {
        console.log('Failed to fetch emails from GitHub');
        profile.emails = [];
      }

      return done(null, profile);
    } catch (error) {
      console.error('Error in GitHub Strategy:', error);
      // גם אם יש שגיאה, נחזיר את הפרופיל בלי מיילים
      profile.emails = [];
      return done(null, profile);
    }
  }
));

// סדרות ופרוק פשוטים
passport.serializeUser((user, done) => {
  console.log('Serializing user:', user.id);
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  console.log('Deserializing user:', obj.id);
  done(null, obj);
});

// נתיב התחברות
router.get('/github', (req, res, next) => {
  console.log('=== Starting GitHub auth ===');
  passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
});

// נתיב callback
router.get('/github/callback', (req, res, next) => {
  console.log('=== GitHub callback started ===');

  passport.authenticate('github', {
    failureRedirect: '/',
    session: true
  }, async (err, user, info) => {
    console.log('=== Passport authenticate callback ===');

    if (err) {
      console.error('Auth error:', err);
      return res.redirect('https://donation-project-client.onrender.com/github-success?email=auth-error');
    }

    if (!user) {
      console.log('No user returned');
      return res.redirect('https://donation-project-client.onrender.com/github-success?email=no-user');
    }

    // התחבר למשתמש
    req.logIn(user, (err) => {
      if (err) {
        console.error('Login error:', err);
        return res.redirect('https://donation-project-client.onrender.com/github-success?email=login-error');
      }

      console.log('Login successful');

      // נסה לחלץ מייל
      let email = 'no-email';
      if (user.emails && user.emails.length > 0) {
        email = user.emails[0].value;
        console.log('Found email:', email);
      } else {
        console.log('No emails found in user object');
        // אם אין מייל, נשתמש ב-username
        email = user.username || 'no-email';
      }

      console.log('Redirecting with email:', email);
      try {
        // בדוק אם המשתמש קיים בבסיס הנתונים
        const userExists = await userCheckMail.checkUserByEmailOnly(email);

        if (userExists === "גבאי") {
          res.send(`
            <script>
              sessionStorage.setItem('github_login', 'true');
              sessionStorage.setItem('github_email', '${email}');
              sessionStorage.setItem('github_type', '1');
              window.location.href = 'https://donation-project-client.onrender.com/';
            </script>
          `);
        } else if (userExists === "תורם") {
          res.send(`
            <script>
              sessionStorage.setItem('github_login', 'true');
              sessionStorage.setItem('github_email', '${email}');
              sessionStorage.setItem('github_type', '2');
              window.location.href = 'https://donation-project-client.onrender.com/';
            </script>
          `);
        } else if (userExists === "לא קיים") {
          res.send(`
            <script>
              sessionStorage.setItem('github_error', 'not-registered');
              sessionStorage.setItem('github_email', '${email}');
              window.location.href = 'https://donation-project-client.onrender.com/';
            </script>
          `);
        } else if (userExists === "שתי אפשרויות") {
          res.send(`
            <script>
              sessionStorage.setItem('github_login', 'true');
              sessionStorage.setItem('github_email', '${email}');
              sessionStorage.setItem('github_two_options', 'true');
              window.location.href = 'https://donation-project-client.onrender.com/';
            </script>
          `);
        }
      } catch (error) {
        res.send(`
          <script>
            sessionStorage.setItem('github_error', 'database-error');
            window.location.href = 'https://donation-project-client.onrender.com/';
          </script>
        `);
      }
    });
  })(req, res, next);
});

console.log('=== Auth routes defined ===');

module.exports = router;