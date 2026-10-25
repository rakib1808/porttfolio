import React from 'react'
import { FaGithub, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'
import hero from '../assets/hero.png'
import cv from '../assets/Rakib_Hasan_Dev_CV.pdf'
import { Download as DownloadIcon , Mail } from 'lucide-react'

const Hero = () => {

    return (
        <section id='home' className='min-h-screen flex items-center relative overflow-hidden'>
            <div className='container mx-auto px-4 sm:px-8 lg:px-14 py-22 lg:py-12 lg:-mt-14 relative z-10'>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16'>

                    <div
                        className='lg:w-2/5 w-full flex justify-center'
                        data-aos='fade-right'
                    >
                        <div className='relative group'>
                            <div className='absolute inset-0 bg-linear-to-r from-red-600 to-red-800 rounded-full filter blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500'></div>

                            <div className='relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96'>
                                <img
                                    src={hero}
                                    alt='hero'
                                    className='w-full h-full object-cover rounded-full relative z-10 transform group-hover:scale-105 transition-transform duration-500'
                                />
                                <div className='absolute inset-0 border-2 border-red-500/30 rounded-full scale-100 group-hover:scale-110 transition-transform duration-500' />

                                <div className='absolute inset-0 border-2 border-red-500/30 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500' />
                            </div>
                        </div>
                    </div>
                    <div className='lg:w-3/5 w-full flex flex-col items-center lg:items-start text-center lg:text-left' data-aos='fade-left'>

                        <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-5'>

                            <span className=' w-2 h-2 rounded-full bg-green-500 animate-pulse'/>
                            <span className='text-sm font-medium dark:text-red-300 text-gray-700'>
                                Available for work
                            </span>
                        </div>  

                        <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 dark:text-white text-gray-900'>
                            Hi, I'm <span className='dark:text-red-300 text-red-600'>Rakib Hasan</span>
                        </h1>
                        <h2 className='text-xl sm:text-2xl font-mono mb-4 dark:text-red-400 text-red-600'>
                            <span className='text-gray-400'> &lt; </span>
                            Frontend Developer 
                            <span className='text-gray-400'> &gt; </span>
                        </h2>
                        <p className='mb-6 leading-relaxed max-w-md lg:max-w-lg dark:text-gray-300 text-gray-700'>
                            I'm a passionate frontend developer with a strong focus on creating visually appealing and user-friendly web applications. I specialize in React.js and have experience working with various frontend technologies to deliver high-quality solutions.
                        </p>

                        <div className='flex gap-8 mb-7'>
                            {[
                                { Number: '2+', Label: 'Years of Experience' },
                                { Number: '10+', Label: 'Projects Completed' },
                                { Number: '5+', Label: 'Happy Clients' },
                            ]
                            .map((item, index) => (
                                <div key={index} className='text-center'>
                                    <div className='text-2xl font-bold dark:text-white text-gray-900'>{item.Number}
                                    </div>
                                    <div className='text-sm font-medium dark:text-gray-400 text-gray-600'>{item.Label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto'>
                            <a href={cv} download className='w-full sm:w-auto'>
                                <button className='w-full sm:w-auto inline-flex item-center justify-center gap-2 px-8 py-3 rounded-full text-white font-semibold bg-linear-to-r from-red-600 to-red-800 hover:shadow-[0_0_40px_rgba(220,38,38,0.9)] dark:hover:shadow-[0_0_40px_rgba(220,38,38,0.3)] transition-all duration-300 transform hover:scale-105 cursor-pointer'>
                                    <DownloadIcon size={18} />
                                    Download CV
                                </button>
                            </a>

                            <a
                                href="#contact"
                                className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border-2 border-red-600 dark:text-white text-gray-800 font-semibold hover:bg-red-700 hover:text-white hover:shadow-[0_0_40px_rgba(220,38,38,0.9)] dark:hover:shadow-[0_0_40px_rgba(220,38,38,0.3)] transition-all duration-300 transform hover:scale-105 cursor-pointer'
                            >
                                <Mail size={18} />
                                Hire Me
                            </a>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero