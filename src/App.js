import FirebaseAuthService from "./FirebaseAuthService";
import {useState} from "react";
import LoginForm from "./components/LoginForm";

const App = () => {

  const [user, setUser] = useState (null);

  //When auth changes firebase will know
  FirebaseAuthService.subscribeToAuthChanges(setUser);

  return (
    <div className="App">
      <h1>Hola, esto es firebase</h1>
      <LoginForm existingUser={user}/>
    </div>
  );
}

export default App;
