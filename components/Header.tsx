import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadphones,
  faCirclePlus,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

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
    <div className="flex justify-between items-center p-4 m-4">
      <div className="flex items-center">
        <div className="flex items-center">
          {showBars && (
            <button>
              <FontAwesomeIcon
                icon={faBars}
                className="h-[30px] w-[30px] mr-4"
              />
            </button>
          )}
          <Link href="/home">
            <h1 className="font-bold text-3xl hover:text-gray-600">
              podcademy
            </h1>
          </Link>
        </div>
        <FontAwesomeIcon
          icon={faHeadphones}
          className="h-[30px] w-[30px] ml-4"
        />
      </div>
      <div className="flex gap-4 items-center">
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
            href="/my-pods"
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
