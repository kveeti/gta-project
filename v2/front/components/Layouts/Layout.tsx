import Head from "next/head";
import { useISelector } from "../../state/hooks";
import { Content, Main, SidebarContainer } from "./components/Containers";
import { LeftFloatingButtons } from "./components/FloatingButtons/Left/LeftButtons";
import { RightFloatingButtons } from "./components/FloatingButtons/Right/RightButtons";
import { MenuBar } from "./components/MenuBar/MenuBar";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Toast } from "./components/Toast/Toast";
import { useResizeListener } from "../../hooks/useResizeListener";
import { useIsLoggedIn } from "../../hooks/useIsLoggedIn";

interface Props {
  children: React.ReactNode;
  token?: string;
  title?: string;
}

const Layout = ({ children, token, title, ...props }: Props) => {
  if (typeof window === "undefined") return null;

  const viewBlocked = useIsLoggedIn();
  useResizeListener();

  const state = useISelector((state) => state);
  const showOnlySidebar = useISelector((state) => state.checked.show);
  const mobile = state.bp === 1;
  const tablet = state.bp === 2;
  const showFloatingButtons = mobile;

  const location = window.location.pathname;
  const newSite = location?.includes("new");

  if (viewBlocked) return null;

  let showSideBar: boolean;

  // if on /new/* site, hide sidebar on mobile and tablet
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
    <>
      <Head>
        <title>{title ? title : "My GTA Online"}</title>
      </Head>
      <MenuBar mobile={mobile} />
      <Toast />
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
            <LeftFloatingButtons />
          </>
        )}
      </Content>
    </>
  );
};

export default Layout;
