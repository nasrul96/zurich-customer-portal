import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { UserListTable } from "./components/UserListTable";

export default async function Users() {
  const session = await getServerSession(authOptions);
  if (session == null) {
    return redirect("/");
  } else {
    return (
      <div className="bg-white h-full pt-10 p-5">
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="flex flex-col gap-5 backdrop-blur-md bg-white/60 drop-shadow-xl p-5 rounded-lg">
            <div className="flex p-5">
              <h1 className="text-gray-800 font-semibold text-xl">
                Users List
              </h1>
            </div>
            <UserListTable />
          </div>
        </div>
      </div>
    );
  }
}
