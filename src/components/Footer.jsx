export default function Footer(){
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
        <div className="flex items-center gap-2 font-semibold">
          <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" className="h-6 w-6" />
          <span>Pa Pa Ceramics</span>
        </div>
        <p className="text-sm text-slate-500">© {new Date().getFullYear()} Pa Pa Ceramics · San Antonio, TX</p>
      </div>
    </footer>
  )
}


