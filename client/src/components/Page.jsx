import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { getUser } from "../redux/slices/userSlice";

import Header from "./Header";
import Footer from "./Footer";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    paddingTop: "120px",
  },
  main: {
    flexGrow: "1",
    overflowY: "scroll"
  },
};

const defaultHeadContent = (
  <>
    <title>Please Change Me!</title>
    <meta
      name="description"
      content="This is the default description of my App."
    />
  </>
);

export default function Page({
  isProtected = false,
  headContent = defaultHeadContent,
  children,
}) {
  const { isAuthenticated } = useSelector(getUser());

  return (
    <>
      <Helmet>{headContent}</Helmet>
      <Header />
      <div style={styles.container} className="slider container-fluid rpgui-content">
        <main style={styles.main}>
          {isProtected && !isAuthenticated ? <div>Unauthorized</div> : children}
        </main>
        <Footer />
      </div>
    </>
  );
}
