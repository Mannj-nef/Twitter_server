import dotenv from 'dotenv';
import { ListIdentitiesCommand, SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

dotenv.config();

const CHARSET = 'UTF-8';
const REGION = process.env.AWS_REGION as string;

if (!REGION) {
  throw new Error('Region is not defined in env');
}

const sesClient = new SESClient({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
  }
});

const createSendEmailCommand = ({
  formAddress,
  toAddress,
  ccAddress = [],
  body,
  subject,
  replyToAddresses = []
}: {
  formAddress: string;
  toAddress: string | string[];
  ccAddress?: string | string[];
  replyToAddresses?: string[];
  body: string;
  subject: string;
}) => {
  return new SendEmailCommand({
    Destination: {
      ToAddresses: Array.isArray(toAddress) ? toAddress : [toAddress],
      CcAddresses: Array.isArray(ccAddress) ? ccAddress : [ccAddress]
    },
    Message: {
      Body: {
        Html: {
          Charset: CHARSET,
          Data: body
        }
      },
      Subject: {
        Charset: CHARSET,
        Data: subject
      }
    },
    Source: formAddress,
    ReplyToAddresses: replyToAddresses
  });
};

const sendEmail = async ({
  body,
  subject,
  toAddress
}: {
  body: string;
  subject: string;
  toAddress: string | string[];
}) => {
  const sentEmailComment = createSendEmailCommand({
    body,
    formAddress: process.env.AWS_SES_FROM_ADDRESS as string,
    subject,
    toAddress
  });

  try {
    await sesClient.send(sentEmailComment);
    console.log('Successfully sent email');
  } catch (error) {
    console.error('Failed to send email', error);
    return error;
  }
};

// sendEmail({
//   body: 'hello this is email from ses aws',
//   subject: 'test',
//   toAddress: 'manhquan.05012002@gmail.com'
// });
export default sendEmail;
