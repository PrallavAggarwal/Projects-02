import MonkeyThinks from '../assets/MonkeyThinks.jpeg'

export function Intro() {

  function StarryBackground() {
    const starCount = 100; // Number of stars
    const stars = Array.from({ length: starCount }, (_, index) => {
      const style = {
        left: `${Math.random() * 100}vw`,
        top: `${Math.random() * 100}vh`,
        animationDuration: `${Math.random() * 5 + 5}s`, // Random duration between 5-10s
        animationDelay: `${Math.random() * 5}s`, // Random delay
      };
      return <div key={index} className="star" style={style}></div>;
    });

    return (
      <div className="fixed inset-0 bg-black overflow-hidden">
        {stars}
      </div>
    );
  }


  return (
    <div className="m-auto w-[1200px] h-screen">
      <div className="flex flex-col gap-2 items-center justify-center pt-4">
        <div className=" text-6xl">Dark</div>
        <div className=" text-3xl">Articles to document your expresssions.</div>
      </div>
      <div className=" flex flex-col gap-6 mt-40 items-center w-full">
        <div className="w-3/6">
          <img src={MonkeyThinks} className="w-full" />
        </div>
        <div className="w-3/6 flex justify-between gap-2">
          <div className="border w-full text-4xl text-center p-3">SignUp</div>
          <div className="border w-full text-4xl text-center p-3">LogIn</div>
        </div>
      </div>
    </div>

  )
}
