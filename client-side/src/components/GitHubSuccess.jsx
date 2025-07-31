import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function GitHubSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const email = urlParams.get('email');
    if (email) {
      sessionStorage.setItem('email', email);
      // תגדירי סוג אם רוצים, למשל:
      sessionStorage.setItem('type', 2);

      // לדוגמה, אחרי שמירת פרטים, ננווט לדף הבית או אחר
      navigate('/Donates');
    } else {
      // אם אין מייל, אפשר להפנות להתחברות רגילה או להודעה מתאימה
      navigate('/login');
    }
  }, [location, navigate]);

  return <div>טוען...</div>;
}

export default GitHubSuccess;
