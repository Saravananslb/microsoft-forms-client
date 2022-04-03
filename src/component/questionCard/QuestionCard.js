import React, { useEffect, useState } from "react";

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

export const QuestionCard = (props) => {
  const [card, setCard] = useState({
    id: 0,
    type: "SHORT_ANSWER",
    option: [
      {
        no: 1,
        value: "",
      },
    ],
    question: "",
    required: false,
  });

  useEffect(() => {
    setCard(props.formCard);
    return () => setCardInsert(false);
  }, [props.formCard]);

  useEffect(() => {
    props.setChanges(card);
  }, [card]);

  const handleAddOption = (e) => {
    const cardOption = [
      ...card.option,
      { no: card.option.length + 1, value: "" },
    ];
    setCard({ ...card, option: cardOption });
  };

  const handleRemoveOption = (no) => {
    const cardOption = [...card.option];
    const newCardOption = cardOption.filter((item) => item.no !== no);
    const updatedCardOption = newCardOption.map((item, index) => {
      item.no = index + 1;
      return item;
    });
    setCard({ ...card, option: updatedCardOption });
  };

  const handleOptionChange = (no, e) => {
    const cardOption = [...card.option];
    const updatedCardOption = cardOption.map((item, index) => {
      if (no === item.no) {
        item.value = e.target.value;
      }
      return item;
    });
    setCard({ ...card, option: updatedCardOption });
  };

  const handleCardAdd = (previousId, type) => {
    const tempCards = {
      id: previousId + 1,
      type: type,
      option: [
        {
          no: 1,
          value: "",
        },
      ],
      question: "",
      required: false,
    };
    const cards = [...props.cardss];
    const firstCard = cards.filter((item) => item.id <= previousId);
    const lastCard = cards.filter((item) => {
      if (item.id > previousId) {
        item.id = item.id + 1;
        return item;
      }
    });
    const newCard = [].concat(firstCard, tempCards, lastCard);
    props.cardsSet(newCard);
  };

  const [cardInsert, setCardInsert] = useState(false);

  return (
    <div>
      <div
        className="card text-center"
        style={
          card.id === props.selectedCard
            ? { borderTop: "5px solid #954911" }
            : {}
        }
        onClick={() => props.setSelectedCard(card.id)}
      >
        <div className="card-header"></div>
        <div className="card-body">
          <div className="row">
            <div className="col-1">{card.id}.</div>
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
                  value={card.question}
                  onChange={(e) =>
                    setCard({ ...card, question: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          {card.type === "SHORT_ANSWER" || card.type === "PARAGRAPH" ? (
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                disabled
                placeholder={CARD_CONST[card.type].placeholder}
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
                      checked={false}
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
                        CARD_CONST[card.type].placeholder + " " + item.no
                      }
                      value={item.value}
                      onChange={(e) => handleOptionChange(item.no, e)}
                    />
                  </div>
                  {card.option.length > 1 ? (
                    <div
                      className="col"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleRemoveOption(item.no)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={"20px"}
                        height={"20"}
                        viewBox="0 0 320 512"
                      >
                        <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                      </svg>
                    </div>
                  ) : null}
                </div>
              ))}
              <div
                className="input-group mb-3 form-check row"
                style={{ cursor: "pointer" }}
                onClick={handleAddOption}
              >
                Add Option
              </div>
            </>
          )}
        </div>
        <div className="card-footer text-muted">
          <div className="row">
            <div className="col-8"></div>
            <div
              className="col"
              style={{ cursor: "pointer" }}
              onClick={() => props.deleteCard(card.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width={"20"}
                height={"20"}
              >
                <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z" />
              </svg>
            </div>
            <div className="col">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckChecked"
                  checked={card.required}
                  onChange={() =>
                    setCard({ ...card, required: !card.required })
                  }
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckChecked"
                  style={{ position: "relative", top: "-10px" }}
                >
                  Required
                </label>
              </div>
            </div>
          </div>
          {props.selectedCard === card.id ? (
            <div className="row">
              {!cardInsert ? 
              <div className="col-2">
                <div className="row" onClick={() => setCardInsert(true)}>
                  <div className="col">
                    <div
                      className="row"
                      style={{
                        backgroundColor: "#012A52",
                        fontSize: "10px",
                        height: "25px",
                      }}
                    >
                      <div
                        className="col-3"
                        style={{
                          position: "relative",
                          top: "5px",
                          cursor: "pointer",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path
                            width={10}
                            height={10}
                            fill="#ffffff"
                            d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"
                          />
                        </svg>
                      </div>
                      <div
                        className="col"
                        style={{
                          color: "#ffffff",
                          position: "relative",
                          top: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Insert new
                      </div>
                    </div>
                  </div>
                </div>
              </div> : 
              <div className="col-8">
                <div
                  className="row"
                  style={{
                    backgroundColor: "#012A52",
                    fontSize: "10px",
                    height: "25px",
                  }}
                >
                  <div
                    className="col"
                    value="SHORT_ANSWER"
                    selected={card.type === "SHORT_ANSWER"}
                    style={{
                      color: "#ffffff",
                      position: "relative",
                      top: "5px",
                      cursor: "pointer",
                    }}
                    onClick={(e) => handleCardAdd(card.id, "SHORT_ANSWER")}
                  >
                    Short Answer
                  </div>
                  <div
                    className="col"
                    value="PARAGRAPH"
                    style={{
                      color: "#ffffff",
                      position: "relative",
                      top: "5px",
                      cursor: "pointer",
                    }}
                    selected={card.type === "PARAGRAPH"}
                    onClick={(e) => handleCardAdd(card.id, "PARAGRAPH")}
                  >
                    Paragraph
                  </div>
                  <div
                    className="col"
                    value="MULTIPLE_CHOICE"
                    style={{
                      color: "#ffffff",
                      position: "relative",
                      top: "5px",
                      cursor: "pointer",
                    }}
                    selected={card.type === "MULTIPLE_CHOICE"}
                    onClick={(e) => handleCardAdd(card.id, "MULTIPLE_CHOICE")}
                  >
                    Multiple Choices
                  </div>
                  <div
                    className="col"
                    value="CHECK_BOXES"
                    style={{
                      color: "#ffffff",
                      position: "relative",
                      top: "5px",
                      cursor: "pointer",
                    }}
                    selected={card.type === "CHECK_BOXES"}
                    onClick={(e) => handleCardAdd(card.id, "CHECK_BOXES")}
                  >
                    Check Boxes
                  </div>
                  <div
                    className="col"
                    value="DROPDOWN"
                    style={{
                      color: "#ffffff",
                      position: "relative",
                      top: "5px",
                      cursor: "pointer",
                    }}
                    selected={card.type === "DROPDOWN"}
                    onClick={(e) => handleCardAdd(card.id, "DROPDOWN")}
                  >
                    Dropdown
                  </div>
                </div>
              </div>}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
