import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

export const Auth = () => {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider);
  };
  return (
    <div className="auth">
      <p>Sign in with Google to Continue</p>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};
