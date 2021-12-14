import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getApiAxiosConfig } from "../../state/actions/axiosConfig";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({
    req,
    secret: "doesnt_matter_but_has_to_be_passed_through",
    raw: true,
  });

  try {
    const response = await axios(getApiAxiosConfig("/gta/users", "GET", token, null));

    res.status(200).json(response.data);
  } catch (err) {
    if (!err.response) return res.status(500).json({ error: "Server error" });
    res.status(err.response.status).end();
  }
};

export default handler;
