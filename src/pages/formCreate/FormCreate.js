import React, { useEffect, useState } from "react";
import {
  CUSTOMER_FEEDBACK_SURVEY,
  Event_Registration,
  COURSE_EVALUATION,
} from "../../constant";
import { QuestionCard } from "../../component/questionCard/QuestionCard";
import { useParams } from "react-router-dom";
import { createFormUser, getUserForms, updateUserForm } from "../../apiCall";
import { Response } from "../../component/response/Response";
import { Header } from "../../component/header/Header";

const TEMPLATE = {
  "customer-feedback-survey": CUSTOMER_FEEDBACK_SURVEY,
  "event-registration": Event_Registration,
  "course-evaluation-survey": COURSE_EVALUATION
};

export const FormCreate = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      type: "SHORT_ANSWER",
      option: [
        {
          no: 1,
          value: "",
        },
      ],
      question: "",
      required: false,
    },
  ]);

  const [selectedTab, setTab] = useState(1);
  const [banner, setBanner] = useState({
    question: "",
  });
  const [selectedCard, setSelectedCard] = useState();
  const [formid, setFormId] = useState("");
  const [heading, setHeading] = useState({
    type: "HEADING",
    question: "",
    option: "",
  });
  const { templateName, formId } = useParams();

  useEffect(async () => {
    if (templateName) {
      const tempCard = TEMPLATE[templateName].filter(
        (item) => item.type !== "BANNER" && item.type !== "HEADING"
      );
      const cardBanner = TEMPLATE[templateName].filter(
        (item) => item.type === "BANNER"
      );
      const headings = TEMPLATE[templateName].filter(
        (item) => item.type === "HEADING"
      );
      setBanner(...cardBanner);
      setCards(tempCard);
      setHeading(...headings);
    } else if (formId) {
      getFormById();
    }
  }, []);

  const getFormById = async () => {
    const forms = await getUserForms(formId);
    if (forms) {
      console.log(forms)
      setCards(forms.data.forms[0].formData);
      setHeading(forms.data[0].heading);
    }
  };

  const handleAddCard = () => {
    const newCards = [
      ...cards,
      {
        id: cards.length + 1,
        type: "SHORT_ANSWER",
        option: [
          {
            no: 1,
            value: "",
          },
        ],
        question: "",
        required: false,
      },
    ];
    setCards(newCards);
  };

  const setChanges = (card) => {
    const newCards = cards.map((item) => {
      if (card.id === item.id) {
        item = card;
      }
      return item;
    });
    setCards(newCards);
  };

  const deleteCard = (id) => {
    const newCards = cards.filter((item) => item.id !== id);
    setCards(newCards);
  };

  const handleFormSubmit = async () => {
    if (formId) {
      const updated = await updateUserForm({
        formId: formId,
        formData: cards,
        heading: heading,
      });
      if (updated) {
        setFormId(formId);
        getFormById();
      }
      return;
    }
    const create = await createFormUser({ formData: cards, heading: heading });
    if (create) {
      setFormId(create.data._id);
    }
  };

  return (
    <>
      <Header banner={banner.question ? banner.question : null} />
      <div>
        <div className="container" style={{ height: "30px", padding: "10px" }}>
          <div className="row">
            <div className="col-1"></div>
            {/* <div className="col" style={{ marginTop: "10px" }}> */}
            {/* {banner.question ? banner.question : ""} */}
            {/* </div> */}
            <div className="col"></div>
            <div className="col">
              <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                type="button"
                className="btn me-md-2"
                style={{
                  backgroundColor: "#673ab7",
                  color: "#ffffff",
                  float: "right",
                }}
                onClick={handleFormSubmit}
              >
                Send
              </button>
            </div>
          </div>
        </div>

        <div></div>
        <hr />
        {banner ? (
          <img
            src={banner.image}
            alt=""
            width={1500}
            height={600}
            style={{ position: "absolute" }}
          />
        ) : null}

        <div className="container">
          <div className="row">
            <div className="col"></div>
            <div
              className="col-9"
              style={{ overflowY: "scroll", height: "600px" }}
            >
              <div className="card text-center">
                <div className="row">
                  {/* <div className="nav justify-content-center"> */}
                  <div
                    className={
                      selectedTab === 1
                        ? "nav-item col-6 selected-tab"
                        : "nav-item col-6"
                    }
                    onClick={() => setTab(1)}
                  >
                    <a
                      className="nav-link active"
                      aria-current="page"
                      style={{ color: "#3C4043", cursor: "pointer" }}
                    >
                      Questions
                    </a>
                  </div>
                  <div
                    className={
                      selectedTab === 2
                        ? "nav-item col-6 selected-tab"
                        : "nav-item col-6"
                    }
                    onClick={() => setTab(2)}
                  >
                    <a
                      className="nav-link"
                      style={{ color: "#3C4043", cursor: "pointer" }}
                    >
                      Responses
                    </a>
                  </div>
                </div>
              </div>
              {selectedTab === 1 ? (
                <>
                  <div
                    className="card text-center"
                    style={
                      heading.id === selectedCard
                        ? { borderLeft: "5px solid #4285f4" }
                        : {}
                    }
                    onClick={() => setSelectedCard(heading.id)}
                  >
                    <div className="card-header"></div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <div className="input-group mb-3"></div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Heading"
                            aria-label="Question"
                            aria-describedby="basic-addon1"
                            style={{
                              paddingTop: "0.7rem",
                              paddingBottom: "0.7rem",
                            }}
                            value={heading.question}
                            onChange={(e) =>
                              setHeading({
                                ...heading,
                                question: e.target.value,
                              })
                            }
                          />
                          <div style={{ padding: "10px" }}></div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Description"
                            aria-label="Question"
                            aria-describedby="basic-addon1"
                            style={{
                              paddingTop: "0.7rem",
                              paddingBottom: "0.7rem",
                            }}
                            value={heading.option}
                            onChange={(e) =>
                              setHeading({ ...heading, option: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {cards.map((item) => (
                    <QuestionCard
                      formCard={item}
                      selectedCard={selectedCard}
                      setSelectedCard={setSelectedCard}
                      setChanges={setChanges}
                      deleteCard={deleteCard}
                      cardsSet={setCards}
                      cardss={cards}
                    />
                  ))}
                  
                </>
              ) : (
                <Response />
              )}
            </div>
            <div className="col"></div>
          </div>
        </div>

        {/* <!-- Modal --> */}
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Send Form
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="formLink"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    disabled
                    value={`http://localhost:3000/forms/fill/${formid}/save`}
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                {/* <button type="button" class="btn btn-primary"></button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
