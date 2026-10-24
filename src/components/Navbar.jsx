import React, { useState } from 'react'
import { FaHome, FaUser, FaCode, FaCertificate, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ darkMode, toggleDarkMode }) => {
    const [activeTab, setActiveTab] = useState('Home');

    const navItems = [
        { Name : 'Home', link: '#home', icon: FaHome },
        { Name : 'About', link: '#about', icon: FaUser },
        { Name : 'Skills', link: '#skills', icon: FaCode },
        { Name : 'Certificates', link: '#certificates', icon: FaCertificate },
        { Name : 'Projects', link: '#projects', icon: FaProjectDiagram },
        { Name : 'Contact', link: '#contact', icon: FaEnvelope }
    ];

    // Mood-based theme styles for the navbar
    const theme = darkMode
        ? {
            barBg: '#b91c1c', // red-700
            barShadow:
                'inset 6px 6px 12px rgba(0,0,0,0.25), inset -6px -6px 12px rgba(255,90,90,0.28), 0 10px 25px rgba(0,0,0,0.35)',
            activeBg: '#b91c1c',
            activeShadow:
                '5px 5px 10px rgba(0,0,0,0.5), -4px -4px 8px rgba(255,100,100,0.3)',
            activeText: 'text-white',
            idleIcon: 'text-white/70',
            idleLabel: 'text-white/60',
            hoverText: 'group-hover:text-white',
        }
        : {
            barBg: '#fecaca', // red-200 
            barShadow:
                'inset 6px 6px 12px rgba(163,163,163,0.65), inset -6px -6px 12px rgba(255,255,255,0.9), 0 8px 20px rgba(0,0,0,0.12)',
            activeBg: '#fee2e2',
            activeShadow:
                '5px 5px 5px rgba(163,163,163,0.8), 5px 5px 10px rgba(255,255,255,0.0)',
            activeText: 'text-gray-900',
            idleIcon: 'text-gray-500',
            idleLabel: 'text-gray-500',
            hoverText: 'group-hover:text-gray-900',
        };

  return (
    <div className={'fixed z-50 bottom-0 left-0 right-0 flex justify-center'}>
        <motion.nav
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={'relative w-[95%] max-w-4xl mb-4'}
        >

            <div
                className={'relative rounded-full px-3 py-2.5 transition-all duration-500'}
                style={{
                    backgroundColor: theme.barBg,
                    boxShadow: theme.barShadow,
                }}
            >

                <div className={'absolute -top-5 right-3'}>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleDarkMode}
                        className={'p-2 rounded-full bg-gray-900 dark:bg-gray-100 transition-colors backdrop-blur-sm'}
                    >
                        {darkMode ? (
                            <Sun className='w-4 lg:w-5 h-4 lg:h-5 text-black'/>
                        ) : (
                            <Moon className='w-4 lg:w-5 h-4 lg:h-5 text-white'/>)
                        }
                    </motion.button>
                </div>

                <div className={'flex justify-around items-center gap-1'}>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.Name;
                        return (
                            <motion.a
                                key={item.Name}
                                href={item.link}
                                onClick={() => setActiveTab(item.Name)}
                                whileTap={{ scale: 0.95 }}
                                className={'flex flex-col items-center justify-center gap-0.5 py-1.5 px-2 relative group flex-1'}
                            >

                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        transition={{ type: 'spring', stiffness: 350, damping: 50 }}
                                        className="absolute inset-0 rounded-full"
                                        style={{
                                            backgroundColor: theme.activeBg,
                                            boxShadow: theme.activeShadow,
                                        }}
                                    />
                                )}

                                <Icon className={`relative z-10 w-5 h-5 transition-all duration-300 ${isActive ? theme.activeText : theme.idleIcon} ${theme.hoverText}`} />

                                <span className={`relative z-10 text-[10px] font-medium transition-all duration-300 ${isActive ? theme.activeText : theme.idleLabel} ${theme.hoverText}`}>
                                    {item.Name}
                                </span>
                            </motion.a>
                        );
                    })}
                </div>
            </div>
        </motion.nav>
    </div>
  )
}

export default Navbar