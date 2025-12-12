export class VideoTimeline {
  constructor({ duration }) {
    this._duration = duration
    this._progress = 0
  }

  get duration() {
    return this._duration
  }

  get progress() {
    return this._progress
  }

  get percentage() {
    if (this._duration === 0) return 0
    return (this._progress / this._duration) * 100
  }

  updateProgress(newProgress) {
    if (newProgress < 0) {
      this._progress = 0
    } else if (newProgress > this._duration) {
      this._progress = this._duration
    } else {
      this._progress = newProgress
    }
  }
}

