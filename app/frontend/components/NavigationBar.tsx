import React, {useState} from 'react';
import { Navbar, NavbarCollapse, NavbarToggle } from "flowbite-react";

interface NavigationBarProps {
}

const NavigationBar: React.FC<NavigationBarProps> = ({ }) => {
    return (
        <div className="bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <Navbar fluid rounded>
                    <a href="/">
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white
                        text-scheme2 hover:brightness-[120%] font-bold scheme2">
                        Dark Moon Reader
                    </span>
                    </a>

                    <NavbarToggle/>

                    <NavbarCollapse>
                        <a href="/readable_texts">
                            Books
                        </a>
                        <a href="/texthooker">
                            Texthooker
                        </a>
                        <a href="/settings">
                            Settings
                        </a>
                    </NavbarCollapse>
                </Navbar>
            </div>
        </div>
    );
};

export default NavigationBar;