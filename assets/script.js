const speechForm = document.getElementById('speech-form'),
  speechInput = document.getElementById('speech-input'),
  speechBtnDiv = document.getElementById('speech-btn-div'),
  micBtn = document.querySelector('.speech-btn .fa-microphone'),
  speechInstruction = document.querySelector('.instruction')

const speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition

if (speechRecognition) {
  const recognition = new speechRecognition()
  micBtn.addEventListener('click', micBtnClicked)
  function micBtnClicked(e) {
    e.preventDefault()
    if (micBtn.classList.contains('fa-microphone')) {
      recognition.start()
    } else {
      recognition.stop()
    }
  }
  // Speech Recognision Start
  recognition.addEventListener('start', () => {
    micBtn.classList.remove('fa-microphone')
    micBtn.classList.add('fa-microphone-slash')
    speechInstruction.textContent = 'Recording... Press Ctrl + a to stop recording'
    speechInput.focus()
    console.log('sr enabled')
  })
  // Speech Recognision Stop
  recognition.addEventListener('end', () => {
    micBtn.classList.remove('fa-microphone-slash')
    micBtn.classList.add('fa-microphone')
    speechInstruction.textContent = 'Press CTRL + x or Click the Mic icon to start'
    speechInput.focus()
    console.log('sr disabled')
  })
  // Get the result of SR
  recognition.continuous = true
  // let content = ''
  recognition.addEventListener('result', (e) => {
    const current = e.resultIndex
    const transcript = e.results[current][0].transcript

    if (transcript.toLowerCase().trim() === 'stop recording') {
      recognition.stop()
    } else if (!speechInput.value) {
      speechInput.value = transcript
    } else {
      if (transcript.toLowerCase().trim() === 'search') {
        speechForm.submit()
      } else if (transcript.toLowerCase().trim() === 'reset form') {
        speechInput.value = ''
      } else {
        speechInput.value = transcript
      }
    }
  })

  // add keyboard event listener
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'x') {
      recognition.start()
    }
    if (e.ctrlKey && e.key === 'a') {
      recognition.stop()
    }
  })

  // Get Result of SR
} else {
  console.log('Speech Recognision Not Supported')
  speechBtnDiv.style.visibility = 'hidden'
}
