type LoginProps = {
  onLogin: () => void;
};

const Login = ({ onLogin }: LoginProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#111111] px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-black text-3xl font-black text-white">
            AD
          </div>

          <h1 className="text-3xl font-black text-gray-900">
            AD Customs ERP
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Login to manage job cards, quotations and workshop work.
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Username / Email
            </label>
            <input
              type="text"
              placeholder="Enter username"
              defaultValue="admin@adcustoms.in"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              defaultValue="123456"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
            />
          </div>

          <button
            type="button"
            onClick={onLogin}
            className="w-full rounded-xl bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-700"
          >
            Login
          </button>
        </form>

        <div className="mt-6 rounded-2xl bg-gray-100 p-4 text-sm text-gray-600">
          <p className="font-bold text-gray-800">Demo Login</p>
          <p>Username: admin@adcustoms.in</p>
          <p>Password: 123456</p>
        </div>
      </div>
    </div>
  );
};

export default Login;