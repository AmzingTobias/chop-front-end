const Welcome: React.FC<{ email: string }> = ({ email }) => {
  return (
    <div className="flex items-center self-center gap-2 m-4">
      <div className="bg-gradient-to-br from-primary to-accent w-[80px] h-[80px] rounded-full"></div>
      <div className="mt-2 text-lg font-bold text-primary">
        <p>Hi,</p>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default Welcome;
