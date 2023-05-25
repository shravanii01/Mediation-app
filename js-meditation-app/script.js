// Timer Form Container
const timerEl = document.getElementById('timer-popup')

// Timer Form Selector
const timerForm = document.getElementById('timer-form')

// Timer Settings Button
const settingsBtn = document.getElementById('settingsBtn')

// Progress Bar
const progressEl = document.getElementById('progress-wrapper')


// Progress Bar
const closePopup = document.getElementById('closePopup')

// Timer Text
const timerText = document.getElementById('timer-wrapper')


// Play or Pause Button
const ppBtn = document.getElementById('pause_play_btn')

// Stop Button
const stopBtn = document.getElementById('stop_btn')

// Water Audio Selecter
const waterAudio = document.getElementById('waterAudio')

// nature Audio Selecter
const natureAudio = document.getElementById('natureAudio')

// Current set Timer 
let currentTimer = timerText.innerText

// Current set Timer 
let currentTimerTotalSec = timerText.innerText

let progressTotal = parseFloat((window.getComputedStyle(progressEl.querySelector('circle')).strokeDasharray).replace('px', ''))

// timer Interval
let TimerInterval;

waterAudio.loop = true
waterAudio.currentTime = 0

natureAudio.loop = true
natureAudio.currentTime = 0

// Getting Total Seconds of the Timer 
const getTotalSecs = () =>{
    var timer = timerText.innerText
    timer = timer.split(":")
    
    timer[0] = parseInt(timer[0])
    timer[1] = parseInt(timer[1])
    timer[2] = parseInt(timer[2])

    return ((timer[0] * ( 60 * 60)) + (timer[1] * ( 60)) + timer[2])
}
currentTimerTotalSec = getTotalSecs()

// Open Meditation Timer Configuration or settings
settingsBtn.addEventListener('click', e => {
    e.preventDefault()
    if(!timerEl.classList.contains('show'))
        timerEl.classList.add('show')
})


// Close Meditation Timer Configuration or settings
closePopup.addEventListener('click', e => {
    e.preventDefault()
    if(!!timerEl.classList.contains('show'))
        timerEl.classList.remove('show')
})

// Update Meditation Timer Configuration or settings
timerForm.addEventListener('submit', function(e){
    e.preventDefault()
    var timer = document.getElementById('timer-input')
    var audio = document.getElementById('bg-select')

    timerText.innerText = timer.value
    currentTimer = timerText.innerText
    currentTimerTotalSec = getTotalSecs()
    progressEl.querySelector('circle').style.animationDuration = `${currentTimerTotalSec}s`

    if(audio.value == 'nature'){
        natureAudio.dataset.selected= true
        waterAudio.dataset.selected= false
    }else{
        natureAudio.dataset.selected= false
        waterAudio.dataset.selected= true
    }
    alert("Meditation Configuration has been updated successfully!");
    if(!!timerEl.classList.contains('show'))
        timerEl.classList.remove('show')
    reset_timer()
})

// Reset Meditation Timer
const reset_timer = () =>{
    var audio = (natureAudio.dataset.selected == 'true') ? natureAudio : waterAudio;
    audio.pause()
    clearInterval(TimerInterval)
    audio.currentTime = 0
    timerText.innerText = currentTimer
    settingsBtn.style.display='block'
    ppBtn.removeAttribute('data-play')
    ppBtn.innerHTML = `<span class="material-symbols-outlined">sound_sampler</span>`
    progressEl.querySelector('circle').style.animationName = `none`
    setTimeout(()=>{
    progressEl.querySelector('circle').style.animationName = `radialProgress`
    progressEl.querySelector('circle').style.animationPlayState = `paused`
    },0)

}

// Start Meditation Timer
const start_timer = () =>{
    var audio = (natureAudio.dataset.selected == 'true') ? natureAudio : waterAudio;
    audio.play()
    TimerInterval = setInterval(()=>{
        var timer = timerText.innerText
            timer = timer.split(":")
            
        timer[0] = parseInt(timer[0])
        timer[1] = parseInt(timer[1])
        timer[2] = parseInt(timer[2])
        if(timer[2] > 0){
            timer[2] = (timer[2]) - 1
        }else if(timer[1] > 0){
            timer[2] = 59
            timer[1] = (timer[1]) - 1
        }else if(timer[0] > 0){
            timer[2] = 59
            timer[1] = 59
            timer[0] = (timer[0]) - 1
        }else{
            audio.pause()
            alert("Meditation Time is Finish!")
            reset_timer()
            return false;
        }

        timer[0] = String(timer[0]).padStart(2, 0)
        timer[1] = String(timer[1]).padStart(2, 0)
        timer[2] = String(timer[2]).padStart(2, 0)
        timerText.innerText = `${timer[0]}:${timer[1]}:${timer[2]}`
    },1000)
}
// Pause Meditation Timer
const pause_timer = () =>{
    var audio = (natureAudio.dataset.selected == 'true') ? natureAudio : waterAudio;
    audio.pause()
    clearInterval(TimerInterval)
    progressEl.querySelector('circle').style.animationPlayState = `paused`

}

ppBtn.addEventListener('click', e =>{
    e.preventDefault()
    var is_started = ppBtn.hasAttribute('data-play')
    if(!is_started){
        ppBtn.setAttribute('data-play', true)
        ppBtn.innerHTML = `<span class="material-symbols-outlined">pause_circle</span>`
        stopBtn.style.display = `block`
        settingsBtn.style.display='none'
        start_timer()
        progressEl.querySelector('circle').style.animationPlayState = `running`
    }else{
        ppBtn.removeAttribute('data-play')
        ppBtn.innerHTML = `<span class="material-symbols-outlined">sound_sampler</span>`
        // stopBtn.style.display = `none`
        settingsBtn.style.display='block'
        pause_timer()
        progressEl.querySelector('circle').style.animationPlayState = `paused`
    }
})

stopBtn.addEventListener('click',e =>{
    e.preventDefault()
    reset_timer()
})


