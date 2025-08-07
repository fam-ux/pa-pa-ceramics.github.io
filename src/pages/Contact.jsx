import React from 'react'

export default function Contact(){
  const email = import.meta.env.VITE_CONTACT_EMAIL || 'paw.paw.ceramics@gmail.com'
  return (
    <section className="py-8">
      <div className="container max-w-2xl">
        <h1 className="mb-4 text-2xl font-bold">Contact</h1>
        <p className="text-slate-700">
          Questions or custom orders? Email us at{' '}
          <a className="text-brand underline" href={`mailto:${email}`}>{email}</a>.
        </p>
      </div>
    </section>
  )
}


