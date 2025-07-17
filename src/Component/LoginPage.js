import React, { useState } from 'react';
import { saveToken } from '../auth';

export default function LoginPage({onLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const formula = `AND(UserName = "${email}", Password = "${password}")`;

    try {
      const response = await fetch(
        ` https://api.airtable.com/v0/apprbTATge0ug6jk3/tbliz0F42HaYf3X7n?filterByFormula=${encodeURIComponent(formula)}`,
        {
          headers: {
            Authorization: `Bearer patsk91KQpyv7XFYJ.4ebc8f620e3d60c96b0d874ee9dd0f5ca39dc3e1a9618c271a12cf494d31d340`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (data.records && data.records.length > 0) {
        const user = data.records[0].fields;
        console.log("user",user)
        onLogin();
  const users = {
            email: user.UserName[0],
            clientId: user.ClientId[0],
            loginId: user.LoginId,
  }
        saveToken(users);
      } else {
        setError('Invalid email or password.');
      }
    } catch (err) {
      console.error(err);
      setError('Login failed');
    }finally {
        setLoading(false); 
      }
  };

  return (
    <div style={styles.container}>
     <img src="/Image/MainLogo.png" alt="Logo" style={styles.logo} />
      <div style={styles.card}>
   
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={styles.input}
          />
          {/* <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={styles.input}
          /> */}
<div style={{ position: 'relative' }}>
  <input
    type={showPassword ? 'text' : 'password'}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Password"
    required
    style={{
      ...styles.input,
      paddingRight: '40px', 
      width:'400px'
    }}
  />
        <div
            onClick={() => setShowPassword(!showPassword)}
            style={{
            position: 'absolute',
            right: '8px',
            top: '40%',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            fontSize: '18px',
            color: '#999',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            }}
        >
                {password && (
                showPassword ? (
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="gray"
                viewBox="0 0 24 24"
                >
                <path d="M2.1 3.51 0.69 4.92 3.17 7.4C1.63 9.13.5 10.97.5 12c0 .62 1.26 2.79 3.5 4.6C6.5 18.79 9.26 20 12 20c2.01 0 3.98-.68 5.72-1.96l2.36 2.36 1.41-1.41-19.39-19.48ZM12 6c1.03 0 2.03.25 2.91.71L12.7 9.28a2 2 0 0 0-2.42 2.42l-2.56 2.56C6.25 13.23 5 11.77 5 12c0-1.03 2.27-5 7-5Zm0 10c-1.17 0-2.26-.34-3.17-.9l1.53-1.53A2 2 0 0 0 12 14a2 2 0 0 0 2-2c0-.34-.08-.65-.2-.93l1.55-1.55c.62.79 1.09 1.66 1.37 2.48.17.52.28 1.07.28 1.64 0 .23-1.25 1.69-3.28 2.56A7.96 7.96 0 0 1 12 16Z"/>
                </svg>
                ) : (
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="gray"
                    viewBox="0 0 24 24"
                    >
                    <path d="M12 4.5C7.5 4.5 3.46 7.36 1.5 12c1.96 4.64 6 7.5 10.5 7.5s8.54-2.86 10.5-7.5C20.54 7.36 16.5 4.5 12 4.5Zm0 12a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm0-7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"/>
                    </svg>

                )
                )}

        </div>
    </div>


          {/* <button type="submit" style={styles.button}>Login</button> */}
          <button
            type="submit"
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            disabled={loading}
          >
            {loading ? (
              <div style={styles.spinner}></div>
            ) : (
              'Login'
            )}
          </button>       
          {error && <p style={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    // background: 'linear-gradient(to right, #667eea, #764ba2)',
    fontFamily: 'Arial, sans-serif',
    backgroundColor:'white',

  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
    textAlign: 'center',
  },
  logo: {
    width: '24%', 
    marginBottom: '50px', 
  },
  spinner: {
    width: '18px',
    height: '18px',
    border: '3px solid #fff',
    borderTop: '3px solid transparent',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },

};
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`, styleSheet.cssRules.length);