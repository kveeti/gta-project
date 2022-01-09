import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../state/actions";
import { useISelector } from "../state/hooks";
import { SignInCard } from "./Cards/Signin/Signin";
import { Content, Main, Section, SidebarContainer } from "./Containers/Containers";
import { LeftFloatingButton } from "./FloatingButtons/Left/LeftButtons";
import { RightFloatingButtons } from "./FloatingButtons/Right/RightButtons";
import { MenuBar } from "./MenuBar/MenuBar";
import { Sidebar } from "./Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  if (typeof window === "undefined") return null;

  const dispatch = useDispatch();
  const state = useISelector((state) => state);
  const showOnlySidebar = useISelector((state) => state.checked.show);
  const mobile = state.bp === 1;
  const tablet = state.bp === 2;
  const showFloatingButtons = mobile;

  useEffect(() => {
    let bp = 3;

    if (window.innerWidth < 1060) bp = 2;
    if (window.innerWidth < 690) bp = 1;

    if (state.bp !== bp) dispatch(actions.bp.set(bp));

    const handleResize = () => {
      let bp = 3;

      if (window.innerWidth < 1060) bp = 2;
      if (window.innerWidth < 690) bp = 1;

      if (state.bp !== bp) dispatch(actions.bp.set(bp));
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  // if user doesnt have a session, redirect to sign in
  const { data, status } = useSession();
  if (status === "loading") return null;
  if (!data) return <SignInCard />;

  const location = window.location.pathname;
  const newSite = location.includes("new");

  let showSideBar: boolean;

  // if on "new" site hide sidebar on mobile and tablet
  // everywhere else only hide sidebar on mobile
  if (newSite) {
    showSideBar = !mobile && !tablet;
  } else {
    showSideBar = true;

    if (mobile) {
      showSideBar = showOnlySidebar;
    }
  }

  return (
    <Section>
      <MenuBar mobile={mobile} />
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        theme="colored"
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Content single={newSite && tablet}>
        {!showOnlySidebar && <Main>{children}</Main>}

        {showSideBar && (
          <SidebarContainer>
            <Sidebar />
          </SidebarContainer>
        )}

        {showFloatingButtons && (
          <>
            <RightFloatingButtons />
            <LeftFloatingButton />
          </>
        )}
      </Content>
    </Section>
  );
};

export default Layout;
