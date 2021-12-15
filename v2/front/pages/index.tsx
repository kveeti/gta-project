import { Content, Main, Section } from "../components/Containers/Containers";
import { MenuBar } from "../components/MenuBar/MenuBar";
import Sidebar from "../components/Sidebar/Sidebar";

export default () => {
  return (
    <Section>
      <MenuBar />
      <Content>
        <Main></Main>
        <Sidebar />
      </Content>
    </Section>
  );
};
