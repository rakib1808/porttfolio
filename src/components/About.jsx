import { ArrowRight } from 'lucide-react';
import { FaFacebook, FaGithub, FaDiscord, FaLinkedin, FaInstagram } from 'react-icons/fa';
import about from '../assets/about.png';

const About = () => {
    const socialLinks = [
        { label: 'GitHub', link: 'https://github.com/rakib1808', icon: FaGithub, color: 'hover:text-red-600 hover:border-red-500/40' },
        
        { label: 'FaDiscord', link: 'https://discord.com/users/1273352746925424786', icon: FaDiscord, color: 'hover:text-red-600 hover:border-red-500/40' },

        { label: 'Facebook', link: 'https://www.facebook.com/rakib1808', icon: FaFacebook, color: 'hover:text-red-600 hover:border-red-500/40' },
,

        { label: 'LinkedIn', link: 'https://www.linkedin.com/in/rakib1808/', icon: FaLinkedin },

    ];

    return (
        <section id='about' className='min-h-screen flex items-center relative overflow-hidden pt-8 pb-28 px-4 sm:px-6 scroll-mt-0'>
            <div className='max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10'>

                <div className='order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left' data-aos='fade-right'>
                    <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-5'>
                        <span className='w-2 h-2 rounded-full bg-red-600 animate-pulse' />
                        <span className='text-xs sm:text-sm font-semibold tracking-wider uppercase dark:text-red-300 text-gray-700'>
                            About Me
                        </span>
                    </div>

                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 dark:text-white text-gray-900 leading-tight'>
                        I'm <span className='dark:text-red-400 text-red-600'>Rakib Hasan</span>, a passionate Frontend Developer
                    </h2>

                    <p className='mb-5 text-base lg:text-lg max-w-xl dark:text-gray-300 text-gray-700 leading-relaxed'>
                        I specialize in creating responsive and user-friendly web applications using modern technologies like React, Tailwind CSS, and more.
                    </p>

                    <div className='flex gap-4 mb-5'>
                        {socialLinks.map((social) => {
                            const IconComponent = social.icon;
                            return (
                                <a
                                    key={social.label}
                                    href={social.link}
                                    aria-label={social.label}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm dark:text-gray-300 text-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color}`}
                                >
                                    <IconComponent />
                                </a>
                            );
                        })}
                    </div>

                    <a
                        href='#contact'
                        data-aos='fade-up'
                        data-aos-delay='100'
                        className='group inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-white font-semibold bg-linear-to-r from-red-600 to-red-800 hover:shadow-[0_0_40px_rgba(220,38,38,0.9)] dark:hover:shadow-[0_0_40px_rgba(220,38,38,0.3)] transition-all duration-300 transform hover:scale-105 cursor-pointer'>
                        Let's Talk
                        <ArrowRight size={18} />
                    </a>
                </div>

                <div className='relative order-1 lg:order-2 flex justify-center lg:justify-end' data-aos='fade-left'>
                    <div className='relative w-full max-w-xs sm:max-w-sm lg:max-w-sm'>

                        <div className='absolute inset-0 bg-linear-to-r from-red-600 to-red-800 rounded-[40%_60%_60%_40%/60%_30%_70%_40%] blur-xl opacity-40 animate-pulse' />

                        <div className='absolute inset-0 bg-linear-to-r from-red-600 to-red-800 rounded-[40%_60%_60%_40%/60%_30%_70%_40%] rotate-3 scale-105 opacity-60' />

                        <img
                            src={about}
                            alt='Rakib Hasan'
                            className='relative z-10 w-full h-auto max-h-[60vh] object-cover shadow-2xl rounded-[40%_60%_60%_40%/60%_30%_70%_50%]'
                        />
                    </div>
                </div>

            </div>
        </section>
    )
}

export default About