import React from 'react'
import { ExternalLink } from 'lucide-react'
import certificateImg from '../assets/Certificate.png'

const Certificates = () => {
    const certificates = [
        {
            id: 1,
            title: 'NSDA (National Skill Development Authority) Certificate, Level- 3.',
            issuer: 'NSDA',
            date: '2026',
            link: 'https://drive.google.com/file/d/1KhWq-1jqb1tl2ZRE89OUlLYZqGd9Afbe/view?usp=sharing',
        },
        {
            id: 2,
            title: 'Cyber Hygiene-Training.',
            issuer: 'Sajida Foundation',
            date: '2025',
            link: 'https://drive.google.com/file/d/1_ZHzGrEOusLn99GjBKpF7Hm0ium4msiy/view?usp=sharing',
        },
        {
            id: 3,
            title: 'Front-End Web Development.',
            issuer: 'Programming Hero',
            date: '2024',
            link: '#',
        },
        {
            id: 4,
            title: 'Reading, Listening and Speaking.',
            issuer: "Mentor's (Kalabagan Branch)",
            date: '2022',
            link: '#',
        },
        {
            id: 5,
            title: 'Learning & Earning Development Project',
            issuer: 'Matlab Kariguri Prosikkhon',
            date: '2020',
            link: '#',
        },
    ]

    return (
        <section
            id='certificates'
            className='min-h-screen flex items-center relative overflow-hidden pt-16 pb-28 lg:pt-8 px-4 sm:px-6'
        >
            <div className='max-w-6xl mx-auto w-full relative z-10'>

                {/* উপরের অংশ: ব্যাজ + হেডিং */}
                <div className='flex flex-col items-center text-center mb-10 lg:mb-14'>
                    <div
                        data-aos='fade-up'
                        className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-5'
                    >
                        <span className='w-2 h-2 rounded-full bg-red-600 animate-pulse' />
                        <span className='text-xs sm:text-sm font-semibold tracking-wider uppercase dark:text-red-300 text-gray-700'>
                            Certifications
                        </span>
                    </div>

                    <h2
                        data-aos='fade-up'
                        data-aos-delay='100'
                        className='text-3xl sm:text-4xl lg:text-5xl font-bold dark:text-white text-gray-900 leading-tight'
                    >
                        My <span className='dark:text-red-300 text-red-600'>Achievements</span> & Training
                    </h2>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center'>

                    {/* ছবি */}
                    <div
                        className='flex justify-center'
                        data-aos='fade-right'
                        data-aos-delay='150'
                    >
                        <div className='relative group w-full max-w-xs sm:max-w-sm'>
                            <div className='absolute inset-0 bg-linear-to-r from-red-500 to-red-800 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 transform-gpu' />
                            <img
                                src={certificateImg}
                                alt='Certificates'
                                className='relative z-10 w-full h-auto'
                            />
                        </div>
                    </div>

                    {/* কার্ড */}
                    <div className='grid gap-3 text-left'>
                        {certificates.map((cert, index) => (
                            <a
                                key={cert.id}
                                data-aos='fade-up'
                                data-aos-delay={index * 100}
                                href={cert.link}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='group flex items-start justify-between gap-4 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 hover:border-red-500/40 transition-colors duration-300'
                            >
                                <div>
                                    <h3 className='font-semibold dark:text-white text-gray-900'>
                                        {cert.title}
                                    </h3>
                                    <p className='mt-1 text-sm dark:text-gray-300 text-gray-700'>
                                        {cert.issuer} · {cert.date}
                                    </p>
                                </div>
                                <ExternalLink
                                    size={18}
                                    className='shrink-0 mt-1 text-gray-500 dark:text-gray-400 group-hover:text-red-500 transition-colors'
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Certificates