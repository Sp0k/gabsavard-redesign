const Salutations = () => {
  const friends = [
    "friends",
    "amis",
    "amigos",
    "amici",
    "freunde",
    "vrienden",
    "vänner",
    "venner",
    "prieteni",
  ];

  let randomNum;
  do {
    randomNum = Math.floor(Math.random() * 10);
  } while (randomNum > 8);

  return (
    <b className="font-Nunito font-semibold text-[#459DDE] text-4xl lg:text-5xl tracking-wider mb-3">
      {friends[randomNum]}
    </b>
  );
};

export default Salutations;
