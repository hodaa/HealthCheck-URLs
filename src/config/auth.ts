
const env = process.env

export default{
  secret: "bezkoder-secret-key",
  user: env.EMAIL,
  pass: env.EMAIL_PASS,
};
