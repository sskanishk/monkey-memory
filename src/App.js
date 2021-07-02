import './App.scss';
import ColorCard from './components/ColorCard';
import { useEffect, useState } from "react";
import timeout from './utils/util';
import { copy } from 'fs-extra';

function App() {

  const [isOn, setIsOn] = useState(false);
  const colorList = ["green", "red", "yellow", "blue"]
  const initialPlay = {
    isDisplay: false,
    colors: [],
    score: 0,
    userPlay: false,
    userColors: []
  }
  const [play, setPlay] = useState(initialPlay)

  const [flashColor, setflashColor] = useState("")

  useEffect(() => {
    if(isOn) {
      setPlay({ ...initialPlay, isDisplay: true})
    } else {
      setPlay(initialPlay)
    }
  }, [isOn])

  useEffect(() => {
    if(isOn && play.isDisplay) {
      let newColor = colorList[Math.floor(Math.random()*4)]
      const copyColor = [... play.colors];
      copyColor.push(newColor);
      setPlay({...play, colors: copyColor})
    }
  }, [isOn, play.isDisplay])

  useEffect(() => {
    if(isOn && play.isDisplay && play.colors.length) {
      displayColors()
    }
  }, [isOn, play.isDisplay, play.colors.length])

  async function displayColors() {
    for (let i = 0; i < play.colors.length; i++) {
      const element = play.colors[i];
      setflashColor(element)
      await timeout(1000)
      setflashColor("")
      await timeout(1000)

      if(i === play.colors.length - 1) {
        const copyColors = [ ...play.colors ];
        setPlay({
          ...play,
          isDisplay: false,
          userPlay: true,
          userColors: copyColors.reverse()
        })
      }
    }
  }

  async function cardClickhandle(color) {
    if( play.userPlay && !play.isDisplay ){

       const copyUserColors = [ ...play.userColors ]
       const lastColor = copyUserColors.pop()
       setflashColor(color)
        
      if(color === lastColor) {
        if(copyUserColors.length) {
          setPlay({ ...play, userColors:copyUserColors })
        } else {
          await timeout(1000)
          setPlay({ ...play, isDisplay: true, userPlay: false, score: play.colors.length, userColors: []})
        }
      } else {
        await timeout(1000)
        setPlay({ ...initialPlay,  score: play.colors.length })
      }
      await timeout(1000)
      setflashColor("")
    }
  }

  function startGame() {
    setIsOn(true)
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>Simon Says</h1>
        
        <div className="playgroundWrapper">
          {
            colorList && colorList.map((color) => {
              return <ColorCard onClick={() => cardClickhandle(color)} color={color} flash={flashColor === color}/>
            })
          }
        </div>
        {
          !isOn &&
          !play.score &&
          <button onClick={startGame} className="startButton">Start</button>
        }
        {
          isOn &&
          ( play.userPlay || play.isDisplay) &&
          <div className="score">{play.score}</div>
        }
        
      </div>
    </div>
  );
}

export default App;
