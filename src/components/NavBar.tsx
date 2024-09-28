import { logout } from "@/api/logout";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function NavBar() {
  const router = useRouter();
  async function handleLogout() {
    try {
      await logout();
      toast.success("Logged out successfully.");
    } catch {
      toast.error("Something went wrong.");
    }
    setTimeout(() => router.push("/"), 1000);
  }
  return (
    <div>
      <div className="s-sling nav border-b-1 flex items-center justify-around bg-black">
        <div></div>
        <div className="my-3 text-5xl text-white">
          <span className="text-cream">cook</span>{" "}
          <span className="text-accent">off</span>
          <span className="text-cream"> 9.0</span>{" "}
        </div>
        <div className="flex justify-evenly text-cream">
          <button
            onClick={handleLogout}
            className="rounded-md bg-dark2 p-2 px-7 text-xl hover:bg-accent hover:text-white"
          >
            logout
          </button>
        </div>
      </div>
    </div>
  );
}
