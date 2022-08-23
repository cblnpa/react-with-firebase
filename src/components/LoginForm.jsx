import {useState} from "react";
import FirebaseAuthService from "../FirebaseAuthService";

const LoginForm = ({existingUser}) => {
  const [username, setUsername] = useState ('');
  const [password, setPassword] = useState ('');

  const handleSubmit = async (event) => {
    event.preventDefault ();

    try {
      await FirebaseAuthService.loginUser(username, password);
      setUsername ('');
      setPassword ('');
    } catch (error) {
      alert (error.message);
    }
  }

  const handleLogOut = () => {
    FirebaseAuthService.logoutUser();
  }

  const handleSendResetPasswordEmail = async () => {
    if(!username){
      alert('Missing username!');
      return;
    }

    try{
      await FirebaseAuthService.sendPasswordResetEmail(username);
      alert('Sent the password reset email');
    } catch(error) {
      alert(error.message);
    }
  }

  const handleLoginWithGoogle = async () => {
    try {
      await FirebaseAuthService.loginWithGoogle();
    } catch (error) {
      alert(error.message);
    };
  }

  return (
    <div>
      {
        existingUser ?
          <div>
            <h3>Welcome, {existingUser.email}</h3>
            <button type="button" onClick={handleLogOut}>Logout</button>
          </div>
          :
          <form onSubmit={handleSubmit}>
            <label>Username (email):
              <input
                type="email"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>

            <label>Password:
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <div>
              <button>
                Login
              </button>
              <button type="button" onClick={handleSendResetPasswordEmail}>
                Reset password
              </button>
              <button type="button" onClick={handleLoginWithGoogle}>
                Login with Google
              </button>
            </div>
          </form>
      }
    </div>
  );
};

export default LoginForm;