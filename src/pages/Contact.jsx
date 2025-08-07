export default function Contact(){
  function onSubmit(e){
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = fd.get('name') || ''
    const email = fd.get('email') || ''
    const message = fd.get('message') || ''
    const subject = encodeURIComponent('Contact from Paw Paw Ceramics website')
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:${import.meta.env.VITE_CONTACT_EMAIL || 'orders@pawpawceramics.com'}?subject=${subject}&body=${body}`
  }
  return (
    <section className="py-8">
      <div className="container grid items-start gap-8 md:grid-cols-2">
        <div>
          <h1 className="mb-2 text-2xl font-bold">Say Hello</h1>
          <p>Have a question, want to place an order, or request a custom piece? Send a note and Paw Paw will get back to you soon.</p>
          <ul className="mt-4 space-y-1 text-sm text-slate-700">
            <li><strong>Email</strong>: {import.meta.env.VITE_CONTACT_EMAIL || 'orders@pawpawceramics.com'}</li>
            <li><strong>Local Pickup</strong>: San Antonio, TX</li>
          </ul>
          <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 p-3 text-amber-900">Prefer email ordering? Use the checkout page to email an order summary.</div>
        </div>
        <form onSubmit={onSubmit} className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
          <label className="block text-sm">Name
            <input name="name" required placeholder="Your name" className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="block text-sm">Email
            <input type="email" name="email" required placeholder="you@example.com" className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <label className="block text-sm">Message
            <textarea name="message" required placeholder="What can we make for you?" className="mt-1 h-36 w-full rounded-md border border-slate-200 px-3 py-2" />
          </label>
          <button className="rounded-md bg-brand px-4 py-2 font-medium text-white">Send Message</button>
          <p className="text-xs text-slate-500">This simple form opens your email app to send the message. No data is stored on this site.</p>
        </form>
      </div>
    </section>
  )
}


