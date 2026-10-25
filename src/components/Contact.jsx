import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle2, AlertCircle, X } from 'lucide-react'
import contactImg from '../assets/Contact.png'

const ease = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

const fieldProps = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.6 },
  transition: { duration: 0.8, ease, delay },
})

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const validate = (values) => {
  const errors = {}

  const name = values.name.trim()
  if (!name) errors.name = 'Name is required'
  else if (name.length < 2) errors.name = 'Name must be at least 2 characters'
  else if (name.length > 50) errors.name = 'Name must be under 50 characters'

  const email = values.email.trim()
  if (!email) errors.email = 'email is required'
  else if (!emailRegex.test(email)) errors.email = 'Please enter a valid email address'


  return errors
}

const Contact = () => {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [showPopup, setShowPopup] = useState(false)
  const [botcheck, setBotcheck] = useState(false)

  // পপআপ: ৫ সেকেন্ডে অটো বন্ধ + Esc দিয়ে বন্ধ
  useEffect(() => {
    if (!showPopup) return

    const timer = setTimeout(() => setShowPopup(false), 5000)
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setShowPopup(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [showPopup])

  const handleChange = (e) => {
    const { name, value } = e.target
    const next = { ...values, [name]: value }
    setValues(next)
    if (touched[name]) setErrors(validate(next))
    if (status === 'success' || status === 'error') setStatus('idle')
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors(validate(values))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    if (botcheck) return

    const validationErrors = validate(values)
    setErrors(validationErrors)
    setTouched({ name: true, email: true, message: true })
    if (Object.keys(validationErrors).length > 0) return

    setStatus('sending')
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: 'New message from Portfolio',
          from_name: 'Portfolio Contact Form',
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          botcheck: botcheck,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setStatus('success')
        setShowPopup(true)
        setValues({ name: '', email: '', message: '' })
        setErrors({})
        setTouched({})
      } else {
        console.error('Web3Forms error:', result)
        setStatus('error')
      }
    } catch (err) {
      console.error('Network error:', err)
      setStatus('error')
    }
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-black/40 border text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none transition-colors duration-300 ${
      touched[field] && errors[field]
        ? 'border-red-500 focus:border-red-500'
        : 'border-gray-300 dark:border-white/10 focus:border-red-500/70'
    }`

  return (
    <section
      id='contact'
      className='min-h-screen flex items-center relative overflow-hidden pt-12 pb-24 lg:pt-8 px-4 sm:px-6'
    >
      <div className='max-w-6xl mx-auto w-full relative z-10'>

        <motion.h2
          className='text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 lg:mb-10 dark:text-white text-gray-900'
          variants={fadeUp}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: false, amount: 0.3 }}
        >
          Get In <span className='dark:text-red-400 text-red-600'>Touch</span>
        </motion.h2>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center'>

          {/* ফর্ম: প্রতিটা ফিল্ড নিজে নিজে ভেসে আসবে */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className='order-2 lg:order-1 p-5 sm:p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-black/30 space-y-5 lg:space-y-4'
          >
            <input
              type='checkbox'
              name='botcheck'
              checked={botcheck}
              onChange={(e) => setBotcheck(e.target.checked)}
              className='hidden'
              tabIndex={-1}
              autoComplete='off'
            />

            <motion.div {...fieldProps(0)}>
              <input
                type='text'
                name='name'
                placeholder='Name'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={50}
                autoComplete='name'
                className={inputClass('name')}
              />
              {touched.name && errors.name && (
                <p className='mt-1.5 ml-1 text-sm text-red-500'>{errors.name}</p>
              )}
            </motion.div>

            <motion.div {...fieldProps(0.1)}>
              <input
                type='email'
                name='email'
                placeholder='Email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete='email'
                className={inputClass('email')}
              />
              {touched.email && errors.email && (
                <p className='mt-1.5 ml-1 text-sm text-red-500'>{errors.email}</p>
              )}
            </motion.div>

            <motion.div {...fieldProps(0.2)}>
              <textarea
                name='message'
                placeholder='Message'
                rows={5}
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={1000}
                className={`${inputClass('message')} resize-none`}
              />
              <div className='flex justify-between mt-1 ml-1'>
                <p className='text-sm text-red-500'>
                  {touched.message && errors.message ? errors.message : ''}
                </p>
                <span className='text-xs text-gray-500 dark:text-gray-400'>
                  {values.message.length}/1000
                </span>
              </div>
            </motion.div>

            <motion.div {...fieldProps(0.3)}>
              <button
                type='submit'
                disabled={status === 'sending'}
                className='inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-white font-semibold bg-linear-to-r from-red-600 to-red-800 hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-shadow duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer'
              >
                <Send size={18} />
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'error' && (
                <p className='mt-3 flex items-center gap-2 text-sm text-red-500'>
                  <AlertCircle size={18} /> Something went wrong. Please try again later.
                </p>
              )}
            </motion.div>
          </form>

          <motion.div
            className='order-1 lg:order-2 flex justify-center'
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1, ease, delay: 0.15 }}
          >
            <div className='relative w-full max-w-55 sm:max-w-sm lg:max-w-md'>
              <div className='absolute inset-0 bg-linear-to-r from-red-600 to-red-800 rounded-full blur-2xl opacity-30 transform-gpu' />
              <img
                src={contactImg}
                alt='Contact'
                className='relative z-10 w-full h-auto max-h-[40vh] lg:max-h-[60vh] object-contain'
              />
            </div>
          </motion.div>

        </div>
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            className='fixed inset-0 z-100 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              role='dialog'
              aria-modal='true'
              aria-label='Message sent'
              className='relative w-full max-w-sm p-8 text-center rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 shadow-2xl'
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.4, ease }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type='button'
                onClick={() => setShowPopup(false)}
                aria-label='Close'
                className='absolute top-4 right-4 p-1 rounded-full text-gray-500 hover:text-red-500 transition-colors cursor-pointer'
              >
                <X size={20} />
              </button>

              <div className='mx-auto mb-4 w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center'>
                <CheckCircle2 size={40} className='text-green-500' />
              </div>

              <h3 className='text-2xl font-bold mb-2 dark:text-white text-gray-900'>
                Message Sent!
              </h3>
              <p className='text-sm sm:text-base dark:text-gray-300 text-gray-700 leading-relaxed mb-6'>
                Thank you for reaching out. I'll get back to you soon.
              </p>

              <button
                type='button'
                onClick={() => setShowPopup(false)}
                className='px-8 py-2.5 rounded-xl text-white font-semibold bg-linear-to-r from-red-600 to-red-800 hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-shadow duration-300 cursor-pointer'
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Contact