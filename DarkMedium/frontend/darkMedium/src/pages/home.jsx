import { MainFrame } from "../components/mainFrame";
import { Header } from "../components/mainHeader";
import { Sidebar } from "../components/sidebar";


export function Home() {

  return (
    <div className="w-screen h-screen">
      <Header />
      <div className="flex items-center justify-center h-[calc(100vh-57px)]">
        <Sidebar />
        <MainFrame />
        <Sidebar />
      </div>
    </div>

  )
}
