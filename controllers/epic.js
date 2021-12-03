export const epic = (req, res) => {
  const date = new Date();
  const time = `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;

  const game = req.params.game;

  res.redirect(["com.epicgames.launcher://store/p/", game].join(""));

  console.log(
    `\n@ ${time}
  Redirected to epic
    ${game}
    ${req.headers["x-real-ip"]}
    `
  );
};
