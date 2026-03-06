
/* --------------------
BMI CALCULATOR
-------------------- */

function calculateBMI(){

let h=document.getElementById("height").value/100
let w=document.getElementById("weight").value

if(!h || !w) return

let bmi=(w/(h*h)).toFixed(1)

let status=""

if(bmi<18.5) status="Underweight"
else if(bmi<25) status="Normal"
else if(bmi<30) status="Overweight"
else status="Obese"

document.getElementById("bmiResult").innerHTML =
"BMI: "+bmi+" ("+status+")"

}


/* --------------------
EXERCISE GENERATOR
-------------------- */

const exercises=[
"Push Ups",
"Squats",
"Burpees",
"Jump Rope",
"Lunges",
"Plank",
"Mountain Climbers",
"Sit Ups"
]

function generateExercise(){

let r=Math.floor(Math.random()*exercises.length)

document.getElementById("exerciseBox").innerHTML=exercises[r]

}


/* --------------------
WORKOUT TRACKER
-------------------- */

function saveWorkout(){

let exercise=document.getElementById("exercise").value
let sets=document.getElementById("sets").value
let reps=document.getElementById("reps").value

if(!exercise || !sets || !reps) return

let workout={
exercise:exercise,
sets:sets,
reps:reps,
date:new Date().toDateString()
}

let history=JSON.parse(localStorage.getItem("workouts")) || []

history.push(workout)

localStorage.setItem("workouts",JSON.stringify(history))

updateStreak()

displayWorkouts()

}


function displayWorkouts(){

let history=JSON.parse(localStorage.getItem("workouts")) || []

let html=""

history.forEach(w=>{

html+=`
<p>
${w.date} - ${w.exercise}
(${w.sets} sets × ${w.reps} reps)
</p>
`

})

let log=document.getElementById("workoutLog")

if(log) log.innerHTML=html

}

displayWorkouts()


/* --------------------
WORKOUT STREAK COUNTER
-------------------- */

function updateStreak(){

let today=new Date().toDateString()

let last=localStorage.getItem("lastWorkoutDate")

let streak=parseInt(localStorage.getItem("streak")) || 0

if(last===today) return

let yesterday=new Date()
yesterday.setDate(yesterday.getDate()-1)

if(last===yesterday.toDateString()){

streak++

}else{

streak=1

}

localStorage.setItem("streak",streak)
localStorage.setItem("lastWorkoutDate",today)

displayStreak()

}


function displayStreak(){

let streak=localStorage.getItem("streak") || 0

let el=document.getElementById("streakCount")

if(el) el.innerHTML=streak+" Day Streak 🔥"

}

displayStreak()


/* --------------------
WORKOUT CALENDAR
-------------------- */

function loadCalendar(){

let calendar=document.getElementById("calendar")

if(!calendar) return

for(let i=1;i<=30;i++){

let day=document.createElement("div")

day.className="day"

day.innerText=i

day.onclick=function(){

let workout=prompt("Workout for this day")

if(workout){

localStorage.setItem("day"+i,workout)

day.innerHTML=i+"<br>"+workout

}

}

let saved=localStorage.getItem("day"+i)

if(saved){

day.innerHTML=i+"<br>"+saved

}

calendar.appendChild(day)

}

}

loadCalendar()


/* --------------------
AI COACH
-------------------- */

function sendMessage(){

let input=document.getElementById("userInput").value

if(!input) return

let chat=document.getElementById("chat")

chat.innerHTML+=`<div class="user">You: ${input}</div>`

let text=input.toLowerCase()

let reply=""

if(text.includes("lose weight"))
reply="Try cardio workouts like running, cycling, and HIIT 4–5 times per week."

else if(text.includes("build muscle"))
reply="Focus on strength training: squats, bench press, deadlifts."

else if(text.includes("diet"))
reply="Eat balanced meals with protein, healthy fats, and complex carbs."

else if(text.includes("beginner"))
reply="Start with pushups, squats, planks, and 20 minutes of cardio."

else if(text.includes("rest"))
reply="Rest days are important. Muscles grow during recovery."

else
reply="Stay consistent with workouts, sleep well, and hydrate."

chat.innerHTML+=`<div class="bot">Coach: ${reply}</div>`

document.getElementById("userInput").value=""

chat.scrollTop=chat.scrollHeight

}
