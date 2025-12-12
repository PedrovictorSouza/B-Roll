export class MediaPlayerState {
  constructor() {
    this._isPlaying = false
    this._volume = 1.0
  }

  get isPlaying() {
    return this._isPlaying
  }

  get volume() {
    return this._volume
  }

  play() {
    this._isPlaying = true
  }

  pause() {
    this._isPlaying = false
  }

  stop() {
    this._isPlaying = false
  }

  setVolume(newVolume) {
    if (newVolume < 0) {
      this._volume = 0.0
    } else if (newVolume > 1.0) {
      this._volume = 1.0
    } else {
      this._volume = newVolume
    }
  }
}

