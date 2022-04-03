import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserForms, createFormUserResponse, getUserResponses } from "../../apiCall";

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

export const Response = (props) => {
  const [response, setResponse] = useState([]);

  const [heading, setHeading] = useState({
    type: "HEADING",
    question: "",
    option: "",
  });

  const { formId, action } = useParams();

  useEffect(() => {
    getForm();
  }, []);

  const getForm = async () => {
    const form = await getUserResponses(formId);
    if (form.data.status) {
        setResponse(form.data.forms);
        // setHeading(form.data[0].heading);
    }
  };

  return (
    <>
      <div>
        <div class="accordion accordion-flush" id="accordionFlushExample">
            {response.map((cards, index) => 
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                Response {index + 1}
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body">
                <div className="container">
                  <div className="row">
                    <div className="col"></div>
                    <div className="col-12">
                      <div className="card text-center"></div>
                      {cards.formData.map((card) => (
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
                                  placeholder={
                                    CARD_CONST[card.type].placeholder
                                  }
                                  value={card.option[0].value}
                                  required={card.required}
                                  
                                  disabled
                                />
                              </div>
                            ) : (
                              <>
                                {card.option.map((item) => (
                                  <div className="input-group mb-3 form-check row">
                                    <div className="col-1">
                                      {console.log(item.no, card.value)}
                                      <input
                                        type={
                                          card.type === "CHECK_BOXES"
                                            ? "checkbox"
                                            : card.type === "MULTIPLE_CHOICE"
                                            ? "radio"
                                            : "text"
                                        }
                                        name="flexRadioDefault"
                                        // id="flexRadioDefault1"
                                        value={
                                          card.type === "DROPDOWN"
                                            ? item.no
                                            : ""
                                        }
                                        checked={true}
                                        readOnly={true}
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                          // marginTop: "10px",
                                        }}
                                      />
                                    </div>
                                    <div className="col-10">
                                      <input
                                        type="text"
                                        className={item.no === card.value ? "form-control option-selected" : "form-control"}
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
                          <div
                            class="col"
                            style={{ cursor: "pointer" }}
                            // onClick={handleAddCard}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>)}
        </div>
      </div>
    </>
  );
};
