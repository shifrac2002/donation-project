// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// const GitHubStrategy = require('passport-github2').Strategy;
// const userCheckMail = require('../services/user');

// console.log('=== Auth file loading ===');

// passport.use(new GitHubStrategy({
//   clientID: 'Ov23liNT9gMWp8kfCHWM',
//   clientSecret: 'e79f78562459df8298673b0f283a61ccfe29e820',
//   callbackURL: "https://donation-project-server.onrender.com/api/auth/github/callback"
// },
//   async function (accessToken, refreshToken, profile, done) {
//     try {
//       console.log('=== GitHub Strategy called ===');
//       console.log('Profile received:', {
//         id: profile.id,
//         username: profile.username,
//         displayName: profile.displayName
//       });

//       // נקבל את המיילים בקריאה נפרדת
//       const emailResponse = await fetch('https://api.github.com/user/emails', {
//         headers: {
//           'Authorization': `token ${accessToken}`,
//           'User-Agent': 'Donation-App'
//         }
//       });

//       if (emailResponse.ok) {
//         const emails = await emailResponse.json();
//         console.log('Emails from GitHub API:', emails);

//         // מחפשים מייל ראשי ומאומת
//         const primaryEmail = emails.find(email => email.primary && email.verified);
//         const verifiedEmail = emails.find(email => email.verified);

//         // נוסיף את המיילים לפרופיל
//         if (primaryEmail) {
//           profile.emails = [{ value: primaryEmail.email }];
//         } else if (verifiedEmail) {
//           profile.emails = [{ value: verifiedEmail.email }];
//         } else {
//           profile.emails = [];
//         }

//         console.log('Final profile emails:', profile.emails);
//       } else {
//         console.log('Failed to fetch emails from GitHub');
//         profile.emails = [];
//       }

//       return done(null, profile);
//     } catch (error) {
//       console.error('Error in GitHub Strategy:', error);
//       // גם אם יש שגיאה, נחזיר את הפרופיל בלי מיילים
//       profile.emails = [];
//       return done(null, profile);
//     }
//   }
// ));

// // סדרות ופרוק פשוטים
// passport.serializeUser((user, done) => {
//   console.log('Serializing user:', user.id);
//   done(null, user);
// });

// passport.deserializeUser((obj, done) => {
//   console.log('Deserializing user:', obj.id);
//   done(null, obj);
// });

// // נתיב התחברות
// router.get('/github', (req, res, next) => {
//   console.log('=== Starting GitHub auth ===');
//   passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
// });

// // נתיב callback
// router.get('/github/callback', (req, res, next) => {
//   console.log('=== GitHub callback started ===');

//   passport.authenticate('github', {
//     failureRedirect: '/',
//     session: true
//   }, async (err, user, info) => {
//     console.log('=== Passport authenticate callback ===');

//     if (err) {
//       console.error('Auth error:', err);
//       return res.redirect('https://donation-project-client.onrender.com/github-success?email=auth-error');
//     }

//     if (!user) {
//       console.log('No user returned');
//       return res.redirect('https://donation-project-client.onrender.com/github-success?email=no-user');
//     }

//     // התחבר למשתמש
//     req.logIn(user,async (err) => {
//       if (err) {
//         console.error('Login error:', err);
//         return res.redirect('https://donation-project-client.onrender.com/github-success?email=login-error');
//       }

//       console.log('Login successful');

//       // נסה לחלץ מייל
//       let email = 'no-email';
//       if (user.emails && user.emails.length > 0) {
//         email = user.emails[0].value;
//         console.log('Found email:', email);
//       } else {
//         console.log('No emails found in user object');
//         // אם אין מייל, נשתמש ב-username
//         email = user.username || 'no-email';
//       }

//       console.log('Redirecting with email:', email);
//       try {
//         // בדוק אם המשתמש קיים בבסיס הנתונים
//         const userExists = await userCheckMail.checkUserByEmailOnly(email);

//         if (userExists === "גבאי") {
//           res.send(`
//             <script>
//               sessionStorage.setItem('github_login', 'true');
//               sessionStorage.setItem('github_email', '${email}');
//               sessionStorage.setItem('github_type', '1');
//               window.location.href = 'https://donation-project-client.onrender.com/';
//             </script>
//           `);
//         } else if (userExists === "תורם") {
//           res.send(`
//             <script>
//               sessionStorage.setItem('github_login', 'true');
//               sessionStorage.setItem('github_email', '${email}');
//               sessionStorage.setItem('github_type', '2');
//               window.location.href = 'https://donation-project-client.onrender.com/';
//             </script>
//           `);
//         } else if (userExists === "לא קיים") {
//           res.send(`
//             <script>
//               sessionStorage.setItem('github_error', 'not-registered');
//               sessionStorage.setItem('github_email', '${email}');
//               window.location.href = 'https://donation-project-client.onrender.com/';
//             </script>
//           `);
//         } else if (userExists === "שתי אפשרויות") {
//           res.send(`
//             <script>
//               sessionStorage.setItem('github_login', 'true');
//               sessionStorage.setItem('github_email', '${email}');
//               sessionStorage.setItem('github_two_options', 'true');
//               window.location.href = 'https://donation-project-client.onrender.com/';
//             </script>
//           `);
//         }
//       } catch (error) {
//         res.send(`
//           <script>
//             sessionStorage.setItem('github_error', 'database-error');
//             window.location.href = 'https://donation-project-client.onrender.com/';
//           </script>
//         `);
//       }
//     });
//   })(req, res, next);
// });

// console.log('=== Auth routes defined ===');

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

// ⭐ נתיב חדש לבדיקת סטטוס התחברות
router.post('/github-check', async (req, res) => {
  try {
    console.log('=== GitHub check started ===');
    
    // בדוק אם המשתמש מחובר דרך session
    if (!req.user) {
      console.log('User not authenticated, needs auth');
      return res.json({ 
        success: false, 
        needsAuth: true,
        authUrl: '/api/auth/github'
      });
    }

    console.log('User found in session:', req.user.id);

    // אם מחובר, בדוק את הפרטים בבסיס הנתונים
    let email = 'no-email';
    if (req.user.emails && req.user.emails.length > 0) {
      email = req.user.emails[0].value;
      console.log('Found email:', email);
    } else {
      console.log('No emails found in user object');
      email = req.user.username || 'no-email';
    }

    console.log('Checking user in database with email:', email);
    const userExists = await userCheckMail.checkUserByEmailOnly(email);
    console.log('Database result:', userExists);

    if (userExists === "גבאי") {
      res.json({
        success: true,
        email: email,
        userType: '1'
      });
    } else if (userExists === "תורם") {
      res.json({
        success: true,
        email: email,
        userType: '2'
      });
    } else if (userExists === "לא קיים") {
      res.json({
        success: false,
        error: 'not-registered',
        email: email
      });
    } else if (userExists === "שתי אפשרויות") {
      res.json({
        success: true,
        email: email,
        twoOptions: true
      });
    } else {
      res.json({
        success: false,
        error: 'unknown-status'
      });
    }
  } catch (error) {
    console.error('GitHub check error:', error);
    res.json({
      success: false,
      error: 'database-error'
    });
  }
});

// נתיב callback - מעודכן להחזרת HTML פשוט שסוגר את החלון
router.get('/github/callback', (req, res, next) => {
  console.log('=== GitHub callback started ===');

  passport.authenticate('github', {
    failureRedirect: '/',
    session: true
  }, async (err, user, info) => {
    console.log('=== Passport authenticate callback ===');

    if (err) {
      console.error('Auth error:', err);
      return res.send(`
        <html>
          <head><title>GitHub Authentication</title></head>
          <body>
            <p>שגיאה בהתחברות. אנא סגור חלון זה ונסה שוב.</p>
            <script>
              setTimeout(() => {
                window.close();
              }, 2000);
            </script>
          </body>
        </html>
      `);
    }

    if (!user) {
      console.log('No user returned');
      return res.send(`
        <html>
          <head><title>GitHub Authentication</title></head>
          <body>
            <p>לא התקבל משתמש. אנא סגור חלון זה ונסה שוב.</p>
            <script>
              setTimeout(() => {
                window.close();
              }, 2000);
            </script>
          </body>
        </html>
      `);
    }

    // התחבר למשתמש
    req.logIn(user, async (err) => {
      if (err) {
        console.error('Login error:', err);
        return res.send(`
          <html>
            <head><title>GitHub Authentication</title></head>
            <body>
              <p>שגיאה בהתחברות למערכת. אנא סגור חלון זה ונסה שוב.</p>
              <script>
                setTimeout(() => {
                  window.close();
                }, 2000);
              </script>
            </body>
          </html>
        `);
      }

      console.log('Login successful - session created');

      // נסה לחלץ מייל
      let email = 'no-email';
      if (user.emails && user.emails.length > 0) {
        email = user.emails[0].value;
        console.log('Found email:', email);
      } else {
        console.log('No emails found in user object');
        email = user.username || 'no-email';
      }

      console.log('GitHub authentication completed for:', email);
      
      // החזר HTML פשוט שמודיע על הצלחה וסוגר את החלון
      res.send(`
        <html>
          <head><title>GitHub Authentication</title></head>
          <body>
            <div style="text-align: center; font-family: Arial; margin-top: 50px;">
              <h2>✅ התחברות מוצלחת!</h2>
              <p>החלון ייסגר אוטומטית...</p>
            </div>
            <script>
              // נתן זמן קצר להציג את ההודעה ואז נסגור את החלון
              setTimeout(() => {
                window.close();
              }, 1500);
            </script>
          </body>
        </html>
      `);
    });
  })(req, res, next);
});
console.log('=== Auth routes defined ===');

module.exports = router;