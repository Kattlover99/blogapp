import { avatar } from "../../public/image";

const Avatar = ({ src }: any) => {
  const getAvatar = () => {
    if (src && src !== "undefined") {
      return src;
    }
    return avatar.src;
  };

  return (
    <img
      src={getAvatar()}
      alt="avatar"
      className={`avatar`}
    />
  );
};

export default Avatar;
