import authenticationService, { SignInParams } from '@/services/authentication-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import axios from 'axios';
import qs from 'query-string';
import dotenv from 'dotenv';
dotenv.config();

export async function singInPost(req: Request, res: Response) {
  if (req.body.code) {
    try {
      const token = await exchangeCodeForAccessToken(req.body.code);
      console.log('token', token);
  
      const user = await fetchUser(token);
      res.send(user);
    } catch (err) {
      console.log('err', err.response.data);
      res.sendStatus(500);
    }
  }

  const { email, password } = req.body as SignInParams;

  const result = await authenticationService.signIn({ email, password });

  res.status(httpStatus.OK).send(result);
}

async function exchangeCodeForAccessToken(code: any) {
  const GITHUB_ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';
  const { REDIRECT_URL, CLIENT_ID, CLIENT_SECRET } = process.env;
  const params = {
    code,
    grant_type: 'authorization_code',
    redirect_uri: REDIRECT_URL,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET
  };

  const { data } = await axios.post(GITHUB_ACCESS_TOKEN_URL, params, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const parsedData = qs.parse(data);
  return parsedData.access_token;
}

async function fetchUser(token: any) {
  const response = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}
