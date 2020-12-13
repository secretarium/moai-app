import React from 'react';
import FAQ from './FAQ';
import Notifications from './Notifications';
import Legal from './Legal';
import ContactUs from './ContactUs';
import SettingsMenu from './SettingsMenu';
import { useParams } from 'react-router-dom';


type ParamTypes = {
    setting: string;
};

const Settings: React.FC = () => {
    const { setting } = useParams<ParamTypes>();

    let composition = null;
    if (setting === undefined || setting === 'faq') {
        composition = <FAQ />;
    } else if (setting === 'notifications') {
        composition = <Notifications />;
    } else if (setting === 'contact') {
        composition = <ContactUs />;
    } else if (setting === 'legal') {
        composition = <Legal />;
    }

    return (
        <>
            <SettingsMenu />
            {composition}
        </>
    );
};

export default Settings;
