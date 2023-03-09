let classes = [];

function calculate() {
	const credits = parseInt(document.getElementById('credits').value);
	const grade = parseFloat(document.getElementById('grade').value);
	const gpa = credits * grade;
	const className = `Class ${classes.length + 1}`;

	classes.push({ className, credits, grade, gpa });

	const classElement = document.createElement('div');
	classElement.innerHTML = `<span>${className}:</span> ${credits} credits, ${grade} grade`;
	document.getElementById('classes').appendChild(classElement);

	const totalGpa = classes.reduce((total, currentClass) => total + currentClass.gpa, 0);
	const totalCredits = classes.reduce((total, currentClass) => total + currentClass.credits, 0);
	const currentGpa = totalGpa / totalCredits;

	document.getElementById('gpa').innerHTML = `GPA: ${currentGpa.toFixed(2)}`;
}
