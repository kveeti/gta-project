import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { request } from "../../../util/axios";
import { Failed } from "./Failed";
import { Success } from "./Success";
import { Verifying } from "./Verifying";

export const EmailVerification = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  const { verifyToken } = router.query;

  useEffect(() => {
    const verify = async () => {
      if (!verifyToken) return;

      const res = await request("/email/verify", "POST", { token: verifyToken });

      if (res) {
        setSuccess(true);
      } else {
        setError(true);
      }
    };

    verify();
  }, [verifyToken]);

  if (success) return <Success />;

  if (error) return <Failed />;

  return <Verifying />;
};
