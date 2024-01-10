export const Image = ({ url }: { url: string }) => {
  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: "50%",
        width: 120,
        height: 120,
        transform: "translateY(-60px)",
        backgroundImage: `url(${url})`,
        backgroundSize: "contain",
        backgroundPosition: "right center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};
