import { useSession } from "next-auth/react";
import { SignInCard } from "./Cards/Signin/Signin";
import { Content, Main, Section } from "./Containers/Containers";
import { MenuBar } from "./MenuBar/MenuBar";
import { Sidebar } from "./Sidebar/Sidebar";

const Layout = ({ children }) => {
  const { data, status } = useSession();

  if (status === "loading") return null;

  if (!data) return <SignInCard />;

  return (
    <Section>
      <MenuBar />
      <Content>
        <Main center>{children}</Main>
        <Sidebar />
      </Content>
    </Section>
  );
};

export default Layout;
