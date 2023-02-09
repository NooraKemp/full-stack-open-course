const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}
 
const Header = ({ courseName }) => {
  return (
    <h2>{courseName}</h2>
  )
}

const Part = ({ partName, exercises }) => {
  return (
      <p>{partName} {exercises}</p>
    )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} partName={part.name} exercises={part.exercises} />
      ))}
    </div>
  )
}

const Total = ({ parts }) => {
  return (
    <strong>Total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</strong>
  )
}


export default Course;