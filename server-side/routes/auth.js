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
    req.logIn(user,async (err) => {
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
          res.redirect('https://donation-project-client.onrender.com/?github_login=true&github_email=' + encodeURIComponent(email) + '&github_type=1');
        } else if (userExists === "תורם") {
          res.redirect('https://donation-project-client.onrender.com/?github_login=true&github_email=' + encodeURIComponent(email) + '&github_type=2');
        } else if (userExists === "לא קיים") {
          res.redirect('https://donation-project-client.onrender.com/?github_error=not-registered&github_email=' + encodeURIComponent(email));
        } else if (userExists === "שתי אפשרויות") {
          res.redirect('https://donation-project-client.onrender.com/?github_login=true&github_email=' + encodeURIComponent(email) + '&github_two_options=true');
        }
      } catch (error) {
        res.redirect('https://donation-project-client.onrender.com/?github_error=database-error');
      }
    });
  })(req, res, next);
});

console.log('=== Auth routes defined ===');

module.exports = router;

