import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timerLimit: 25,
    timeInSeconds: 1500,
    isRunning: false,
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  startOrPause = () => {
    const {isRunning, timeInSeconds, timerLimit} = this.state

    if (timeInSeconds === 0) {
      this.setState({
        timeInSeconds: timerLimit * 60,
        isRunning: true,
      })
    } else if (isRunning) {
      clearInterval(this.timerId)
      this.setState({isRunning: false})
    } else {
      this.setState({isRunning: true})
      this.timerId = setInterval(this.tick, 1000)
    }
  }

  tick = () => {
    const {timeInSeconds} = this.state

    if (timeInSeconds > 0) {
      this.setState(prevState => ({
        timeInSeconds: prevState.timeInSeconds - 1,
      }))
    } else {
      clearInterval(this.timerId)
      this.setState({isRunning: false})
    }
  }

  resetTimer = () => {
    clearInterval(this.timerId)
    this.setState({
      timerLimit: 25,
      timeInSeconds: 1500,
      isRunning: false,
    })
  }

  incrementTimer = () => {
    const {timerLimit, isRunning} = this.state

    if (!isRunning) {
      this.setState({
        timerLimit: timerLimit + 1,
        timeInSeconds: (timerLimit + 1) * 60,
      })
    }
  }

  decrementTimer = () => {
    const {timerLimit, isRunning} = this.state

    if (!isRunning && timerLimit > 1) {
      this.setState({
        timerLimit: timerLimit - 1,
        timeInSeconds: (timerLimit - 1) * 60,
      })
    }
  }

  formatTime = () => {
    const {timeInSeconds} = this.state

    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds

    return `${formattedMinutes}:${formattedSeconds}`
  }

  render() {
    const {timerLimit, isRunning} = this.state

    const iconUrl = isRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const label = isRunning ? 'Pause' : 'Start'

    const status = isRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>

        <div className="timer-container">
          <div className="timer-display">
            <h1>{this.formatTime()}</h1>
            <p>{status}</p>
          </div>
        </div>

        <div className="controls-container">
          <button type="button" onClick={this.startOrPause}>
            <img
              src={iconUrl}
              alt={label === 'Start' ? 'play icon' : 'pause icon'}
            />
            {label}
          </button>

          <button type="button" onClick={this.resetTimer}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              alt="reset icon"
            />
            Reset
          </button>
        </div>

        <p>Set Timer limit</p>

        <div className="limit-container">
          <button type="button" onClick={this.decrementTimer}>
            -
          </button>

          <p>{timerLimit}</p>

          <button type="button" onClick={this.incrementTimer}>
            +
          </button>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
