import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserForms, createFormUserResponse } from "../../apiCall";
import { Header } from "../../component/header/Header";

const CARD_CONST = {
  SHORT_ANSWER: {
    placeholder: "Short Answer text",
  },
  PARAGRAPH: {
    placeholder: "Long Answer text",
  },
  MULTIPLE_CHOICE: {
    placeholder: "Option",
  },
  CHECK_BOXES: {
    placeholder: "Option",
  },
  DROPDOWN: {
    placeholder: "Option",
  },
};

export const ViewForm = (props) => {
  const [cards, setCard] = useState([]);

  const [heading, setHeading] = useState({
    type: "HEADING",
    question: "",
    option: "",
  });

  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);
  const { formId, action } = useParams();
  const [surveyCheck, setSurveyCheck] = useState("");

  useEffect(() => {
    getForm();
  }, [formId]);

  const getForm = async () => {
    const form = await getUserForms(formId, "FILL");
    if (form.data.status) {
      setCard(form.data.forms[0].formData);
      setHeading(form.data.forms[0].heading);
    } else {
      setSurveyCheck(form.data.error);
    }
  };

  const handleOptionChange = (id, no, e, type) => {
    const newCards = [...cards];
    const updatedCard = newCards.map((item, index) => {
      if (id === item.id) {
        item.option = item.option.map((elem) => {
          if (elem.no === no) {
            if (type === "TEXT") {
              elem.value = e.target.value;
              item.value = e.target.value;
            } else {
              item.value = e.target.checked ? no : "";
            }
          }
          return elem;
        });
      }
      return item;
    });
    console.log(updatedCard);
    setCard(updatedCard);
  };

  const handleFormSubmit = async () => {
    const missing = cards.filter((item) => {
      if (
        item.required &&
        (item.type === "PARAGRAPH" || item.type === "SHORT_ANSWER") &&
        !item.option[0].value
      ) {
        console.log(item);
        return item;
      } else if (item.required && !item.value) {
        return item;
      }
    });
    console.log(missing);
    if (missing.length > 0) {
      setError(`Question ${missing[0].id}. ${missing[0].question} is required`);
      return;
    }
    const res = await createFormUserResponse({
      formData: cards,
      formId: formId,
    });
    if (res.data && res.data.status) {
      setError("");
      setCompleted(true);
      console.log(res);
    }
  };

  return (
    <>
    {console.log(cards)}
      <Header banner={heading.question ? heading.question : ""} />
      <div>
        <div className="container" style={{ height: "30px", padding: "10px" }}>
          <div className="row">
            <div className="col-1"></div>
            <div className="col" style={{ marginTop: "10px" }}>
              {!completed ? (
                error
              ) : (
                <div class="alert alert-success" role="alert">
                  Thanks for completing the form
                </div>
              )}
            </div>
            <div className="col"></div>
            {!surveyCheck ? (
              <div className="col">
                <button
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
            ) : null}
          </div>
        </div>
        <div style={{ padding: "10px" }}></div>
        <hr />
        {surveyCheck ? (
          <div class="alert alert-success" role="alert">
            {surveyCheck}
          </div>
        ) : null}
        <div className="container">
          <div className="row">
            <div className="col"></div>
            <div className="col-6">
              <div className="card text-center"></div>
              {cards.map((card) => (
                <div className="card text-center">
                  <div className="card-header"></div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <div className="input-group mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Question"
                            aria-label="Question"
                            aria-describedby="basic-addon1"
                            style={{
                              paddingTop: "0.7rem",
                              paddingBottom: "0.7rem",
                            }}
                            disabled
                            value={
                              card.required
                                ? card.question + " *"
                                : card.question
                            }
                            onChange={(e) =>
                              setCard({ ...card, question: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {card.type === "SHORT_ANSWER" ||
                    card.type === "PARAGRAPH" ? (
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-default"
                          placeholder={CARD_CONST[card.type].placeholder}
                          value={card.option[0].value}
                          required={card.required}
                          onChange={(e) =>
                            handleOptionChange(card.id, 1, e, "TEXT")
                          }
                        />
                      </div>
                    ) : (
                      <>
                        {card.option.map((item) => (
                          <div className="input-group mb-3 form-check row">
                            <div className="col-1">
                              <input
                                type={
                                  card.type === "CHECK_BOXES"
                                    ? "checkbox"
                                    : card.type === "MULTIPLE_CHOICE"
                                    ? "radio"
                                    : "text"
                                }
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                                value={card.type === "DROPDOWN" ? item.no : ""}
                                checked={item.no == card.value}
                                onChange={(e) =>
                                  handleOptionChange(card.id, item.no, e, "")
                                }
                                readOnly
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  marginTop: "10px",
                                }}
                              />
                            </div>
                            <div className="col-10">
                              <input
                                type="text"
                                className="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                placeholder={
                                  CARD_CONST[card.type].placeholder +
                                  " " +
                                  item.no
                                }
                                value={item.value}
                                disabled
                              />
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                  <div className="card-footer text-muted">
                    <div className="row">
                      <div className="col-8"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col">
              <div class="container">
                <div class="row row-cols">
                  <div class="col" style={{ cursor: "pointer" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
