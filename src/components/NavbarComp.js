import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import logo from '../assets/logo.png'
import pantryicon from '../assets/pantryicon.png'
import recipelogo from '../assets/recipelogo.png'
import user from '../assets/user.png'

export function NavbarComp() {
  const [openNav, setOpenNav] = React.useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  const navList = (
    <ul style={{ fontFamily: "DM Serif Text" }} className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >

        <img className="w-7" src={pantryicon} alt=""/>
        <a href="/pantry" className="flex items-center text-xl pr-8">
          Pantry
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <img className="w-6" src={recipelogo} alt=""/>
        <a href="/collection" className="flex items-center text-xl">
          Collection
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="ml-2 flex items-center gap-x-2 p-1 font-medium"
      >
        <img className="w-6" src={user} alt=""/>
        <a href="/home" className="flex items-center text-xl">
          Profile
        </a>
      </Typography>
    </ul>
  );
 
  return (
    <Navbar className="z-50 mx-auto max-w-screen-xl px-4 py-1 lg:px-8 lg:py-2 bg-[#b4996d]">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          className="mr-4 cursor-pointer py-1.5 text-4xl text-white"
          style={{ fontFamily: "Protest Riot" }}
        >
          Mealify
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-x-1">
          <Button variant="text" size="sm" className="hidden lg:inline-block">
            <img className="w-10" src={logo} alt="logo"/>
          </Button>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      {/* Dropdown menu is here */}
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
        </div>
      </MobileNav>
    </Navbar>
  );
}