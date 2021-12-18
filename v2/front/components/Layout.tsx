import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../state/actions";
import { useISelector } from "../state/hooks";
import { SignInCard } from "./Cards/Signin/Signin";
import { Content, Main, Section, SidebarContainer } from "./Containers/Containers";
import { MenuBar } from "./MenuBar/MenuBar";
import { Sidebar } from "./Sidebar/Sidebar";

const Layout = ({ children }) => {
  if (typeof window === "undefined") return null;

  const dispatch = useDispatch();
  const state = useISelector((state) => state);
  const mobile = state.bp === 1;
  const tablet = state.bp === 2;

  useEffect(() => {
    const handleResize = () => {
      let bp = 3;

      if (window.innerWidth < 690) bp = 1;
      if (window.innerWidth < 1050) bp = 2;

      if (state.bp !== bp) dispatch(actions.bp.set(bp));
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  const { data, status } = useSession();

  if (status === "loading") return null;

  if (!data) return <SignInCard />;

  return (
    <Section>
      <MenuBar />
      <Content>
        <Main>{children}</Main>
        {!mobile && !tablet && (
          <SidebarContainer>
            <Sidebar />
          </SidebarContainer>
        )}
      </Content>
    </Section>
  );
};

export default Layout;
