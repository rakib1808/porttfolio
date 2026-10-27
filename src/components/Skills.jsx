import React, { useEffect, useRef, useState } from 'react'

const SkillCircle = ({ skill, index, mode }) => {
    const [count, setCount] = useState(0);

    const size = 150;
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (count / 100) * circumference;

    useEffect(() => {
        // রিসেট: পরের বার উপর থেকে এলে আবার ০ থেকে শুরুর জন্য
        if (mode === 'idle') {
            setCount(0);
            return;
        }

        // নিচ থেকে উঠে এলে: অ্যানিমেশন ছাড়াই পূর্ণ মান
        if (mode === 'full') {
            setCount(skill.percentage);
            return;
        }

        // উপর থেকে নামলে: ০ থেকে লোড
        const duration = 1000;
        const delay = index * 100;
        let frameId;
        let startTime;

        const animate = (time) => {
            if (!startTime) startTime = time;
            const progress = Math.min((time - startTime) / duration, 1);
            setCount(Math.round(progress * skill.percentage));
            if (progress < 1) {
                frameId = requestAnimationFrame(animate);
            }
        };

        setCount(0);
        const timeoutId = setTimeout(() => {
            frameId = requestAnimationFrame(animate);
        }, delay);

        return () => {
            clearTimeout(timeoutId);
            cancelAnimationFrame(frameId);
        };
    }, [mode, skill.percentage, index]);

    return (
        <div className='flex flex-col items-center' data-aos='fade-up' data-aos-delay={index * 100}>
            <div className='relative w-36 h-36 sm:w-40 sm:h-40 lg:w-32 lg:h-32'>
                <svg className='w-full h-full -rotate-90' viewBox={`0 0 ${size} ${size}`}>
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill='none'
                        strokeWidth='10'
                        className='stroke-gray-300 dark:stroke-white/90'
                    />
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill='none'
                        stroke={skill.color}
                        strokeWidth='10'
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap='round'
                    />
                </svg>
                <div className='absolute inset-0 flex items-center justify-center'>
                    <span className='text-2xl sm:text-3xl lg:text-2xl font-semibold dark:text-white text-gray-900'>
                        {count}%
                    </span>
                </div>
            </div>
            <h3 className='mt-2 text-sm sm:text-base font-medium text-center dark:text-gray-200 text-gray-900'>
                {skill.name}
            </h3>
        </div>
    );
};

const Skills = () => {
    const skills = [
        { name: 'HTML', percentage: 90, color: '#E34F26' },
        { name: 'CSS', percentage: 80, color: '#1572B6' },
        { name: 'JavaScript', percentage: 55, color: '#F7DF1E' },
        { name: 'React', percentage: 40, color: '#61DAFB' },
        { name: 'Tailwind CSS', percentage: 85, color: '#61DAFB' },
        { name: 'Git & GitHub', percentage: 30, color: '#8A2E2B' },
    ];

    const sectionRef = useRef(null);
    const [mode, setMode] = useState('idle'); // 'idle' | 'animate' | 'full'

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const top = entry.boundingClientRect.top;

                if (entry.isIntersecting) {
                    if (top > 0) {
                        // নিচ দিক থেকে ঢুকেছে (আপনি নামছেন): ০ থেকে লোড
                        setMode('animate');
                    } else {
                        // উপর দিক থেকে ঢুকেছে (আপনি উঠছেন): পূর্ণ মান, লোড নেই
                        setMode('full');
                    }
                } else if (top < 0) {
                    // উপর দিক দিয়ে বেরিয়েছে (আপনি নিচে নেমে গেছেন): রিসেট
                    setMode('idle');
                }
                // নিচ দিক দিয়ে বেরোলে (আপনি উপরে উঠে গেছেন): কিছুই বদলাবে না
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id='skills'
            className='min-h-screen flex items-center relative overflow-hidden pt-16 pb-28 lg:pt-8 px-4 sm:px-6 scroll-mt-0'>

            <div className='absolute inset-0 overflow-hidden'>
                <div className='absolute -top-40 -right-40 w-80 h-80 bg-red-500/5 rounded-full blur-3xl'></div>
                <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/5 rounded-full blur-3xl'></div>
            </div>

            <div className='max-w-6xl mx-auto w-full relative z-10'>
                <div className='text-center mb-10 lg:mb-16' data-aos='fade-up'>
                    <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-5'>
                        <span className='w-2 h-2 rounded-full bg-red-600 animate-pulse' />
                        <span className='text-xs sm:text-sm font-semibold tracking-wider uppercase dark:text-red-300 text-gray-700'>
                            Tech Stack
                        </span>
                    </div>
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 dark:text-white text-gray-900 leading-tight'>
                        My <span className='dark:text-red-300 text-red-600'>Technical Proficiencies</span>
                    </h2>
                    <p className='text-base lg:text-lg max-w-xl mx-auto dark:text-gray-300 text-gray-700 leading-relaxed'>
                        I have a strong foundation in frontend development and continuously strive to enhance my skills. Here are some of the technologies I excel in:
                    </p>
                </div>

                <div className='grid grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-8 lg:gap-4'>
                    {skills.map((skill, index) => (
                        <SkillCircle
                            key={skill.name}
                            skill={skill}
                            index={index}
                            mode={mode}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Skills