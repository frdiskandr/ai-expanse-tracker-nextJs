import Guest from "@/components/Guest";
import Home from "@/components/Home";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const user = await currentUser()

  if (!user) {
    return <Guest />
  } 

    return (
      <Home user={user}/>
    )
}
