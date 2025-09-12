import React from 'react'

export default function Contact(){
  const email = import.meta.env.VITE_CONTACT_EMAIL || 'haxule56@gmail.com'
  return (
    <section className="py-8">
      <div className="container max-w-2xl">
        <h1 className="mb-4 text-2xl font-bold">Contact</h1>
        <p className="text-slate-700">
          Questions or custom orders? Email me at {email} or leave a message at (210)-391-zero-seven-six-seven (will respond within 24 hours).
        </p>
      </div>
    </section>
  )
}


