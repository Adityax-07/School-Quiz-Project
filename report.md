Project Report: Interactive College History & Courses Quiz
Student Name: Aditya Bisht
Section: 6-ABC 
Enrollment Number : 06114803123
GitHub Repository: [Insert Your Github Link Here]


                                 REPORT
                                 
1. Introduction
This project is an interactive, web-based quiz application designed to test a user's knowledge about our college's history and courses. The application was built from scratch utilizing semantic HTML5, CSS3, and Vanilla JavaScript, adhering closely to the provided assignment guidelines.


2. Design Choices & UI/UX
Semantic Structure: Used HTML5 tags like <header>, <main>, <section>, and <article> to guarantee the document is well-structured for both developers and screen readers.
CSS Box Model & Layout: I utilized Flexbox extensively to center content and align elements within the quiz container. Padding, margins, borders, and box-sizing: border-box; were applied methodically to ensure a consistent, responsive layout on varying screen sizes.
Animations: CSS @keyframes were implemented to add polish. Questions fade-in smoothly, the timer pulses when time is running out (under 5 seconds) to create urgency, and the feedback section slide-ups dynamically.
Accessibility (a11y): Buttons scale slightly when focused or clicked. ARIA attributes like aria-live="polite/assertive" and aria-pressed were included to announce changes to visually impaired users natively through screen readers.


3. JavaScript Logic & Structure
Admin Data Management Constraint: As this is a client-side environment, setting up an authentic Admin portal with a database was beyond scope. To fulfill this logically, I isolated all questions into a central, immutable array (collegeQuestions). In a production setting, this object would simply be replaced by an API fetch() call linked to an Admin-only backend.
Randomization: A shuffleArray function (employing the Fisher-Yates algorithm) randomly shuffles both the questions array and the individual options each time the quiz is started.
Timer & Progression: setInterval() controls a 15-second timer per question, clearing out dynamically when a user answers. currentQuestionIndex tracks the user's progress alongside a dynamic CSS-styled progress bar.


4. Challenges & Solutions
Challenge: Handling the timer interval leaking between questions if a user clicks "Submit" too fast.
Solution: I ensured clearInterval(timerInterval) was called at the start of both submitAnswer() and resetState() to guarantee that overlapping intervals do not cause the timer to speed up.
Challenge: Re-triggering the CSS Fade-In animation for every new question.
Solution: I utilized a Javascript "Reflow" hack (void element.offsetWidth;) between adding and removing the animation class. This forces the browser to restart the animation flawlessly.
Challenge: Sharing results.
Solution: Implemented the modern navigator.share Web Share API. I added a fallback alert() for older browsers that do not support it.



5. Conclusion
The completed web app successfully covers all required functionalities and advanced features (Timer, Randomization, Progress bar, and Sharing). The code is modular, thoroughly commented, and fulfills the requested evaluation criteria.
