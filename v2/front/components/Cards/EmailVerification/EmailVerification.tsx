import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { config } from "../../../util/axios";
import { Failed } from "./Failed";
import { Success } from "./Success";
import { Verifying } from "./Verifying";

export const EmailVerification = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [reason, setReason] = useState("");

  const router = useRouter();

  const { verifyToken } = router.query;

  useEffect(() => {
    const verify = async () => {
      if (!verifyToken) return;

      try {
        const res = await axios(config("/email/verify", "POST", { token: verifyToken }));
        if (res.status === 204) return setSuccess(true);
        setError(true);
        setReason("An error occurred");
      } catch (err) {
        setError(true);
        if (!err?.response) return setReason("An error occurred");

        if (err?.response?.status === 400) setReason("Invalid verification token");
      }
    };

    verify();
  }, [verifyToken]);

  if (success) return <Success />;

  if (error) return <Failed reason={reason} />;

  return <Verifying />;
};
