import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getApiAxiosConfigWithBody } from "../../state/actions/axiosConfig";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.method) return res.status(405).end();

  const token = await getToken({
    req,
    secret: "doesnt_matter_but_has_to_be_passed_through",
    raw: true,
  });

  if (req.method === "POST") return POSThandler(req, res, token);
  if (req.method === "DELETE") return DELETEhandler(req, res, token);
};

const POSThandler = async (req: NextApiRequest, res: NextApiResponse, token: string) => {
  try {
    if (!req.body) return res.status(400).end();

    const response = await axios(getApiAxiosConfigWithBody("/cars", "POST", token, req.body));

    res.status(200).json(response.data);
  } catch (err) {
    console.log(err);

    if (!err.response) return res.status(500).json({ error: "Server error" });
    res.status(err.response.status).end();
  }
};

const DELETEhandler = async (req: NextApiRequest, res: NextApiResponse, token: string) => {
  try {
    if (!req.body) return res.status(400).end();

    const response = await axios(getApiAxiosConfigWithBody("/cars", "DELETE", token, req.body));

    res.status(200).json(response.data);
  } catch (err) {
    console.log(err);

    if (!err.response) return res.status(500).json({ error: "Server error" });
    res.status(err.response.status).end();
  }
};

export default handler;
