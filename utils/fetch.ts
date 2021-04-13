import {SendEmailBody, SendMailResponse} from 'api/handler';

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

type OKNG = 'OK' | 'NG'

export const sendEmail = async (body: SendEmailBody): Promise<{status: OKNG, redirect?: string}> => {
  if (body.type !== 'new-lesson') {
    return;
  }
  const res = await fetch(API_ENDPOINT + '/send', {
    method: 'POST',
    body: JSON.stringify(body),
  }).then(async (x) => x.json()) as SendMailResponse;
  if (res.status === 'error') {
    return {
      status: 'NG',
    };
  }
  return {
    status: 'OK',
    redirect: '/subscribe/complete',
  };
};
