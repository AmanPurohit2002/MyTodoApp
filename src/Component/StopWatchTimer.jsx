import React, { useEffect, useState } from "react";
import DialogBox from "./DialogBox";
import SplitList from "./SplitList";
import SkipDialogBox from "./SkipDialogBox";

const StopWatchTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [show, setShow] = useState(false);
  const [isDialogBoxOpen, setisDialogBoxOpen] = useState(false);
  const [splitList, setSplitList] = useState([]);
  const [showSplitList, setShowSplitList] = useState(false);
  const [splitButtonDisabled, setSplitButtonDisabled] = useState(true);
  const [resetButtonDisabled, setResetButtonDisabled] = useState(true);
  const [skipDialogBox, setSkipDialogBox] = useState(false);

  // const previousTimeStampRef = useRef(null);

  useEffect(() => {
    let interval = 0;
    if (isRunning) {
      interval = setInterval(() => setTime((prev) => prev + 1), 10);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  const toggleStart = (data) => {
    if (data === "Pause") {
      setSplitList((prevSplitList) => [
        ...prevSplitList,
        {
          key:
            prevSplitList.length === 0
              ? 1
              : prevSplitList[prevSplitList.length - 1].key + 1,
          timeStamp: formatTime(time),
          value: "Split",
        },
        {
          key:
            splitList.length === 0
              ? 1
              : splitList[splitList.length - 1].key + 2,
          timeStamp: null,
          value: data,
        },
      ]);
      setIsRunning(!isRunning);
      setSplitButtonDisabled(true);
      setResetButtonDisabled(false);
      setShowSplitList(true);
    } else if (data === "Split") {
      setSplitList((prevSplitList) => [
        ...prevSplitList,
        {
          key:
            prevSplitList.length === 0
              ? 1
              : prevSplitList[prevSplitList.length - 1].key + 1,
          timeStamp: formatTime(time),
          value: data,
        },
      ]);
      setShowSplitList(true);
    } else {
      setIsRunning(!isRunning);
      setSplitButtonDisabled(false);
      setResetButtonDisabled(true);
    }
  };

  const formatTime = (data) => {
    // Hours calculation
    //   const hours = Math.floor(time / 360000);

    // Minutes calculation
    const minutes = Math.floor((time % 360000) / 6000);

    // Seconds calculation
    const seconds = Math.floor((time % 6000) / 100);

    // Milliseconds calculation
    const milliseconds = time % 100;

    return `${minutes.toString().padStart(2, "0")} :
    ${seconds.toString().padStart(2, "0")} :
    ${milliseconds.toString().padStart(2, "0")}`;
  };

  const handleShow = () => {
    setTime(0);
    setShowSplitList(false);
    setSplitList([]);

    setShow(!show);
  };

  const openDialogBox = () => setisDialogBoxOpen(true);
  const closeDialogBox = () => setisDialogBoxOpen(false);

  const handleReset = (childData, dropdownData) => {
    if (dropdownData === "0" && childData === "Yes") {
      setTime(0);
      setIsRunning(false);

      setShowSplitList(false);
      setSplitList([]);
      setSplitButtonDisabled(true);
      setResetButtonDisabled(true);
      setSkipDialogBox(false);
      closeDialogBox();
    } else if (childData === "Yes" && dropdownData !== "0") {
      // const intervalId = setInterval(() => {
      setTimeout(() => {
        setTime(0);
        setIsRunning(false);
        setShowSplitList(false);
        setSkipDialogBox(false);
        setSplitList([]);
        setSplitButtonDisabled(true);
        setResetButtonDisabled(true);
      }, parseInt(dropdownData) * 10000);
      
      // }, parseInt(dropdownData) * 1000);

      // setTimeout(
      //   () => clearInterval(intervalId),
      //   parseInt(dropdownData) * 10500
      // );

      setIsRunning(true);

      closeDialogBox();

      setTimeout(() => {
        // alert("Do you want to skip");
        setSkipDialogBox(true);
      }, parseInt(dropdownData,10) * 10000 - 10000);
      // console.log(parseInt(dropdownData,10) * 10000 - 10000);
    } else if (childData === "No") {
      setSkipDialogBox(false);
      closeDialogBox();
    }
  };

  const handleYesClick = () => {
    setSkipDialogBox(false);
  };

  const handleNoClick = () => {
    setTime(0);
    setIsRunning(false);

    setShowSplitList(false);
    setSplitList([]);
    setSplitButtonDisabled(true);
    setResetButtonDisabled(true);
    setSkipDialogBox(false);
  };

  return (
    <div className="child">
      {!show && (
        <div className="timer">
          <p>{formatTime(`${time}`)}</p>
        </div>
      )}

      <div className="button">
        {!show && (
          <>
            <button
              onClick={(e) => toggleStart(e.target.value)}
              value={isRunning ? "Pause" : "Start"}
              className="start-stop"
            >
              {isRunning ? "Pause" : "Start"}
            </button>
            <button
              className="split-the-time"
              disabled={splitButtonDisabled}
              onClick={(e) => toggleStart(e.target.value)}
              value="Split"
            >
              Split
            </button>
            <button
              className="Reset-Btn"
              onClick={openDialogBox}
              disabled={resetButtonDisabled}
            >
              Reset
            </button>
            {isDialogBoxOpen && <DialogBox onWork={handleReset} />}
            {skipDialogBox && (
              <SkipDialogBox
                handleYesClick={handleYesClick}
                handleNoClick={handleNoClick}
              />
            )}
          </>
        )}

        <button onClick={handleShow} className="show-hide">
          {show ? "Show" : "Hide"}
        </button>
      </div>

      {showSplitList && <SplitList splitList={splitList} />}
    </div>
  );
};

export default StopWatchTimer;
