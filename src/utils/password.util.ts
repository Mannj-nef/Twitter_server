import bcrypt from 'bcrypt';

const handleHashPassword = (password: string) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

const handleVerifyPassword = ({ password, hash = '' }: { password: string; hash?: string }) => {
  const passwordIsMatch = bcrypt.compareSync(password, hash);

  return passwordIsMatch;
};

export { handleHashPassword, handleVerifyPassword };
