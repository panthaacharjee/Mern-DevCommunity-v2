import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUser,
  deleteExperinces,
  deleteSkills,
  deleteEducations,
  deletePortfolios,
  deleteLanguages,
} from "../../../redux/actions/userActions";
import Loader from "../../Loader/Loader";
import { toast } from "react-toastify";
import AboutUpdate from "../Update/AboutUpdate";
import SkillUpdate from "../Update/SkillUpdate";
import "./TabValue.css";
import ExperienceUpdate from "../Update/ExperienceUpdate";
import EducationUpdate from "../Update/EducationUpdate";
import PortfolioUpdate from "../Update/PortfolioUpdate";
import LanguageUpdate from "../Update/LanguageUpdate";

const About = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isUpdated, error, loading } = useSelector((state) => state.profile);

  //Updated State
  const [aboutUpdate, setAboutUpdate] = useState(true);
  const [skillUpdate, setSkillUpdate] = useState(true);
  const [experienceUpdate, setExperienceUpdate] = useState(true);
  const [educationUpdate, setEducationUpdate] = useState(true);
  const [portfolioUpdate, setPortfolioUpdate] = useState(true);
  const [languageUpdate, setLanguageUpdate] = useState(true);

  // SubStr String of About
  const [lastIndex, setLastIndex] = useState(300);

  //Delete Funciton
  const deleteSkill = (id) => {
    dispatch(deleteSkills(id));
  };
  const deleteExperince = (id) => {
    dispatch(deleteExperinces(id));
  };
  const deleteEducation = (id) => {
    dispatch(deleteEducations(id));
  };
  const deletePortfolio = (id) => {
    dispatch(deletePortfolios(id));
    // console.log(id);
  };
  const deleteLanguage = (id) => {
    dispatch(deleteLanguages(id));
    // console.log(id);
  };
  //Delete Function UseEffect
  useEffect(() => {
    if (error) {
      return toast(error);
    }
    if (isUpdated) {
      dispatch(loadUser());
    }
  }, [error]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="about">
        <div className="about-container">
          <div>
            <h4>About</h4>
            <button className="edit-btn">
              <FiEdit onClick={() => setAboutUpdate(false)} />
            </button>
          </div>
          {user.about ? (
            <>
              <div
                className="about-text"
                dangerouslySetInnerHTML={{
                  __html: user.about.substr(0, lastIndex),
                }}
              />
              {lastIndex <= 300 ? (
                <span
                  className="see-more"
                  onClick={() => setLastIndex(user.about.length)}
                >
                  See more
                </span>
              ) : (
                <span className="see-more" onClick={() => setLastIndex(300)}>
                  Hide
                </span>
              )}
            </>
          ) : (
            <p>Please Edit Your About</p>
          )}
        </div>

        <div className="skill-container">
          <div>
            <h4>Skill</h4>
            <button className="edit-btn">
              <FiEdit onClick={() => setSkillUpdate(false)} />
            </button>
          </div>
          <div className="skill-box">
            {user.skills.map((val, ind) => {
              return (
                <li key={ind}>
                  <button onClick={() => deleteSkill(val._id)}>
                    {val.skill}
                  </button>
                </li>
              );
            })}
            {user.skills.length <= 0 ? (
              <p style={{ color: "#999999" }}>Please Edit your Skill</p>
            ) : null}
          </div>
        </div>
        <div className="experince-container">
          <div>
            <h4>Experience</h4>
            <button className="edit-btn">
              <FiEdit onClick={() => setExperienceUpdate(false)} />
            </button>
          </div>
          <div className="experince-box">
            {user.experiences.map((val, ind) => {
              return (
                <div key={ind}>
                  <div>
                    <h5>{val.title}</h5>
                    <button
                      style={{
                        marginLeft: "10px",
                        cursor: "pointer",
                        background: "none",
                        border: "none",
                        fontSize: "20px",
                      }}
                      onClick={() => deleteExperince(val._id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                  <p>{val.description}</p>
                  <label>{val.time}</label>
                  {val.certificate ? (
                    <img src={val.certificate} alt="certificate" />
                  ) : null}
                </div>
              );
            })}
            {user.experiences.length <= 0 ? (
              <p style={{ color: "#999999" }}>Please Edit your Experience</p>
            ) : null}
          </div>
        </div>
        <div className="education-container">
          <div>
            <h4>Education</h4>
            <button className="edit-btn">
              <FiEdit onClick={() => setEducationUpdate(false)} />
            </button>
          </div>
          <div className="education-box">
            {user.educations.map((val, ind) => {
              return (
                <div key={ind}>
                  <div>
                    <h5>{val.school}</h5>
                    <button
                      style={{
                        marginLeft: "10px",
                        cursor: "pointer",
                        background: "none",
                        border: "none",
                        fontSize: "20px",
                      }}
                      onClick={() => deleteEducation(val._id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                  <p>{val.degree}</p>
                  <p>{val.startDate}</p>
                  <label>{val.endDate}</label>
                </div>
              );
            })}
            {user.educations.length <= 0 ? (
              <p style={{ color: "#999999" }}>Please Edit your Education</p>
            ) : null}
          </div>
        </div>
        <div className="portfolio-container">
          <div>
            <h4>Portfolio</h4>
            <button className="edit-btn">
              <FiEdit onClick={() => setPortfolioUpdate(false)} />
            </button>
          </div>
          <div className="portfolio-box">
            {user.portfolios.map((val, ind) => {
              return (
                <div key={ind}>
                  <div style={{ display: "flex", marginTop: "10px" }}>
                    <h5>{val.title}</h5>
                    <button
                      style={{
                        marginLeft: "10px",
                        cursor: "pointer",
                        background: "none",
                        border: "none",
                        fontSize: "20px",
                      }}
                      onClick={() => deletePortfolio(val._id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                  <p>{val.description}</p>
                  <p>{val.link}</p>
                  <label>{val.gitLink}</label>
                </div>
              );
            })}
            {user.portfolios.length <= 0 ? (
              <p style={{ color: "#999999" }}>Please Edit your Portfolio</p>
            ) : null}
          </div>
        </div>
        <div className="language-container">
          <div>
            <h4>Language</h4>
            <button className="edit-btn">
              <FiEdit onClick={() => setLanguageUpdate(false)} />
            </button>
          </div>
          <div className="language-box">
            {user.languages.map((val, ind) => {
              return (
                <div key={ind}>
                  <h5>{val.language}</h5>
                  <button onClick={() => deleteLanguage(val._id)}>
                    <MdDelete />
                  </button>
                </div>
              );
            })}
            {user.languages.length <= 0 ? (
              <p style={{ color: "#999999" }}>Please Edit your Language</p>
            ) : null}
          </div>
        </div>
      </div>
      <div
        className={aboutUpdate ? "hide-box" : "hide-box hide-box-show"}
        // onClick={() => setAboutUpdate(true)}
      >
        <AboutUpdate setAboutUpdate={setAboutUpdate} />
      </div>
      <div
        className={skillUpdate ? "hide-box" : "hide-box hide-box-show"}
        // onClick={() => setSkillUpdate(true)}
      >
        <SkillUpdate setSkillUpdate={setSkillUpdate} />
      </div>
      <div
        className={experienceUpdate ? "hide-box" : "hide-box hide-box-show"}
        // onClick={() => setExperienceUpdate(true)}
      >
        <ExperienceUpdate setExperienceUpdate={setExperienceUpdate} />
      </div>
      <div
        className={educationUpdate ? "hide-box" : "hide-box hide-box-show"}
        // onClick={() => setEducationUpdate(true)}
      >
        <EducationUpdate setEducationUpdate={setEducationUpdate} />
      </div>
      <div
        className={portfolioUpdate ? "hide-box" : "hide-box hide-box-show"}
        // onClick={() => setEducationUpdate(true)}
      >
        <PortfolioUpdate setPortfolioUpdate={setPortfolioUpdate} />
      </div>
      <div
        className={languageUpdate ? "hide-box" : "hide-box hide-box-show"}
        // onClick={() => setEducationUpdate(true)}
      >
        <LanguageUpdate setLanguageUpdate={setLanguageUpdate} />
      </div>
    </>
  );
};

export default About;
