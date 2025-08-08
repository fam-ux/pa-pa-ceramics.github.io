export default function About(){
  return (
    <section className="py-8">
      <div className="container grid items-center gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Meet Pa Pa</h1>
          <p>I am not an artist nor a business woman. I am just an ordinary retiree who loves to draw, paint, and do crafts.</p>
          <p>All of my products are drawn and painted by hand. The following is a general outline of my process:</p>
          <ul className="list-disc pl-6 space-y-1 text-slate-700">
            <li>I use quality paint.</li>
            <li>All products are oven cured (after painted).</li>
            <li>All products are then sealed with Mod Podge.</li>
            <li>Epoxy resin is applied on the surface of coaster products only.</li>
          </ul>
          <div className="space-y-2">
            <p><strong>Care &amp; Use</strong></p>
            <ul className="list-disc pl-6 space-y-1 text-slate-700">
              <li>The 8 inches dinner plate is for display only; please do not use as a dinner plate.</li>
              <li>The mugs and coasters may be used with care. Please do not put in microwave for heating.</li>
              <li>Items are not dishwasher safe — hand wash with care, please.</li>
            </ul>
          </div>
          <p>Because items are hand drawn and painted, there may be slight differences in the color and shape between similar products.</p>
          <p>"Paw Paw Creations" was named by my grandson, and this website was designed by him too — a true family project.</p>
          <p>I deeply appreciate your support. It is my biggest encouragement and empowers me to succeed!</p>
          <p className="italic">Sincerely,<br/>Ha Le</p>
        </div>
        <div className="mx-auto max-w-sm rounded-2xl border border-slate-200 bg-white p-3 shadow">
          <div className="h-80 rounded-xl bg-gradient-to-br from-emerald-50 via-white to-purple-50" />
        </div>
      </div>
    </section>
  )
}


