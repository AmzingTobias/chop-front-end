const Welcome: React.FC<{ email: string }> = ({ email }) => {
  return (
    <div className="flex self-center items-center gap-2 m-4">
      <div className="bg-gradient-to-t from-indigo-900 to-blue-900 w-[80px] h-[80px] rounded-full"></div>
      <div className="text-black font-bold mt-2">
        <p>Hi,</p>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default Welcome;
