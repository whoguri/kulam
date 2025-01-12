"use client"
import React, { useState } from 'react'
import Modal from "../Modal"
import Login from "./Login"
import Register from "./Register"
import { signIn } from 'next-auth/react'
import { toast } from 'react-toastify'
import { getError } from 'helper'

function AuthModal({ onClose }) {
  const [view, setView] = useState("register")
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

  return (
    <Modal
      title=""
      showHeader={false}
      width="md:w-2/3 w-[95%]"
      maxWidth="md:max-w-2xl"
      onClose={onClose}
    >
      <div className="md:py-8 py-4">
        <div
          onClick={() => {
            onClose();
          }}
          className="absolute md:top-4 top-2 right-4 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 56 56"
          >
            <path
              fill="currentColor"
              d="M10.023 43.023c-.796.797-.82 2.157 0 2.954c.82.796 2.157.796 2.977 0l15-15l15 15c.797.796 2.156.82 2.977 0c.796-.82.796-2.157 0-2.954L30.953 28l15.024-15c.796-.797.82-2.156 0-2.953c-.844-.82-2.18-.82-2.977 0l-15 15l-15-15c-.82-.82-2.18-.844-2.977 0c-.796.82-.796 2.156 0 2.953l15 15Z"
            />
          </svg>
        </div>
        <div className="flex gap-2 items-center justify-center mb-5 md:text-xl text-base font-semibold text-background">
          <button
            className="relative px-4 pb-1 bg-orange-300 rounded-t-lg"
            type="button"
            onClick={() => {
              setView("register");
            }}
          >
            משתמש חדש
            <div
              className={`absolute h-0.5 top-full bg-background inset-0 mx-auto transition-all ${view === "register" ? "w-full" : "w-0"
                }`}
            />


          </button>
          <button
            className="relative px-4 pb-1 bg-orange-300 rounded-t-lg"
            type="button"
            onClick={() => {
              setView("login");
            }}
          >
            משתמש קיים
            <div
              className={`absolute h-0.5 top-full bg-background inset-0 mx-auto transition-all ${view === "login" ? "w-full" : "w-0"
                }`}
            />
          </button>
        </div>
        <div>
          {view === "login" && <Login setView={setView} sending={sending} setSending={setSending} />}
          {view === "register" && <Register setView={setView} sending={sending} setSending={setSending} />}

          <div className="relative my-8 text-center border-t">
            <span className="absolute top-1/2 -translate-y-1/2 left-0 right-0">
              <div className="text-base">
                <span className="inline-block px-6 bg-white">או</span>
              </div>
            </span>
          </div>

          <button
            type="button"
            className="disabled:pointer-events-none disabled:opacity-80 mb-4 w-full border border-primary-dark block px-4 2xl:py-[6px] xl:py-[6px] py-1 rounded-lg bg-gradient-to-r from-primary to-primary-dark hover:from-white hover:to-white hover:text-primary-dark 2xl:text-base text-sm"
            onClick={googleLogin}
            disabled={sending}
          >
            {sending ? <span className='flex items-center justify-center'> <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <g fill="currentColor">
                <path fill-rule="evenodd" d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14m0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" clip-rule="evenodd" opacity="0.2" />
                <path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7z" />
              </g>
            </svg></span> : "עם חשבון Google"}
            {" "}
            {/* עם חשבון Google */}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AuthModal
