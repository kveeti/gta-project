import Head from "next/head";
import { styled } from "@stitches/react";
import { Toast } from "./components/Toast/Toast";

const Wrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "$background",
});

interface Props {
  children: React.ReactNode;
  title?: string;
}

const SingleCardPageLayout = ({ children, title }: Props) => {
  if (typeof window === "undefined") return null;

  return (
    <>
      <Head>
        <title>{title ? title : "Gta-project"}</title>
      </Head>

      <Toast />
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default SingleCardPageLayout;
