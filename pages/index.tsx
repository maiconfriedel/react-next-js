import { FormEvent } from "react";

export default function Home() {
  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
  }

  return (
    <div className="bg-gray-200 flex flex-col items-center justify-center h-screen w-screen">
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl mb-10 font-Anton">Sign in with your Account</h1>
        <input
          className="border-2 border-gray-500 rounded-md mb-4 p-2 w-96 text-center outline-none focus:border-2 focus:border-gray-900  "
          type="email"
          name="email"
          placeholder="E-mail"
        />

        <input
          className="border-2 border-gray-500 rounded-md mb-10 p-2 w-96 text-center outline-none focus:border-2 focus:border-gray-900"
          type="password"
          name="password"
          placeholder="Password"
        />

        <button className="bg-gray-700 p-3 text-white font-bold rounded-md w-48 mx-2 hover:bg-gray-900 transition-colors">
          Sign In
        </button>
        <button className="bg-gray-700 p-3 text-white font-bold rounded-md w-48 mx-2 hover:bg-gray-900 transition-colors">
          Sign In with Github
        </button>
      </form>
    </div>
  );
}
