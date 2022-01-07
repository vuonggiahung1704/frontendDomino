import React, { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Modal from '../Modal';
import { useParams } from 'react-router-dom';

const Layout = (props) => {
  const [isShowMenu, setIsShowMenu] = useState(false);

  // const { id } = useParams();

  return (
    <>
      <Navbar isShowMenu={isShowMenu} handle={setIsShowMenu} />
      <main className="l-main bd-container">{props.children}</main>
      <Footer />
      <Modal />
    </>
  );
};

export default Layout;
