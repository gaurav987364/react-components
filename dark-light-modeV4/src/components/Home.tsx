

const Home = () => {
  return (
    <>
      <div className="w-full absolute min-h-screen inset-0 -z-10">
        {/* Light theme */}
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
              radial-gradient(circle, rgba(0, 0, 0, 0.08) 0.8px, transparent 0.8px)
            `,
            backgroundSize: "40px 40px, 40px 40px, 40px 40px"
          }}
        />

        {/* Dark theme */}
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
              radial-gradient(circle, rgba(255, 255, 255, 0.12) 0.8px, transparent 0.8px)
            `,
            backgroundSize: "40px 40px, 40px 40px, 40px 40px"
          }}
        />
      </div>
    </>
  )
}

export default Home;

//pure dots bg
<div className="w-full absolute min-h-screen inset-0 -z-10">
  {/* Light theme */}
  <div
    className="absolute inset-0 dark:hidden"
    style={{
      backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.07) 1px, transparent 1px)`,
      backgroundSize: "20px 20px",
    }}
  />

  {/* Dark theme */}
  <div
    className="absolute inset-0 hidden dark:block"
    style={{
      backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.07) 1px, transparent 1px)`,
      backgroundSize: "20px 20px",
    }}
  />
</div>
