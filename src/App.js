import './App.css';
import React, { useState, useEffect } from 'react';
import { CirclePlus } from 'lucide-react';

function App() {
	const [score, setScore] = useState(0)
	const [questionIndex, setQuestionIndex] = useState(-1)
	const [answered, setAnswered] = useState(false)
	const [selectedOption, setSelectedOption] = useState(null)
	const [quizzOver, setQuizzOver] = useState(false)
	const [timeLeft, setTimeLeft] = useState(60);
	const [timerMode, setTimerMode] = useState(false)

	const borderColors = ['border-blue-500', 'border-green-500', 'border-yellow-500', 'border-red-500', 'border-purple-500', 'border-pink-500', 'border-indigo-500', 'border-blue-500', 'border-green-500', 'border-yellow-500']

	const quizzData = [
		{
			"id": "01",
			"question" : "Which of the following is the correct name of React.js?",
			"options": [
				"React",
				"React.js",
				"ReactJS",
				"All of the above"
			],
			"answer": "All of the above"
		},
		{
			"id": "02",
			"question" : "Which of the following are the advantages of React.js?",
			"options": [
				"React.js can increase the application's performance with Virtual DOM.",
				"React.js is easy to integrate with other frameworks such as Angular, BackboneJS since it is only a view library.",
				"React.js can render both on client and server side.",
				"All of the above"
			],
			"answer": "All of the above"
		},
		{
			"id": "03",
			"question" : "Which of the following is not a disadvantage of React.js?",
			"options": [
				"React.js has only a view layer. We have put your code for Ajax requests, events and so on.",
				"The library of React.js is pretty large.",
				"The JSX in React.js makes code easy to read and write.",
				"The learning curve can be steep in React.js."
			],
			"answer": "The JSX in React.js makes code easy to read and write."
		},
		{
			"id": "04",
			"question" : "Which of the following command is used to install create-react-app?",
			"options": [
				"npm install -g create-react-app",
				"npx create-react-app my-app",
				"npm install create-react-app",
				"npm install -f create-react-app"
			],
			"answer": "npx create-react-app my-app"
		},
		{
			"id": "05",
			"question" : "What of the following is used in React.js to increase performance?",
			"options": [
				"Original DOM",
				"Virtual DOM",
				"Both A and B.",
				"None of the above."
			],
			"answer": "Virtual DOM"
		},
		{
			"id": "06",
			"question" : "What is the default port where webpack-server runs?",
			"options": [
				"3000",
				"8080",
				"3030",
				"6060"
			],
			"answer": "3000"
		},
		{
			"id": "07",
			"question" : "How many numbers of elements a valid react component can return?",
			"options": [
				"1",
				"2",
				"3",
				"Unlimited"
			],
			"answer": "1"
		},
		{
			"id": "08",
			"question" : "What is the declarative way to render a dynamic list of components based on values in an array?",
			"options": [
				"Using the reduce array method",
				"Using the <Each /> component",
				"Using the Array.map() method",
				"With a for/while loop"
			],
			"answer": "Using the Array.map() method"
		},
		{
			"id": "09",
			"question" : "What is a state in React?",
			"options": [
				"A permanent storage.",
				"Internal storage of the component.",
				"External storage of the component.",
				"None of the above."
			],
			"answer": "Internal storage of the component."
		},
		{
			"id": "10",
			"question" : "What are the two ways to handle data in React?",
			"options": [
				"State & Props",
				"Services & Components",
				"State & Services",
				"State & Component"
			],
			"answer": "State & Props"
		}
	]

	useEffect(() => {
		if (timerMode === false) return;
		const timer = setInterval(() => {
			setTimeLeft((prevTime) => {
				if (prevTime > 0) return prevTime - 1;
				clearInterval(timer);
				return 0;
			});
		}, 1000);
	
		return () => clearInterval(timer);
	}, [questionIndex]);

	useEffect(() => {
		if (timeLeft === 0 && !quizzOver) {
			setAnswered(false);
			setSelectedOption(null);
			if (questionIndex + 1 < quizzData.length) {
				setQuestionIndex(questionIndex + 1);
				setTimeLeft(60);
			} else {
				setQuizzOver(true);
			}
		}
	}, [timeLeft, questionIndex, quizzData.length, score, quizzOver]);

	const handleAnswer = (option, index) => {
		setSelectedOption(index)
        setAnswered(true);
        if (option === quizzData[questionIndex].answer) {
            setScore(score + 1);
        }
        setTimeout(() => {
            if (questionIndex + 1 < quizzData.length) {
                setQuestionIndex(questionIndex + 1);
            } else {
                setQuizzOver(true);
                setQuestionIndex(0);
            }
            setAnswered(false);
        }, 1000);
    };

	const handleRestart = () => {
		setQuestionIndex(-1)
		setScore(0)
		setQuizzOver(false)
	}

  	return (
		<>
            {questionIndex === -1 && quizzOver === false && (
                <div className="w-full h-screen bg-blue-800 flex flex-col justify-center items-center relative">
					<div className='absolute top-40 hover:animate-spin'>
						<div className='text'>CodeCrafters JB&EL</div>
					</div>
					<CirclePlus className='absolute top-2 right-2 cursor-pointer' color='white' size={48} onClick={() => {alert("Quizz created by Julien Brasseur and Edgar Lemaître")}} />
					<p className='text-white text-xl mt-2'>The quizz is about React, the aim is to guess the correct answer.</p>
					<p className='text-white text-xl'>You have 60 seconds to answer each question, except if you disable the timer mode.</p>
					<p className='text-white text-xl mb-2'>To disable the timer mode, click on the "Timer Mode" below.</p>
					<p className="text-white text-2xl my-2">Click the button below to start the quizz</p>
                    <button className="bg-white border-4 border-purple-500 text-black font-bold px-4 py-2 rounded-lg mt-4 w-2/12 hover:bg-purple-500 hover:border-white hover:animate-pulse" onClick={() => setQuestionIndex(0)}>Start</button>
					<div className="w-6/12 flex justify-center items-center mt-4 gap-2">
						<button className="bg-white border-4 border-yellow-500 text-black font-bold px-4 py-2 rounded-lg w-2/12 hover:bg-yellow-500 hover:border-white text-sm" onClick={() => {setTimerMode(!timerMode)}}>Timer Mode</button>
						{timerMode && <p className="text-center text-sm bg-white border-4 border-green-500 text-black font-bold px-4 py-2 rounded-lg w-2/12 hover:bg-green-500 hover:border-white">ON</p>}
						{!timerMode && <p className="text-center text-sm bg-white border-4 border-red-500 text-black font-bold px-4 py-2 rounded-lg w-2/12 hover:bg-red-500 hover:border-white">OFF</p>}
					</div>
                </div>
            )} {questionIndex !== -1 && quizzOver === false && (
                <div className="w-full h-screen bg-blue-800 flex flex-col justify-center items-center relative">
                    <div className="absolute top-5 right-5 bg-white border-4 border-purple-500 text-black font-bold text-xl px-4 py-2 rounded-lg">Score: {score}</div>
					{timerMode &&
					<div className="w-6/12 bg-white h-2 mb-4 rounded">
    					<div className="bg-green-500 h-2 rounded" style={{ width: `${(timeLeft / 60) * 100}%` }}></div>
					</div>}
                    <p className="text-white text-3xl mt-4 mb-4">Question {questionIndex + 1}: {quizzData[questionIndex].question}</p>
                    <div className='w-6/12 flex flex-wrap justify-center gap-4'>
                        {quizzData[questionIndex].options.map((option, index) => (
                            <button key={index}
                                className={`border-4 ${
                                    answered ? (option === quizzData[questionIndex].answer ? 'border-green-500 bg-green-500' :
                                    (index === selectedOption ? 'border-red-500 text-white bg-red-500' : borderColors[index % borderColors.length]))
                                    : borderColors[index % borderColors.length]
                                } text-white px-4 py-3 rounded-lg mt-4 w-5/12 text-xl hover:-translate-y-1`}
                                onClick={() => handleAnswer(option, index)}
                                disabled={answered}
                                style={answered && option !== quizzData[questionIndex].answer ? { opacity: 0.6 } : {}}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
			{quizzOver && (
				<div className="w-full h-screen bg-blue-800 flex flex-col justify-center items-center relative">
					<div className="absolute top-5 right-5 bg-white border-4 border-purple-500 text-black font-bold text-xl px-4 py-2 rounded-lg">Score: {score}</div>
					<p className="text-white text-3xl mt-4">Quizz is over, your score is {score} out of {quizzData.length}</p>
					<p className="text-white text-2xl mb-4">Thank you for playing :)</p>
					<button className="bg-white border-4 border-purple-500 text-black font-bold px-4 py-2 rounded-lg mt-4 w-2/12 hover:bg-purple-500 hover:border-white hover:animate-pulse" onClick={handleRestart}>Restart</button>
				</div>
			)}
        </>
  	);
}

export default App;
