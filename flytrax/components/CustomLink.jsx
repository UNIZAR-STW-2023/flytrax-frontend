/*
  File's name: CustomLink.jsx
  Authors: Paul Huszak & Guillermo Cánovas 
  Date: 16/05/2023
*/

import Link from "next/link";
import { useRouter } from "next/router";

// Custom Link component props
function CustomLink({ to, children, ...props }) {
  const router = useRouter();
  const isActive =
    router.pathname === to || router.pathname.startsWith(`${to}/`);

  return (
    <span
      className={
        isActive
          ? "text-orange-600 uppercase font-bold"
          : "light-font text-gray-700"
      }
    >
      <Link href={to} {...props}>
        {children}
      </Link>
    </span>
  );
}

export default CustomLink;
