import React from 'react';
import styles from './Dashboard.module.css';
import Chat from './childs/chat/chat';
import donation from '../../assets/images/Rectangle 14.png';
import logo from '../../assets/images/dashboard/Ellipse 6.png';
import dell from '../../assets/images/dashboard/Ellipse 4.png';
import doll from '../../assets/images/dashboard/Ellipse 2.png';
import dell1 from '../../assets/images/dashboard/Ellipse 5.png';
import bell from '../../assets/images/dashboard/Notifications.png';
import settings from '../../assets/images/dashboard/Settings.png';
import logout from '../../assets/images/dashboard/Logout.png';


interface DonationItem {
    title: string;
    raised: string;
    image: string;
}

const Dashboard: React.FC = () => {
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
       
    ];

    return (
        <div className={styles.dashboardContainer}>
            {/* Left Sidebar with Logos */}
            <aside className={styles.leftSidebar}>
                <div className={styles.logoContainer}>
                    <img src={logo} alt="Dell Logo" className={styles.sidebarLogo} />
                    <img src={dell} alt="Dell Logo" className={styles.sidebarLogo} />
                    <img src={doll} alt="panda Logo" className={styles.sidebarLogo} />
                    <img src={dell1} alt="Other Logo" className={styles.sidebarLogo} />
                </div>

                {/* Bottom icons container */}
                <div className={styles.iconContainer}>
                    <img src={bell} alt="Bell Icon" className={styles.sidebarIcon} />
                    <img
                        src={settings}
                        alt="Settings Icon"
                        className={styles.sidebarIcon}
                    />
                    <img src={logout} alt="Logout Icon" className={styles.sidebarIcon} />
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
