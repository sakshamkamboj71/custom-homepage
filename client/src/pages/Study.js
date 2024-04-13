import React from "react";

const Study = (props) => {
  return (
    <div className="w-full flex flex-wrap justify-center text-lg select-none">
      {props.studyLinks.map((link) => {
        return (
          <a
            href={link.linkUrl}
            className="w-64 text-center p-4 mx-20 my-4 cursor-pointer rounded-lg bg-[#121212] border-b-2 border-gray-600"
            key={link._id}
            onClick={() => {}}
          >
            {link.linkName}
          </a>
        );
      })}
    </div>
  );
};

export default Study;
