import React from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa'
import { Heart } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1]

const Footer = () => {
    const socialLinks = [
        { label: 'GitHub', link: 'https://github.com/rakib1808', icon: FaGithub },
        
        { label: 'Facebook', link: 'https://www.facebook.com/rakib1808', icon: FaFacebook, color: 'hover:text-red-600 hover:border-red-500/40' },

        { label: 'Instagram', link: '#', icon: FaInstagram, color: 'hover:text-red-600 hover:border-red-500/40' }


    ]

    return (
        <footer className='relative w-full border-t border-gray-300 dark:border-white/80 bg-linear-to-r from-red-400 via-red-300 to-red-200 dark:from-black dark:via-[#1a0507] dark:to-red-950 px-4 sm:px-6 pt-8 pb-28 lg:pb-34'>
            <motion.div
                className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-5 md:gap-4 text-center md:text-left'
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.8, ease }}
            >

                <div>
                    <h3 className='text-xl sm:text-2xl font-bold text-red-700 dark:text-red-400 leading-tight'>
                        Portfolio
                    </h3>
                    <p className='text-sm text-gray-900 dark:text-white'>
                        Frontend Developer
                    </p>
                </div>

                <div className='flex items-center justify-center gap-5'>
                    {socialLinks.map((social) => {
                        const Icon = social.icon
                        return (
                            <a
                                key={social.label}
                                href={social.link}
                                aria-label={social.label}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-2xl text-gray-900 dark:text-white hover:text-red-700 dark:hover:text-red-400 hover:scale-110 transition-all duration-300'
                            >
                                <Icon />
                            </a>
                        )
                    })}
                </div>

                <p className='flex items-center justify-center md:justify-end gap-1.5 text-xs sm:text-sm text-gray-900 dark:text-white'>
                    2026 Made with by
                    <a
                        href='#'
                        className='font-semibold text-red-700 dark:text-red-500 hover:underline'
                    >
                        Rakib Hasan.
                    </a>
                </p>
            </motion.div>
        </footer>
    )
}

export default Footer