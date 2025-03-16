import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useCheckSkillsExamsAvailabilityQuery } from "../api/studentApi";
import Images from "../assets/images/Images";

interface Skill {
  SkillName: string;
  SkillId: string;
}

const AssessmentsDetails: React.FC = () => {
  const location = useLocation();
  const { title } = location.state || {};
  const { examId } = useParams();

  // Fetch skills exam availability using Redux Toolkit Query
  const {
    data: availability = [],
    error,
    isLoading,
  } = useCheckSkillsExamsAvailabilityQuery(examId!);

  const renderSkillIcon = (
    skillName: string,
    skillId: string,
    imgSrc: string,
    altText: string,
    className: string
  ) => {
    return (
      <a
        href={`/student/questions/${skillName}/${examId}`}
        className={`icon-bg ${className}`}
      >
        <img src={imgSrc} alt={altText} />
        <p className="icon-text">
          {skillName}
          <br />
          {getTranslatedSkillName(skillName)}
        </p>
      </a>
    );
  };

  const getTranslatedSkillName = (skillName: string) => {
    const translations: Record<string, string> = {
      Listening: "الاستماع",
      Speaking: "التحدث",
      Reading: "القراءة",
      Writing: "الكتابة",
    };
    return translations[skillName] || skillName;
  };

  const skillIcons = [
    {
      skillName: "Listening",
      imgSrc: "/assets/assessment/hearing.svg",
      altText: "Hearing",
      className: "hear-icon",
    },
    {
      skillName: "Speaking",
      imgSrc: "/assets/assessment/mic.svg",
      altText: "Mic",
      className: "mic-icon",
    },
    {
      skillName: "Reading",
      imgSrc: "/assets/assessment/dictionary.svg",
      altText: "Dictionary",
      className: "dic-icon",
    },
    {
      skillName: "Writing",
      imgSrc: "/assets/assessment/edit.svg",
      altText: "Edit",
      className: "edit-icon",
    },
  ];

  return (
    <div className="assessments-details-wrapper w-full h-[100vh] md:h-[90vh] relative">
      <p className="title-assessment absolute top-[-50px] z-40">
        {title || "Assessment Title"}
      </p>

      <div className=" absolute w-full max-w-full h-full z-10 flex justify-between items-center">
        <svg
          width="485"
          height="227"
          viewBox="0 0 485 227"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-175 183.136V226.985C-130.265 226.242 -94.2875 197.117 -94.2875 161.297V74.342C-94.2875 53.6255 -77.5616 43.8203 -66.8219 43.8203C-56.0821 43.8203 -39.3563 53.6255 -39.3563 74.342V152.658C-39.3563 189.856 -6.86418 227 43.1094 227C93.083 227 125.575 189.856 125.575 152.658V74.342C125.575 53.6255 142.301 43.8203 153.041 43.8203C163.78 43.8203 180.506 53.6255 180.506 74.342V152.658C180.506 189.856 212.998 227 262.972 227C312.945 227 345.437 189.856 345.437 152.658V74.342C345.437 53.6255 362.163 43.8203 372.903 43.8203C383.643 43.8203 400.369 53.6255 400.369 74.342V152.658C400.369 189.856 432.861 227 482.834 227C483.56 227 484.282 226.992 485 226.977V183.055C484.257 183.138 483.533 183.18 482.834 183.18C472.095 183.18 455.369 173.375 455.369 152.658V74.342C455.369 37.1438 422.877 0 372.903 0C322.929 0 290.437 37.1439 290.437 74.342V152.658C290.437 173.375 273.712 183.18 262.972 183.18C252.232 183.18 235.506 173.375 235.506 152.658V74.342C235.506 37.1439 203.014 0 153.041 0C103.067 0 70.575 37.1439 70.575 74.342V152.658C70.575 173.375 53.8492 183.18 43.1094 183.18C32.3696 183.18 15.6437 173.374 15.6437 152.658V74.342C15.6437 37.1439 -16.8482 0 -66.8219 0C-116.795 0 -149.288 37.1439 -149.288 74.342V161.297C-149.288 172.913 -160.648 182.416 -175 183.136Z"
            fill="#EBEBEB"
            fill-opacity="0.5"
          />
        </svg>
        <svg
          width="485"
          height="227"
          viewBox="0 0 485 227"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-175 183.136V226.985C-130.265 226.242 -94.2875 197.117 -94.2875 161.297V74.342C-94.2875 53.6255 -77.5616 43.8203 -66.8219 43.8203C-56.0821 43.8203 -39.3563 53.6255 -39.3563 74.342V152.658C-39.3563 189.856 -6.86418 227 43.1094 227C93.083 227 125.575 189.856 125.575 152.658V74.342C125.575 53.6255 142.301 43.8203 153.041 43.8203C163.78 43.8203 180.506 53.6255 180.506 74.342V152.658C180.506 189.856 212.998 227 262.972 227C312.945 227 345.437 189.856 345.437 152.658V74.342C345.437 53.6255 362.163 43.8203 372.903 43.8203C383.643 43.8203 400.369 53.6255 400.369 74.342V152.658C400.369 189.856 432.861 227 482.834 227C483.56 227 484.282 226.992 485 226.977V183.055C484.257 183.138 483.533 183.18 482.834 183.18C472.095 183.18 455.369 173.375 455.369 152.658V74.342C455.369 37.1438 422.877 0 372.903 0C322.929 0 290.437 37.1439 290.437 74.342V152.658C290.437 173.375 273.712 183.18 262.972 183.18C252.232 183.18 235.506 173.375 235.506 152.658V74.342C235.506 37.1439 203.014 0 153.041 0C103.067 0 70.575 37.1439 70.575 74.342V152.658C70.575 173.375 53.8492 183.18 43.1094 183.18C32.3696 183.18 15.6437 173.374 15.6437 152.658V74.342C15.6437 37.1439 -16.8482 0 -66.8219 0C-116.795 0 -149.288 37.1439 -149.288 74.342V161.297C-149.288 172.913 -160.648 182.416 -175 183.136Z"
            fill="#EBEBEB"
            fill-opacity="0.5"
          />
        </svg>
      </div>
      <div className="details-main absolute w-full h-full z-20 flex justify-between items-center">
        <div className="left-side self-start">
          <img src="/assets/assessment/green-arrow.svg" alt="Assessment" />
          <div className="txt-container txt-container-green">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>
        </div>
        <div className="middle-clock bg-white ">
          <div className="clock-img">
            <img src="/assets/assessment/clock.svg" alt="Clock" />
          </div>

          {error && <p>Error: {error}</p>}
          {!error && (
            <>
              {isLoading ? (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <img src={Images.loader_2} />
                </div>
              ) : (
                skillIcons.map(({ skillName, imgSrc, altText, className }) =>
                  availability.some(
                    (skill: Skill) => skill.SkillName === skillName
                  )
                    ? renderSkillIcon(
                        skillName,
                        availability.find(
                          (skill: Skill) => skill.SkillName === skillName
                        )?.SkillId || "",
                        imgSrc,
                        altText,
                        className
                      )
                    : null
                )
              )}
            </>
          )}
        </div>
        <div className="right-side self-end">
          <img src="/assets/assessment/dark-arrow.svg" alt="Assessment" />
          <div className="txt-container txt-container-dark">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentsDetails;
