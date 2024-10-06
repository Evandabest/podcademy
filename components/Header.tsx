import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadphones,
  faCirclePlus,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./sidebar";

interface HeaderProps {
  showBars?: boolean;
  showMyPods?: boolean;
  showUpload?: boolean;
  showSignup?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  showBars,
  showMyPods,
  showUpload,
  showSignup,
}) => {
  return (
    <div className="flex items-center justify-between p-4 m-4">
      <div className="flex items-center justify-center">
        <Sidebar />
        <div className="flex items-center justify-center">
          {showBars && (
            <button>
              <FontAwesomeIcon
                icon={faBars}
                className="h-[30px] w-[30px] mr-4"
              />
            </button>
          )}
          <Link href="/home">
            <h1 className="text-3xl font-bold hover:text-gray-600">
              podcademy
            </h1>
          </Link>
        </div>
        <FontAwesomeIcon
          icon={faHeadphones}
          className="h-[30px] w-[30px] ml-4"
        />
      </div>
      <div className="flex items-center gap-4">
        {showSignup && (
          <Link
            href="/sign-up"
            className="text-xl underline hover:text-gray-600"
          >
            sign up
          </Link>
        )}
        {showMyPods && (
          <Link
            className="text-xl underline hover:text-gray-600"
            href="/pod"
          >
            my pods
          </Link>
        )}
        {showUpload && (
          <div className="flex items-center">
            <Link href="/upload">
              <FontAwesomeIcon
                icon={faCirclePlus}
                className="h-[30px] w-[30px] hover:text-gray-600"
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
