import Image from "next/image";
import GoogleIcon from "../../assets/icons/google.svg";
import { signIn, getCsrfToken } from "next-auth/react";

const GoogleButton = () => {
  const signInWithGoogle = () => signIn("google");

  return (
    <form action="/api/auth/signin/google" method="POST">
      <input type="hidden" name="csrfToken" value={getCsrfToken()} />
      <button
        className="my-2 text-gray-500 hover:bg-gray-800 hover:text-white transition ease-in duration-150 bg-white p-1 rounded-full flex items-center align-middle"
        type="button"
        onClick={signInWithGoogle}
      >
        <Image
          className="bg-white border-2 border-white rounded-full"
          src={GoogleIcon}
          alt="Google Icon"
          width={30}
          height={30}
        />
        <h2 className="font-medium mx-1">Google</h2>
      </button>
    </form>
  );
};

export default GoogleButton;
