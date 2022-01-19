import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../state/actions";
import { useISelector } from "../state/hooks";
import { Content, Main, Section, SidebarContainer } from "./Containers/Containers";
import { LeftFloatingButton } from "./FloatingButtons/Left/LeftButtons";
import { RightFloatingButtons } from "./FloatingButtons/Right/RightButtons";
import { MenuBar } from "./MenuBar/MenuBar";
import { Sidebar } from "./Sidebar/Sidebar";
import { useRouter } from "next/router";
import { Toast } from "./Toast/Toast";
import axios from "axios";
import { config } from "../util/axios";
import { toast } from "react-toastify";

interface Props {
  children: React.ReactNode;
  title?: string;
}

const Layout = ({ children, title }: Props) => {
  if (typeof window === "undefined") return null;
  const router = useRouter();
  const users = useISelector((state) => state.users);

  useEffect(() => {
    const getMe = async () => {
      if (users?.me?.id || users.api.loading) return;

      dispatch(actions.users.api.setLoading(true));
      const res = await axios(config("/users/me", "GET")).catch((err) => {
        dispatch(actions.users.api.setLoading(false));
        if (err?.response?.status === 401) toast.error("Session expired");
        return null;
      });
      dispatch(actions.users.api.setLoading(false));

      if (res?.data) return dispatch(actions.users.set.me(res.data));

      router.push("/signin", "/signin", { shallow: true });
    };

    getMe();
  }, []);

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
  }, []);

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
    <>
      <Head>
        <title>{title ? title : "Gta-project"}</title>
      </Head>
      <Section>
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
              {!newSite && <LeftFloatingButton />}
            </>
          )}
        </Content>
      </Section>
    </>
  );
};

export default Layout;
