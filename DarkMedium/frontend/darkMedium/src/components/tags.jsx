import { useContext } from "react"
import App from "../App"
import { AppContext } from "../AppContext"


export function Tags() {

  const { user } = useContext(AppContext)

  return (
    <div className=" h-auto w-full border-stroke font-FiraMono">
      <div className="border-b-1 border-stroke pt-4 p-2">{user.username}</div>
      <div className="border-b-1 border-stroke p-2">Tags-01</div>
      <div className="border-b-1 border-stroke p-2">Tags-01</div>
      <div className="border-b-1 border-stroke p-2">Tags-01</div>
    </div>

  )
}
