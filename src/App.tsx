import kenkoLogo from '../public/kenko_logo.png';
import { RootLayout } from './componentes';
import awakeServer from './utils/awakeServer';

export default function App() {
  return (
    <div className="bg-k-blue-700  h-screen w-screen">
      <div className=" flex justify-between bg-k-blue-800 items-center shadow-md">
        <div className="flex items-center">
          <img src={kenkoLogo} alt="kenko logo" className="h-14 " />
          <h1 className="font-bold p-2 sm:text-lg text-slate-50 tracking-wide">
            Prueba Técnica: Kenko Imalytics
          </h1>
        </div>
        <button
          onClick={awakeServer}
          className="mr-5 text-slate-50 border rounded-md p-1 cursor-pointer hover:border-2 hover:scale-105 transition-all"
          title="Llamada al backend en render.com"
        >
          Awake Server
        </button>
      </div>
      <RootLayout />
    </div>
  );
}
