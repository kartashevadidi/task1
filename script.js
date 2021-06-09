class Student {
	constructor(fio, group, marks) {
		this.fio = fio
		this.group = +group
		this.marks = marks
	}

	get avarageMark() {
		return this.marks.reduce((result, v) => result + v, 0) / this.marks.length
	}

	static students = [
		new Student('Petrov C. A.', 1, [1, 5, 1, 4, 2]),
		new Student('Popov R. R.', 1, [5, 3, 3, 5, 4]),
		new Student('Abuzaev B. F.', 2, [2, 1, 3, 4, 3]),
		new Student('Erjanov G. D.', 2, [2, 2, 3, 3, 5]),
		new Student('Sidorov V. S.', 3, [3, 3, 2, 5, 1]),
		new Student('Typov D. A.', 3, [1, 3, 4, 3, 4]),
		new Student('Kaporov S. D.', 4, [2, 5, 3, 3, 2]),
		new Student('Karakov A. F.', 5, [3, 5, 5, 3, 4]),
		new Student('Julaev G. C.', 5, [5, 5, 5, 5, 5]),
		new Student('Kartasheva D. D.', 5, [5, 5, 5, 5, 5]),
	]

	static push(student) {
		this.students.push(student)
	}

	static pop() {
		return this.students.pop()
	}
}


const allStudentsDiv = document.querySelector('.allStudents')
const bestStudentsDiv = document.querySelector('.bestStudents')


const submitForm = (e) => {
	e.preventDefault()
	const { fio, group, marks } = e.target

	addNewStudent(fio.value, group.value, marks.value)

	printAllStudents()
	printBestStudents()
}

const addNewStudent = (fio, group, marks) => {
	const marksAsArray = marks.split(',').map(mark => +mark)
	const newStudent = new Student(fio, group, marksAsArray)

	const poppedStudents = []
	while (true) {
		const headStudent = Student.pop()
		if (headStudent.group <= newStudent.group ) {
			Student.push(headStudent)
			Student.push(newStudent)
			while (poppedStudents.length) {
				Student.push(poppedStudents.pop())
			}
			return
		}
		poppedStudents.push(headStudent)
	}
}

const printAllStudents = () => {
	allStudentsDiv.innerHTML = ""
	Student.students.forEach(student => {
		const studentDiv = document.createElement('div')
		studentDiv.innerHTML = `ФИО: ${student.fio}; группа: ${student.group}`
		allStudentsDiv.appendChild(studentDiv)
	})
}

const printBestStudents = () => {
	let numberOfBestStudents = 0
	bestStudentsDiv.innerHTML = ""
	Student.students.forEach(student => {
		if (student.avarageMark >= 4) {
			const studentDiv = document.createElement('div')
			studentDiv.innerHTML = `ФИО: ${student.fio}; группа: ${student.group}`
			bestStudentsDiv.appendChild(studentDiv)
			numberOfBestStudents++
		}
	})
	if (!numberOfBestStudents) {
		const studentDiv = document.createElement('div')
		studentDiv.innerHTML = `Таких нет`
		bestStudentsDiv.appendChild(studentDiv)
	}
}

printAllStudents()
printBestStudents()