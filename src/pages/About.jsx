export default function About(){
  return (
    <section className="py-8">
      <div className="container grid items-center gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <h1 className="text-2xl font-bold">Meet Paw Paw</h1>
          <p>Paw Paw is a San Antonio grandmother and lifelong maker who discovered ceramics as a way to relax and connect with her community. Every plate and mug is hand‑painted by her steady hands, then fired with love. She’s a proud senior artist and small business owner who believes that everyday objects should bring joy.</p>
          <p>Her favorite subjects are the things that make home feel like home: playful pandas, sweet pups and kitties, and the wildflowers that bloom across Texas each spring. When you bring one of her pieces into your kitchen, you’re bringing a little piece of San Antonio with it.</p>
        </div>
        <div className="mx-auto max-w-sm rounded-2xl border border-slate-200 bg-white p-3 shadow">
          <div className="h-80 rounded-xl bg-gradient-to-br from-emerald-50 via-white to-purple-50" />
        </div>
      </div>
    </section>
  )
}


