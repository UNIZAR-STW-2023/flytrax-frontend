/*
  File's name: GitHubButton.jsx
  Authors: Paul Huszak & Guillermo Cánovas 
  Date: 16/05/2023
*/

import Image from "next/image";
import GitHubIcon from "../../assets/icons/github.svg";
import { signIn, getCsrfToken } from "next-auth/react";

const GitHubButton = () => {
  const signInWithGitHub = () => signIn("github");

  return (
    <form action="/api/auth/signin/github" method="POST">
      <input type="hidden" name="csrfToken" value={getCsrfToken()} />
      <button
        className="my-2 text-gray-500 hover:bg-gray-800 hover:text-white transition ease-in duration-150 bg-white p-1 rounded-full flex items-center align-middle"
        type="button"
        onClick={signInWithGitHub}
      >
        <Image
          className="bg-white border-2 border-white rounded-full"
          src={GitHubIcon}
          alt="GitHub Icon"
          width={30}
          height={30}
        />
        <h2 className="font-medium mx-1">GitHub</h2>
      </button>
    </form>
  );
};

export default GitHubButton;
