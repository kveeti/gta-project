import { Content, Main, Section } from "./Containers/Containers";
import { MenuBar } from "./MenuBar/MenuBar";
import { Sidebar } from "./Sidebar/Sidebar";

const Layout = ({ children }) => (
  <Section>
    <MenuBar />
    <Content>
      <Main center>{children}</Main>
      <Sidebar />
    </Content>
  </Section>
);

export default Layout;
