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

  const query = req.query["q"].toString();
  try {
    const response = await axios(getApiAxiosConfig("/gta/search", "GET", token, query));

    res.status(200).json(response.data);
  } catch (err) {
    console.log("handler err", err);
  }
};

export default handler;
