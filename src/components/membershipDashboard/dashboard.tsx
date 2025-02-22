import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import Chat from './childs/chat/chat';
import donation from '../../assets/images/Rectangle 14.png';
import Ai_bottom from "../../assets/images/footerimages/AI_bottom.png";
import metaverse from "../../assets/images/footerimages/Metaverse_bottom.png";
import robotics from "../../assets/images/footerimages/Robot_bottom.jpeg";
import logo from "../../assets/images/navabarlogo/ANAMCARA AI LOGO ICON TRANSPARENT 2.png";
import bell from '../../assets/images/dashboard/Notifications.png';
import settings from '../../assets/images/dashboard/Settings.png';
import logout from '../../assets/images/dashboard/Logout.png';
import { IoNotificationsOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


interface DonationItem {
    title: string;
    raised: string;
    image: string;
}

const Dashboard: React.FC = () => {

    const navigate = useNavigate(); // Initialize navigation

    const handleLogout = () => {
        navigate('/home'); // Redirect to /home
    };

    const handleHome = () => {
        navigate('/main');
    }


    // Sample data for donation items
    const donationItems: DonationItem[] = [
        {
            title: 'Help End Malaria Deaths in the Countries',
            raised: '$30,400 raised',
            image: donation,
        },
        {
            title: 'Help End Malaria Deaths in the Countries',
            raised: '$30,400 raised',
            image: donation,
        },
        {
            title: 'Help End Malaria Deaths in the Countries',
            raised: '$30,400 raised',
            image: donation,
        },
        {
            title: 'Help End Malaria Deaths in the Countries',
            raised: '$30,400 raised',
            image: donation,
        },
        {
            title: 'Help End Malaria Deaths in the Countries',
            raised: '$30,400 raised',
            image: donation,
        },
    ];

    const [isNotificationOff, setIsNotificationOff] = useState(false);

    const handleToggle = () => {
        setIsNotificationOff((prev) => !prev);
    };
    return (
        <div className={styles.dashboardContainer}>
            {/* Left Sidebar with Logos */}
            <aside className={styles.leftSidebar}>
                <div className={styles.logoContainer}>
                    <img src={logo} alt="Dell Logo" className={styles.sidebarLogo} onClick={handleLogout} />
                    <img src={Ai_bottom} alt="Dell Logo" className={styles.sidebarLogo} onClick={handleHome} />
                    <img src={metaverse} alt="panda Logo" className={styles.sidebarLogo} />
                    <img src={robotics} alt="Other Logo" className={styles.sidebarLogo} />
                </div>

                {/* Bottom icons container */}
                <div className={styles.iconContainer}>
                    <div className={styles.iconWrapper} onClick={handleToggle}>
                        {isNotificationOff ? (
                            <IoNotificationsOff size={25} color="#A5FF26" />
                        ) : (
                            <img src={bell} alt="Bell Icon" className={styles.bellImage} />
                        )}
                    </div>
                    <img
                        src={settings}
                        alt="Settings Icon"
                        className={styles.sidebarIcon}
                    />
                    <img src={logout} alt="Logout Icon" className={styles.sidebarIcon} onClick={handleLogout}
                    />
                </div>
            </aside>

            {/* Main Content Area */}
            <main className={styles.mainContent}>

                {/* Dynamic Chat */}
                <Chat />

                {/* Green Flame Background */}
                <div className={styles.greenFlame}></div>

                {/* Donation List on the Right */}
                <div className={styles.donationList}>
                    {donationItems.map((item, idx) => (
                        <div key={idx} className={styles.donationCard}>
                            <img
                                src={item.image}
                                alt="Donation"
                                className={styles.donationImage}
                            />
                            <div className={styles.donationContent}>
                                <h3>{item.title}</h3>
                                <p>{item.raised}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
