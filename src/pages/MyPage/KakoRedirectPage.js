import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import { userInfoState } from "./recoil/atoms/userState";
export default function KakoRedirectPage() {
  const PARAMS = new URL(document.location).searchParams;
  const KAKAO_CODE = PARAMS.get("code");
  const grant_type = "authorization_code";
  const client_id = `${process.env.REACT_APP_REST_API_KEY}`;
  const client_secret = "mwtfEbotahN7vZpDOg1K0QhSg1ol6SH0";
  const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URI}`;
  const [accessTokenFetching, setAccessTokenFetching] = useState(false);
  const navigate = useNavigate();
  console.log("client_id", client_id);
  console.log("REDIRECT_URI", REDIRECT_URI);

  useEffect(() => {
    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri${REDIRECT_URI}&code=${KAKAO_CODE}&client_secret=${client_secret}`,
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => {
        const { access_token } = res.data;

        axios
          .post(
            `https://kapi.kakao.com/v2/user/me`,
            {},
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-type":
                  "application/x-www-form-urlencoded;charset=utf-8",
              },
            }
          )
          .then((res) => {
            console.log("2번쨰", res);
            navigate("/account", { state: res.data });
          })
          .catch((error) => {
            console.log("2번쨰 error", error);
          });
      })
      .catch((error) => {
        console.log("error", error);
      });
    // }

    // }
  }, [KAKAO_CODE]);

  return <div> Loading...</div>;
}