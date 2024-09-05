"use client"
import { ADMIN, ADVERTISER } from "@/constents/constArray";
import { getError } from "helper";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Sidebar({ open, setOpen, MENU }) {
  const pathname = usePathname()
  const ref = useRef(null);
  const { status } = useSession();
  const [sending, setSending] = useState(false)

  const googleLogin = async () => {
    try {
      setSending(true);
      const res = await signIn("google", { callbackUrl: "/" });
      if (res?.status === 200) {
        window.location.reload();
      }
    } catch (e) {
      console.error(e);
      toast.error(getError(e));
      setSending(false);
    }
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (typeof window !== "undefined") {
      document.addEventListener("mousedown", checkIfClickedOutside);
      return () => {
        document.removeEventListener("mousedown", checkIfClickedOutside);
      };
    }
  }, []);

  return (
    <div>
      <div
        ref={ref}
        className={`md:hidden bg-background inset-y-0 md:w-[300px] w-3/4 fixed z-30 h-screen transition-all duration-300 ${
          open ? "left-0" : "-left-full"
        }`}
      >
        <div className="w-full flex flex-col justify-between mx-auto py-5 px-6 ">
          <div className="flex items-center justify-between w-full pb-3 ">
            <Link href="/">
              <Image
                src="/images/logo.jpeg"
                alt="logo"
                width={70}
                height={70}
              />
            </Link>
            <div
              className="cursor-pointer text-primary absolute right-6"
              onClick={() => {
                setOpen(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
              >
                {" "}
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M6.793 6.793a1 1 0 0 1 1.414 0L12 10.586l3.793-3.793a1 1 0 1 1 1.414 1.414L13.414 12l3.793 3.793a1 1 0 0 1-1.414 1.414L12 13.414l-3.793 3.793a1 1 0 0 1-1.414-1.414L10.586 12L6.793 8.207a1 1 0 0 1 0-1.414"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="flex flex-col justify-between h-[85vh] w-full">
            <div className="w-full grid gap-y-4">
              {MENU.map((e, i) => {
                return (
                  <Link
                    onClick={() => {
                      setOpen(false);
                    }}
                    key={i}
                    href={e.link || "/"}
                    className={`${pathname === e.link ? "border-b border-white pb-1" : "font-normal"} ${i !== 5 && "w-full"}  hover:font-bold capitalize text-lg leading-none block text-white whitespace-pre`}>{e.title}
                  </Link>
                );
              })}
            </div>

            <button
              className="bg-gradient-to-r from-primary to-primary-dark rounded-lg px-4 py-[6px] text-white text-base"
              onClick={() => {
                if (status === "authenticated") {
                  signOut();
                } else if (status === "unauthenticated") {
                  googleLogin();
                }
              }}
              disabled={sending}
            >
              {status === "authenticated" ? "יציאה" : "כניסה"}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div
          onClick={() => {
            setOpen(false);
          }}
          className="z-10 block fixed inset-0 w-full h-screen bg-black opacity-50"
        ></div>
      )}
    </div>
  );
}
