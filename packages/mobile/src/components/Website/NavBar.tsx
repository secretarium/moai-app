import React from 'react';
import Logo from 'assets/logo.svg';

type NavigationBarProps = {
    color: string;
};

const NavigationBar: React.FC<NavigationBarProps> = ({ color }) => {

    return (
        <nav className="flex items-center justify-between flex-wrap p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <Logo className="fill-current h-8 mr-2" style={{
                    fill: color
                }} />
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                </button>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                    <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0  mr-4" style={{
                        color
                    }} >
                        Docs
                    </a>
                    <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 mr-4" style={{
                        color
                    }} >
                        Examples
                    </a>
                    <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0" style={{
                        color
                    }} >
                        Blog
                    </a>
                </div>
                <div>
                    <a href="#download" className="inline-block text-sm px-4 py-2 leading-none border rounded hover:border-transparent mt-4 lg:mt-0">Download</a>
                </div>
            </div>
        </nav >
    );
};

export default NavigationBar;