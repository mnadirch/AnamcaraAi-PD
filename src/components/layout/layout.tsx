import React, { ReactNode } from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import styles from "./layout.module.css";
import { Suspense } from "react";
import Loading from "../loading/loading";
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.mainContainer}>
      <Navbar />

      <div className={styles.childContent}>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
